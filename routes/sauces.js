const express  = require('express');
const router = express.Router();

//Importer la fonction du controllers
const saucesControllers = require('../controllers/sauces');
const auth = require('../middleware/auth'); 
const multer = require('../middleware/multer-config')


  //Récupérer le tableau des sauces pour l'afficher sur la page accueil
router.post('/', auth, multer, saucesControllers.createSauce);    
router.get('/', auth, saucesControllers.getAllSauce)


module.exports = router;