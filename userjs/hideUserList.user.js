// ==UserScript==
// @name	    klavogonki: hideUserList
// @version	    1.1.1 KTS
// @namespace	klavogonki
// @author	    Fenex
// @description	You can hide UserList
// @include	    http://klavogonki.ru/g/*
// @include  	http://klavogonki.ru/gamelist*
// @icon        http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
function changeUserList_ingame() {
	var fnx_gmid_chat = "chat-game" + location.href.substring(location.href.indexOf("=")+1, location.href.indexOf("=")+6);
	if ($("fenex_UserListButton_ingame").title == "Скрыть ЮзерЛист")
	{
		$("fenex_UserListButton_ingame").title = "Показать ЮзерЛист";
		$(fnx_gmid_chat).getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[document.getElementById(fnx_gmid_chat).getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td').length-1].style.display = "none";
	}
	else
	{
		$("fenex_UserListButton_ingame").title = "Скрыть ЮзерЛист";
		$(fnx_gmid_chat).getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[document.getElementById(fnx_gmid_chat).getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td').length-1].style.display = "";
	}
}
function changeUserList() {
	if ($("fenex_UserListButton").title == "Скрыть ЮзерЛист")
	{
		$("fenex_UserListButton").title = "Показать ЮзерЛист";
		$("chat-general").getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[document.getElementById("chat-general").getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td').length-1].style.display = "none";
	}
	else
	{
		$("fenex_UserListButton").title = "Скрыть ЮзерЛист";
		$("chat-general").getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[document.getElementById("chat-general").getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td').length-1].style.display = "";
	}
}
if(!document.getElementById('KTS_hideUserList')) {

	var func = document.createElement('script');
	func.innerHTML = changeUserList+changeUserList_ingame;
	document.body.appendChild(func);

	var hideUserListButton = document.createElement("td");
	hideUserListButton.innerHTML = '<div id="fenex_UserListButton" onclick="changeUserList();" title="Скрыть ЮзерЛист" style="width:20px;height:20px;cursor:pointer;"><img alt="ЮзерЛист" src="/img/smilies/ph34r.gif"/></div>';
	var searchTagforhideUserListButton = document.getElementById("chat-general").getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[1];
	searchTagforhideUserListButton.parentNode.insertBefore(hideUserListButton, searchTagforhideUserListButton);

	if (document.getElementById("chat-title").getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[7]) {
		var fnx_gmid_chat = "chat-game" + location.href.substring(location.href.indexOf("=")+1, location.href.indexOf("=")+6);
		var hideUserListButton_ingame = document.createElement("td");
		hideUserListButton_ingame.innerHTML = '<div id="fenex_UserListButton_ingame" onclick="changeUserList_ingame();" title="Скрыть ЮзерЛист" style="width:20px;height:20px;cursor:pointer;"><img alt="ЮзерЛист" src="/img/smilies/ph34r.gif"/></div>';
		var searchTagforhideUserListButton_ingame = document.getElementById(fnx_gmid_chat).getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[1];
		searchTagforhideUserListButton_ingame.parentNode.insertBefore(hideUserListButton_ingame, searchTagforhideUserListButton_ingame);
	}
	
	var tmp_elem = document.createElement('div');
	tmp_elem.id = 'KTS_hideUserList';
	tmp_elem.style.display = 'none';
	document.body.appendChild(tmp_elem);	
}