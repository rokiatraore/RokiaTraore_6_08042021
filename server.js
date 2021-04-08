//Importer le package http de node
const http = require('http');

//Importer l'application
const app = require('./app')

//Dire sur quel port l'application express doit tourner
app.set('port', process.env.PORT || 3000)

//Créer un serveur - Retourner l'application express
const server = http.createServer(app);

server.listen(process.env.PORT || 3000)