var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");


/////////////////////////
//ROUTES
/////////////////////////

app.get("/", function(req, res) {
    res.render("search");
})


app.get("/results", function (req, res) {
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s=";
    var key = "&apikey=1da686f3";
    request(url+query+key , function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            console.log(data);
            res.render("results", {data: data});
        }
    })
});



////////////////////////////////////////////////////
//TELL EXPRESS TO LISTEN FOR REQUESTS (START SERVER)
////////////////////////////////////////////////////

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started");
});