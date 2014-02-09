function getValueByTag(str, tag) {
	var p1 = str.indexOf('['+tag+']');
	var p2 = str.indexOf('[/'+tag+']');
	if((p1<0)||(p2<0))
		return false;
	return (str.substring(p1+2+tag.length, p2));
}

function checkCompetitions() {
	clearTimeout(competition_timer);
	if(KlavoTools.notifications.timeout) {
		competition_timer = setTimeout(check_competition, 1);
	} else {
		competition_timer = false;
	}
}

chrome.extension.onRequest.addListener(
function(request, sender, sendResponse) {
    switch(request.reason) {
    case "info_mail":
        infoMailComplete(request.obj);
        sendResponse({answer: 'ok'});
    break;
    case "getStyle":
       	sendResponse({answer: 'ok', style: KlavoTools.style});
    break;
    case "getSettings":
        sendResponse({answer: 'ok', setting: KlavoTools});
    break;
    case "setSettings":
        KlavoTools = JSON.parse(localStorage['settings']);
		checkCompetitions();
		//checkLiveTimer();
		sendResponse({answer: 'ok'});
    break;
	case "closeNotifComp":
		notif.clickedNotif('competition');
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
        sendResponse({answer: 'ok', popup: ''/*Mail.popup*/, FastLinks: localStorage['fastlinks']});
    break;
    case "getUserID":
        sendResponse({answer: 'ok', id: KTS.user_id});
    break;
    case "saveFastLinks":
        localStorage['fastlinks'] = request.data;
		sendResponse({answer: 'ok', data: localStorage['fastlinks']});
    break;
    case "getID":
        microAjax('http://klavogonki.ru/.fetchuser',
            {
                login: request.username
            },
            function (res) {
                var json = JSON.parse(res);
		    	sendResponse({answer: 'ok', id: json.id});
            }
        );
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
                if(KTS && KTS.user_id) {
                    chrome.contextMenus.create({"title": "Открыть диалог", "contexts":["link"],
											"onclick": function(){openTabFromContextMenu("/u/#/"+KTS.user_id+"/messages/"+request.params.id+"/")}});
                }
				chrome.contextMenus.create({"title": "Сводка", "contexts":["link"],
											"onclick": function(){openTabFromContextMenu("/u/#/"+request.params.id+"/")}});
				chrome.contextMenus.create({"title": "Статиситка", "contexts":["link"],
											"onclick": function(){openTabFromContextMenu("/u/#/"+request.params.id+"/stats/")}});
				chrome.contextMenus.create({"title": "Бортжурнал", "contexts":["link"],
											"onclick": function(){openTabFromContextMenu("/u/#/"+request.params.id+"/journal/")}});
				chrome.contextMenus.create({"title": "Достижения", "contexts":["link"],
											"onclick": function(){openTabFromContextMenu("/u/#/"+request.params.id+"/achievements/")}});
				chrome.contextMenus.create({"title": "Гараж", "contexts":["link"],
											"onclick": function(){openTabFromContextMenu("/u/#/"+request.params.id+"/car/")}});
                chrome.contextMenus.create({"title": "Друзья", "contexts":["link"],
											"onclick": function(){openTabFromContextMenu("/u/#/"+request.params.id+"/friends/")}});
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
});