var express     = require("express"),
    router      = express.Router();

/////////////
//ROOT ROUTES
/////////////

router.get("/", function(req, res) {
    res.render("home");
});


//////////////////
//PORTFOLIO ROUTES
//////////////////

router.get("/trabajos", function(req, res) {
  res.render("trabajos"); 
});

router.get("/trabajos/b", function(req, res) {
  res.render("patatapClone"); 
});

router.get("/trabajos/c", function(req, res) {
  res.render("colorGame"); 
});

router.get("/trabajos/e", function(req, res) {
  res.render("juegos/walker"); 
});

router.get("/trabajos/f", function(req, res) {
  res.render("juegos/flappy"); 
});

router.get("/trabajos/g", function(req, res) {
  res.render("cats"); 
});

////////
//ABOUT
////////

router.get("/about", function(req, res) {
  res.render("about"); 
});



module.exports = router;