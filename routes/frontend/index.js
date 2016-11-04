var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('frontend/index', { title: 'Frontend' });
});

module.exports = router;
