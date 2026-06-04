const mongoose = require("mongoose");
const { MaxLength } = require("node:buffer");
const { type } = require("node:os");

const chatSchema = new mongoose.Schema({
    from :{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    message:{
        type:String,
        MaxLength:50
    },
    created_at:{
        type:Date,
        required:true

    }
});

const Chat =mongoose.model("chat",chatSchema);
module.exports =Chat;