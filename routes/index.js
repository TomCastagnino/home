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


module.exports = router;