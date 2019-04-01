const Message = require('../models/message')
const ObjectId = require('mongodb').ObjectID;

//get all messages
let get = (req, res, next)=>{
    Message.find({}, (err, docs)=>{
        res.json({
            "status": "succes",
            "data": {
                "message": docs
            }
        })
    })
}

//get message by id
//http://expressjs.com/en/api.html#app.param
//https://stackoverflow.com/questions/17545311/correct-way-to-search-for-mongodb-entries-by-id-in-node
let getMessageId = (req, res, next)=>{
    let myMessageId = req.params.messageId
    console.log(myMessageId)
    Message.find({_id: ObjectId(`${myMessageId}`)}, (err, doc)=>{
        res.json({
            "status": "success",
            "data": {
                "message" : doc
            }
        })
    })
    
}

//post a new message
let post = (req, res, next)=>{
    let text = req.body.text
    let user = req.body.user
    let m = new Message()
    
    m.text = text
    m.user = user
    m.save();

    res.json({
        "status": "success",
        "data": {
            "message": m
        }
    })
}

module.exports.get = get
module.exports.getMessageId = getMessageId
module.exports.post = post
