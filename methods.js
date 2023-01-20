const degisken = "1";

let table;
let fundsTable;
let fireData;
let fundsData;
let senderFunds = [];
const INSERT_SUCCESS = "Kayıt işlemi başarılı";
const INSERT_FAILED = "Kayıt Başarısız"

const DELETE_SUCCESS = "Silme İşlemi başarılı";
const DELETE_FAILED = "Silme İşlemi Başarısız";

function restoreData(tableData) {
	let sumColumnAmount = 0;
	tableData.forEach(data => {
		sumColumnAmount += parseFloat(data.amount == "" ? 0 : data.amount);
	})
	tableData = tableData.filter(i => i.name != "TOPLAM");
	tableData.reverse().push({ name: "TOPLAM", amount: sumColumnAmount, date: "" });
	return tableData
}
function getAttribute(source, key, defaultValue) {
	let snapshot = source;

	function recursion(recursiveKey) {
		for (const element of recursiveKey) {
			if (isObject(snapshot[element])) {
				snapshot = snapshot[element];
			}
			else {
				if (!isUndefined(snapshot[key])) return snapshot[key];
				else return defaultValue;
			}
		}
		return snapshot;
	}
	return recursion(key.split('.'));
}
function startTable(data, callback) {
	let container = document.querySelector(".handsontable-container");
	table = new Handsontable(container, {
		data: restoreData(data.reverse()),
		width: "100%",
		height: "350px",
		rowHeaders: true,
		stretchH: "all",
		rowHeights: 40,
		colHeaders: ["Harcama Detayı", "Harcama Tutarı", "Tarih"],
		fixedRowsBottom: 1,
		contextMenu: true,
		modifyColWidth: function (width, col) {
			if (width > 250) return 250
		},
		columns: [
			{ data: "name" },
			{
				data: "amount",
				type: "numeric",
				numericFormat: { pattern: "$0,0.00", culture: "tr-TR" },
			},
			{ data: "date", type: "text" },
		],
	});
	$('#hot-display-license-info').remove();
	callback(table);
}

function init(callback) {
	const countriesDropDown = document.getElementById("periodDropDown");
	PocketRealtime.getValue({
		path: "root",
		done: (response) => {
			countriesDropDown.innerHTML = "";
			if (!isNull(response)) {
				fireData = response;
				let countriesData = {};
				let keys = Object.keys(response);
				for (const element of keys) {
					let key = "".concat(element)
					let temp = {}
					temp[key] = ""
					Object.assign(countriesData, temp);
				}
				for (let key in countriesData) {
					let option = document.createElement("option");
					option.setAttribute("value", keys[key]);

					let optionText = document.createTextNode(key);
					option.appendChild(optionText);

					countriesDropDown.appendChild(option);
					countriesDropDown.selectedIndex = Object.keys(countriesData).length - 1;
				}
				callback(response)
			}
			else {
				callback([])
			}
		},
		fail: (error) => {
			alert("Başlangıç ajax hatası meydana geldi.");
		}
	})
}

function download(content, fileName, contentType) {
	try {
		const a = document.createElement("a");
		const file = new Blob([content], { type: contentType });
		a.href = URL.createObjectURL(file);
		a.download = fileName;
		a.click();
	}
	catch (error) {
		alert("DownloadError - İndirme işlemi sırasında hata ile karşılaşıldı.")
	}

}

function onDownload(downloadName) {
	download(JSON.stringify(fireData), downloadName + ".json", "text/plain");
}

function backupValidation(callback) {
	firebase.auth().signInWithEmailAndPassword("imuratony@gmail.com", prompt("$root:"))
		.then((userCredential) => {
			callback(true);
		})
		.catch((error) => {
			callback(false);
		});
}

function calculateStatistics(callback) {
	let keys = Object.keys(fireData);
	let sumPayments = 0;
	let statisticsData = [];
	for (const element of keys) {
		let sumPaymentsObject = {};
		fireData[element].forEach(items => {
			sumPayments += parseFloat(items.amount == "" ? 0 : items.amount)
		})
		sumPaymentsObject = {}
		sumPaymentsObject["period"] = element;
		sumPaymentsObject["amount"] = sumPayments;
		statisticsData.push(sumPaymentsObject);
		sumPayments = 0;
	}
	setTimeout(() => {
		statisticTableCallback(statisticsData, () => {

		})
	}, 1);



}

function statisticTableCallback(data, callback) {
	let container = document.querySelector(".handsontable-container-statistics");
	let statisticsTable = new Handsontable(container, {
		data: data,
		width: "100%",
		height: "200px",
		rowHeaders: true,
		stretchH: "all",
		rowHeights: 40,
		colHeaders: ["Dönem", "Toplam Ödenen"],
		contextMenu: true,
		modifyColWidth: function (width, col) {
			if (width > 250) return 250
		},
		columns: [
			{ data: "period" },
			{
				data: "amount",
				type: "numeric",
				numericFormat: { pattern: "$0,0.00", culture: "tr-TR" },
			}
		],
	});
	$('#hot-display-license-info').remove();
	callback(statisticsTable)
}

function fundsTableCallback(data, callback) {
	let container = document.querySelector(".handsontable-container-funds");
	fundsTable = new Handsontable(container, {
		data: data[0],
		width: "100%",
		height: "200px",
		rowHeaders: true,
		stretchH: "all",
		rowHeights: 40,
		colHeaders: ["Döviz Türü", "Miktar", "Kur Endexi", "TL Karşılığı"],
		contextMenu: true,
		modifyColWidth: function (width, col) {
			if (width > 250) return 250
		},
		columns: [
			{ data: "currencyType" },
			{
				data: "amount",
				type: "numeric",
				numericFormat: { pattern: "$0,0.00", culture: "tr-TR" },
			},
			{
				data: "endex",
				type: "numeric",
				numericFormat: { pattern: "$0,0.00", culture: "tr-TR" },
			},
			{
				data: "forTl",
				type: "numeric",
				numericFormat: { pattern: "$0,0.00", culture: "tr-TR" },
			}
		],
	});
	$('#hot-display-license-info').remove();
	callback(fundsTable)
}

function calculateFunds(params) {
	let fundsTableData = [];
	Object.values(params).filter(field => field.currencyType == 'Gram-Altın').map(i => i.forTl = (parseFloat(i.amount).toFixed(2) * parseFloat(i.endex.replace(/[^0-9]/g, ''))/ 100))[0].toFixed(2)
	fundsTableData.push(Object.values(params));
	setTimeout(() => {
		fundsTableCallback(fundsTableData, () => {

		})
	}, 1);
}

function readURL(params) {
	if (document.getElementById('file').files[0].type == "application/json") {
		document.getElementById('importFile').removeAttribute("hidden")
	}
	else {
		document.getElementById('importFile').setAttribute("hidden", true);
	}
}

function setButtonReadOnly(value) {
	let buttons = document.querySelectorAll('button');
	for (const element of buttons) {
		element.disabled = value;
	}

}