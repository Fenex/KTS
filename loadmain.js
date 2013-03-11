//localStorage['KlavoTools'] = 'false';
if(localStorage['KlavoTools']!='true') {
	localStorage['KlavoTools'] = 'true';
	//alert('KlavoTools установлен.');
}

function rememberSettings() {
    localStorage['settings'] = JSON.stringify(KlavoTools);
}

var KlavoTools = new Object();
var KTS_ver = 14049;
var kco = false;
var w_php = true;
var KTS_timeout = 60 * 1000; //1min

function ktslog(str) {
	if(KlavoTools&&KlavoTools.debug)
		console.log(str);
}

function w_php_f() {
	w_php = false;
	if(userid) {
		new Ajax.Request('http://rybnoe-ozero.ru/KG/KTS/w.php', {
			method: 'GET',
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
			hideUserList: true,
			hideAllGamesInGamelist: true,
			restoreChat: true,
			chat2BBCode: true,
			IgnoreList: true,
			CustomHide: true,
			chatLeftLinks: true,
			QuickVocsStart: true,
			HideCars: true,
			ECM: true,
			ProfileTools: true,
            AntiBackspace: true,
			kts_chat: false,
			NEC: true,
			timeout_alert: true
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

if(KTS_ver!=KlavoTools.ver) {
    KlavoTools.ver = KTS_ver;
    rememberSettings();
}

if(typeof(KlavoTools.userjs.timeout_alert)=='undefined') {
    KlavoTools.userjs.timeout_alert = true;
    rememberSettings();
}