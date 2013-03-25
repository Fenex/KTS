chrome.tabs.onUpdated.addListener(
function(tabId, changeInfo, tab) {
	if(changeInfo.status=="complete") {
    	insertScriptsOnTab(tabId, tab.url);
	}
});

function insertScriptsOnTab(tabId, url) {
	
	if (/klavogonki\.ru\/gamelist/.test(url)) {
		//chrome.tabs.executeScript(tabId, {file: 'userjs/chat.js'});
		if(KlavoTools.userjs.chat2BBCode)
			chrome.tabs.executeScript(tabId, {file: 'userjs/chat2BBcode.user.js'});
		//if(KlavoTools.userjs.restoreChat)
		//	chrome.tabs.executeScript(tabId, {file: 'userjs/fixedChat.user.js'});
		if(KlavoTools.userjs.hideUserList)
			chrome.tabs.executeScript(tabId, {file: 'userjs/hideUserList.user.js'});
		if(KlavoTools.userjs.hideAllGamesInGamelist)
			chrome.tabs.executeScript(tabId, {file: 'userjs/hideGamesInGamelist.user.js'});
	}
	else if(/klavogonki\.ru\/g\//.test(url)) {
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
		
	}
	else if(/klavogonki\.ru\/profile/.test(url)) {
		chrome.tabs.executeScript(tabId, {file: 'userjs/count_FriendsVocs.user.js'});
		chrome.tabs.executeScript(tabId, {file: 'userjs/BB-Tools.user.js'});
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
		if(KlavoTools.userjs.QuickVocsStart)
			chrome.tabs.executeScript(tabId, {file: 'userjs/QuickVocsStart.user.js'});
	}

	if(/klavogonki\.ru/.test(url)) {
		if(KlavoTools.userjs.KlavoEvents)
			chrome.tabs.executeScript(tabId, {file: 'userjs/KlavoEvents.user.js'});
		if(KlavoTools.userjs.CustomHide)
			chrome.tabs.executeScript(tabId, {file: 'userjs/tagHide.user.js'});
		//checkUserId();
	}
//	if(/klavogonki\.ru\/profile\/82885/.test(url)) {
//		chrome.tabs.executeScript(tabId, {code: ''});
//	}
}
