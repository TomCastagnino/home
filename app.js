var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./birreria/models/campground"),
    Comment         = require("./birreria/models/comment"),
    User            = require("./birreria/models/user"),
    methodOverride  = require("method-override");
    
var commentRoutes       = require("./birreria/routes/comments"),
    campgroundRoutes    = require("./birreria/routes/campgrounds"),
    indexRoutes         = require("./birreria/routes/index");

//mongoose.connect("mongodb://localhost/yelp_camp_v6");
mongoose.connect("mongodb://tcastagnino:gskg23dFFsfwA@ds039010.mlab.com:39010/yelpcamp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/birreria/public"));
app.use(methodOverride("_method"));
app.use(flash());


////////////////////////
//PASSPORT CONFIGURATION
////////////////////////

app.use(require("express-session")({
    secret: "Esta es una cadena muy larga",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Pass {currentUser: req.user} to every single template through every route
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use("/birreria/campgrounds/:id/comments", commentRoutes);


////////////////////////////////////////////////////
//TELL EXPRESS TO LISTEN FOR REQUESTS (START SERVER)
////////////////////////////////////////////////////

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started");
});