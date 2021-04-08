const mongoose = require('mongoose')

//Créer un modèle
const thingSchemaSauces = mongoose.Schema({
    name: { type: String},
    manufacturer: { type: String},
    description: { type: String},
    imageUrl: { type: String},
    mainPepper: { type: String},
    heat: { type: Number},
    userId : {type: String},
    likes: {type: Number},
    dislikes: {type: Number},
    usersLiked: {type: [String]},
    usersDisliked: {type: [String]}
});

module.exports = mongoose.model('Sauces', thingSchemaSauces);