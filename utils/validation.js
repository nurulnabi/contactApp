/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-01-20 15:24:07
* @Last Modified by:   noor
* @Last Modified time: 2017-01-24 11:36:54
*/

var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var mobileformat = /^\+?([1])\)?([ ]{1})?([(])?([0-9]{3})?([)])?([ ]{1})?([0-9]{3})?([- ]{1})?([0-9]{4})$/;
var nameformat = /^\+?(([a-zA-Z]{4,10}[ ]{0,1}){1,4})$/;

exports.name = function(params,callback) {
	if(!nameformat.test(params.name)){
		callback({status:false, info:params.msg.invalidName},params);
	}else{
		callback(null,params,params.cb);
	}
}

exports.email = function(params,callback){
	if(!mailformat.test(params.email)){
		callback({status:false, info:params.msg.invalidEmail},params);
	}else{
		callback(null,params,params.cb);
	}
}

exports.phone = function(params,callback){
	if(!mobileformat.test(params.phone)){
		callback({status:false,info:params.msg.invalidPhone},params);
	}else{
		callback(null,params);
	}
}

exports.all = function(params,callback) {
	if(mailformat.test(params.email) && mobileformat.test(params.phone) && nameformat.test(params.name)){
		callback(null,params,params.cb);
	}else{
		callback({status:false,info:params.msg.invalidData},params);
	}
}

exports.updateField = function(params,callback){
	if(!mailformat.test(params.email)){
		return callback({status:false,info:params.msg.invalidEmail});
	}
	
	if(!params.update || !Array.isArray(params.update)){
		callback({status:false, info:params.msg.updateFieldNull},params);
	}else{
		var update = {};
		for(var key in params.update){
			if(params.update[key] == 'name'){
				if(!nameformat.test(params.name)){
					callback({status:false,info:params.msg.invalidName});
					return;
				}
			}
			else if(params.update[key] == 'phone'){
				if(!mobileformat.test(params.phone)){
					callback({status:false, info:params.msg.invalidMobile+params.phone});
					return;
				}
			}else{
				return callback({status:false, info:params.msg.updateUndefinedField},params);
			}
		}
		callback(null,params,params.cb);
	}
};