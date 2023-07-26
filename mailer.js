import express from 'express';
import { createTransport } from 'nodemailer';
import dotenv from 'dotenv'

dotenv.config()
const app = express();
const port = 3000; // Choisissez le port que vous souhaitez utiliser

// Configuration du transporteur d'email (ici, nous utilisons Gmail comme service)
const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: 'lalasonnael@gmail.com',
    pass: 'Nael0929@'
  }
});

// Route pour envoyer un email
app.post('/envoyer-email', (req, res) => {
  const destinataire = 'ralalanael@gmail.com';
  const sujet = 'Test d\'email avec Node.js et Express';
  const corpsMessage = 'Bonjour, Ceci est un test d\'email envoyé depuis Node.js et Express !';

  // Options de l'email
  const mailOptions = {
    from: 'lalasonnael@gmail.com',
    to: destinataire,
    subject: sujet,
    text: corpsMessage
  };

  // Envoi de l'email
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log('Erreur lors de l\'envoi de l\'email :', error);
      res.send('Erreur lors de l\'envoi de l\'email.');
    } else {
      console.log('Email envoyé avec succès ! Réponse du serveur : ' + info.response);
      res.send('Email envoyé avec succès !');
    }
  });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}.`);
});
