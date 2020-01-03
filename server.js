
const indexRouter = require("./router");
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json()); // support json encoded bodies

app.use("/", indexRouter);

app.listen(3000, () => console.log("running"));



// const bodyParser = require('body-parser');

// const firebaseConfig = require('./firebaseConfig');

// const db = firebaseConfig.firestore;

// const userController = require('./controllers/userController');

// const accountsController = require('./controllers/accountsController');

// const cors = require('cors');

// const app = express();

// app.use(cors());

// app.use(bodyParser.json()); // support json encoded bodies




////

// app.post('/users', userController.createUser),

// app.get('/users', userController.getUser);

// app.get('/users/:email/:password', userController.getUserByUserEmail);

//////

// app.get('/account', userController.getAccount);

// app.post('/accounts', accountsController.createAccount);

// app.post('/accounts/:accountId/transactions', accountsController.createTransactions);

// app.get('/accounts/:accountId/transactions', accountsController.getTransactions);

// app.get('/hello', accountsController.getHello);



// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
// var server = app.listen(PORT, () => {
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

// module.exports = server;