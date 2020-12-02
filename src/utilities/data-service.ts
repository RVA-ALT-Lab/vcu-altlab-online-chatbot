import { Intent } from "../types/Intent";

export class DataService {
  public static async getConversations () {
    try {
      const result = await fetch( `https://vcu-online-chatbot-functions.azurewebsites.net/api/getConversations`, {
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
      const result = await fetch( `https://vcu-online-chatbot-functions.azurewebsites.net/api/getConversationById?id=${conversationId}`, {
        method: 'GET'
      }).then(data => data.json())
      return result

    } catch (error) {
      return error.message
    }
  }
}