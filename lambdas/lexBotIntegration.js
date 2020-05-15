
var AWS = require('aws-sdk');

exports.handler = (event, context, callback) => {
	try {
		var message = event["body-json"];
		//	************************
		//	validate and filter bad/empty messages
		//	************************
		if(!message.hasOwnProperty('body')){
			var error = new Error("Cannot process message without a Body.");
			callback(error);
		}

		else {
				//	************************
				//	Message is valid so now we prepare to pass it along to the Lex API.
				//	************************
				AWS.config.region = 'us-east-1';
				var lexruntime = new AWS.LexRuntime();

				var userID = message.userID
				var timestamp = message.timestamp
				var params = {
				  botAlias: 'Prod',
				  botName: 'VCUOnline',
				  inputText: message.body,
				  userId: userID.toString(),
				  sessionAttributes: {
				  }
				};

				var dataToSave = {
					TableName: 'ChatbotQuestions',
					Item: {
						"timestamp": timestamp,
						"question": message.body,
            "userID": userID,
            "userType": "faculty/staff"
					}
				}

				var docClient = new AWS.DynamoDB.DocumentClient()
				docClient.put(dataToSave, function(err, data){
					if (err){
						console.log(err)
					} else {
						console.log("Added item: ", JSON.stringify(data, null, 2) )
					}
				})

				lexruntime.postText(params, function(err, data) {

				  if (err) {
						console.log(err, err.stack); // an error occurred
			      		callback(err, 'Sorry, we ran into a problem at our end.');
					} else {

					var botResponse	= {
							TableName: 'ChatbotQuestions',
								Item: {
									timestamp: Date.now(),
									question: data.message,
									userID: userID,
									bot: "VCU"
								}
							}

						docClient.put(botResponse, function(err, data){
							if (err){
								console.log(err)
							} else {
								console.log("Added item: ", JSON.stringify(data, null, 2) )
							}
						})
						console.log(data);           // got something back from Amazon Lex
		        		callback(null, data.message);
					}
				});
		}
	} catch(e) {
		console.log(e);
		callback(e);
	}
};