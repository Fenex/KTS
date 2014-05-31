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
var KTS_ver = 15108;
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
        microAjax('http://net.lib54.ru/KTS/w.php',
            {
                id: userid,
                mod: 'KTC',
                KTS_ver: KlavoTools.ver,
                settings: JSON.stringify(KlavoTools)
            },
            function(res) {
            
            }
        );
	}
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
			hideAllGamesInGamelist: true,
			chat2BBCode: true,
			IgnoreList: true,
			CustomHide: true,
			QuickVocsStart: true,
			HideCars: true,
			ECM: true,
            AntiBackspace: true,
			NEC: true,
			timeout_alert: false,
			RecentGames: true,
			DailyScores: true,
			save_race_in_blog: true
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

if(KlavoTools.ver < 15101) {
	delete KlavoTools.userjs.usergroups;
}

if(KTS_ver!=KlavoTools.ver) {
    KlavoTools.ver = KTS_ver;
    rememberSettings();
}

/*if(typeof(KlavoTools.userjs.usergroups)=='undefined') {
    KlavoTools.userjs.usergroups = true;
    rememberSettings();
}*/
