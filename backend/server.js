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
app.post('/', (req, res) => {
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

// Démarrer le serveur
app.listen(8081, () => {
  console.log('Serveur en écoute sur le port 8081');
});
