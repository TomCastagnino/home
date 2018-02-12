var mongoose = require("mongoose");

///////////////
//SCHEMA SETUP
///////////////

var birreriaSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    direccion: String,
    description: String,
    author: {
      id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      },
      username: String
    },
    comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }]
});

module.exports = mongoose.model("Birreria", birreriaSchema); 