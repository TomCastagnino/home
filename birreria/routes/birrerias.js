
var express     = require("express"),
    router      = express.Router(),
    Birreria    = require("../models/birreria"),
    middleware  = require("../middleware"); //automatically requieres any file named "index"

//INDEX
router.get("/a/birrerias", function(req, res) {
    //extraer todas las birrerias de la db
    Birreria.find({}, function(err, allBirrerias) {
        if(err) {
            console.log(err);
        } else {
            res.render("../views/birrerias/index", {birrerias: allBirrerias});
        }
    });
});

//CREATE
router.post("/a/birrerias", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var direccion = req.body.direccion;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newBirreria = {name: name, image: image, description: description, author: author, price: price, direccion: direccion};
    //Create a new campground and save it to db
    Birreria.create(newBirreria, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/a/birrerias");
        }
    });
});

//NEW
router.get("/a/birrerias/new", middleware.isLoggedIn, function(req, res) {
    res.render("../views/birrerias/new");
});

//SHOW
router.get("/a/birrerias/:id", function(req, res) {
    Birreria.findById(req.params.id).populate("comments").exec(function(err, foundedBirreria) {
        if(err) {
            console.log(err);
        } else {
            res.render("../views/birrerias/show", {birreria: foundedBirreria});
        }
    });
});

//EDIT
router.get("/a/birrerias/:id/edit", middleware.checkBirreriaOwnership, function(req, res) {
    Birreria.findById(req.params.id, function(err, foundedBirreria) {
        if (err) {
            res.redirect("/a/birrerias");
        } else {
            res.render("../views/birrerias/edit", {birreria: foundedBirreria});
        }
    });
});

//UPDATE
router.put("/a/birrerias/:id", middleware.checkBirreriaOwnership, function(req, res) {
   Birreria.findByIdAndUpdate(req.params.id, req.body.birreria, function(err, updatedCampground) {
       if (err) {
           res.redirect("/a/birrerias");
       } else {
           res.redirect("/a/birrerias/" + req.params.id);
       }
   });
});

//DESTROY
router.delete("/a/birrerias/:id", middleware.checkBirreriaOwnership, function(req, res) {
    Birreria.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/a/birrerias");
        } else{
            res.redirect("/a/birrerias");
        }
    });
});



module.exports = router;