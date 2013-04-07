chrome.tabs.onUpdated.addListener(
function(tabId, changeInfo, tab) {
	if(changeInfo.status=="complete") {
    	insertScriptsOnTab(tabId, tab.url);
	}
});

function insertScriptsOnTab(tabId, url) {
	
	if (/klavogonki\.ru\/gamelist/.test(url)) {
		//chrome.tabs.executeScript(tabId, {file: 'userjs/chat.js'});
		if(KlavoTools.userjs.RecentGames)
			chrome.tabs.executeScript(tabId, {file: 'userjs/RecentGames.user.js'});
		if(KlavoTools.userjs.chat2BBCode)
			chrome.tabs.executeScript(tabId, {file: 'userjs/chat2BBcode.user.js'});
		//if(KlavoTools.userjs.restoreChat)
		//	chrome.tabs.executeScript(tabId, {file: 'userjs/fixedChat.user.js'});
		if(KlavoTools.userjs.hideUserList)
			chrome.tabs.executeScript(tabId, {file: 'userjs/hideUserList.user.js'});
		if(KlavoTools.userjs.hideAllGamesInGamelist)
			chrome.tabs.executeScript(tabId, {file: 'userjs/hideGamesInGamelist.user.js'});
	}
	else if(/klavogonki\.ru\/g\/?\?/.test(url)) {
		if(KlavoTools.userjs.sortResults)
			chrome.tabs.executeScript(tabId, {file: 'userjs/sortresults.user.js'});
		//chrome.tabs.executeScript(tabId, {file: 'userjs/chat.js'});
		if(KlavoTools.userjs.chat2BBCode)
			chrome.tabs.executeScript(tabId, {file: 'userjs/chat2BBcode.user.js'});
		//if(KlavoTools.userjs.restoreChat)
		//	chrome.tabs.executeScript(tabId, {file: 'userjs/fixedChat.user.js'});
		if(KlavoTools.userjs.hideUserList)
			chrome.tabs.executeScript(tabId, {file: 'userjs/hideUserList.user.js'});
		if(KlavoTools.userjs.DelGameButton)
			chrome.tabs.executeScript(tabId, {file: 'userjs/DelGameButton.user.js'});
		if(KlavoTools.userjs.HideCars)
			chrome.tabs.executeScript(tabId, {file: 'userjs/hide_cars.user.js'});
		if(KlavoTools.userjs.ECM)
			chrome.tabs.executeScript(tabId, {file: 'userjs/control_error_mode.user.js'});
        if(KlavoTools.userjs.AntiBackspace)
			chrome.tabs.executeScript(tabId, {file: 'userjs/AntiBackspace.js'});
		if(KlavoTools.userjs.NEC)
			chrome.tabs.executeScript(tabId, {file: 'userjs/nec.user.js'});
		if(KlavoTools.userjs.timeout_alert)
			chrome.tabs.executeScript(tabId, {file: 'userjs/timeout_alert.user.js'});
		if(KlavoTools.userjs.RecentGames)
			chrome.tabs.executeScript(tabId, {file: 'userjs/RecentGames.user.js'});
		
	}
	else if(/klavogonki\.ru\/profile/.test(url)) {
		chrome.tabs.executeScript(tabId, {file: 'userjs/count_FriendsVocs.user.js'});
		chrome.tabs.executeScript(tabId, {file: 'userjs/BB-Tools.user.js'});
		chrome.tabs.executeScript(tabId, {file: 'userjs/CalcMaxResult_Qual.user.js'});
		if(KlavoTools.userjs.ProfileTools)
			chrome.tabs.executeScript(tabId, {file: 'userjs/ProfileTools.user.js'});
	}
	else if(/klavogonki\.ru\/forum\/.+/.test(url)) {
		chrome.tabs.executeScript(tabId, {file: 'userjs/ModerTools.user.js'});
		chrome.tabs.executeScript(tabId, {file: 'userjs/BigTextArea.user.js'});
		chrome.tabs.executeScript(tabId, {file: 'userjs/BB-Tools.user.js'});
		chrome.tabs.executeScript(tabId, {file: 'userjs/PostOptionsPlus.user.js'});		
	}
	else if(/klavogonki\.ru\/vocs/.test(url)) {
		chrome.tabs.executeScript(tabId, {file: 'userjs/BB-Tools.user.js'});
		chrome.tabs.executeScript(tabId, {file: 'userjs/avgSize_BookPart.user.js'});
		if(KlavoTools.userjs.QuickVocsStart)
			chrome.tabs.executeScript(tabId, {file: 'userjs/QuickVocsStart.user.js'});
	}
	else if(/klavogonki\.ru($|\/$|\/?\?)/.test(url)) { //injecting into the main page only
		if(KlavoTools.userjs.RecentGames)
			chrome.tabs.executeScript(tabId, {file: 'userjs/RecentGames.user.js'});
	}
	
	if(/klavogonki\.ru/.test(url)) {
		if(KlavoTools.userjs.KlavoEvents)
			chrome.tabs.executeScript(tabId, {file: 'userjs/KlavoEvents.user.js'});
		if(KlavoTools.userjs.DailyScores)
			chrome.tabs.executeScript(tabId, {file: 'userjs/DailyScores.user.js'});
		if(KlavoTools.userjs.CustomHide)
			chrome.tabs.executeScript(tabId, {file: 'userjs/tagHide.user.js'});
	}
	
	//линейка рекордов
	var _id = url.match(/klavogonki\.ru\/profile\/([\d]+)\/stats/); 
	ktslog(_id);
	if(_id && (_id[1]==userid || userid==82885 || userid==21)) {
		ktslog('_id == userid: ok');
		function KlavoTools_userStats() {
			var e = document.getElementById('export_help').parentNode.parentNode.parentNode.getElementsByTagName('dd')[0].getElementsByTagName('a');
			if(e.length != 2)
				return;
			var a = document.createElement('a');
			a.innerHTML = 'IMG';
			a.setAttribute('style', 'padding-left: 20px; margin-right: 10px; cursor: pointer;background: transparent url(http://net.lib54.ru/img/icon_stats.png) no-repeat 0% 0%; padding-left: 20px;margin-left:10px;text-decoration: underline;');
			a.id = 'kts_stats_button';
			a.setAttribute('title', 'Создание линейки рекордов');
			a.addEventListener('click', function(e) {
											var url = location.href.match(/klavogonki\.ru\/profile\/([\d]+)\/stats(?:.+gametype=([a-z\-\d]+))?/);
											if(url && url[1]) {
												e.toElement.setAttribute('kts-userid', url[1]);
												e.toElement.setAttribute('kts-mode', url[2] ? url[2] : 'normal');
												e.toElement.setAttribute('kts-clicked', 'clicked');
											}
										});
										
			e[0].parentNode.insertBefore(a, e[1].nextSimbling);
			
			setInterval(function() {
				var elem = document.getElementById('kts_stats_button');
				if(!elem || !elem.hasAttribute('kts-clicked'))
					return;
				elem.removeAttribute('kts-clicked');
				var mode = elem.getAttribute('kts-mode');
				var userid = elem.getAttribute('kts-userid');
				chrome.extension.sendRequest({reason: "kts_user_stats_img", mode: mode, userid: _id[1]}, function(response) {
					var popalert = document.getElementById('popalert');
					if(popalert) {
						document.getElementById('popalert-content').innerHTML = '<center><b>KlavoTools</b></center><br />Создание линейки рекордов скоро завершится и будет доступно по адресу:<br /><a href="'+response.answer+'">' + response.answer+"</a>";
						popalert.style.display = '';
					} else {
						alert("KlavoTools\r\n\r\nСоздание линейки рекордов скоро завершится и будет доступно по адресу:\r\n" + response.answer);
					}
				});
			}, 2000);
		}
		
		chrome.tabs.executeScript(tabId, {code: '('+KlavoTools_userStats+')()'});
		
	}
	
//	if(/klavogonki\.ru\/profile\/82885/.test(url)) {
//		chrome.tabs.executeScript(tabId, {code: ''});
//	}
}
