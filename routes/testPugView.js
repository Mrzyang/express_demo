var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('testPugView', { title: 'testPugView' });
});


router.get('/secondaryPath', function(req, res, next) {
  res.render('testPugView/secondaryPath', { title: 'secondaryPath page for testing pug' });
});


module.exports = router;
