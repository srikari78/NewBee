var express = require('express');
var router = express.Router();
var userInstance = require('../models/user');
var commentInstance = require('../models/comment');
var User = userInstance.User;
var Comment = commentInstance.Comment;

router.get('/', function (req, res, next) {
	return res.render('login.ejs');
});


router.post('/', function(req, res, next) {
	console.log(req.body);
	var personInfo = req.body;


	if(!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf || !personInfo.Age){
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			User.findOne({email:personInfo.email},function(err,data){
				if(!data){
					var c;
					User.findOne({},function(err,data){

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}

						var newPerson = new User({
							unique_id:c,
							email:personInfo.email,
							username: personInfo.username,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf,
							Age: personInfo.Age
						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"You are registered,You can login now."});
				}else{
					res.send({"Success":"Email is already used."});
				}

			});
		}else{
			res.send({"Success":"password is not matched"});
		}
	}
});

router.get('/login', function (req, res, next) {
	return res.render('login.ejs');
});

router.get('/registration', function (req, res, next) {
	return res.render('Registration.ejs');
});

router.post('/login', function (req, res, next) {
	//console.log(req.body);
	User.findOne({email:req.body.email},function(err,data){
		if(data){
			
			if(data.password==req.body.password){
				//console.log("Done Login");
				req.session.userId = data.unique_id;
				//console.log(req.session.userId);
				res.send({"Success":"Success!"});
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not registered!"});
		}
	});
});

router.get('/profile', function (req, res, next) {
	console.log("profile");
	User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/');
		}else{
			//console.log("found");
			return res.render('data.ejs', {"name":data.username,"email":data.email,"Age":data.Age});
		}
	});
});

router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.redirect('/');
    	}
    });
}
});

router.get('/forgetpass', function (req, res, next) {
	res.render("forget.ejs");
});

router.post('/forgetpass', function (req, res, next) {
	//console.log('req.body');
	//console.log(req.body);
	User.findOne({email:req.body.email},function(err,data){
		//console.log(data);
		if(!data){
			res.send({"Success":"This Email Is not registered!"});
		}else{
			// res.send({"Success":"Success!"});
			if (req.body.password==req.body.passwordConf) {
			data.password=req.body.password;
			data.passwordConf=req.body.passwordConf;

			data.save(function(err, Person){
				if(err)
					console.log(err);
				else
					console.log('Success');
					res.send({"Success":"Password changed!"});
			});
		}else{
			res.send({"Success":"Password does not matched! Both Password should be same."});
		}
		}
	});
	
});

router.post('/add_comment', function (req, res, next) {
	console.log("add_comment");
	console.log(req.body);
	let commentOne = new Comment({
		message: req.body.message ,
		username: req.body.username,
		email: req.body.email,
		blog_id: parseInt(req.body.blog_id)
	  });
	  commentOne.save((err, C) => {
		if(err)
			console.log(err);
		else
			console.log('Success');
	});
});

router.post('/update_name', function (req, res, next) {
	console.log("update_name")
	console.log(req.body);
	
  	var myquery = { email: req.body.email};
  	var newvalues = { $set: {username: req.body.username } };
	  User.updateOne(myquery, newvalues, function(err, res) {
		if (err) {
			throw err;
		}
		else
		{
			console.log("1 document updated");
		}
	  });
});

router.post('/update_age', function (req, res, next) {
	console.log("update_age")
	console.log(req.body);
	
  	var myquery = { email: req.body.email};
  	var newvalues = { $set: {Age: parseInt(req.body.age) } };
	  User.updateOne(myquery, newvalues, function(err, res) {
		if (err) {
			throw err;
		}
		else
		{
			console.log("1 document updated");
		}
	  });
});

router.get('/display_comment', function (req, res, next) {
	console.log("display_comment");
	console.log(req.session);
	Comment.find({blog_id: 5},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			console.log("No blogs found");
			return res.send(JSON.stringify({}));
		}else{
			return res.send(JSON.stringify(data));
		}
	});
});


module.exports = router;