const degisken = "1";

let table;
let fireData;

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
	try
	{
		const a = document.createElement("a");
		const file = new Blob([content], { type: contentType });
		a.href = URL.createObjectURL(file);
		a.download = fileName;
		a.click();
	}
	catch (error)
	{
		alert("DownloadError - İndirme işlemi sırasında hata ile karşılaşıldı.")
	}

}

function onDownload(downloadName) {
	download(JSON.stringify(fireData), downloadName + ".json", "text/plain");
}