/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-01-23 11:50:05
* @Last Modified by:   noor
* @Last Modified time: 2017-01-23 18:29:45
*/

var MongoClient	 = 	require('mongodb').MongoClient, 
	dbQuery 	 = 	{},
	dbRefrence 	 =  require('./connectTo')
	;

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

module.exports = dbQuery;
