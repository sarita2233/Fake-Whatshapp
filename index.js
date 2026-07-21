const PORT = process.env.PORT || 8080;

const express = require("express");
const app = express();
require("dotenv").config();

const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError");

main()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
app.set("views",path.join(__dirname,"/views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"views/public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));



//Index Route
app.get("/chats",asyncWrap(async(req,res) =>{
const chats = await Chat.find( );
console.log(chats);
res.render("index.ejs",{chats});
}));

//new Route
app.get("/chats/new",(req,res) =>{
   // throw new ExpressError(404,"page not found")
res.render("new.ejs");
});

//Create Route
app.post("/chats",asyncWrap(async(req,res,next)=>{
    let{from,to,message} =req.body;
    let newChat = new Chat({
        from:from,
        to:to,
        message:message,
        created_at:new Date(),
    });
    await newChat.save();
    res.redirect("/chats");
    
}));

function asyncWrap(fn){
return function(req,res,next){
fn(req,res,next).catch((err)=>next(err));
};
}

//New -Show Route
app.get("/chats/:id",asyncWrap(async(req,res,next)=>{
    let{id}=req.params;
    let chat = await Chat.findById(id);
     if(!chat){
    next(new ExpressError(500,"chat not found"));
    }
    res.render("edit.ejs",{chat});
}));

//edit route
app.get("/chats/:id/edit",asyncWrap(async(req,res) =>{
    let {id} =req.params;
    let chat= await Chat.findById(id);
    console.log(chat);
    res.render("edit.ejs",{chat});
}));


//Update Route
app.put("/chats/:id",asyncWrap(async(req,res) =>{
    let {id} =req.params;
    let {message:newMessage} =req.body;
    let updatedChat =await Chat.findByIdAndUpdate(
        id,
        {message:newMessage},
    {runValidators:true,new:true});

console.log(updatedChat);
res.redirect("/chats");
    
}));

//DESTROY ROUTE
app.delete("/chats/:id",asyncWrap(async(req,res) =>{
    let {id} =req.params;
let deletedChat = await Chat.findByIdAndDelete(id);
console.log(deletedChat);
res.redirect("/chats");
}));

app.get("/",(req,res) =>{
    res.send("root is working");
});

const handleValidationErr =(err)=>{
console.log("This is was a validation error, Please follow rules");
console.dir(err);
return err;
}

app.use((err,req,res,next) =>   {
    console.log(err.name);
    if(err.name=="validationError"){
    err =handleValidationErr(err);
    }
    next(err);
});
//Error Handling Middleware
app.use((err,req,res,next)=>{
let{status=500,message= "Some error Occured"}=err;
res.status(status).send(message);
});

 app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});