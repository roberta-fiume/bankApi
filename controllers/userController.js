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
      console.log("DOCS LENGTH", snapshot.docs.length)
      snapshot.docs.forEach(doc => {
         let apiEmail = req.params.email;
         let apiPassword = req.params.password;
         let docEmail = doc.data().email;
         let docPassword = doc.data().password;
         let accountNumber = doc.data().accountNumber;
         if (apiEmail === docEmail && apiPassword === docPassword) {
            let message = {
               loggedIn: true,
               message: `Your login has been successful. Welcome, ${apiEmail}!`,
               accountNumber: accountNumber,
               email: docEmail
            }
            res.status(200).send(message); 
         }
      })
      let message = {
         loggedIn: false,
         message: `Your login has not been successful. Try again!`
      }
      res.status(200).send(message);
   }).catch(err => {
      res.status(400).send("THERE HAS BEEN AN ERROR.")
   })
}

exports.createUser = (req, res) => {
   let accountNumber = req.body.accountNumber;
   let email = req.body.email;
   let password = req.body.password;
   let newDoc = db.collection('bankUsers');
   db.collection('bankUsers').get()
   .then(snapshot => {
      snapshot.docs.forEach(doc => {
         if (doc.data().email === email && doc.data().password === password) {
            let message = {
               registered: false,
               message: "You are already registered. Please log in."
            }
            res.status(200).send(message); 
         }
      })
      let dataAsJson = {
         "email": email,
         "password": password,
         "accountNumber": accountNumber
      }

      newDoc.add(dataAsJson);

      let registrationSuccessful = {
         registered: true,
         message: "Your registration is completed."
      }
      res.status(200).send(registrationSuccessful); 
   }).catch(err => {
      res.status(400).send("THERE HAS BEEN A SERVER ERROR.")
   })
}

exports.getAccount = (req, res) => {
    let accountInfo = [];
   db.collection('accountInfo').get()
   .then(snapshot => {
      snapshot.docs.forEach(doc => {
         accountInfo.push(doc.data());
      })
      res.send(JSON.stringify(accountInfo));
   }).catch(err => {
       res.send("THERE HAS BEEN A SERVER ERROR", err);
   })
}


// exports.postTransaction = (req, res) => {
//    let accountNumber = req.body.accountNumber;
//    let date = req.body.date;
//    let amount = req.body.amount;
//    let recipient = req.body.recipient;

//    let transactions = db.collection('accountInfoTransaction');

//    let infoTransactionAsJson = {
//     "accountNumber": accountNumber,
//     "date": date,
//     "amount": amount,
//     "recipient": recipient
//     }

//     transactions.add(infoTransactionAsJson).then(docRef => {
//          let transactionSuccessful = {
//             transactionStatus: true,
//             message: "Transaction completed successfully."
//         }
//         res.status(200).send(transactionSuccessful);
//     }).catch(err => {
//         res.send("THERE HAS BEEN A SERVER ERROR", err);
//     })
// }


