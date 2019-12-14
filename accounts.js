const express = require('express');

const bodyParser = require('body-parser');

const firebaseConfig = require('./firebaseConfig');

const db = firebaseConfig.firestore;

const userController = require('./controllers/accountsController');

const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json()); // support json encoded bodies

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/account', accountsController.createAccount);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});