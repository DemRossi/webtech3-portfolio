let express = require('express');
let router = express.Router();
let messageController = require('../controllers/message')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/v1/messages', messageController.get)

//https://expressjs.com/en/guide/routing.html
router.get('/api/v1/messages/:id', messageController.getId)

router.post('/api/v1/messages', messageController.post)

router.put('/api/v1/messages/:id', messageController.put)

module.exports = router;
