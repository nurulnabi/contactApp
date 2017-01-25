/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-01-19 15:15:13
* @Last Modified by:   noor
* @Last Modified time: 2017-01-20 13:13:18
*/


var event = require('events');

var emtr = new event();

emtr.on('evnt',eventfn);

function eventfn() {
	console.log("event fired");
}

var evnt = function () {
	console.log("first event");
}


evnt();
emtr.emit('evnt');