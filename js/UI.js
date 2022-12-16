import { request } from "./main.js"

const UI_ELEMENTS = {
	MAIN_WINDOW: {
		OPEN_SETTINGS_TAB_BUTTON: document.querySelector("#settingsOpenButton"),
		OPEN_AUTORIZATION_TAB_BUTTON: document.querySelector("#autorizationOpenButton")
	},
	AUTORIZATION_WINDOW: {
		AUTORIZATION_TAB: document.querySelector(".autorization__window"),
		INPUT_AREA: document.querySelector(".autorization__email-input"),
		SUBMIT_BUTTON: document.querySelector(".autorization__btn"),
		LINK_IF_HAVE_TOKEN: document.querySelector("#haveToken"),
	},
	VERIFICATION_WINDOW: {
		VERIFICATION_TAB: document.querySelector(".VERIFICATION__window"),	
		INPUT_AREA: document.querySelector(".verification__token-input"),
		SUBMIT_BUTTON: document.querySelector(".verification__submit-button"),
	},
	SETTINGS_WINDOW: {
		SETTINGS_TAB: document.querySelector(".settings__window"),
		CHANGE_NAME_INPUT_AREA: document.querySelector(".settings__name-change"),
		SUBMIT_BUTTON: document.querySelector(".settings__submit-button"),
	},
	CLOSE_TAB_BUTTONS: document.querySelectorAll(".window__closebtn"),
}
const displayValue = {
	none: "none",
	block: "block",
}

for(let button of UI_ELEMENTS.CLOSE_TAB_BUTTONS){
	button.addEventListener("click", function(){
		changeDisplayStyle(this.closest(".chat__popups"), displayValue.none);
	})
}

UI_ELEMENTS.MAIN_WINDOW.OPEN_SETTINGS_TAB_BUTTON.addEventListener("click", function() {
	changeDisplayStyle(UI_ELEMENTS.SETTINGS_WINDOW.SETTINGS_TAB, displayValue.block);
})

UI_ELEMENTS.MAIN_WINDOW.OPEN_AUTORIZATION_TAB_BUTTON.addEventListener("mousedown", function() {
	console.log(this.dataset.condition);
	if(this.dataset.condition) {
		const isGoOut = confirm("Хотите выйти из аккаунта ?");
		// дописать функционал выхода из аккаунта
	}
	changeDisplayStyle(UI_ELEMENTS.AUTORIZATION_WINDOW.AUTORIZATION_TAB, displayValue.block)
})

function changeDisplayStyle(elem, value) {
	elem.style.display = value;
}

document.forms.autorization.addEventListener("submit", function(event) {
	event.preventDefault();
	const paramsForRequest = {
		method: "POST",
		url: "https://mighty-cove-31255.herokuapp.com/api/user",
		contentType: "application/json",
		body: JSON.stringify({ email: UI_ELEMENTS.AUTORIZATION_WINDOW.INPUT_AREA.value })
	}
	request(paramsForRequest);
	return false;
})