var notifiers = {};
notifiers.notifications = [];
notifiers.comp_notifier = false;
notifiers.msg_notifier = false;

function alertKTShide() {
	notifiers.notifications.shift().cancel();
}

function alertKTS(ico, lbl, text, url, mode) {
	ktslog("alertKTS, mode=0; lbl(title): "+lbl+"; url(link): "+url);
	localStorage['notification_title'] = lbl;
	localStorage['notification_text'] = text;
	localStorage['notification_img'] = ico;
	localStorage['notification_mode'] = mode;
	if(!url)
		localStorage['notification_url'] = 'false';
	else
		localStorage['notification_url'] = url;
		
	if(mode=='1') {
		notifiers.comp_notifier = webkitNotifications.createHTMLNotification("notification.html");
		notifiers.comp_notifier.show();
	}
	else if(mode=='3') {
		if(notifiers.msg_notifier)
			notifiers.msg_notifier.cancel();
		notifiers.msg_notifier = webkitNotifications.createHTMLNotification("notification.html");
		notifiers.msg_notifier.show();
	}
	else {
		var notification = webkitNotifications.createHTMLNotification("notification.html");
		notification.show();
		notifiers.notifications.push(notification);
		setTimeout(alertKTShide, 40000);
	}
}