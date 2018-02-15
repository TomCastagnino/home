
/////////////
//MIDDLEWARE
/////////////

var Birreria  = require("../models/birreria"),
    Comment     = require("../models/comment");

var middlewareObj = {};


middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Necesitás estar logeado para hacer eso!");
    res.render("../views/login");
};

middlewareObj.checkBirreriaOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Birreria.findById(req.params.id, function(err, foundedBirreria) {
            if (err) {
                req.flash("error", "Cervecería no encontrada");
                res.redirect("back");
            } else {
                if (foundedBirreria.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "No tenés autorización para hacer eso.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Necesitás estar logeado para hacer eso!");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "No tenés autorización para hacer eso");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Necesitás estar logeado para hacer eso!");
        res.redirect("back");
    }
};




module.exports = middlewareObj;