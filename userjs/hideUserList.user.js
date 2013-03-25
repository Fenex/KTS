// ==UserScript==
// @name	    	klavogonki: hideUserList
// @version	    	1.2.1 KTS
// @namespace		klavogonki
// @author	    	Fenex
// @description		You can hide UserList
// @include	    	http://klavogonki.ru/g/*
// @include  		http://klavogonki.ru/gamelist*
// @icon        	http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==

function changeUserList(button) {
	if (button.title == "Скрыть ЮзерЛист")
	{
		button.title = "Показать ЮзерЛист";
		$(button.getAttribute('HideUserList_Room')).getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[document.getElementById("chat-general").getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td').length-1].style.display = "none";
	}
	else
	{
		button.title = "Скрыть ЮзерЛист";
		$(button.getAttribute('HideUserList_Room')).getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[document.getElementById("chat-general").getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td').length-1].style.display = "";
	}
}

if(!document.getElementById('KTS_hideUserList')) {
	var func = document.createElement('script');
	func.innerHTML = changeUserList;
	document.body.appendChild(func);

	var array = [];
	var room = null;
	array.push('chat-general');
	
	if(room = location.href.match(/^http:\/\/klavogonki\.ru\/g\/?\?gmid=([\d]{5})/))
		array.push('chat-game'+room[1]);

	for(i=0;i<array.length;i++) {
		if(!document.getElementById(array[i])) {
			continue;
		}
		var td = document.createElement("td");
		td.innerHTML = '<div id="fenex_UserListButton" HideUserList_Room="'+array[i]+'" onclick="changeUserList(this);" title="Скрыть ЮзерЛист" style="width:20px;height:20px;cursor:pointer;"><img alt="ЮзерЛист" src="/img/smilies/ph34r.gif"/></div>';
		var e = document.getElementById(array[i]).getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[1];
		e.parentNode.insertBefore(td, e);		
	}
	
	var tmp_elem = document.createElement('div');
	tmp_elem.id = 'KTS_hideUserList';
	tmp_elem.style.display = 'none';
	document.body.appendChild(tmp_elem);	
}