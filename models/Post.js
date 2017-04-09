const mongoose = require('mongoose');
const config = require('../config/mongodb');

mongoose.connect(`mongodb://${config.db.server}/${config.db.collection}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

// Post Schema

let PostSchema = mongoose.Schema({
	title: { type: String, index: true, require: true },
	category: { type: String, require: true },
	body: { type: String, require: true },
	image: { type: String},
	comments: [{ body: String, date: { type: Date, default: Date.now }, name: String}],
  	date: { type: Date, default: Date.now },
});

const Post = module.export = db.model('Post', PostSchema);
module.exports = Post;

module.export.getPosts = function(skip, limit, cb) {
	this.find(function (err, posts) {
	  if (err) return console.error(err);
	  return cb(posts);
	}).sort('-date').skip(skip).limit(limit);
};

module.export.createPost = function(newPost) {
	newPost.save((err, post) => {
		if (err) return console.error(err);
		console.log(post);
	});
};

module.export.getPostByTitle = function(title, cb) {
	this.findOne({ 'title': title }, function (err, post) {
	  if (err) return console.error(err);
	  return cb(post);
	});
};

module.export.addNewComment = function(new_comment, cb) {
	this.findOne({ 'title' : new_comment.post }, function (err, post) {
		if (err) return console.error(err);

		post.comments.push({name: new_comment.name, body: new_comment.body});
		
		post.save((err, post) => {
			if (err) return console.error(err);
			cb(post);
		});
	});
};