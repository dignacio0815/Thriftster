require('dotenv').config();
var express = require("express");
var bodyParser = require("body-parser");
var bcrypt = require("bcrypt");
var mysql = require("mysql");
var session = require("express-session");
var app = express();

// Yelp API
const yelp = require('yelp-fusion');
const apiKey = process.env.MY_API_KEY;
const client = yelp.client(apiKey);

    const searchRequest = {
        term:'Thrift Stores',
        location: 'Salinas, Ca',
        limit: '33'
    };
    
    let thriftStores = [];
    client.search(searchRequest).then(response => {
        response.jsonBody.businesses.forEach(function(t) {
            // filter for only thriftstores w/ images
            if(t.image_url != '') {
                thriftStores.push(t);
            }
        })
    }).catch(e => {
      console.log(e);
    });

app.use(express.static("css"));
app.use(express.static("img"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));
app.set("view engine", "ejs");

var connection = mysql.createConnection({
    host: "localhost",
    user: "denize",
    password: "denize",
    database: "thriftster_db"
}); 

connection.connect(function(err) {              
    if(err) {                                   
        console.log('error when connecting to db:', err);
    }                                     
});   

// Middleware
// check username with /signIn route
function checkUsername(username) {
    let stmt = "SELECT * from USERS where username=?";
    let data = [username];
    return new Promise(function(resolve, reject) {
       connection.query(stmt, data, function(error, results) {
           if(error) throw error;
           resolve(results);
       }) 
    });
};

// check password with /signIn route
function checkPassword(password, hash) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(password, hash, function(error, result) {
            if(error) throw error;
            resolve(result);
        })
    })  
};

// check if there is a current logged in session occurring
function isAuthenticated(req, res, next) {
    if(!req.session.authenticated) res.redirect("/signIn");
    else next();
};

app.get("/", function(req, res) {
   res.render("home"); 
});

app.get("/signIn", function(req,res){
    res.render("signIn");
});

app.post("/signIn", async function(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let users = await checkUsername(username);
    console.log(users);
    let hashedPassword = users.length > 0 ? users[0].password : "";
    let passwordMatch = await checkPassword(req.body.password, hashedPassword);
    if(passwordMatch) {
        req.session.authenticated = true;
        req.session.user = users[0].username;
        // TODO -- redirect to welcome page 
        // TODO -- current route "/" is not meant to be here but is a placeholder
        res.redirect("/welcome");
    } else {
        res.render("signIn", {error : true})
    }
});

app.get("/welcome", isAuthenticated, function(req, res) {
    res.render("welcome", {user : req.session.user, thriftStores : thriftStores});
})

app.get("/register",function(req, res) {
   res.render("register"); 
});

app.post("/register", function(req, res) {
    let username = req.body.username;
    let password = req.body.psw;
    let name = req.body.name;
    console.log(username)
    console.log(password)
    console.log(name)
    let salt = 10;
    bcrypt.hash(password, salt, function(error, hash) {
         var stmt = 'INSERT into USERS (username, password, name) VALUES (?, ?, ?)';
         var data = [username, hash, name];
         console.log(data);
         console.log("Raw password ", password);
         connection.query(stmt, data, function(error, result){
            if(error) throw error;
            res.redirect("/signin");
         });
    });
});

// Logout route
app.get("/logout", function(req, res) {
    req.session.destroy();
    res.redirect('/');
});

app.get("/profile", isAuthenticated,function(req, res) {
    res.render("profile");
});

app.get("/search", isAuthenticated, function(req, res) {
    console.log(req.query.search)
    res.render("search");
}); // route for searching item

app.get("/search/:itemId", isAuthenticated, function(req, res) {
    // set up route for choosing items to buy
    
}); // route for selecting an item

app.get("*", function(req,res){
   res.render("error"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is up and running");
});