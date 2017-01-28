/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-01-23 13:21:27
* @Last Modified by:   nurulnabi
* @Last Modified time: 2017-01-28 18:13:19
*/

var msg 	= 	require('../config/messages')
	;

var analyseResult = {};


analyseResult.ofCreateUser = function(result,res){
	var check = result.result;
	var check = result.result;
	if(check.ok==1 && check.nModified ==0 && check.upserted == null){
		res.send({status:false, info:msg.createExist});
	}else if(check.ok==1 && check.nModified ==0 && check.upserted != null){
		res.send({status:true,info:"User created successfully "});
	}
}
analyseResult.ofUdateContact = function(result,res){
	var check = result.result;
	if(check.nModified == 0 && check.n == 1){
		res.send({status:false,  info:msg.updateDuplicate});
	}else if(check.nModified == 0 && check.n == 0){
		res.send({status:false, info:msg.updateFail});
	}else {
		res.send({status:true, info:msg.updateSuccess});
	}
};

analyseResult.ofDeleteContact = function(result,res){
	if(result.result.n == 0){
		res.send({status:false,  info:msg.deleteFail});
	}else {
		res.send({status:true, info:msg.deleteSuccess});
	}
};

analyseResult.ofCreateContact = function(result,res){
	var check = result.result;
	if(check.ok==1 && check.nModified ==0 && check.upserted == null){
		res.send({status:false, info:msg.createExist});
	}else if(check.ok==1 && check.nModified ==0 && check.upserted != null){
		res.send({status:true, info:msg.createSuccess});
	}
};

module.exports = analyseResult;