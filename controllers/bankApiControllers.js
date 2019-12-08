const firebaseConfig = require('../firebaseConfig');

const db = firebaseConfig.firestore;

exports.getUser = (req, res) => {
   res.send('Hello from App Engine! from Cloud!!!!');
}