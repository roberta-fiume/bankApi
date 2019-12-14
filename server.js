const express = require('express');

const bodyParser = require('body-parser');

const firebaseConfig = require('./firebaseConfig');

const db = firebaseConfig.firestore;

const userController = require('./controllers/userController');

const accountsController = require('./controllers/accountsController');

const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json()); // support json encoded bodies

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/users', userController.createUser),

app.get('/users', userController.getUser);

app.get('/users/:email/:password', userController.getUserByUserEmail);

app.get('/account', userController.getAccount);

app.post('/account/:accountNumber/:date/:amount/:recipient', userController.postTransaction);

app.post('/accounts', accountsController.createAccount);


// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});