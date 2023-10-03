const express = require('express');
const router = express.Router();
const { body, query, param } = require('express-validator');
const middlewares = require('../middlewares/middleware');


router.get('/blog-stats', 
  
  middlewares.status

);
router.get('/blog-search',
[
  query('query').exists().withMessage('query is not present'),
  middlewares.search

]


);



module.exports = router;
