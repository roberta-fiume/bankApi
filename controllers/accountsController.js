const firebaseConfig = require('../firebaseConfig');
const db = firebaseConfig.firestore;
const uuidv1 = require('uuid/v1');

exports.createAccount = (req, res) => {
    let uud = uuidv1();
    console.log("UNIQUE NUMBER", uud)

    let balance = 0;

    let account = db.collection('accounts');

    let accountAsJson = {
        "number": uud,
        "balance": balance
    }

    account.add(accountAsJson).then(docRef => {
          res.status(200).send(accountAsJson);
    }).catch(err => {
        res.send("THERE HAS BEEN A SERVER ERROR", err);
    })
}