/*
* @Author: MD NOORUL NABI ANSARI
* @Date:   2017-01-20 17:24:13
* @Last Modified by:   noor
* @Last Modified time: 2017-01-20 17:31:03
*/

var event = require('events');

exports.ownEvents = function(cbArg){
	this.arg = cbArg;
	event.EventEmitter.call(this);

	this.handleConn = function(){
		this.emit("handleConn");
	}
}

ownEvents.prototype.__proto__ = event.EventEmitter.prototype;


var events = require('events');

function Door(colour) {
  this.colour = colour;
  events.EventEmitter.call(this);

  this.open = function()
  {
  this.emit('open');
  }
}

Door.prototype.__proto__ = events.EventEmitter.prototype;

var frontDoor = new Door('brown');

frontDoor.on('open', function() {
    console.log('ring ring ring');
  });
frontDoor.open();