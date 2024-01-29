const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');
const bcrypt = require('bcrypt');
const { errors } = require('undici');


function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isStrongPassword(password) {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
  return passwordRegex.test(password);
}


const User = sequelize.define('User', {
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  what_is_your_prom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accessToken: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  refreshToken: {
    type: DataTypes.STRING,
    defaultValue: null,
  },

});
User.beforeValidate(async (user, options) => {
  try{
  if (!isValidEmail(user.email)) {
    throw new Error('Format d\'email invalide');
  }
  if (isStrongPassword(user.password)) {
    throw new Error('le mot de passe doit contenir au moins 6 caractères avec une lettre, un chiffre et un caractère spécial.')
  }
  

  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
}catch(error){
  console.error("erreur lors de la journalisation dans beforeValidate :",error)
}
});


module.exports = User;