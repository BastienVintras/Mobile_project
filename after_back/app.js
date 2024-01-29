const express = require('express');
const User = require('./models/user');
const sequelize = require('./config/db-config') 
const cors = require ('cors')
const bodyParser = require('body-parser')
const routes = require('./routes/auth');
// Configuration Express

const app = express();



app.use(cors());
app.use(bodyParser.json());
app.use('/',routes)


// Routes ou autres configurations...
app.get('/', (req, res) => {
    res.send('Bienvenue sur la page d\'accueil !');
  });







// Port d'écoute
const port = 3000;
app.listen(port,() => {
  console.log(`Serveur Express écoutant sur le port ${port}`);
});