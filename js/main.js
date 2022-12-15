import {submitBtn, inputMessage, chatDisplay} from "./submitMassage.js";
import { Request } from "./classRequest.js";
import Cookies from "js-cookie";
import {myData, socket} from "./verification.js";
import jsCookie from "js-cookie";
import {allMessages} from "./importMessage.js";

let isFirstMess = true;

function submitMessage() {
	const message = inputMessage.value;
	if (!!message) {
		socket.a.send(JSON.stringify({
			text: message
		}));
	}
}

submitBtn.addEventListener("click", submitMessage);
inputMessage.addEventListener("keydown", function (event) {
	if (event.key == "Enter") {
		submitMessage();
	}
});



const inputEmail = document.querySelector(".inputemail");
const submitEmailBtn = document.querySelector(".autorization__btn");
const autorizationRequestParam = [
	"https://mighty-cove-31255.herokuapp.com/api/user",
	"POST",
	{ 'Content-Type': 'application/json;charset=utf-8' },
];

async function autorization() {
	autorizationRequestParam[3] = JSON.stringify({ "email": inputEmail.value });
	let autorizationRequest = new Request(...autorizationRequestParam);
	await autorizationRequest.request();
}

submitEmailBtn.addEventListener("click", autorization);
inputEmail.addEventListener("keydown", function (event) {
	if (event.key == "Enter") {
		autorization();
	}
});



const inputName = document.querySelector(".inputName");
const changeNameBtn = document.querySelector(".settings__btn");
let changeNameRequestParam = [
	"https://mighty-cove-31255.herokuapp.com/api/user",
	"PATCH",
	{
		'Content-Type': 'application/json;charset=utf-8',
		'Authorization': `Bearer ${Cookies.get("verification token")}`
	},
];

class FailedRequest extends Error{
	constructor(message){
		super(message);
		this.name = "FailedRequest";
	}
};


function changeName() {
	changeNameRequestParam[3] = JSON.stringify({ name: inputName.value });
	let changeNameRequest = new Request(...changeNameRequestParam);
	changeNameRequest.request()
		.then(response => {
			return response.json();
		})
		.then(result => {
			throw new FailedRequest("test");
			console.log(result)
		})
		.catch(err => {
			alert(err.message);
			throw err
		})
}

changeNameBtn.addEventListener("click", changeName);
inputName.addEventListener("keydown", function (event) {
	if (event.key == "Enter") {
		try{
			changeName();
		}catch(err){
			if(err instanceof FailedRequest){
				alert(err.message);
			}else{
				throw err;
			}
		}
	}
});


export { isFirstMess };