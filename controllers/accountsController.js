const firebaseConfig = require('../firebaseConfig');

const db = firebaseConfig.firestore;

exports.createAccountNumber = (req, res) => {
    const number = require('uuid/v1');
    uuidv1();
    console.log("UNIQUE NUMBER", number)
    let balance = req.body.balance

    let account = db.collection('accounts');

    let accountAsJson = {
        "number": number,
        "balance": balance
    }

    account.add(accountAsJson).then(docRef => {
          res.status(200).send(accountAsJson);
    }).catch(err => {
        res.send("THERE HAS BEEN A SERVER ERROR", err);
    })
}