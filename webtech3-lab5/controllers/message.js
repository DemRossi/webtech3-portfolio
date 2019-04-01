const Message = require('../models/message')

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
let getMessageId = (req, res, next)=>{
    //req.params: {}
    res.json({
        "status": "success",
        "data": "tester"
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
