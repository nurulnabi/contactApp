/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-01-20 15:28:13
* @Last Modified by:   noor
* @Last Modified time: 2017-01-24 11:37:11
*/


var mobileformat = /^\+?([1])\)?([ ]{1})?([(])?([0-9]{3})?([)])?([ ]{1})?([0-9]{3})?([- ]{1})?([0-9]{4})$/;
if(!mobileformat.test("+1 (902) 449 5121")){
	console.log("failed");
}else{
	console.log("matched");
}