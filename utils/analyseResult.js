/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-01-23 13:21:27
* @Last Modified by:   noor
* @Last Modified time: 2017-01-23 18:32:45
*/

var msg 	= 	require('../config/messages')
	;

var analyseResult = {};

analyseResult.ofUdateContact = function(result,res){
	var check = result.result;
	if(check.nModified == 0 && check.n == 1){
		res.send(msg.updateDuplicate);
	}else if(check.nModified == 0 && check.n == 0){
		res.send(msg.updateFail);
	}else {
		res.send(msg.updateSuccess);
	}
};

analyseResult.ofDeleteContact = function(result,res){
	if(result.result.n == 0){
		res.send(msg.deleteFail);
	}else {
		res.send(msg.deleteSuccess);
	}
};

analyseResult.ofCreateContact = function(result,res){
	var check = result.result;
	if(check.ok==1 && check.nModified ==0 && check.upserted == null){
		res.send(msg.createExist);
	}else if(check.ok==1 && check.nModified ==0 && check.upserted != null){
		res.send(msg.createSuccess);
	}
};

module.exports = analyseResult;