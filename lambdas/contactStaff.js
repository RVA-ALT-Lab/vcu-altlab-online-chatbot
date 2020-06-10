const https = require('https')
const AWS = require('aws-sdk')
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

    //get the conversation data, ordered, and return as a formatted string
    //post to slack with
    //return response to Lex
    const conversation = await getConversation(event.conversationId)
    console.log(conversation)
    await sendConversationToSlack(conversation)
    const response = {"dialogAction": {
        "type": "Close",
        "fulfillmentState": "Fulfilled",
        "message": {
            "contentType": "PlainText",
            "content": "Thanks! I'll have someone contact you at the email you provided"
        }
    }}
    return response;
};

function getConversation(conversationId) {
  return new Promise((resolve, reject) => {
    const params = {
      "TableName": "ChatBotConversations",
      "ProjectionExpression": "conversationId, messageDateTime, messageText, userType, referralURL, messageStatus",
      "KeyConditionExpression" : "conversationId = :conversationId",
      "ExpressionAttributeValues" : {
            ":conversationId": parseInt(conversationId)
          }
    }

    documentClient.query(params, (error, data) => {
        if (error) reject(error)
        resolve(formatConversation(data.Items))
    })

  })
}

function sendConversationToSlack(conversation) {
  return new Promise((resolve, reject) => {
    const request = https.request(process.env.SLACK_WEBHOOK, {
        method: 'POST'
      }, (response) => {
        response.on('data', (data) => {
          console.log(data)
          resolve(data)
        })
      })

    request.on('error', (e) => {
      console.log(e)
      reject(e)
    })

    request.write(JSON.stringify({text: conversation}))
    request.end()


  })
}

function formatConversation(messages) {
  return messages.map(message => {
    if (message.userType === 'VCU') {
      return `VCU: ${message.messageText}\n`
    } else {
      return `${message.userType}: ${message.messageText}\n`
    }
  }).join('')
}
