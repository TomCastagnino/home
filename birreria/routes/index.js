
var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user");


/////////////
//ROOT ROUTES
/////////////

router.get("/a", function(req, res) {
    res.render("../views/landing");
});


/////////////
//AUTH ROUTES
/////////////

router.get("/a/register", function(req, res) {
    res.render("../views/register");
});

router.post("/a/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Bienvenido, " + user.username);
            res.redirect("/a/birrerias");
        });
    });
});


//////////////////
//LOGIN/OUT ROUTES
//////////////////

router.get("/a/login", function(req, res) {
    res.render("../views/login"); 
});

router.post("/a/login", passport.authenticate("local", {
    successRedirect: "/a/birrerias",
    failureRedirect: "/a/login"
}), function(req, res) {
    
});

router.get("/a/logout", function(req, res) {
    req.logout();
    req.flash("success", "Hasta la próxima!");
    res.redirect("/a/birrerias");
});



module.exports = router;