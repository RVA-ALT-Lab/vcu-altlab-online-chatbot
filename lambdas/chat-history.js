const AWS = require('aws-sdk');
exports.handler =  function(event, context, callback){
        console.log(event)
        const queryString = event.queryStringParamters;
        const documentClient = new AWS.DynamoDB.DocumentClient();
        const params = {
            "TableName": "ChatbotQuestions",
            "ProjectionExpression": "#t, question, userID, bot",
            "FilterExpression": "userID = :userID",
            "ExpressionAttributeNames": {
            "#t": "timestamp",
            },
            "ExpressionAttributeValues": {
                ":userID": 1539141788239
            }

        }

        documentClient.scan(params, function(err, data){
            if (err) {
                console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                callback(err)
            }
            console.log(`Scan successful ${data.Count}`);
            try {
                const items = data.Items.map(item => {
                     return {bot: item.bot, timestamp: item.timestamp, userID: item.userID, question: item.question}
                    //return {timestamp: item.timestamp}
                })
                // .filter(item => item.userID === 1539141788239)
                console.log(items)
                const responseData = JSON.stringify(items);
                callback(null, {
                statusCode: 200,
                body: responseData
            })
            }
            catch(error) {
                console.log(error)
            }
        })



};
