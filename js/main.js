export function request({method, url, contentType = null, body}){
	const request = new XMLHttpRequest();
	request.open(method, url);
	// request.withCredentials = true;
	contentType && request.setRequestHeader('Content-Type', contentType);
	request.send(body);
	request.onload = function() {
		console.log(request.response);
	}
}
