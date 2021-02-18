var express = require("express");
var app = express();
var path = require("path");

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

    var htmlString = "<!doctype html>" + 
                    "<html>" +
                        "<head>" + 
                            "<title>" + "View Data" + "</title>" +
                        "</head>" +
                        "<body>" + 
                            "<table border='1'>" + 
                                "<tr>" + 
                                    "<th>" + "Name" + "</th>" + 
                                    "<th>" + "Age" + "</th>" + 
                                    "<th>" + "Occupation" + "</th>" + 
                                    "<th>" + "Company" + "</th>" + 
                                "</tr>" + 
                                "<tr>" + 
                                    "<td>" + someData.name + "</td>" + 
                                    "<td>" + someData.age + "</td>" + 
                                    "<td>" + someData.occupation + "</td>" + 
                                    "<td>" + someData.company + "</td>" + 
                                "</tr>" + 
                            "</table>" + 
                        "</body>" + 
                    "</html>";

    res.send(htmlString);
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);