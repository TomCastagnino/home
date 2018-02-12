var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Birreria      = require("./birreria/models/birreria"),
    Comment         = require("./birreria/models/comment"),
    User            = require("./birreria/models/user"),
    methodOverride  = require("method-override");
    
var commentRoutes       = require("./birreria/routes/comments"),
    birreriaRoutes    = require("./birreria/routes/birrerias"),
    indexRoutes         = require("./birreria/routes/index");
 

mongoose.connect(process.env.DATABASEURL);

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
app.use(birreriaRoutes);
app.use("/birreria/birrerias/:id/comments", commentRoutes);


////////////////////////////////////////////////////
//TELL EXPRESS TO LISTEN FOR REQUESTS (START SERVER)
////////////////////////////////////////////////////

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started");
});