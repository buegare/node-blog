const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js');

router.get('/', (req, res) => {
	Post.getLastPost((post) => {

		res.render('index', { 
			post: post[0]
		});

	});
});

module.exports = router;
