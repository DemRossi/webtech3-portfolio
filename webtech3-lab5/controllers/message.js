const Message = require('../models/message')
const ObjectId = require('mongodb').ObjectID;

//get user messages or get all messages 
let get = (req, res, next)=>{
    //look if there is a query
    if ( req.query.user ){
        //search for whatever that's in the query
        let myMessageUser = req.query.user
            Message.find({user: myMessageUser}, (err, userDocs)=>{
                
                res.json({
                    "status": "succes",
                    "data": {
                        "User message": userDocs
                    }
                })
            })
    }else{ //search all if there isn't a query
        Message.find({}, (err, docs)=>{
            res.json({
                "status": "succes",
                "data": {
                    "message": docs
                }
            })
        })
    }
}

//get message by id
//http://expressjs.com/en/api.html#app.param
//https://stackoverflow.com/questions/17545311/correct-way-to-search-for-mongodb-entries-by-id-in-node
let getId = (req, res, next)=>{
    let myMessageId = req.params.id
    //console.log(myMessageId)
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

//update message by id
let put = (req,res,next)=>{
    let newText = req.body.text
    let newUser = req.body.user
    let myMessageId = req.params.id

    Message.findOneAndReplace({_id: ObjectId(`${myMessageId}`)}, {
        $set: {
            text: newText,
            user: newUser
        }
    }, (err, newMessage)=>{
        res.json({
            "status": "success",
            "data": {
                "new message": newMessage
            }
        })
    })
}

//delete message by id
let deleteId = (req, res, next)=>{
    
    

    Message.findOneAndDelete({_id: ObjectId(`${myMessageId}`)}, (err, done)=>{
        res.json({
            "status": "success",
            "data": {
                "message": `The message was removed!`
            }
        })
    })
}

//get messages by user
/*let getUser = (req, res, next)=>{
    //console.log("aardapple")
    let myUserMessage = req.query.user
    console.log(myUserMessage)
    //req.query.user === 'Elias'
}*/

module.exports.get = get
module.exports.getId = getId
module.exports.post = post
module.exports.put = put
module.exports.deleteId = deleteId