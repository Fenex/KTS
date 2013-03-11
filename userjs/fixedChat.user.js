// ==UserScript==
// @name           klavogonki: restoreChat
// @version        3.5 KTS
// @namespace      klavogonki
// @author         Fenex
// @description    Restore chat
// @include        http://klavogonki.ru/gamelist*
// @include        http://klavogonki.ru/g/*
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
if(!document.getElementById('KTS_restoreChat')) {
	var a1 = document.createElement("td");
	a1.className = "dummy";
	a1.style.width = "200px";
	a1.align = "right";
	a1.innerHTML = '<a style="cursor:pointer; background: none repeat scroll 0 0 transparent;" onClick="chat.manualDisconnect = false;chat.connect();">Подключиться</a> | <a style="cursor:pointer; background: none repeat scroll 0 0 transparent;" onClick="chat.manualDisconnect = true;chat.connection.disconnect();">Отключиться</a>';
	if (document.getElementById("chat-title").getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[8])
		var a2 = document.getElementById("chat-title").getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[6];
	else
		var a2 = document.getElementById("chat-title").getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[3];

	a2.parentNode.insertBefore(a1, a2);

	var tmp_elem = document.createElement('div');
	tmp_elem.id = 'KTS_restoreChat';
	tmp_elem.style.display = 'none';
	document.body.appendChild(tmp_elem);	
}