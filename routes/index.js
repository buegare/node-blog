const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const config = require('../config/post');
const fs = require('fs');

router.get('/', (req, res) => {
	if(req.xhr) {
		Post.getPosts(req.session.posts, config.post.limit, (posts) => {
			res.render('loadposts', { 
				posts: posts,
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

router.get('/post/:slug', (req, res) => {
	Post.getPostBySlug(req.params.slug, (post) => {
		if(post) {
			if(req.xhr) {
				res.render('post/edit', { 
					post: post
				});
			} else {
				res.render('post/show', { 
					post: post
				});
			}
		} else {
			res.redirect('/');
		}
	});
});

router.post('/create/comment', (req, res, next) => {

	// Form validation
	req.checkBody('name', 'Name field is required').notEmpty();
	req.checkBody('body', "Your comment can't be blank").notEmpty();
	
	// Check for errors
	let errors = req.validationErrors();

	if(errors) {
		res.render('post/comment/new', {
			errors: errors,
			name: req.body.name,
			body: req.body.body
		});
		return;
	} else {
		let new_comment = {
			name: req.body.name,
			body: req.body.body,
			slug: req.body.post_slug
		};

		// Create New Comment

		Post.addNewComment(new_comment, (post) => {
			res.render('post/comment/index', { 
				post: post
			});
			return;
		});


	}

});

router.post('/post/:post_id/edit', (req, res) => {

	let edited_post = {
		id: req.params.post_id,
		title: req.body.title,
		category: req.body.category,
		body: req.body.body
	};

	Post.updatePost(edited_post, (post) => {
		res.redirect(`/post/${post.slug}`);
	});
});

router.delete('/delete/post', (req, res) => {
	Post.deletePost(req.body.postId);

	if(req.body.img) {
		fs.unlink(`./public/images/posts/${req.body.img}`, err => {
	        if (err) throw(err);
		});
	}

	res.end();
});


router.delete('/delete/comment', (req, res) => {
	Post.deleteComment(req.body, (post) => {
		res.render('post/comment/index', { 
			post: post
		});
		return;
	});
});

module.exports = router;
