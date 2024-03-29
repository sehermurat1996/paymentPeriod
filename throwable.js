function successAddPaymentValidation() {
	setButtonReadOnly(true)
	document.getElementsByClassName("infoLabel")[0].setAttribute("style", "color:lime")
	document.getElementsByClassName("infoLabel")[0].innerText = INSERT_SUCCESS
	setTimeout(() => {
		document.getElementsByClassName("form-control")[0].value = "";
		document.getElementsByClassName("form-control")[1].value = "";
		document.getElementsByClassName("infoLabel")[0].innerText = "";
		setButtonReadOnly(false)
	}, 1000);
}

function throwAddPaymentValidation(error) {
	setButtonReadOnly(true)
	document.getElementsByClassName("infoLabel")[0].setAttribute("style", "color:red")
	document.getElementsByClassName("infoLabel")[0].innerText = error
	setTimeout(() => {
		document.getElementsByClassName("form-control")[0].value = "";
		document.getElementsByClassName("form-control")[1].value = "";
		document.getElementsByClassName("infoLabel")[0].innerText = "";
		setButtonReadOnly(false)
	}, 2000);
}

function successDeletePaymentValidation() {
	setButtonReadOnly(true)
	document.getElementsByClassName("deleteInfo")[0].setAttribute("style", "color:lime")
	document.getElementsByClassName("deleteInfo")[0].innerText = INSERT_SUCCESS
	setTimeout(() => {
		document.getElementsByClassName("deleteInfo")[0].innerText = "";
		setButtonReadOnly(false)
	}, 1000);
}

function throwDeletePaymentValidation(error) {
	setButtonReadOnly(true)
	document.getElementsByClassName("deleteInfo")[0].setAttribute("style", "color:red")
	document.getElementsByClassName("deleteInfo")[0].innerText = error
	setTimeout(() => {
		document.getElementsByClassName("deleteInfo")[0].innerText = "";
		setButtonReadOnly(false)
	}, 2000);
}

function successAddPeriodValidation() {
	setButtonReadOnly(true)
	document.getElementsByClassName("infoAddPeriod")[0].setAttribute("style", "color:lime")
	document.getElementsByClassName("infoAddPeriod")[0].innerText = INSERT_SUCCESS
	setTimeout(() => {
		document.getElementsByClassName("infoAddPeriod")[0].innerText = "";
		setButtonReadOnly(false)
	}, 1000);
}

function throwAddPeriodValidation(error) {
	setButtonReadOnly(true)
	document.getElementsByClassName("infoAddPeriod")[0].setAttribute("style", "color:red")
	document.getElementsByClassName("infoAddPeriod")[0].innerText = error
	setTimeout(() => {
		document.getElementsByClassName("infoAddPeriod")[0].innerText = "";
		setButtonReadOnly(false)
	}, 2000);
}

function successAddFileValidation() {
	setButtonReadOnly(true)
	document.getElementsByClassName("infoFile")[0].setAttribute("style", "color:lime")
	document.getElementsByClassName("infoFile")[0].innerText = "import successfully"
	setTimeout(() => {
		document.getElementsByClassName("infoFile")[0].innerText = "";
		setButtonReadOnly(false)
	}, 1000);
}

function throwAddFileValidation(error) {
	setButtonReadOnly(true)
	document.getElementsByClassName("infoFile")[0].setAttribute("style", "color:red")
	document.getElementsByClassName("infoFile")[0].innerText = error.name == 'TypError' ? "Lütfen bir dosya seçin":error
	setTimeout(() => {
		document.getElementsByClassName("infoAddPeriod")[0].innerText = "";
		setButtonReadOnly(false)
	}, 2000);
}

function successSaveChange() {
	setButtonReadOnly(true);
	document.getElementById('infoSpan').setAttribute("style","color:#3de41c;display: flex; justify-content: center;");
	document.getElementById('infoSpan').textContent = "Değişiklikler kayıt edildi."
	setTimeout(() => {
		document.getElementById('infoSpan').textContent = ""
		setButtonReadOnly(false);
	}, 2000);

}

function throwSaveChange(err) {
	setButtonReadOnly(true);
	document.getElementById('infoSpan').setAttribute("style","color:red;display: flex; justify-content: center;");
	document.getElementById('infoSpan').textContent = err
	setTimeout(() => {
		document.getElementById('infoSpan').textContent = ""
		setButtonReadOnly(false);
	}, 2000);

}