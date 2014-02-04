var _userid_ = false;
var mode = 0;
var timer = false;
function setUserId(id) {
	_userid_ = id;
}
function MY_addEventListeners(selector) {
	var arr = document.querySelectorAll(selector);
	for(var i=0; i<arr.length; i++)
		arr[i].addEventListener('click', checkMode);
}
function insertPopup() {
	chrome.extension.sendRequest({reason: "getPopup"},
		function(response) {
			document.getElementById('mail').innerHTML = response.popup;
			MY_addEventListeners('#mail a.mail_link');
			initFastLinks(response.FastLinks);
		}
	);
	chrome.extension.sendRequest({reason: "getUserID"}, function(response) {setUserId(response.id);});
}
function checkMode() {
	new Event(event);
	//window.w1 = event;
	var url = event.target.getAttribute('path');
	if(event.button==1) {
		mode = 2;
		openLink(url);
		return;
	}
	if(timer) {
		mode++;
	} else {
		timer = setTimeout( function() { openLink(url); }, 300);
	}
}
function openLink(url) {
	clearTimeout(timer);
	timer = false;
	if(/^__FALSE__$/.test(url)) {
		return false;
	}
	if(/^__USER_LINKS__$/.test(url)) {
		document.getElementById('setTD').style.display = '';
		return false;
	}
	if(/__USERID__/.test(url)) {
		if(!_userid_)
			return false;
		else
			url = url.replace(/__USERID__/, _userid_);
	}
	if(/__EXTENSION__/.test(url)) {
		url = url.replace(/__EXTENSION__/, chrome.extension.getURL(''));
	}
	else if(!(/^http.{0,1}:\/\//.test(url)))
		url = 'http://klavogonki.ru' + url;
	if(!mode) {
		chrome.tabs.getSelected(null, function(tab) {chrome.tabs.update(tab.id, {url:url}, window.close());});
	}
	else
		chrome.tabs.create({"pinned": false, "selected": (mode==1) ? true : false, "url": url}, function(tab){});
	mode = 0;
}
function getValueByTag(str, tag) {
	var p1 = str.indexOf('['+tag+']');
	var p2 = str.indexOf('[/'+tag+']');
	if((p1<0)||(p2<0))
		return false;
	return (str.substring(p1+2+tag.length, p2));
}
function initFastLinks(data) {
	if(!data)
		return false;
	document.getElementById('settings').value = data;
	var arr = data.split('[link]');
	var code = '';
	for(i=1; i<arr.length; i++) {
		var title = getValueByTag(arr[i], 'title');
		var URL = getValueByTag(arr[i], 'url');
		code += '<li><a class="fastlinks" path="'+URL+'">'+title+'</a></li>';
	}
	document.getElementById('user_fast_links').innerHTML = '<li><a style="font-style:italic;" class="fastlinks" path="__USER_LINKS__">Изменить</a></li>' + code;
	MY_addEventListeners('#cssmenu a.fastlinks');
}
function save() {
	chrome.extension.sendRequest({reason: "saveFastLinks", data: document.getElementById('settings').value.replace()}, function(response) {document.getElementById('setTD').style.display = 'none';initFastLinks(response.data);});
}
function addLink() {
	var line = '';
	if(document.getElementById('settings').value.trim().length>0){line = '\n'}
	document.getElementById('settings').value += line + '[link][title]' + document.getElementById('title').value.trim() + '[/title][url]' + document.getElementById('url').value.trim() + '[/url]';
}
function getID() {
	var username = document.getElementById('username').value.trim();
	document.getElementById('userline').setAttribute('style', 'background: transparent url("http://klavogonki.ru/img/small_loading.gif") no-repeat 2 4;');
	chrome.extension.sendRequest({reason: "getID", username: username},
		function(response) {
			var t = '';
			if(!response.id)
				t = 'не найден';
			else
				t = 'ID: <span style="cursor:text;">'+ response.id.toString()+'</span> | <a class="getID_links" title="Профиль"><img path="/u/#/'+response.id.toString()+'" src="'+chrome.extension.getURL('/img/icon/profile.png')+'" /></a> <a class="getID_links" title="Статистика"><img path="/u/#/'+response.id.toString()+'/stats/" src="'+chrome.extension.getURL('/img/icon/sprint.png')+'" /></a> <a class="getID_links" title="Комментарии"><img path="/u/#/'+response.id.toString()+'/comments/" src="'+chrome.extension.getURL('/img/icon/usefuladdons.png')+'" /></a>';
			document.getElementById('id_out').innerHTML = t;
			document.getElementById('userline').setAttribute('style', 'background: transparent url("http://klavogonki.ru/img/ok.gif") no-repeat 2 4;');
			MY_addEventListeners('a.getID_links');
	});
}
document.addEventListener('DOMContentLoaded', function () {
	insertPopup();
	MY_addEventListeners('#cssmenu a');
	document.querySelector('#btn_search').addEventListener('click', getID);
	document.querySelector('#btn_save').addEventListener('click', save);
	document.querySelector('#btn_addLink').addEventListener('click', addLink);
});