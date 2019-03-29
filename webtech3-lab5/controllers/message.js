const Message = require('../models/message')

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

module.exports.get = get