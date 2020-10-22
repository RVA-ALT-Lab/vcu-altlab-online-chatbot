require('dotenv').config()
const MongoService = require('../services/MongoService')


module.exports = async function (context, req) {

    const mongoService = new MongoService();
    const result = await mongoService.getConversations()
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: result
    };
}