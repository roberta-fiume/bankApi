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
            res.send(message);
         }
      })
   })
}

function isPasswordValid(apiPassword, userPassword) {
   return apiPassword === userPassword;
}

exports.postUser = (req, res) => {
   let email = req.body.email;
   let password = req.body.password;
   let newDoc = db.collection('bankUsers');
   let dataAsJson = {
       "email": email,
       "password": password
   };
   newDoc.add(dataAsJson)
   .then(docRef => {
       dataAsJson.documentId = docRef.id
       res.send(dataAsJson);
   }).catch(err => {
   console.log('Error creating document', err);
 });
}

