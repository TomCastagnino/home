
var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    Birreria  = require("../models/birreria"),
    Comment     = require("../models/comment"),
    middleware  = require("../middleware");


//////////////////
//COMMENTS ROUTES
//////////////////

//NEW
router.get("/a/new", middleware.isLoggedIn, function(req, res) {
    Birreria.findById(req.params.id, function(err, birreria) {
        if (err) {
            console.log(err);
        } else {
            res.render("../views/comments/new", {birreria: birreria});
        }
    });
});

//CREATE
router.post("/a", middleware.isLoggedIn, function(req, res) {
    Birreria.findById(req.params.id, function(err, birreria) {
        if (err) {
       res.redirect("/a/birrerias");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    req.flash("error", "Algo salió mal");
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    birreria.comments.push(comment._id);
                    birreria.save();
                    req.flash("success", "Comentario agregado!");
                    res.redirect("/a/birrerias/" + birreria._id);
                }
            });
        }
    });
});

//EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            res.redirect("back");
        } else {
            res.render("../views/comments/edit", {birreria_id: req.params.id, comment: foundComment});
        }
    });
});

//UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
       if (err) {
           res.redirect("back");
       } else {
           res.redirect("/a/birrerias/" + req.params.id);
       }
    });
});

//DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comentario borrado!");
            res.redirect("/a/birrerias/" + req.params.id);
        }
    });
});



module.exports = router;