const degisken = "1";
/**
 *
 * @param {Array} tableData
 */
function restoreData(tableData) {
	let sumColumnAmount = 0;
	tableData.forEach(data => {
		sumColumnAmount += parseFloat(data.amount == "" ? 0 : data.amount);
	})
	tableData = tableData.filter(i => i.name != "TOPLAM");
	tableData.reverse().push({ name: "TOPLAM", amount: sumColumnAmount, date: "" });
	return tableData
}

function isObject(params) {
	return (Object.prototype.toString.call(params) === "[object Object]");
}

function isString(params) {
	return (Object.prototype.toString.call(params) === "[object String]");
}

function isNumber(params) {
	return (Object.prototype.toString.call(params) === "[object Number]");
}

function isUndefined(params) {
	return (Object.prototype.toString.call(params) === "[object Undefined]");
}

function isBoolean(params) {
	return (Object.prototype.toString.call(params) === "[object Boolean]");
}

function isFunction(params) {
	return (Object.prototype.toString.call(params) === "[object Function]");
}

function isNull(params) {
	return (Object.prototype.toString.call(params) === "[object Null]");
}
/**
 *
 * @param {Object} source
 * @param {String} key
 * @param {Any} defaultValue
 */
function getAttribute(source, key, defaultValue) {
	let snapshot = source;

	function recursion(recursiveKey) {
		for (let i = 0; i < recursiveKey.length; i++) {
			if (isObject(snapshot[recursiveKey[i]])) {
				snapshot = snapshot[recursiveKey[i]];
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

let table;
let fireData;

const INSERT_SUCCESS = "Kayıt işlemi başarılı";
const INSERT_FAILED = "Kayıt Başarısız"

const DELETE_SUCCESS = "Silme İşlemi başarılı";
const DELETE_FAILED = "Silme İşlemi Başarısız";
function startTable(data, callback) {
	let container = document.querySelector(".handsontable-container");
	table = new Handsontable(container, {
		data: restoreData(data.reverse()),
		width: "100%",
		height: "350px",
		colHeaders: true,
		rowHeaders: true,
		stretchH: "all",
		rowHeights: 40,
		colHeaders: ["Harcama Detayı", "Harcama Tutarı", "Tarih"],
		fixedRowsBottom: 1,
		contextMenu: true,
		columns: [
			{ data: "name" },
			{
				data: "amount",
				type: "numeric",
				numericFormat: { pattern: "$0,0.00", culture: "tr-TR" },
			},
			{ data: "date", type: "text", formatDate: "DD/MM/YYYY" },
		],
	});
	$('#hot-display-license-info').remove();
	callback(table);
}

function init(callback) {
	const countriesDropDown = document.getElementById("periodDropDown");
	PocketRealtime.getValue(
	{
		path: "root",
		done: (response) => {
			countriesDropDown.innerHTML="";
			if(!isNull(response)){
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
			else{
				callback([])
			}
		},
		fail: (error) => {
			alert("Hata ile karşılaşıldı")
		}
	})
}

function download(content, fileName, contentType) {
	const a = document.createElement("a");
	const file = new Blob([content], { type: contentType });
	a.href = URL.createObjectURL(file);
	a.download = fileName;
	a.click();
  }

  function onDownload(downloadName){
	  download(JSON.stringify(fireData), downloadName+".json", "text/plain");
  }


function successAddPaymentValidation() {
	document.getElementsByClassName("infoLabel")[0].setAttribute("style", "color:lime")
	document.getElementsByClassName("infoLabel")[0].innerText = INSERT_SUCCESS
	setTimeout(() => {
		document.getElementsByClassName("form-control")[0].value = "";
		document.getElementsByClassName("form-control")[1].value = "";
		document.getElementsByClassName("infoLabel")[0].innerText = "";
	}, 1000);
}

function throwAddPaymentValidation(error) {
	document.getElementsByClassName("infoLabel")[0].setAttribute("style", "color:red")
	document.getElementsByClassName("infoLabel")[0].innerText = error
	setTimeout(() => {
		document.getElementsByClassName("form-control")[0].value = "";
		document.getElementsByClassName("form-control")[1].value = "";
		document.getElementsByClassName("infoLabel")[0].innerText = "";
	}, 2000);
}

function successDeletePaymentValidation() {
	document.getElementsByClassName("deleteInfo")[0].setAttribute("style", "color:lime")
	document.getElementsByClassName("deleteInfo")[0].innerText = INSERT_SUCCESS
	setTimeout(() => {
		document.getElementsByClassName("deleteInfo")[0].innerText = "";
	}, 1000);
}

function throwDeletePaymentValidation(error) {
	document.getElementsByClassName("deleteInfo")[0].setAttribute("style", "color:red")
	document.getElementsByClassName("deleteInfo")[0].innerText = error
	setTimeout(() => {
		document.getElementsByClassName("deleteInfo")[0].innerText = "";
	}, 2000);
}

function successAddPeriodValidation() {
	document.getElementsByClassName("infoAddPeriod")[0].setAttribute("style", "color:lime")
	document.getElementsByClassName("infoAddPeriod")[0].innerText = INSERT_SUCCESS
	setTimeout(() => {
		document.getElementsByClassName("infoAddPeriod")[0].innerText = "";
	}, 1000);
}

function throwAddPeriodValidation(error) {
	document.getElementsByClassName("infoAddPeriod")[0].setAttribute("style", "color:red")
	document.getElementsByClassName("infoAddPeriod")[0].innerText = error
	setTimeout(() => {
		document.getElementsByClassName("infoAddPeriod")[0].innerText = "";
	}, 2000);
}

function successAddFileValidation() {
	document.getElementsByClassName("infoFile")[0].setAttribute("style", "color:lime")
	document.getElementsByClassName("infoFile")[0].innerText = "import successfully"
	setTimeout(() => {
		document.getElementsByClassName("infoFile")[0].innerText = "";
	}, 1000);
}

function throwAddFileValidation(error) {
	document.getElementsByClassName("infoFile")[0].setAttribute("style", "color:red")
	document.getElementsByClassName("infoFile")[0].innerText = error
	setTimeout(() => {
		document.getElementsByClassName("infoAddPeriod")[0].innerText = "";
	}, 2000);
}