class Request {
	constructor(url, method, headers, body){
		this.url = url;
		this.method = method;
		this.headers = headers;
		this.body = body;
	}
	request(){
		return fetch(this.url, {
		method : this.method,
		headers : this.headers,
		body : this.body
		});
	}
}

export {Request};