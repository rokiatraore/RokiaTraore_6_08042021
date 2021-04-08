const express  = require('express');
const router = express.Router();

//Importer la fonction du controllers
const saucesControllers = require('../controllers/sauces');
const auth = require('../middleware/auth'); 

router.post('/', saucesControllers.createThing);

  //Récupérer le tableau des sauces pour l'afficher sur la page accueil
router.use('/', (req, res, next) => {
  const sauces = [
    {
      _id:'',
      name: 'Sauce spicy',
      manufacturer: 'GroupeSC',
      description: 'Sauce très épicée',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      mainPepper: 'Tomate',
      heat: '',
      userId : 'hytred',
    }
  ]
  res.status(200).json(sauces);
});
  
module.exports = router;