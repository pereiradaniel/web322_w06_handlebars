const express = require("express");
const exphbs = require('express-handlebars');
var path = require("path");

const app = express();

// Register handlebars as the rendering engine for views.
app.engine('.hbs', exphbs({
    extname: '.hbs',
    helpers: {
        strong: function(options){
            return '<strong>' + options.fn(this) + '</strong>';
        },
        list: function(context, options){
            var ret = "<ul>";

            for (var i = 0; i < context.length; i++) {
                ret = ret + "<li>" + options.fn(context[i]) + "</li>";
            }

            return ret + "</ul>";
        }
    }
}));
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

    var someData = [{
        name: "John",
        age: 23,
        occupation: "developer",
        company: "Scotiabank"
    },
    {
        name: "Sarah",
        age: 32,
        occupation: "manager",
        company: "TD"
    }];
    res.render('viewData', {
        data: someData,
        layout: false // do not use the default Layout (main.hbs)
    });
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);