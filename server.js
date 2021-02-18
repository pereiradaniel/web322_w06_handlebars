var express = require("express");
var app = express();
var path = require("path");
const exphbs = require('express-handlebars');

app.engine('.hbs', exphbs({ extname: '.hbs'}));
app.set('view engine', '.hbs');

var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
    res.send("Hello World<br /><a href='/about'>Go to the about page</a>");
});

// setup another route to listen on /about
app.get("/about", function(req,res){
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

// send json data and display in html
app.get("/viewData", function(req,res){

    var someData = {
        name: "John",
        age: 23,
        occupation: "developer",
        company: "Scotiabank"
    };

    res.render('viewData', {
        data: someData,
        layout: false // do not use the default Layout (main.hbs)
    });
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);