const express = require('express');
const router = express.Router();
const Post = require('../models/Post.js');
const config = require('../config/server');

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


router.get('/logout', function (req, res) {
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;
