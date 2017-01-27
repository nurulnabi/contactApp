/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-01-23 11:50:05
* @Last Modified by:   noor
* @Last Modified time: 2017-01-27 18:31:36
*/

var MongoClient	 = 	require('mongodb').MongoClient, 
	dbQuery 	 = 	{},
	dbRefrence 	 =  require('./connectTo')
	;


dbQuery.createUser = function(params,cb,nextCb){
	dbRefrence.db.collection('user').updateOne(params.filter,{$set:params.data},
	{
		upsert:true
	},
	function(err,result){
		cb(err,result,nextCb);
	});
};

dbQuery.login = function(params){
	dbRefrence.db.collection('user').findOne(params.credentials,function(err,result){
		if(!result){
			params.res.send({status:false});
		}else{
			params.res.send(result);
		}
	});
}

dbQuery.searchContact = function(params,cb,nextCb){
	dbRefrence.db.collection('contacts').findOne(params.filter,function(err,doc){
		cb(err,doc,nextCb);
	});
};

dbQuery.createContact = function(params,cb,nextCb){
	dbRefrence.db.collection('contacts').updateOne(params.filter,{ $set:params.data },
		{
			upsert:true
		}
		,function(err,result){
			cb(err,result,nextCb);
		});
};

dbQuery.updateContact = function(params,cb,nextCb){
	dbRefrence.db.collection('contacts').updateOne(params.filter,{$set:params.data},function(err,result){
			cb(err,result,nextCb);
		});
};

dbQuery.deleteContact = function(params,cb,nextCb){
	dbRefrence.db.collection('contacts').deleteOne(params.filter,function(err,result){
		cb(err,result,nextCb);
	});
};

dbQuery.getAllData = function(params){
	dbRefrence.db.collection('contacts').find({},params.filter,function(err,result){
		if(err){
			params.res.send(params.msg.getAllDataFailed);
		}else{
			result.toArray(function(err,docs){
				params.res.send(docs);
			});			
		}
	});
}

module.exports = dbQuery;
