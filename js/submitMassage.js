const submitBtn = document.querySelector(".submit__btn");
const inputMessage = document.querySelector(".inputmessage");
const sampleMessageBlock = document.querySelector(".sampleMessageBlock");
const chatDisplay = document.querySelector(".chat__display");

function createBlockMessage(blockMessage, message, timeMess){
	blockMessage.append(sampleMessageBlock.content.cloneNode(true));
	const elemTextMess = blockMessage.querySelector(".message__text");
	const elemTimeMess = blockMessage.querySelector(".message__time");
	elemTextMess.innerHTML = message;
	elemTimeMess.innerHTML = timeMess;
}

export {getTimeMess, createBlockMessage, submitBtn, inputMessage, chatDisplay}