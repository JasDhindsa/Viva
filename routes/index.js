var express = require('express')
var router = express.Router();

router.get('/', function (req, res, next){
    res.render('index', {
        title: 'Express', 
        name: 'Bucky'
    });

});

module.express = router;

module.exports = router;
