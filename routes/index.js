const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js');

router.get('/', (req, res) => {
  Post.getLastPost();
  res.render('index', { 
  	title: 'Dashboard'
  });
});

module.exports = router;
