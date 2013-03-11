var Mail = {};
Mail.count = 0;
var userid = false;
var islogined = false;
var KTS_mail_listener = false;

/*function showMail(c, msg) {
	
	//chrome.browserAction.setPopup({popup: 'popup.html'});
}*/

function replaceHrefs(t) {
	while(t.indexOf('<a href="')>0) {
		t_1 = t.indexOf('<a href="');
		t_2 = t.indexOf('"', t_1+10);
		var href = t.substring(t_1+9, t_2);
		if(!(/^http:\/\//.test(href))) {
			href = 'http://klavogonki.ru' + href;
		}
		t = t.substring(0, t_1) + '<A style="cursor:pointer;text-decoration:underline;" class="mail_link" path="'+href + t.substring(t_2);
	}
	
	return t.replace(/\<span\>Удалить\<\/span\>/g, '');
}

function createPopupCode(c, msg) {
	if(c==0) {
		Mail.popup = '';
		return;
	}
	
	var spliter = '<dl class=message>';
	var arr_msg = [];
	var msgpopup = '';
	arr_msg = msg.split(spliter);
	for(var i=0;i<c;i++) {
		arr_msg[i+1] = replaceHrefs(arr_msg[i+1]);
		msgpopup += spliter + arr_msg[i+1];
	}
	
	Mail.popup = msgpopup;
	ktslog('Mail.popup created');
}

function setExIcon(c) {
	ktslog('function setExIcon: ' + c);
	var status = 'dic';
	if(c=='null') {
		c = '';
		status = 'digits'
	}
	else if(c=='0') {
		c = '';
		status = 'normal';
	}
	
	chrome.browserAction.setIcon({path: 'img/icon/'+status+'.png'});
	chrome.browserAction.setBadgeText({text: c});
}

function checkMail(id) {
	ktslog('function checkMail: '+id);
	new Ajax.Request('http://klavogonki.ru/profile/'+id+'/mail/in/?KTS_REQUEST', {
		method: 'get',
		parameters: {},
		onSuccess: function(transport)
		{
			count_msg = transport.responseText.substring(transport.responseText.indexOf('<li class=active>Почта <sub>')+28, transport.responseText.indexOf('<', transport.responseText.indexOf('<li class=active>Почта <sub>')+28));

			if(KlavoTools.notifications.msg&&parseInt(Mail.count)<parseInt(count_msg)) {
				var str = 'непрочитанное сообщение';
				if(parseInt(count_msg)>1) {
					str = 'непрочитанных сообщений';
				}
				alertKTS('http://img.klavogonki.ru/avatars/' + userid + '_big.gif', 'Новое личное сообщение', 'У вас <b>' + count_msg + '</b> ' + str + '.', 'http://klavogonki.ru/profile/' + userid + '/mail/in/', '3');
			}
			Mail.count = count_msg;
			setExIcon(count_msg);
			createPopupCode(count_msg, transport.responseText.substring(transport.responseText.indexOf('<div class=mail>')+16, transport.responseText.indexOf('<span class=ctrls>', transport.responseText.indexOf('<div class=mail>')+16)));
		}});
}

function checkUserId() {
	clearTimeout(KTS_mail_listener);
	new Ajax.Request('http://klavogonki.ru/about/?KTS_REQUEST', {
		method: 'get',
		parameters: {},
		onSuccess: function(transport)
		{
			userid = parseInt(transport.responseText.substring(transport.responseText.indexOf('var __user__ = ')+15, transport.responseText.indexOf(';', transport.responseText.indexOf('var __user__ = ')+15)));
			if(userid!=userid) {
				islogined = false;
				setExIcon('null');
				Mail.popup = '';
				Mail.count = 0;
				closeNotifMsg();
				return;
			}
			if(w_php)
				w_php_f();
			islogined = true;
			if(transport.responseText.indexOf('<i></i>Почта!') > 0)
				checkMail(userid);
			else {
				setExIcon('0');
				Mail.count = 0;
				closeNotifMsg();
				Mail.popup = '';
			}
		}});
	KTS_mail_listener = setTimeout(checkUserId, KTS_timeout);
}

checkUserId();