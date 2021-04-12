const Sauce = require('../models/sauces');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
  //Convertir le corps de la requête en JS
  const sauceObject = JSON.parse(req.body.sauce);

  const sauce = new Sauce({
    ...sauceObject,
    //URL de l'image
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });
  sauce.save()
    .then(() => {res.status(201).json({ message: 'Objet enregistré !'}); })
    .catch(error => {res.status(400).json({ error }); });
};

exports.getAllSauce = (req, res, next) => {
  //Renvoyer un tableau contenant toutes les sauces dans la base de données
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  //Trouver la sauce unique ayant le même _id que le paramètre de la requête
  Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : {...req.body};
  Sauce.updateOne(
    {_id: req.params.id}, 
    {...sauceObject, _id: req.params.id}
  )
  .then(() => res.status(200).json({ message: 'Objet modifié !'}))
  .catch(error => res.status(400).json({ error }));
}

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
    .then(sauce => {
      //Extraire le nom du fichier à supprimer
      const filename = sauce.imageUrl.split('/images/')[1];
      //Suppression du fichier
      fs.unlink(`images/${filename}`, () => {
        //Supprimer la sauce dans la BDD dans le callback
        Sauce.deleteOne({_id: req.params.id})
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      })
    })
    .catch(error => res.status(500).json({ error }));
}

exports.likeSauce = (req, res, next) => {
  switch(req.body.like) {
    //L'utilisateur aime la sauce
    case 1:
      Sauce.updateOne({_id: req.params.id}, {$inc: {likes: 1}, $push: {usersLiked: req.body.userId}})
        .then( () =>  res.status(200).json({ message: `Vous aimez la sauce ${req.body.name}!`}))
        .catch(error => res.status(400).json({ error }));
      break;
    
    //L'utilisateur n'aime pas la sauce
    case -1:
      Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: 1}, $push: {usersDisliked: req.body.userId}})
        .then( () =>  res.status(200).json({ message: `Vous n'aimez pas la sauce ${req.body.name}!`}))
        .catch(error => res.status(400).json({ error }));
      break;
    
    //L'utilisateur retire son vote
    case 0:
      Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
          //Likes: Vérifier si dans le tableau des likes il y a l'id de l'utilisateur
          if (sauce.usersLiked.includes(req.body.userId)){
            Sauce.updateOne({_id: req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: req.body.userId}})
            .then( () =>  res.status(200).json({ message: `Vous avez retiré votre like`}))
            .catch(error => res.status(400).json({ error }));
          }

          //Dislikes
          if (sauce.usersDisliked.includes(req.body.userId)){
            Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: -1}, $pull: {usersDisliked: req.body.userId}})
            .then( () =>  res.status(200).json({ message: `Vous avez retiré votre dislike`}))
            .catch(error => res.status(400).json({ error }));
          }
        })
        .catch(error => res.status(400).json({ error }));
      break;

      default:
        alert(error)
        break;
  }
}