require('dotenv').config()
const MongoService = require('../services/MongoService')

module.exports = async function (context, req) {
    const id = req.query.id
    console.log(id)
    const mongoService = new MongoService();
    const result = await mongoService.getConversationById(id)
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: result
    };
}