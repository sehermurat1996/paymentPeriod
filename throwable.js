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
	document.getElementsByClassName("infoFile")[0].innerText = error.name == 'TypError' ? "Lütfen bir dosya seçin":error
	setTimeout(() => {
		document.getElementsByClassName("infoAddPeriod")[0].innerText = "";
	}, 2000);
}