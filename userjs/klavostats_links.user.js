﻿// ==UserScript==
// @name          Klavogonki: klavostats links
// @namespace     klavogonki
// @version       2.0 KTS
// @description   Добавляет прямые ссылки на профиль игрока в КлавоСтатистике
// @include       http://klavogonki.ru/u/*
// @author        Lexin
// @updateURL     
// @downloadURL   
// ==/UserScript==

function main(){
	function fn() {
		var menu = jQuery('.sidebar.ng-scope');
		if (menu.length) {
			var player = jQuery('.profile-header .name.ng-binding').clone().children().remove().end().text();
			player = jQuery.trim(player);
			var group = jQuery('<ul class="profile-nav ng-scope"></ul>');
			group.append(jQuery('<li><a href="http://stat.klavogonki.ru/players.php?extra&n=' + player + '">КлавоСтатистика</a></li>'));
			group.append(jQuery('<li><a href="http://stat.klavogonki.ru/history.php#' + player + '">История игрока</a></li>'));
			menu.append(group);
		} else {
			setTimeout(fn, 500);
		}
	}
	setTimeout(fn, 500);
}

function execScript(source) {
	if (typeof source == 'function') {
		source = '(' + source + ')();';
	}
	
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.innerHTML = source;
	document.body.appendChild(script);
}

if(!document.getElementById('KTS_klavostats_links')) {
	execScript(main);

	var tmp_elem = document.createElement('div');
	tmp_elem.id = 'KTS_klavostats_links';
	tmp_elem.style.display = 'none';
	document.body.appendChild(tmp_elem);	
}
