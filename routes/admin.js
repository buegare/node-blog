const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js');
const config = require('../config/server');
const multer  = require('multer');
const fs = require('fs');

const upload = multer({ dest: './public/images/posts/' });

const auth = (req, res, next) => {
  if (req.session && req.session.user === config.admin.username) {
    return next();
  } else {
    return res.sendStatus(401);
  }
};

router.get('/', (req, res) => {
	res.render('./admin/login');
});

router.post('/', (req, res) => {
		if( req.body.username == config.admin.username &&
			req.body.password == config.admin.password) {

		 	req.session.user = req.body.username;
			res.redirect('/');	
		} else {
			req.flash('error_msg', 'Invalid credentials');
			res.redirect('/admin');
		}
	}
);

router.get('/create/post', auth, (req, res) => {
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

		if(req.file) {
			fs.unlink(req.file.path, err => {
		        if (err) throw(err);
			});
		}


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
  	res.redirect('/');

});

router.get('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;
