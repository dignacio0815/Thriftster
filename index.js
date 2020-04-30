var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(express.static("css"));
app.use(express.static("img"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.get("/", function(req, res) {
   res.render("home"); 
});

app.get("/signIn",function(req,res){
    res.render("signIn");
});

app.get("/register",function(req, res) {
   res.render("register"); 
});

app.get("*", function(req,res){
   res.render("error"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is up and running");
});