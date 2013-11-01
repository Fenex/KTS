function getValueByTag(str, tag) {
	var p1 = str.indexOf('['+tag+']');
	var p2 = str.indexOf('[/'+tag+']');
	if((p1<0)||(p2<0))
		return false;
	return (str.substring(p1+2+tag.length, p2));
}
	
/*function checkLiveTimer() {
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
}*/

function uploadCSV(params) {
	ktslog('uploadCSV');
	ktslog(params);
	new Ajax.Request('http://klavogonki.ru/profile/'+params.userid+'/'+params.mode+'.csv', {
		parameters: {
			KTS_REQUEST: '1',
			method: 'GET'
		},
		onSuccess: function(transport)
		{
			new Ajax.Request('http://net.lib54.ru/KTS/userStats.php', {
				parameters: {
					userid: params.userid,
					mode: params.mode,
					method: 'POST',
					data: transport.responseText
				},
				onSuccess: function(transport){ktslog(transport.responseText);}
			});
			
			ktslog('uploadCSV SUCCESS');
			//ktslog(transport.responseText);
		}
	});
	
	return "http://net.lib54.ru/KTS/userstats/" + params.userid + "_" + params.mode + ".png";
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
			//closeNotifMsg();
        } else if(!request.obj.newmail) {
			islogined = true;
			if(userid!=request.obj.id) {
				userid = request.obj.id;
				w_php_f();
			}
            setExIcon('0');
			Mail.count = 0;
			//closeNotifMsg();
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
		//checkLiveTimer();
		//checkCompetitions();
		sendResponse({answer: 'ok'});
    break;
	case "closeNotifComp":
		//notifiers.comp_notifier.cancel();
		//notifiers.comp_notifier = false;
		sendResponse({answer: 'ok'});
	break;
	case "closeNotifMsg":
		//closeNotifMsg();
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
					login: request.username
				},
				onSuccess: function(transport)
				{
					var json = JSON.parse(transport.responseText);
		    		sendResponse({answer: 'ok', id: json.id});
		    }});
    break;
	case "kts_user_stats_img":
		ktslog('ex_listener');
		var answer = uploadCSV(request);
		sendResponse({answer: answer});
	break;
	case "contextMenu":
		chrome.contextMenus.removeAll(function() {
			ktslog('deleted all menues; request.id: ' + request.id + '; if: ' + (request.id == 0).toString());
			
			if(request.params == 0 || !request.params)
				return;

			if(request.params.type=='profile') {
				chrome.contextMenus.create({"title": "Информация", "contexts":["link"],
											"onclick": function(){openTabFromContextMenu("/profile/"+request.params.id)}});
				chrome.contextMenus.create({"title": "Статиситка", "contexts":["link"],
											"onclick": function(){openTabFromContextMenu("/profile/"+request.params.id+"/stats")}});
				chrome.contextMenus.create({"title": "Гараж", "contexts":["link"],
											"onclick": function(){openTabFromContextMenu("/profile/"+request.params.id+"/car")}});
				chrome.contextMenus.create({"title": "Бортжурнал", "contexts":["link"],
											"onclick": function(){openTabFromContextMenu("/profile/"+request.params.id+"/blog")}});
				chrome.contextMenus.create({"title": "Комментарии", "contexts":["link"],
											"onclick": function(){openTabFromContextMenu("/profile/"+request.params.id+"/comments")}});
			} else if(request.params.type=='vocs') {
				chrome.contextMenus.create({"title": "Информация", "contexts":["link"],
											"onclick": function(){openTabFromContextMenu("/vocs/"+request.params.id)}});
				chrome.contextMenus.create({"title": "Играть", "contexts": ["link"], "id":"voc_game"});
				chrome.contextMenus.create({"title": "Рекорды", "contexts":["link"],
											"onclick": function(){openTabFromContextMenu("/vocs/"+request.params.id+"/top")}});
				chrome.contextMenus.create({"title": "История", "contexts":["link"],
											"onclick": function(){openTabFromContextMenu("/vocs/"+request.params.id+"/history")}});
				chrome.contextMenus.create({"title": "Комментарии", "contexts":["link"],
											"onclick": function(){openTabFromContextMenu("/vocs/"+request.params.id+"/comments")}});
											
				//games fast-links
				var links = [
					{
						"title": "одиночный, 5 сек",
						"href": "/create?gametype=voc&type=practice&level_from=1&level_to=9&timeout=5&submit=1&voc="
					},
					{
						"title": "открытый, 10 сек",
						"href": "/create/?gametype=voc&type=normal&level_from=1&level_to=9&timeout=10&submit=1&voc="
					},
					{
						"title": "открытый, 20 сек",
						"href": "/create/?gametype=voc&type=normal&level_from=1&level_to=9&timeout=20&submit=1&voc="
					},
					{
						"title": "дружеский, 10 сек",
						"href": "/create/?gametype=voc&type=private&level_from=1&level_to=9&timeout=10&submit=1&voc="
					},
					{
						"title": "квалификация, 10 сек",
						"href": "/create/?gametype=voc&type=normal&level_from=1&level_to=9&timeout=10&submit=1&qual=on&voc="
					}
				];
				
				for(i=0; i<links.length; i++)
					chrome.contextMenus.create({"title": links[i].title, "parentId": "voc_game", "contexts":["link"], "id": "VOCCONTEXTMENU_"+links[i].href+request.params.id});
			}
			sendResponse({answer: "ok"});
		});
	break;
    default:
        sendResponse({answer: 'error'});
    break;
    }
});

function openTabFromContextMenu(url) {
	ktslog("OPEN TAB:" + url);
	chrome.tabs.getSelected(null, function(tab) {chrome.tabs.update(tab.id, {url:"http://klavogonki.ru"+url})});
}

chrome.contextMenus.onClicked.addListener(function(info, tab) {
	if(!info.menuItemId && !info.menuItemId.match) {
		return;
	}
	var id = info.menuItemId.match(/VOCCONTEXTMENU_([a-zA-z\/\?\:\.\=\&\d]+)/);
	if(!id)
		return;
	openTabFromContextMenu(id[1]);
})

function t(v){if(-~v==(+(!+[]+!+[]+!+[]+[!+[]+!+[]+[+[]+[!+[]+!+[]+!+[]+!+[]+[+[]+[+!+[]]]]]]))){return true;}return false;}