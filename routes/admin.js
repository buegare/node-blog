const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js');
const config = require('../config/server');
const multer  = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/posts/');
    },
    filename: (req, file, cb) => {
        cb(null, `img-${req.body.title}`);
  }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
	res.render('./admin/login');
});

router.post('/', (req, res) => {
		if(req.body.username == config.admin.username &&
		 req.body.password == config.admin.password) {
		 	req.session.user = req.body.username;
			req.flash('success_msg', 'Admin logged in successfuly');
			res.redirect('/');	
		} else {
			req.flash('error_msg', 'Invalid credentials');
			res.render('./admin/login');
		}
	}
);

router.get('/create/post', (req, res) => {
	res.render('./admin/newpost');
});


router.post('/create/post', upload.single('postimage'), (req, res, next) => {

	// Form validation
	req.checkBody('title', 'Title field is required').notEmpty();
	req.checkBody('body', 'Body field is required').notEmpty();
	req.checkBody('category', 'Category field is required').notEmpty();
	
	// Check for errors
	let errors = req.validationErrors();

	if(errors) {

		fs.unlink(`./public/images/posts/${req.file.filename}`, err => {
	        if (err) throw(err);
		});


		res.render('admin/newpost', {
			errors: errors,
			title: req.body.title,
			body: req.body.body,
			category: req.body.category
		});
		return;
	} else {
		let newPost = new Post({
			title: req.body.title,
			body: req.body.body,
			category: req.body.category,
			image: req.file ? req.file.filename : 'noimage.png'
		});

		// Create Post
		Post.createPost(newPost);
	}

	// Success message
	req.flash('success_msg', 'New Post created successfuly');
  	res.redirect('/');

});

router.get('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;
