const mongoose = require("mongoose");
const Chat =require("./models/chat.js");

Chat.insertMany(allChats);
main()
.then((res) =>{
    console.log("res");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/FakeWhatshapp");  
} 

 let allChats =[
    {
    from:"neha",
    to:"priya",
    message:"send me your exam sheet",
    created_at: new Date()
},
{
    from:"rodit",
    to:"prit",
    message:"teach me js callback",
    created_at: new Date()
},
{
    from:"amit",
    to:"sumit",
    message:"we are going to market",
    created_at: new Date()
},
];
 
