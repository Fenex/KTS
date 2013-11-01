function Notification() {
	
	function checkEngine() {
		if(!chrome)
			return false;
		if(chrome.notifications)
			return 'Blink';
		if(webkitNotifications)
			return 'WebKit';
		return false;
	}
	
	this.engine = checkEngine();
	
	this.alert = function(params) {
		if(!this.engine || !params)
			return;
		if(this.engine == 'Blink')
			alertBlink(params);
		if(this.engine == 'WebKit')
			alertWebKit(params);
	}
	
	function alertBlink(params) {
		chrome.notifications.create(
			params.id, 
			{
				type: "basic",
				title: params.title,
				message: params.msg,
				iconUrl: params.iconUrl
			},
			function(notifId){}
		);
	}
	
	function alertWebKit(params) {
		alert('webkit');
	} 
	
}

var notif = new Notification();
notif.alert({id: 'test', title: 'title', msg: 'message', iconUrl: 'http://img.klavogonki.ru/avatars/82885_big.gif' /*chrome.extension.getURL('./img/icon/fnx128.png')*/});