const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js');

router.get('/', (req, res) => {
	Post.getPosts((posts) => {

		res.render('index', { 
			featured: posts.shift(),
			posts: posts,
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
