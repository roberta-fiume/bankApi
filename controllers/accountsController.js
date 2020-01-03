const firebaseConfig = require('../firebaseConfig');
const db = firebaseConfig.firestore;
const uuidv1 = require('uuid/v1');

exports.createAccount = (req, res) => {
    let uud = uuidv1();
    let accountAsJson = {
        "number": uud,
        "balance": 5000
    }

     db.collection('accounts')
     .doc(uud)
     .set(accountAsJson)
     .then(docRef => {
          res.status(200).send(accountAsJson);
    }).catch(err => {
        res.send("THERE HAS BEEN A SERVER ERROR", err);
    })
}

exports.createTransactions = (req, res) => {
    let transactionOwnerAccountNumber = req.params.accountId;

    let type = req.body.type
    let senderAccountNumber;
    let recipientAccountNumber;

    if (type === "send") {
        senderAccountNumber = transactionOwnerAccountNumber;
        recipientAccountNumber = req.body.recipientAccountNumber;
    } else {
        senderAccountNumber = req.body.senderAccountNumber;
        recipientAccountNumber = transactionOwnerAccountNumber;
    }

    let senderReference = req.body.senderReference;
    let date = req.body.date;
    let amount = parseInt(req.body.amount, 10);
    let recipientReference = req.body.recipientReference;

    let infoTransactionAsJson = {
        "senderReference": senderReference,
        "senderAccountNumber": senderAccountNumber,
        "date": date,
        "amount": amount,
        "recipientReference": recipientReference,
        "recipientAccountNumber": recipientAccountNumber,
        "type": type
    }

    db.collection('accounts').doc(transactionOwnerAccountNumber).collection('transactions') 
    .add(infoTransactionAsJson).then(docRef => {
        let transactionSuccessful = {
            transactionStatus: true,
            message: "Transaction completed successfully."
        }
        res.status(200).send(transactionSuccessful);
    }).catch(err => {
        res.send("THERE HAS BEEN A SERVER ERROR", err);
    })
}



exports.getTransactions = (req, res) => {
    let transactionOwnerAccountNumber = req.params.accountId;
    let transactions = [];
    db.collection('accounts').doc(transactionOwnerAccountNumber).collection('transactions')
    .get()
    .then(snapshot => {
        console.log("SNAPSHOT", snapshot)
        snapshot.docs.forEach(doc => {
            transactions.push(doc.data());
        })
        res.send(JSON.stringify(transactions));
    }).catch(err => {
       res.status(400).send("THERE HAS BEEN AN ERROR.")
    })
}

exports.getHello = (req, res) => {
    res.send("HELLO");
}

exports.getHello123 = (req, res) => {
    return "hello123";
}