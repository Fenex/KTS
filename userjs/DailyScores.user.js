// ==UserScript==
// @name          Klavogonki: daily scores
// @namespace     klavogonki
// @version       1.3
// @description   displays the gained daily scores on the user panel
// @include       http://klavogonki.ru/*
// @author        Lexin
// @updateURL     https://userscripts.org/scripts/source/141981.meta.js
// @downloadURL   https://userscripts.org/scripts/source/141981.user.js
// ==/UserScript==

function main(){
    
    function shiftTime(date){
        date.setUTCHours(date.getUTCHours() - 1);
        date.setUTCMinutes(date.getUTCMinutes() - 30);
        return date;
    }
    
    var scores = $('userpanel-scores-container');
    if (!scores)
        return;
    
    var daily_scores = 0;
    var race_scores = 0;
    var nodeCaption = document.createElement('td');
    var nodeDailyScores = document.createElement('td');
    var nodeDailyScoresValue = document.createElement('span');
    
    if (localStorage['daily_scores'] && localStorage['last_race_date']) {
        var lastRaceDate = new Date();
        lastRaceDate.setTime(localStorage['last_race_date']);
        lastRaceDate = shiftTime(lastRaceDate);
        
        var now = new Date();
        now = shiftTime(now);
        
        if (lastRaceDate.getUTCFullYear() == now.getUTCFullYear() && lastRaceDate.getUTCMonth() == now.getUTCMonth() && lastRaceDate.getUTCDate() == now.getUTCDate()) {
            daily_scores = parseInt(localStorage['daily_scores'], 10);
        }
    }
    
    nodeCaption.innerHTML = '<span id="daily-scores-caption" style="padding-left:5px;">За день:</span>';
    nodeDailyScoresValue.id = 'daily-scores';
    nodeDailyScoresValue.style.color = '#B7FFB3';
    nodeDailyScoresValue.style.fontWeight = 'bold';
    nodeDailyScoresValue.style.fontSize = '14px';
    nodeDailyScoresValue.innerHTML = daily_scores;
    
    nodeDailyScores.appendChild(nodeDailyScoresValue);
    scores.parentNode.appendChild(nodeCaption);
    scores.parentNode.appendChild(nodeDailyScores);
    
    function handler() {
        if (info.user) {
            if (info.record && info.record.scores_gained) {
                race_scores = Math.round(info.record.scores_gained);
            }
            daily_scores += race_scores;
            nodeDailyScoresValue.innerHTML = daily_scores;
            if (race_scores != 0) {
                nodeDailyScores.innerHTML += '<span id="race-scores" style="color:#B7FFB3; padding-left:5px; font-size:9px; font-weight:bold; position:relative; top:-1px;">(' + race_scores + ')</span>';
            }
            localStorage['daily_scores'] = daily_scores;
            var d = new Date();
            localStorage['last_race_date'] = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
        }
    };
    
    var MutationObserver = window.MutationObserver ||
                           window.WebKitMutationObserver ||
                           window.MozMutationObserver;
    var observer = new MutationObserver(
        function(mutations) {
            observer.disconnect();
            handler();
    });
    
    observer.observe(scores, {
        characterData: true,
        subtree: true,
        childList: true
    });  
}
function contentEval(source) {
    if (typeof source == 'function') {
        source = '(' + source + ')();';
    }
    
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = source;
    document.body.appendChild(script);
}
contentEval(main);
