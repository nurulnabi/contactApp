/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-01-19 14:54:39
* @Last Modified by:   noor
* @Last Modified time: 2017-01-23 10:45:43
*/

var express        =         require("express"),
	bodyParser     =         require("body-parser"),
	app            =         express(),

	MongoClient	   = 		 require('mongodb').MongoClient,
    assert 		   = 		 require('assert'),
    cJSON  		   =		 require('circular-json');			//converting circular object to json
    // arr 		   =		 require('../learning/arr');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());							//change bodyParser fn call to desired format

//******************************start a connection to mongodb and wait for connection******************//
var mongoPool;			//this is the global variable which will be used for pooling connections
var collection;			//this will hold the particular collection from the pool
var URL = "mongodb://localhost:27017/contacts";
MongoClient.connect(URL,function(err,db){		//this will open a connection for forever or as long as server runs
	assert.equal(null,err);		//verify connection successful status

	mongoPool = db;				//this line will assign an opned connection waiting for request and enables us for pooling
	collection = db.collection('contacts');
	app.listen(3000,function(){
		console.log("server listening on port 3000");
	});
});


//*********************find a contact******************************//
app.post('/search',function(req,res){
	console.log("client requested search");
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	var email = req.body.email;
	if(!mailformat.test(email)){
		res.end("Invalid email: "+email);	
	}else {
		collection.findOne({'email':email},{_id:0},function(err,doc){
			if(!doc){
					res.send("No Matching Record Found: "+err);
			}else{
				var result = "Name: "+doc.name+"<br>email: "+doc.email+"<br>mobile: "+doc.phone;
				res.end(result);
			}
		});
	}
});

app.post('/create',function(req,res){
	console.log("client requested create");
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	var mobileformat = /^\+?([1])\)?([ ]{1})?([(])?([0-9]{3})?([)])?([ ]{1})?([0-9]{3})[-. ]?([0-9]{4})$/;
	var nameformat = /^\+?(([a-zA-Z]{4,10}[ ]{0,1}){1,4})$/;
	if(!mailformat.test(req.body.email)||!mobileformat.test(req.body.phone)||!nameformat.test(req.body.name)){
		res.send("You have sent data in wrong format <br>Kindly pass(name,email,phone) in valid format");
	}else{
		collection.updateOne({
			"name":req.body.name,
			"email":req.body.email,
			"phone":req.body.phone
		},{
			$set:{
			"name":req.body.name,
			"email":req.body.email,
			"phone":req.body.phone
		}
		},
		{
			upsert:true
		}
		,function(err,result){
			if(err){
					res.send("Create failed: "+err);
			}else if(result.result.ok==1 && result.result.nModified ==0 && result.result.upserted == null){
				res.send("contact already exists");
			}else if(result.result.ok==1 && result.result.nModified ==0 && result.result.upserted != null){
				res.send("contact saved: ");
			}
		});
	}
});

app.post('/update',function(req,res){
	console.log("client requested update");
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	var mobileformat = /^\+?([1])\)?([ ]{1})?([(])?([0-9]{3})?([)])?([ ]{1})?([0-9]{3})[-. ]?([0-9]{4})$/;
	var nameformat = /^\+?(([a-zA-Z]{4,10}[ ]{0,1}){1,4})$/;
	if(!mailformat.test(req.body.email)||!mobileformat.test(req.body.phone)||!nameformat.test(req.body.name)){
		res.send("You have sent data in wrong format <br>Kindly pass(name,email,phone) in valid format");
	}else{
		var mail = req.body.email;
		var field = req.body.update;
		if(!field){
			res.send("you need to pass an array(update) indicating which fields to update");
			return;
		}
		var update = {};
		field.forEach(function(elem){
			update[elem] = req.body[elem];
		});
		collection.updateOne({email:mail},
 			{$set:update},
			function(err,result){
				if(err){
					res.send("Update failed: "+err);
				}else if(result.result.nModified == 0 && result.result.n == 1){
					res.send("You trying to update with the same values"+result);
				}else if(result.result.nModified == 0 && result.result.n == 0){
					res.send("No record found to update"+result);
				}else {
					res.send("Contact Updated Successfully: ");
				}
			});
	}
});

app.post('/delete',function(req,res){
	console.log("client requested delete");
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(!mailformat.test(req.body.email)){
		res.send("You have sent wrong email: "+req.body.email);
	}else {
		collection.deleteOne({email:req.body.email},function(err,result){
			if(err){
					res.send("Delete failed: "+err);
			}else if(result.result.n == 0){
				res.send("No record found to Delete");
			}else {
				res.send("Contact Deleted Successfully: ");
			}
		});
	}
});



app.post('/',function(req,res){
	console.log("client requested");
	res.end("<b>Welcome to Contacts App</b><br>Try these links <br> 192.168.2.7:3000/search <br> 192.168.2.7:3000/update <br>192.168.2.7:3000/create<br>192.168.2.7:3000/delete");
});

