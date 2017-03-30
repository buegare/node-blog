const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js');

router.get('/', (req, res) => {
	Post.getLastPost((post) => {

		res.render('index', { 
			post: post[0],
			title: 'Home'
		});

	});
});

router.get('/about', (req, res) => {
	res.render('about', { 
		title: 'About'
	});
});

router.get('/author', (req, res) => {
	res.render('author', { 
		title: 'Author'
	});
});

module.exports = router;
