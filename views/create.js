/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-01-23 14:18:49
* @Last Modified by:   noor
* @Last Modified time: 2017-01-23 14:20:26
*/

router.post('/create',function createRoute(req,res){
	console.log("client requested create");
	var params = req.body;
	if(!validate.all(name,email,phone)){
		res.send(msg.invalidData);
	}else{
		dbQuery.createContact(data,data,
		function(err,result){
			var check = result.result;
			if(err){
					res.send(msg.createFail);
			}else{
				analyseResult.ofCreateContact(result,res);
			}
		});
	}
});