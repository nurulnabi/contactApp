/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-01-23 15:57:58
* @Last Modified by:   noor
* @Last Modified time: 2017-01-23 16:12:10
*/

var async = require('async');

var firstFn = function(callback){
	name = "firstFn";
	console.log("This is firstFn");
	callback(null,name);
};

var secondFn = function(name,callback){
	console.log("This is secondFn called after ",name);
	name += " secondFn";
	callback({success:false},name);
};

var thirdFn = function(name,callback){
	console.log("This is thirdFn called after ",name);
	name += " thirdFn";
	callback(null,name);
};


async.waterfall([firstFn,secondFn,thirdFn],function(err,result){
	console.log("-------------",result);
})