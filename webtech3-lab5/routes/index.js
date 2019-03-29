let express = require('express');
let router = express.Router();
let messageController = require('../controllers/message')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/messages', messageController.get)

module.exports = router;
