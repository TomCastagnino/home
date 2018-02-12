var express     = require("express"),
    router      = express.Router();

/////////////
//ROOT ROUTES
/////////////

router.get("/", function(req, res) {
    res.render("home");
});




module.exports = router;