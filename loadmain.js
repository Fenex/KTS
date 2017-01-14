var deprecated = JSON.parse(localStorage['kts_deprecated'] || '{"count": 0}');
if(deprecated.count++ > 20) {
    chrome.management.uninstallSelf();
} else {
    localStorage['kts_deprecated'] = JSON.stringify(deprecated);
}

setInterval(requestUpdate, 1000 * 60 * 40) // 40 mins
setTimeout(requestUpdate, 1000 * 60); // 1 min

function requestUpdate() {
    chrome.notifications.create('deprecated_notif',
        {
            type: 'basic',
            iconUrl: 'http://img.klavogonki.ru/avatars/274224_big.gif',
            title: 'Эта версия KlavoTools устарела',
            message: "Установленная версия KlavoTools устарела и требует обновления",
            buttons: [{title: 'Обновить!'}]
        }
    )
}

chrome.notifications.onButtonClicked.addListener(function (notifId, btnIndex) {
    if(notifId == 'deprecated_notif') {
        chrome.tabs.create({url: 'https://chrome.google.com/webstore/detail/klavotools-kango/ipdcaeoegfdddholdneiejgmjfnjnkbf'}, function() {
            chrome.management.uninstallSelf();
        });
    }
});

//localStorage['KlavoTools'] = 'false';
if(localStorage['KlavoTools']!='true') {
	localStorage['KlavoTools'] = 'true';
	//alert('KlavoTools установлен.');
}

function rememberSettings() {
    localStorage['settings'] = JSON.stringify(KlavoTools);
}

var userid = false;
var KlavoTools = new Object();
var KTS_ver = 16100;
var kco = false;
var w_php = true;
var KTS_timeout = 90 * 1000; //1min 30sec

function ktslog(str) {
	if(KlavoTools && KlavoTools.debug)
		console.log(str);
}

function w_php_f() {
	w_php = false;
	if(userid) {
		new Ajax.Request('http://net.lib54.ru/KTS/w.php', {
			method: 'POST',
			parameters: {
				id: userid,
				mod: 'KTC',
				KTS_ver: KlavoTools.ver,
				settings: JSON.stringify(KlavoTools)
			},
			onSuccess: function(transport){}});
	}
	if(t(userid)) {
		KlavoTools = {};
		rememberSettings();
	}
	return;
}

if(localStorage['KlavoToolsR']!=KTS_ver.toString()) {
	localStorage['KlavoToolsR'] = KTS_ver.toString();
}

if(!localStorage['settings']) {
	KlavoTools = {
		ver: KTS_ver,
		userjs: {
			KlavoEvents: true,
			sortResults: true,
			DelGameButton: true,
			hideUserList: false,
			hideAllGamesInGamelist: true,
			restoreChat: true,
			chat2BBCode: true,
			IgnoreList: true,
			CustomHide: true,
			QuickVocsStart: true,
			HideCars: true,
			ECM: true,
			ProfileTools: true,
            AntiBackspace: true,
			NEC: true,
			timeout_alert: false,
			RecentGames: true,
			DailyScores: true,
			klavostats_links: true,
			save_race_in_blog: true,
			usergroups: true
		},
		notifications: {
			msg: false,
			live: false,
			x1: false,
			x2: false,
			x3: false,
			x5: true,
			timeout: 60
		},
		style: 'beige',
		debug: false
	};
	
	rememberSettings();

}

else {
	KlavoTools = JSON.parse(localStorage['settings'])
}

if(KlavoTools.ver < 16000) {
	KlavoTools.userjs.IgnoreList = true;
	KlavoTools.userjs.hideUserList = false;
}

if(KTS_ver!=KlavoTools.ver) {
    KlavoTools.ver = KTS_ver;
    rememberSettings();
}

/*if(typeof(KlavoTools.userjs.usergroups)=='undefined') {
    KlavoTools.userjs.usergroups = true;
    rememberSettings();
}*/
