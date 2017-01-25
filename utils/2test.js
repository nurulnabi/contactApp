/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-01-20 16:14:35
* @Last Modified by:   noor
* @Last Modified time: 2017-01-20 16:22:20
*/

exports.makeConnection = function(mongoClient){
	mongoClient.connect("mongodb://localhost:27017/contacts",function(err,db){
		if(err){
			console.log("Something wrong happened: ",err);
		}else{
			console.log("connecton successful: ",db);
		}
		db.close();
	});
	
}