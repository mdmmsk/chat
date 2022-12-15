import Cookies from 'js-cookie';
import {importMessage, blockAssembly} from './importMessage.js';
import { Request } from './classRequest.js';

const inputTokenArea = document.querySelector(".inputTokenArea");
const comeInBtn = document.querySelector(".verification__btn");

let myData;
let myDataRequestParam = [
	"https://mighty-cove-31255.herokuapp.com/api/user/me",
	"GET",
	{
		'Authorization': `Bearer ${Cookies.get("verification token")}`
	},
	null
];

async function requestMyData() {
	let myDataRequest = new Request(...myDataRequestParam);
	try{
		let response = await myDataRequest.request();
		let result = await response.json();
		return result;
	}catch(err){
		alert(err.message);
	}
}

function tokenSetInCookie(token){
	if (!!token){
		Cookies.set("verification token", token, {expires: 30, path: "/"});
	}
}
let socket = {};
async function verification(){
		let token = inputTokenArea.value;
		tokenSetInCookie(token);
		myData = await requestMyData();
		importMessage(token, myData);
		const url = `wss://mighty-cove-31255.herokuapp.com/websockets?${myData.token}`;
		socket.a = new WebSocket(url, ["soap", "wamp"]);
		socket.a.onmessage = function(event){
			const socketData = JSON.parse(event.data);
			let blockMessage = blockAssembly(myData, socketData);
			chatDisplay.append(blockMessage);
			let forScrollTop = chatDisplay.scrollHeight - chatDisplay.offsetHeight;
			chatDisplay.scrollTop = forScrollTop - 2;
		};
}

comeInBtn.addEventListener("click", verification)
inputTokenArea.addEventListener("keydown", function(event){
	if(event.key == "Enter"){
		verification();
	}
})

export {myData, socket}

