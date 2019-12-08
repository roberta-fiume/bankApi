const express = require('express');

const bodyParser = require('body-parser');

const firebaseConfig = require('./firebaseConfig');

const db = firebaseConfig.firestore;

const userController = require('./controllers/userController');

const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json()); // support json encoded bodies

app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   res.send("helloooo i can change 123111");
// });

app.get('/users', userController.getUser);

app.get('/users/:email/:password', userController.getUserByUserEmail);


// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});