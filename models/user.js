var mongoose = require('mongoose');

class User {
	constructor(){
		var Schema = mongoose.Schema;
		var userSchema = new Schema( {
	
			unique_id: Number,
			email: String,
			username: String,
			password: String,
			passwordConf: String,
			Age: Number
		});
		this.User = mongoose.model('User', userSchema);
		
	}
}




module.exports = new User();