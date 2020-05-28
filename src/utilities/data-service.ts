import { Intent } from "../types/Intent";

export class DataService {
  public static async getConversations () {
    try {
      const result = await fetch( `https://fqtjet7xb6.execute-api.us-east-1.amazonaws.com/default/chat-history`, {
          method: 'GET'
        })
        .then(data => data.json())
      console.log(result)
      return result

    } catch (error) {
      return error.message
    }
  }

  public static async getConversationById (conversationId:string) {
    try {
      const result = await fetch( `https://fqtjet7xb6.execute-api.us-east-1.amazonaws.com/default/chat-history?conversationId=${conversationId}`, {
        method: 'GET'
      }).then(data => data.json())
      return result

    } catch (error) {
      return error.message
    }
  }
}