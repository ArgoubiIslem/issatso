const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'issatsio',
});

// Route POST pour insérer des données dans la base de données
/*app.post('/', (req, res) => {
  const { fullname, email, phoneNumber, password } = req.body;

  // Requête SQL paramétrée pour éviter les injections SQL
  const sql =
    'INSERT INTO login (fullname, email,phoneNumber, password) VALUES (?, ?, ?, ?)';
  const values = [fullname, email, phoneNumber, password];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(
        "Erreur lors de l'insertion dans la base de données :",
        err
      );
      return res
        .status(500)
        .json({ error: "Erreur lors de l'insertion dans la base de données" });
    }

    console.log('Données insérées avec succès :', result);
    return res.status(200).json({ success: true, data: result });
  });
});

//select tag
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM login WHERE email=? AND password=?';

  db.query(sql, [email, password], (err, data) => {
    if (err) {
      console.error('Erreur de base de données:', err);
      return res.status(500).json({ error: 'Erreur de base de données' });
    }
    if (data.length > 0) {
      return res.status(200).json({ message: 'Connexion réussie' });
    } else {
      return res
        .status(401)
        .json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
    }
  });
});*/
// Route POST pour insérer des données dans la base de données et pour se connecter
app.post('/', (req, res) => {
  const { fullname, email, phoneNumber, password, action } = req.body;

  if (action === 'register') {
    // Requête pour l'inscription
    const sql =
      'INSERT INTO login (fullname, email,phoneNumber, password) VALUES (?, ?, ?, ?)';
    const values = [fullname, email, phoneNumber, password];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(
          "Erreur lors de l'insertion dans la base de données :",
          err
        );
        return res
          .status(500)
          .json({
            error: "Erreur lors de l'insertion dans la base de données",
          });
      }

      console.log('Données insérées avec succès :', result);
      return res.status(200).json({ success: true, data: result });
    });
  } else if (action === 'login') {
    // Requête pour la connexion
    const sql = 'SELECT * FROM login WHERE email=? AND password=?';

    db.query(sql, [email, password], (err, data) => {
      if (err) {
        console.error('Erreur de base de données:', err);
        return res.status(500).json({ error: 'Erreur de base de données' });
      }
      if (data.length > 0) {
        return res.status(200).json({ message: 'Connexion réussie' });
      } else {
        return res
          .status(401)
          .json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
      }
    });
  } else {
    // Action non valide
    return res.status(400).json({ error: 'Action non valide' });
  }
});

// Démarrer le serveur
app.listen(8081, () => {
  console.log('Serveur en écoute sur le port 8081');
});
