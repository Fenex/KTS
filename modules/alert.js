/*
* Модуль уведомлений
* Поддержка движков: Blink, WebKit
*/

function Notification() {
	ktslog('notification constructor');
	
	var notifiers = {
		competition: {
			timeout: null, //show
			timer: null, //hide
			gmid: null,
			webkit: null
		}
	}
	
	function checkEngine() {
		if(!chrome)
			return false;
		
		if(webkitNotifications&&webkitNotifications.createHTMLNotification)
			return 'WebKit';
		
		if(chrome.notifications) {
			chrome.notifications.onClicked.addListener(function(id) {
				notif.clickedNotif(id);
			});
			return 'Blink';
		}
		
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
		ktslog('alert with engine "Blink"');
		
		var id = params.id ? params.id : '_id';
		
		switch(params.kts) {
			case "competition":
				ktslog("alertBlink: competition");
				id = "competition";
				
				notifiers.competition.gmid = params.gmid;
				if(notifiers.competition.timeout)
					clearTimeout(notifiers.competition.timeout);
				if(notifiers.competition.timer)
					clearTimeout(notifiers.competition.timer);
				
				notifiers.competition.timer = setTimeout(function() {
					notifiers.competition.timer = null;
					chrome.notifications.clear(id, function() {
						ktslog('notification hide with id: '+id)
					});
				}, params.timeout_hide);
				
				break;
			default:
				break;
		}
		
		notifiers.competition.timeout = setTimeout(function() {
			notifiers.competition.timeout = null;
			chrome.notifications.create(
					id, 
					{
						type: "basic",
						title: params.title,
						message: params.message,
						iconUrl: params.iconUrl
					},
					function(notifId) {ktslog('created notif with id: '+notifId )}
			);
		}, params.timeout_show);
	}
	
	function alertWebKit(params) {
		ktslog('alert with engine "WebKit"');
		
		var id = params.id ? params.id : '_id';
		
		switch(params.kts) {
			case 'competition':
				var _params = params;
				
				//отложенное отображение
				notifiers.competition.timeout = setTimeout(function() {
					localStorage['notification_title'] = _params.title;
					localStorage['notification_text'] = _params.message;
					localStorage['notification_img'] = _params.iconUrl;
					localStorage['notification_mode'] = '1';
					localStorage['notification_url'] = 'http://klavogonki.ru/g/?gmid='+_params.gmid;
					
					notifiers.competition.gmid = _params.gmid;
					notifiers.competition.webkit = webkitNotifications.createHTMLNotification("notification.html");
					notifiers.competition.webkit.show();
					
					notifiers.competition.timeout = null;
				}, _params.timeout_show);
				
				//отложенное скрытие
				notifiers.competition.timer = setTimeout(function() {
					notifiers.competition.webkit.cancel();
					ktslog('notification hide with id:');
					notifiers.competition.timer = null;
				}, _params.timeout_hide);
			break;
			default:
			break;
		}
	}
	
	this.clickedNotif = function(id) {
		if(id=='competition') {
			
			if(this.engine == 'Blink') {
				chrome.notifications.clear(id, function() {
					ktslog('notification hide with id: '+id)
				});
			} else if (this.engine == 'WebKit') {
				notifiers.competition.webkit.cancel();
			}
			
			chrome.tabs.create({
				"pinned": false,
				"selected": true,
				"url": "http://klavogonki.ru/g/?gmid="+notifiers.competition.gmid
			}, function(tab){});

			clearTimeout(notifiers.competition.timer);
			notifiers.competition.timer = null;
		}
	}
	
}

var notif = new Notification();