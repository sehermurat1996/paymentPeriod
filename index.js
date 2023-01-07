window.addEventListener('DOMContentLoaded', event => {

	init((initData) => {
		let tableOptions = document.getElementById("periodDropDown").options;
		startTable(initData[tableOptions[tableOptions.selectedIndex].innerText], (responseTable) => {
			$('#hot-display-license-info').remove();
		})
	})
});
setTimeout(() => {
	table.addHook("afterOnCellMouseDown", function () {
		console.log(table.getDataAtRow(arguments[1].row));
	});
}, 1000);

$('#periodDropDown').change(event => {
	$("#grid-table").html("");
	$('#hot-display-license-info').remove();
	let tableOptions = document.getElementById("periodDropDown").options;
	let changePeriod = tableOptions[tableOptions.selectedIndex].innerText;
	startTable(fireData[changePeriod], () => { });
})

$('.btn-add').click(function () {

	try {



		let detail = document.getElementsByClassName("form-control").name.value;
		let amount = document.getElementsByClassName("form-control").amount.value;

		if (detail.trim() == "" || amount.trim() == "") {
			throw new Error("Kayıt Başarısız.\nAlanlar boş bırakılarak kayıt işlemi gerçekleştirilemez");
		}
		let tableOptions = document.getElementById("periodDropDown").options;
		let historyPeriod = tableOptions[tableOptions.selectedIndex].innerText;
		var pushData = {
			name: detail,
			amount: amount,
			date: new Date().getUTCDay()
		};
		fireData[historyPeriod].push(pushData);

		PocketRealtime.setValue({
			path:historyPeriod,
			params:fireData[historyPeriod],
			done:(response)=>{
				successAddPaymentValidation();
			},
			fail:(error)=>{
				throwAddPaymentValidation(error);
			}
		});

	} catch (error) {
		throwAddPaymentValidation(error);
	}
})

$('.btn-add-period').click(function () {

	try {
		let period =document.getElementsByClassName("form-control").periodName.value;
		if (period.trim() == "") {
			throw new Error("Kayıt Başarısız.\nAlanlar boş bırakılarak kayıt işlemi gerçekleştirilemez");
		}
		PocketRealtime.setValue({
			path:period,
			params:[{ "name": "EnPara Kredi", "amount": "4020" }],
			done:(response)=>{
				successAddPeriodValidation();
			},
			fail:(error)=>{
				throwAddPeriodValidation(error);
			}
		});
	} catch (error) {
		throwAddPeriodValidation(error);
	}
})

$('.save').click(function () {
	var tableData = table.getData();
	var restoredData = [];

	for (let i = 0; i < tableData.length; i++) {
		if (tableData[i][0] != "TOPLAM") {
			var rowData = {
				name: tableData[i][0],
				amount: tableData[i][1],
				date: tableData[i][2]
			}
			restoredData.push(rowData);
		}
	}
	let tableOptions = document.getElementById("periodDropDown").options;
	let historyPeriod = tableOptions[tableOptions.selectedIndex].innerText;

	PocketRealtime.setValue({
		path:historyPeriod,
		params:restoredData,
		done:(response)=>{
			successAddPaymentValidation();
		},
		fail:(error)=>{
			throwAddPaymentValidation(error);
		}
	});
})

$('.backup').click(function () {
	if (confirm('Veritabanı kayıtlarını yedekleyip indirmek istiyor musun?' + "\n" + "Dosya Boyutu: " + (JSON.stringify(fireData).length / 1024).toFixed(2) + " MB")) {
		try {
			$.ajax({
				type: "GET",
				url: 'http://worldtimeapi.org/api/timezone/Europe/Istanbul',
				success: function (data) {
					if(!isNull(data) && !isUndefined(data)){
						onDownload("GelirGider_" + data.datetime.substring(0, 10) + "_" + data.datetime.substring(11, 19).replaceAll(':', '.') + "_backup")
					}
				},
				fail: function(error) {
					throw new Error(error)
				 },
				timeout:10000
			})
		} catch (error) {
			onDownload("GelirGider_backup_AJAXERR");
		}
	}
})

$('.importFile').click(function() {
	try
	{
		var files = document.getElementById('file').files;
		if (files.length <= 0) {
			throwAddFileValidation("Yüklenmeye çalışılan dosya boş.")
		}
		if(files[0].type != "application/json"){
			throwAddFileValidation("Yüklenen dosya tipi 'JSON' formatında olmalı")
		}
		var fileReader = new FileReader();
		fileReader.onload = function(e) {
			var result = JSON.parse(e.target.result);
			var formatted = JSON.stringify(result, null, 2);
			table.loadData(restoreData(JSON.parse(formatted)));
			successAddFileValidation();
			console.log("Dosya yükleme başarılı")
		}
		fileReader.readAsText(files[0]);
	}
	catch (error)
	{
		throwAddFileValidation(error);
	}

})

$('.deletePeriod').click(function(){
	try {
		let tableOptions = document.getElementById("periodDropDown").options;
		let historyPeriod = tableOptions[tableOptions.selectedIndex].innerText;
		if(confirm(historyPeriod+ " dönemi silinmek üzere. Onaylıyor musunuz?")){
			PocketRealtime.deleteValue({
				path:historyPeriod,
				done:(response)=>{
					alert(historyPeriod+" dönemi silindi");
				},
				fail:(error)=>{
					throw new Error(error);
				}
			})
		}
	} catch (error) {
		throw new Error(error);
	}
})