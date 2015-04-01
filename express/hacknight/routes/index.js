var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'G\u03A6LDEN HackNights',
						subtitles: [''],
						description: '',
						date: 'every night from dusk to dawn',
						place: 'every where in the shaded side of Earth',
						who: 'every one with a productivity peak at night'});
});

module.exports = router;


