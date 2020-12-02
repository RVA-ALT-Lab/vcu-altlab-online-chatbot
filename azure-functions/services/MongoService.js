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
        "referralURL": message.referralURL || 'unknown',
        "messageStatus": message.messageStatus || ''
      }

      const db = this.client.db('VCUOnlineChatbot')
      const collection = db.collection('ChatbotConversations')
      const result = await collection.insertOne(messageToSave)
      await this.client.close()
      return result
    }
    async getRecentConversations(){
      await this.client.connect()
      const now = Date.now()
      const WEEK_IN_MS = (7 * 24 * 60 * 60 * 1000)
      const oneWeekAgo = now - WEEK_IN_MS
      const db = this.client.db('VCUOnlineChatbot')
      const collection = db.collection('ChatbotConversations')
      const cursor = await collection.find({'conversationId': {$gte: oneWeekAgo, $lte: now}})
      const result = await cursor.toArray()
      //const result = await collection.findOne({'conversationId': 1606929591874})
      console.log(result.length)
      await this.client.close()
      return result
    }
    async getConversationById(id){
      await this.client.connect()
      const db = this.client.db('VCUOnlineChatbot')
      const collection = db.collection('ChatbotConversations')
      const cursor = await collection.find({'conversationId': {$eq: parseInt(id) }})
      const result = await cursor.toArray()
      await this.client.close()
      return result
    }
}

module.exports = MongoService