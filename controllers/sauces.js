const modelsThingSauces = require('../models/sauces');

exports.createThing = (req, res, next) => {
    const things = new modelsThingSauces ({
      name: req.body.name,
      imageUrl: req.body.imageUrl
    });
    console.log({...req.body});
    things.save()
      .then(() => res.status(201).json({ message : 'Sauce enregistrée !'}) )
      .catch(error => res.status(400).json({ error }))
  
  };