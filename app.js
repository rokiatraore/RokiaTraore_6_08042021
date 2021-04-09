//const d'Importations
const express = require('express');
const mongoose = require('mongoose');
const saucesRoutes = require('./routes/sauces');
const usersRoutes = require('./routes/users')
const path = require('path');

const app = express();

//Connerter API à la base de données
mongoose.connect('mongodb+srv://rokiatraore:rokiatraore@cluster0.j6t0u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Ajout des headers pour autoriser l'accès à l'API
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//Transformer le corps de la requête en objet JS
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
//Enregistrer les routeurs pour les demandes effectuées vers leurs routes
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', usersRoutes);

//Exporter l'application (const app) pour y accéder depuis les autres fichiers
module.exports = app;