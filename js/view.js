const exitButton = document.querySelector(".buttons__exit");
const settingsButton = document.querySelector(".buttons__settings");
const windowSettings = document.querySelector(".chat__settings");
const autorizationWindow = document.querySelector(".chat__authorization");
const verificationWindow = document.querySelector(".chat__verification");

settingsButton.addEventListener("click", function () {
	windowSettings.style.display = "inline";
});

exitButton.addEventListener("click", function(){
	autorizationWindow.style.display = "inline";
});

haveToken.addEventListener("click", function(){
	verificationWindow.style.display = "inline";
});

const windowCloseBtn = document.querySelectorAll(".window__closebtn");
const chatPopups = document.querySelectorAll(".chat__popups");
for (let i = 0; i < 3; i++){
	windowCloseBtn[i].addEventListener("click", function(){
		chatPopups[i].style.display = "none";
	})
}

export {autorizationWindow, verificationWindow}