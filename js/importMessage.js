import Cookies from "js-cookie";
import { format } from "date-fns";
import { Request } from "./classRequest.js";
import { autorizationWindow, verificationWindow } from "./view.js";
import { chatDisplay, createBlockMessage } from "./submitMassage.js"
import { isFirstMess } from "./main.js";

const verificationBody = document.querySelector(".verification__body");
let importMessageRequestParam = [
	"https://mighty-cove-31255.herokuapp.com/api/messages",
	"GET",
	{
		'Content-Type': 'application/json;charset=utf-8',
		'Authorization': `Bearer ${Cookies.get("verification token")}`
	},
	null
];
function whooseMessage(blockMessage, myData, messageData) {
	if (isFirstMess) {
		blockMessage.classList.add("firstmess");
		isFirstMess = false;
	} else {
		if (myData.email == messageData.email) {
			blockMessage.classList.add("mymess");
		} else {
			blockMessage.classList.add("interlocutormess");
		}
	}
}

function blockAssembly(myData, messageData) {
	let blockMessage = document.createElement("div");
	blockMessage.className = "display__message";
	const message = messageData.text;
	let time = new Date(messageData.updatedAt);
	time = format(time, "k:mm");
	whooseMessage(blockMessage, myData, messageData.user);
	createBlockMessage(blockMessage, message, time);
	return blockMessage;
}

let allMessages = {};
function appendMessage(resultRequest, howManyMessages, myData) {
	allMessages.messages = resultRequest.messages;
	const numberMessages = allMessages.messages.length;
	allMessages.start = numberMessages - howManyMessages - 1;
	let fragment = new DocumentFragment();
	for (let i = allMessages.start; i < numberMessages; i++) {
		let blockMessage = blockAssembly(myData, allMessages.messages[i]);
		fragment.append(blockMessage);
	}
	chatDisplay.append(fragment);
	let forScrollTop = chatDisplay.scrollHeight - chatDisplay.offsetHeight;
	chatDisplay.scrollTop = forScrollTop - 2;
}

async function importMessage(enteredToken, myData) {
	let importMessageRequest = new Request(...importMessageRequestParam);
	let response = await importMessageRequest.request();
	let resultRequest = await response.json();
	if (myData.token == enteredToken) {
		verificationWindow.style.display = "none";
		autorizationWindow.style.display = "none";
		appendMessage(resultRequest, 10, myData);
		chatDisplay.addEventListener("scroll", function (event) {
			if (chatDisplay.scrollTop == 0) {
				console.log("зашел-ушел");
				let start;
				let end;
				let message;
				if (allMessages.start < 30) {
					start = 0;
					end = allMessages.start;
					message = "Вся история загружена";
				} else {
					end = allMessages.start;
					allMessages.start -= 30;
					start = allMessages.start;
				}
				let fragmentLoading = new DocumentFragment();
				for (let i = start; i < end; i++) {
					let blockMessage = blockAssembly(myData, allMessages.messages[i]);
					fragmentLoading.append(blockMessage);
				}
				let oldheight = chatDisplay.scrollHeight;
				chatDisplay.prepend(fragmentLoading);
				chatDisplay.scrollTop = chatDisplay.scrollHeight - oldheight;
				if (message) {
					alert(message);
				}
			}
		})
	} else {
		let errorMessage = document.createElement("div");
		errorMessage.innerHTML = "Неверный код";
		errorMessage.className = "verification__error";
		verificationBody.prepend(errorMessage);
	}
}

export { importMessage, blockAssembly, allMessages };
