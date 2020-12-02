require('dotenv').config()
const KnowledgeBaseService = require('../services/KnowledgeBaseService')
const MongoService = require('../services/MongoService')


module.exports = async function (context, req) {

   //Query knowledge base and determine relevance score
   //Write response text to database
      //IF less than 50, create I don't know response
      //Send response
    //Ingest question text
    //Write question text to database
    const mongoService = new MongoService()
    await mongoService.saveConversationMessage(req.body)

    const knowledgeBaseService = new KnowledgeBaseService()
    context.log('Starting Knowledge Base Query');
    const response = await knowledgeBaseService.queryKnowledgeBase({question: req.body.messageText})
    const firstAnswer = response.answers[0]
    const botMessage = {
      conversationId: req.body.conversationId,
      messageDateTime: Date.now(),
      userType: 'VCU',
      messageText: firstAnswer.answer
    }

    if(firstAnswer.score < 50) {
      botMessage.messageText = "Gosh. I'm not sure what you are asking for. Can you try saying it a different way?"
      botMessage.messageStatus = 'Missed'
    }

    const botMessageService = new MongoService()
    await botMessageService.saveConversationMessage(botMessage)

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {message: botMessage.messageText}
    };
}