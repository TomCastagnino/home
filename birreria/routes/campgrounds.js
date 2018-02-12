
var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground"),
    middleware  = require("../middleware"); //automatically requieres any file named "index"

//INDEX
router.get("/campgrounds", function(req, res) {
    //Get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("../views/campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

//CREATE
router.post("/campgrounds", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var direccion = req.body.direccion;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: description, author: author, price: price, direccion: direccion};
    //Create a new campground and save it to db
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//NEW
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res) {
    res.render("../views/campgrounds/new");
});

//SHOW
router.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("../views/campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.render("../views/campgrounds/edit", {campground: foundCampground});
        }
    });
});

//UPDATE
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
       if (err) {
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});

//DESTROY
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds");
        }
    });
});



module.exports = router;