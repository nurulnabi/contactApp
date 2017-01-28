
var 	express 		= 	require('express'),
		app 			= 	express(),
		router 			=	express.Router(),
		msg 			= 	require('../config/messages.json'),
		validate 		=	require('../utils/validation'),
		dbQuery 		= 	require('../dbConnection/dbQuery'),
		analyseResult	= 	require('../utils/analyseResult'),
		async 			= 	require('async')
		;		


router.use(express.static('./public')); 		//default 

// router.get('/',function(req,res){
// 	res.end("use post method to use contact method");
// });


// router.post('/',function defaultRoute(req,res){
// 	console.log("client requested");
// 	res.end(msg.welcome);
// });

router.post('/createUser',function(req,res){
	console.log("client requested for user creation");
	var params = req.body;
		params.res = res;
		params.msg = msg;
		if(!req.body.password){ 	res.send("Password Can't be Empty"); return;	}
		params.filter = {
			name:req.body.name,
			email:req.body.email,
			phone:req.body.phone,
		};
		params.data = {
			name:req.body.name,
			email:req.body.email,
			phone:req.body.phone,
			passwd:req.body.password
		};
		params.cb = function(err,result,nextCb){
			var check = result.result;
			if(err){
					nextCb({status:false, info:msg.createFail},result);
			}else{
				analyseResult.ofCreateUser(result,res);
				nextCb(null,result);
			}
		};

		async.waterfall([
			async.apply(validate.all,params),
			dbQuery.createUser,
			],
			function(err,result){
				if(err){
					res.send(err);
				}
			});
});


router.post('/login',function login(req,res){
	console.log("client requested login");
	var params = {};
		params.res = res;
		params.msg = msg;
		params.credentials = {
			'email':req.body.email,
			'passwd':req.body.password
		};
		dbQuery.login(params);
});

router.post('/getAllData',function getAllData(req,res){
	console.log("client requested for all data");
	var params = {};
		params.res = res;
		params.msg = msg;
		params.filter = {'userID':req.body.userID};
		dbQuery.getAllData(params);
});

router.post('/create',function createRoute(req,res){
	console.log("client requested create");
	var params 			= req.body;
		params.res 		= res;
		params.filter 	= { name:params.name,	email:params.email,		phone:params.phone };
		params.msg 		= msg;
		params.data 	= { name:params.name,	email:params.email,		phone:params.phone, userID:params.userID};
		params.cb 		= function(err,result,nextCb){
			var check = result.result;
			if(err){
					nextCb({status:false, info:msg.createFail},result);
			}else{
				analyseResult.ofCreateContact(result,res);
				nextCb(null,result);
			}
		}
		;
	async.waterfall([
		async.apply(validate.all,params),
		dbQuery.createContact,
		],
		function(err,result){
			if(err){
				res.send(err);
			}
		});
});


router.post('/search',function searchRoute(req,res){
	console.log("client requested search");
	var params 			= req.body;
		params.res 		= res;
		params.filter 	= { email:params.email };
		params.msg 		= msg;
		params.cb 		= function(err,doc,nextCb){
			if(!doc){
				nextCb({status:false, info:msg.searchFail});
			}else{
				var result = "Name: "+doc.name+"<br>email: "+doc.email+"<br>mobile: "+doc.phone;
				res.send({status:true,info:result});
				nextCb(null,doc);
			}
		};

		async.waterfall([
			async.apply(validate.email,params),
			dbQuery.searchContact
			],
			function(err,result){
				if(err){
					res.send(err);
				}
			});
});


router.post('/update',function updateRoute(req,res){
	console.log("client requested update");
	var params 			= req.body;
			params.res 		= res;
			params.filter 	= { email:params.email };
			params.msg 		= msg;
			params.data 	= { name:params.name,	email:params.email,		phone:params.phone };
			params.cb 		= function(err,result,nextCb){
				if(err){
					nextCb({status:false, info:msg.updateFail},result);
				}else{
					analyseResult.ofUdateContact(result,res);
					nextCb(null,result);
				}
			};

	async.waterfall([
		async.apply(validate.updateField,params),
		dbQuery.updateContact
		],
		function(err,result){
			if(err){
				res.send(err);
			}
		});

});


router.post('/delete',function deleteRoute(req,res){
	console.log("client requested delete");
	var params 			= req.body;
		params.res 		= res;
		params.filter 	= { email:params.email };
		params.msg 		= msg;
		params.cb 		= function(err,result,nextCb){
			if(err){
					nextCb({status:false, info:params.msg.deleteFail})
			}else {
				analyseResult.ofDeleteContact(result,res);
				nextCb(null,result);
			}
		};

	async.waterfall([
		async.apply(validate.email,params),
		dbQuery.deleteContact
		],
		function(err,result){
			if(err){
				res.send(err);
			}
		});
});

module.exports = router;