var express = require('express')
var router = express.Router();

router.get('/', function (req, res, next){
    res.render('/', {
        title: 'Room', 
        name: 'Bucky'
    });

});

module.exports = router;

module.express = router;
