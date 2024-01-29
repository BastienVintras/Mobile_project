const Sequelize = require('sequelize');

// Configuration Sequelize
const sequelize = new Sequelize('After-app', 'root',null, {
  host: 'localhost',
  dialect: 'mysql',
});

// Vérifier la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données établie avec succès.');
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de données :', err);
  });

  sequelize.sync()
  .then(() => {
    console.log('Modèles synchronisés avec la base de données.');
  })
  .catch(err => {
    console.error('Erreur lors de la synchronisation des modèles avec la base de données :', err);
});

  

  module.exports = sequelize;