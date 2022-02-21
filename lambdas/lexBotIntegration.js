
var AWS = require('aws-sdk');

exports.handler = (event, context, callback) => {
	try {
		var message = event["body-json"];
		//	************************
		//	validate and filter bad/empty messages
		//	************************
		if(!message.hasOwnProperty('messageText')){
			var error = new Error("Cannot process message without messageText.");
			callback(error);
		}

		else {
				//	************************
				//	Message is valid so now we prepare to pass it along to the Lex API.
				//	************************
				AWS.config.region = 'us-east-1';
				const LexRuntime = new AWS.LexRuntime();

				const conversationId = message.conversationId
        const messageDateTime = message.messageDateTime
        const messageText = message.messageText || ''
				const userType = message.userType || 'unknown'
				const referralURL = message.referralURL || 'unknown'
				var params = {
				  botAlias: 'Prod',
				  botName: 'VCUOnline',
				  inputText: messageText,
				  userId: conversationId.toString(),
				  sessionAttributes: {
				  	conversationId: conversationId.toString()
				  }
				};

				var dataToSave = {
					TableName: 'ChatBotConversations',
					Item: {
            "conversationId": conversationId,
            "messageDateTime": messageDateTime,
            "messageText": messageText,
						"userType": userType,
						"referralURL": referralURL
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

				LexRuntime.postText(params, function(err, data) {

            if (err) {
              console.log(err, err.stack); // an error occurred
                  callback(err, 'Sorry, we ran into a problem at our end.');
            } else {
					  var botResponse	= {
							TableName: 'ChatBotConversations',
              Item: {
                "conversationId": conversationId,
                "messageDateTime": Date.now(),
                "messageText": data.message,
                "userType": 'VCU'
              }
            }

            if (data.message === 'Gosh! I didn\'t quite catch that. Please restate your question.') {
              botResponse.Item.messageStatus = 'Missed'
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