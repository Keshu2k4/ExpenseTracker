const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const {ObjectId} = require('mongodb')
const {connectTodb,getDb}= require('./dbConnection.cjs')
const app = express()
app.use(bodyParser.json( ))
app.use(cors())
let db
connectTodb(function(error){
    if(error){
        console.log('Could not establish connection')
        console.log(error)
    } else{
app.listen(8000)
db = getDb()
console.log('Listening on port 8000')
    }
})
app.post('/sign-in', function(request,response){
    db.collection('ExpensesData').insertOne(request.body).then(function() {
        response.status(201).json({
            "status" : "Entry added successfully"
        })
        
    }).catch(function () {
        response.status(500).json({
            "status" : "Entry not added"
        })

    })

})
app.get('/get-entries',function(request,response){
    const entries = []
    db.collection('ExpensesData')
    .find()
    .forEach(entry => entries.push(entry))  
    .then(function(){
        response.status(200).json(entries)
    }).catch(function(){
        response.status(404).json({
            "status" : "Could not fetch documents"
        })
    })
})
app.get('/login', function(request,response){
    const entries = []
    db.collection('ExpensesData')
    .find()
    .forEach(entry => entries.push(entry))
    .then(function() {
        response.status(200).json(entries)
    }).catch(function() {
        response.status(500).json({
            "status" : "Could not fetch documents"
        })
    })
})
app.delete('/delete-entry',function(request,response){
    db.collection('ExpensesData').deleteOne({
        _id : new ObjectId(request.query.id)
    }).then(function() {
        response.status(200).json({
            "status" : "Entry successfully deleted"
        })
    }).catch(function(){
        response.status(500).json({
            "status" : "Entry not deleted"
        })
    })
})
app.patch('/update-entry/:id', function(request,response) {
    db.collection('ExpensesData').updateOne(
        { _id : new ObjectId(request.params.id)},
        { $set : request.body }
    ).then(function() {
        response.status(200).json({
            "status" : "Entry successfully updated"
        })
    }).catch(function(){
        response.status(500).json({
            "status" : "Entry not updated"
        }) 
})
})