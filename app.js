const bodyParser = require("body-parser")
const express=require("express")
const fs=require("fs");
//const data=require("./data")

const app=express()
app.use(bodyParser.urlencoded({extended:true}));

app.get("/login",(req,res)=>{
    res.send(`<form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/chat" method="GET">

	<input id="username" type="text" name="title">
    

	<button type="submit">add</button>

</form>`);
    
})
app.get("/chat",(req,res)=>{
    fs.readFile("username.txt", (err, data) => {
        if (err) {
          data = "No Chat Exists";
        }
    res.send(`<pre>${data}</pre><form onsubmit="document.getElementById('username').value=localStorage.getItem('username')" method="POST">

	<input id="message" type="text" name="message" placeHolder="message">
    <input  type="hidden" name="username" id="username">

	<button type="submit">add</button>
    

</form>`);

   
    
})})
app.post("/chat",(req,res)=>{
   
    fs.writeFileSync(
        "username.txt",
        `
        ${req.body.username} : ${req.body.message}  `,
        { flag: "a" }
      );
      res.redirect("/chat");
    
    })
app.use("/", (req, res, next) => {
    res.status(404).send("<h1> Page not Found </h1>");
  });


app.listen(3000)