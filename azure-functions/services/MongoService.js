const { MongoClient } = require("mongodb");

class MongoService {
    connectionString = process.env.MONGO_CONNECTION_STRING;
    client = null;

    constructor () {
      this.client = new MongoClient(this.connectionString)
    }
    async saveConversationMessage(message) {
      await this.client.connect()
      const messageToSave = {
        "conversationId": message.conversationId,
        "messageDateTime": message.messageDateTime,
        "messageText": message.messageText || '',
        "userType": message.userType || 'unknown',
        "referralURL": message.referralURL || 'unknown'
      }

      const db = this.client.db('VCUOnlineChatbot')
      const collection = db.collection('ChatbotConversations')
      const result = await collection.insertOne(messageToSave)
      await this.client.close()
      return result
    }
    async getConversations(){
      await this.client.connect()
      const db = this.client.db('VCUOnlineChatbot')
      const collection = db.collection('ChatbotConversations')
      const result = await collection.findOne({'conversationId': 1589819648239})
      await this.client.close()
      return result
    }
}

module.exports = MongoService