const firebaseConfig = require('../firebaseConfig');

const db = firebaseConfig.firestore;

exports.getUser = (req, res) => {
   let users = [];
   db.collection('bankUsers').get()
   .then(snapshot => {
      snapshot.docs.forEach(doc => {
         users.push(doc.data());
      })
      res.send(JSON.stringify(users));
   })
}

exports.getUserByUserEmail = (req, res) => {
   db.collection('bankUsers').get()
   .then(snapshot => {
      snapshot.docs.forEach(doc => {
         let apiEmail = req.params.userEmail;
         let docEmail = doc.data().email;
         if (apiEmail === docEmail) {
            res.send(JSON.stringify(doc.data()));
         } else {
            res.status(404).send("USER NOT FOUND");
         }
      })
    
   })
}