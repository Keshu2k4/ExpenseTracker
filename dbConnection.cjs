const {MongoClient} = require('mongodb')
let dbConnection
function connectTodb(callBack){
 MongoClient.connect('mongodb+srv://keshav:2004@cluster0.jwqbtc0.mongodb.net/ExpenseTracker?retryWrites=true&w=majority').then(function(client){
    dbConnection = client.db()
    callBack()
 }).catch(function(error){
    callBack(error)
 })
}

function getDb(){
return dbConnection
}
module.exports = {connectTodb, getDb}