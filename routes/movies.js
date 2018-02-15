var express = require("express"),
    router  = express.Router();
    
var request = require("request");


/////////////////////////
//ROUTES
/////////////////////////

router.get("/trabajos/d", function(req, res) {
    res.render("movies/movieSearch");
});


router.get("/trabajos/d/results", function (req, res) {
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s=";
    request(url+query+process.env.MOVIE_KEY , function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            console.log(data);
            res.render("movies/movieResults", {data: data});
        }
    });
});


module.exports = router;