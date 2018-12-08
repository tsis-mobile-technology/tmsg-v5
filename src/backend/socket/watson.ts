
export class Watson {
	private AssistantV1 = require('watson-developer-cloud/assistant/v1');
	public assistant = null;
	public  workspace_id = 'b3463172-cd48-4db3-a543-35e3ccf7f7c8';

	constructor() {  
		this.assistant = new this.AssistantV1({
										version: '2018-09-20',
										iam_apikey: 'njaZCHSnRJhAfCZOUFddPpY_OAJxN2QPf8v6Na9BQOnh',
										url: 'https://gateway-tok.watsonplatform.net/assistant/api'
									});
		console.log("watsonplatform connect");
	}

	public requestWatsonMessage(ws_id: string, text: string, callback: any) : any {
		return this.assistant.message({
			workspace_id: ws_id,
			input: {'text': text} // 'Hello'
			},
			callback  
			/*
			function(err, response) {
				if (err) {
					console.log('error:', err);
					callback = err;
				}
				else {
					//console.log(JSON.stringify(response, null, 2));
					callback = JSON.stringify(response, null, 2);
				}
			}
			*/
		);
	}
}