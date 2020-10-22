const axios = require('axios')

class KnowledgeBaseService {
  url = process.env.KNOWLEDGE_BASE_URL;
  endpointKey = process.env.ENDPOINT_KEY;


  async queryKnowledgeBase(question) {
    const answer = await axios({
      url: this.url,
      method: 'post',
      data: question,
      headers: {
        'Authorization': `EndpointKey ${this.endpointKey}`,
        'Accept': 'application/json'
      }
    })

    return answer.data
  }
}

module.exports = KnowledgeBaseService