const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const {clearTokens} = require("../../after_front/redux/authSlice")



router.post('/Inscription', async (req, res) => {
  try {
    const { email, password, what_is_your_prom } = req.body;

    const newUser = await User.create({ email, password, what_is_your_prom });
    res.json(newUser);

  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'utilisateur' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({where: {email}});
    if (!user) {
      return res.status(401).json({error:"Adresse e-mail ou mot de passe incorrect"}); 
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({error:"Adresse e-mail ou mot de passe incorrect"})
    }
    const accessToken = jwt.sign({ userId: user.id }, 'votreClefSecrete', { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user.id }, 'votreClefSecrete', { expiresIn: '7d' });  

    user.accessToken= accessToken;
    user.refreshToken= refreshToken;

   

    res.json({ success: true, user, accessToken, refreshToken });

  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({error: "Erreur lors de la connexion"});
  }

});

router.post('/logout', async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Token non fourni' });
    }

   // Trouver l'utilisateur par le token et supprimer les tokens
   const user = await User.findOne({ where: { accessToken: token } });
   user.accessToken = null;
   user.refreshToken = null;
   await user.save();

   res.json({ success: true, message: 'Déconnexion réussie' });
 } catch (error) {
   console.error('Erreur lors de la déconnexion :', error);
   res.status(500).json({ error: 'Erreur lors de la déconnexion' });
 }
});





 
module.exports = router;

