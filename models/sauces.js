const mongoose = require('mongoose')

//Créer un modèle
const schemaSauces = mongoose.Schema({
    userId : {type: String},
    name: {type: String},
    manufacturer: {type: String},
    description: {type: String},
    mainPepper: {type: String},
    imageUrl: {type: String},
    heat: {type: Number},
    likes: {type: Number},
    dislikes: {type: Number},
    usersLiked: {type: []},
    usersDisliked: {type: []}
});

module.exports = mongoose.model('Sauces', schemaSauces);