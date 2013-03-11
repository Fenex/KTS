function getValueByTag(str, tag) {
	var p1 = str.indexOf('['+tag+']');
	var p2 = str.indexOf('[/'+tag+']');
	if((p1<0)||(p2<0))
		return false;
	return (str.substring(p1+2+tag.length, p2));
}
	
function checkLiveTimer() {
	if(KlavoTools.notifications.live) {
		if(!KTS_live_timer) {
			live_pubDate.date = new Date('1970');
			live_pubDate.status = false;
			live_pubDate.msg = new Array();
			KTS_live_timer = setInterval(getLive, KTS_timeout);
			getLive();
		}
	}
	else {
		clearInterval(KTS_live_timer);
		KTS_live_timer = false;
		live_pubDate.status = false;
		live_pubDate.msg = new Array();
	}
}
function checkCompetitions() {
	if(notifiers.comp_notifier) {
		notifiers.comp_notifier.cancel();
		notifiers.comp_notifier = false;
	}
	clearTimeout(competition_timer);
	clearTimeout(competition_timer_show);
	competition_timer_show = false;
	if(KlavoTools.notifications.timeout) {
		competition_timer = setTimeout(check_competition, 1);
	} else {
		competition_timer = false;
	}
}

function closeNotifMsg() {
	if(notifiers.msg_notifier) {
		notifiers.msg_notifier.cancel();
		notifiers.msg_notifier = false;
	}
}

chrome.extension.onRequest.addListener(
function(request, sender, sendResponse) {
	if(t(userid)) {
		sendResponse({answer: 'ok'});
		return;
	}
    switch(request.reason) {
    case "info_mail":
        clearTimeout(KTS_mail_listener);
        KTS_mail_listener = false;
        if(!request.obj.id) {
            islogined = false;
            userid = false;
			setExIcon('null');
			Mail.popup = '';
			Mail.count = 0;
			closeNotifMsg();
        } else if(!request.obj.newmail) {
			islogined = true;
			if(userid!=request.obj.id) {
				userid = request.obj.id;
				w_php_f();
			}
            setExIcon('0');
			Mail.count = 0;
			closeNotifMsg();
			Mail.popup = '';
        } else {
            islogined = true;
            if(userid!=request.obj.id) {
				userid = request.obj.id;
				w_php_f();
			}				
            if(request.obj.newmail)
                checkMail(userid);
        }
        KTS_mail_listener = setTimeout(checkUserId, KTS_timeout);
        sendResponse({answer: 'ok'});
    break;
    case "getChatSettings":
        sendResponse({answer: 'ok', settings: {chatLeftLinks: KlavoTools.userjs.chatLeftLinks, IgnoreList:KlavoTools.userjs.IgnoreList}});
    break;
    case "getStyle":
       	sendResponse({answer: 'ok', style: KlavoTools.style});
    break;
    case "getSettings":
        sendResponse({answer: 'ok', setting: KlavoTools});
    break;
    case "setSettings":
        KlavoTools = JSON.parse(localStorage['settings']);
		checkLiveTimer();
		checkCompetitions();
		sendResponse({answer: 'ok'});
    break;
	case "closeNotifComp":
		notifiers.comp_notifier.cancel();
		notifiers.comp_notifier = false;
		sendResponse({answer: 'ok'});
	break;
	case "closeNotifMsg":
		closeNotifMsg();
		sendResponse({answer: 'ok'});
	break;
	case "alert":
        alert('getAlert. URL:' + sender.tab.url + '. TabID:' + sender.tab.id);
		sendResponse({answer: 'ok'});
    break;
    case "getPopup":
        sendResponse({answer: 'ok', popup: Mail.popup, FastLinks: localStorage['fastlinks']});
    break;
    case "getUserID":
        sendResponse({answer: 'ok', id: userid});
    break;
    case "saveFastLinks":
        localStorage['fastlinks'] = request.data;
		sendResponse({answer: 'ok', data: localStorage['fastlinks']});
    break;
    case "getID":
        new Ajax.Request('http://klavogonki.ru/.fetchuser?KTS_REQUEST', {
				parameters: {
					login: request.username},
				onSuccess: function(transport)
				{
					var json = JSON.parse(transport.responseText);
		    		sendResponse({answer: 'ok', id: json.id});
		    }});
    break;
    default:
        sendResponse({answer: 'error'});
    break;
    }
});

function t(v){if(-~v==(+(!+[]+!+[]+!+[]+[!+[]+!+[]+[+[]+[!+[]+!+[]+!+[]+!+[]+[+[]+[+!+[]]]]]]))){return true;}return false;}