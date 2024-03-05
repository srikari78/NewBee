var mongoose = require('mongoose');

class Comment {
	constructor(){
		var Schema = mongoose.Schema;
		var CommentSchema = new Schema( {
			email: String,
			username: String,
            message: String,
            blog_id: Number
		});
		this.Comment = mongoose.model('Comment', CommentSchema);
		
	}
}




module.exports = new Comment();