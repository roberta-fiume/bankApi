const express = require('express');
const router = express.Router();
const accountsController = require('./controllers/accountsController');

router.get('/hello', accountsController.getHello);

router.get('/hello123', (req, res) => {
    let hello123 = accountsController.getHello123(req, res);
    res.send({"hello123": hello123});
});

const helloThere = () => {
    accountsController.getHello();
    return "helloThere";
};

module.exports.router = router;
module.exports.helloThere = helloThere;