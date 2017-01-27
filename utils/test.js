/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-01-20 15:28:13
* @Last Modified by:   noor
* @Last Modified time: 2017-01-27 18:22:15
*/


var mobileformat = /^\+?([0-9]{10})$/;
if(!mobileformat.test("902449512dsf")){
	console.log("failed");
}else{
	console.log("matched");
}