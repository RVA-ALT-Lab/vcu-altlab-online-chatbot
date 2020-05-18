const AWS = require('aws-sdk');
exports.handler =  function(event, context, callback){
        console.log(event)
        const queryString = event.queryStringParameters;
        console.log(queryString)
        const documentClient = new AWS.DynamoDB.DocumentClient();
        const params = {
          "TableName": "ChatBotConversations",
          "ProjectionExpression": "conversationId, messageDateTime, messageText, userType, referralUrl, messageStatus",

        }
        if (queryString && queryString.conversationId) {
          console.log(`Starting query for ${queryString.conversationId}`);
          params.KeyConditionExpression = "conversationId = :conversationId";
          params.ExpressionAttributeValues = {
            ":conversationId": parseInt(queryString.conversationId)
          }

          documentClient.query(params, function(err, data){
            if (err) {
                console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                callback(err)
            }
            console.log(`Query successful ${data.Count}`);
            try {

                callback(null, {
                statusCode: 200,
                body: JSON.stringify(data.Items)
            })
            }
            catch(error) {
                console.log(error)
            }
          })
        } else {
          console.log(`Starting Scan for last 7 days`);
          const today = Date.now()
          params.FilterExpression = "conversationId BETWEEN :sevenDaysAgo AND :now";
          params.ExpressionAttributeValues = {
            ":now": today,
            ":sevenDaysAgo": today - (7 * 24 * 60 * 60 * 1000)
          }

          documentClient.scan(params, function(err, data){
            if (err) {
                console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                callback(err)
            }
            console.log(`Scan successful ${data.Count}`);
            try {
                callback(null, {
                  statusCode: 200,
                  body: JSON.stringify(data.Items)
                })
            }
            catch(error) {
                console.log(error)
            }
          })
        }



};
