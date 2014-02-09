chrome.tabs.onUpdated.addListener(
function(tabId, changeInfo, tab) {
    if(changeInfo.status=="complete") {
        insertScriptsOnTab(tabId, tab.url);
    }
});

function insertScriptsOnTab(tabId, url) {
    
    if (/klavogonki\.ru\/gamelist/.test(url)) {
        if(KlavoTools.userjs.RecentGames)
            chrome.tabs.executeScript(tabId, {file: 'userjs/RecentGames.user.js'});
        if(KlavoTools.userjs.chat2BBCode)
            chrome.tabs.executeScript(tabId, {file: 'userjs/chat2BBcode.user.js'});
        if(KlavoTools.userjs.hideAllGamesInGamelist)
            chrome.tabs.executeScript(tabId, {file: 'userjs/hideGamesInGamelist.user.js'});
        if(KlavoTools.userjs.IgnoreList)
            chrome.tabs.executeScript(tabId, {file: 'userjs/ignorelist.user.js'});
    }
    else if(/klavogonki\.ru\/g\/?\?/.test(url)) {
        if(KlavoTools.userjs.sortResults)
            chrome.tabs.executeScript(tabId, {file: 'userjs/sortresults.user.js'});
        if(KlavoTools.userjs.chat2BBCode)
            chrome.tabs.executeScript(tabId, {file: 'userjs/chat2BBcode.user.js'});
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
        //if(KlavoTools.userjs.timeout_alert)
            //chrome.tabs.executeScript(tabId, {file: 'userjs/timeout_alert.user.js'});
        if(KlavoTools.userjs.RecentGames)
            chrome.tabs.executeScript(tabId, {file: 'userjs/RecentGames.user.js'});
        if(KlavoTools.userjs.save_race_in_blog)
            chrome.tabs.executeScript(tabId, {file: 'userjs/save_race_in_blog.user.js'});
        if(KlavoTools.userjs.IgnoreList)
            chrome.tabs.executeScript(tabId, {file: 'userjs/ignorelist.user.js'});
        
    }
    else if(/klavogonki\.ru\/u\//.test(url)) {
        chrome.tabs.executeScript(tabId, {file: 'userjs/klavostats_links.user.js'});
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
    
}
