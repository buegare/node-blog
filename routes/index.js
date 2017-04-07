const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const config = require('../config/post');

router.get('/', (req, res) => {
	if(req.xhr) {
		Post.getPosts(req.session.posts, config.post.limit, (posts) => {

			res.render('loadposts', { 
				posts: posts,
				load_more_posts: true
			});

		});
		req.session.posts += config.post.limit;
	} else {
		req.session.posts = config.post.featured.limit;
		Post.getPosts(config.post.featured.skip, config.post.featured.limit, (posts) => {

			res.render('index', { 
				featured: posts.shift(),
				posts: posts,
				title: 'Home'
			});

		});
	}
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

router.get('/post/:postname', (req, res) => {
	console.log(req.params.postname);
	Post.getPostByTitle(req.params.postname.replace(/-/g, " "), (post) => {
		res.render('post/show', { 
			post: post
		});
	});
});

module.exports = router;
