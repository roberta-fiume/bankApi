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
         let apiEmail = req.params.email;
         let apiPassword = req.params.password;

         let docEmail = doc.data().email;
         let docPassword = doc.data().password;
         if (apiEmail === docEmail) {
            if (isPasswordValid(apiPassword, docPassword)) {
               let message = {
                  loggedIn: true,
                  message: `Your login has been successful. Welcome, ${apiEmail}!`
               }
               res.status(200).send(message);
            }
         } else {
            let message = {
               loggedIn: false,
               message: `Your login has not been successful. Try again!`
            }
            res.status(400).send(message);
         }
      })
    
   })
}

function isPasswordValid(apiPassword, userPassword) {
   return apiPassword === userPassword;
}

