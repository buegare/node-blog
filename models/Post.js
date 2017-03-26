const mongoose = require('mongoose');
const config = require('../config/mongodb');

mongoose.connect(`mongodb://${config.db.server}/${config.db.collection}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

// User Schema

let PostSchema = mongoose.Schema({
	title: { type: String, index: true, require: true },
	category: { type: String, require: true },
	body: { type: String, require: true },
	comments: [{ body: String, date: Date, name: String}],
  	date: { type: Date, default: Date.now },
});

const Post = module.export = db.model('Post', PostSchema);
module.exports = Post;

module.export.getLastPost = function(cb) {
	this.find(function (err, posts) {
	  if (err) return console.error(err);
	  console.log(posts);
	});
};