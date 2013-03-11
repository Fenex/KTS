// ==UserScript==
// @name           ProfileTools
// @namespace      klavogonki
// @include        http://klavogonki.ru/profile/*/comments*
// @include        http://klavogonki.ru/profile/*/blog*
// @include        http://klavogonki.ru/profile/*/mail*
// @exclude        http://klavogonki.ru/profile/*/mail/compose*
// @exclude        http://klavogonki.ru/profile/*/blog/write*
// @author         Fenex
// @version        1.4.1 KTS
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
function createFormRM(login, subject, text) {
	var fd = document.createElement('form');
	fd.setAttribute('action', 'http://klavogonki.ru/profile/'+__user__+'/mail/compose/');
	fd.setAttribute('method', 'GET');
	f1 = new Array();
	for(var i=0; i<3; i++)
		f1[i] = document.createElement('input');
	f1[0].setAttribute('name', 'respondent_name');
	f1[0].setAttribute('value', login);
	f1[1].setAttribute('name', 'subject');
	f1[1].setAttribute('value', subject);
	f1[2].setAttribute('name', 'text');
	f1[2].setAttribute('value', '[quote]'+text+'[/quote]');
	for(var i=0; i<3; i++)
		fd.appendChild(f1[i]);
	
	fd.submit();
	return;
}
function initReplyBlock() {
	var exp = new RegExp('http\:\/\/klavogonki\.ru\/profile\/'+__user__+'\/mail\/([0-9]+)');
	if(!location.href.match(exp))
		return false;
	var exp2 = new RegExp('Пользователь ([a-zA-Zа-яА-Я _\-ёЁ]+) перевел вам [0-9]+ очк');
	
	var mess_id = location.href.match(exp)[1];
	if(mess_id) {
		if($$('.message')[0].getElementsByClassName('title')[0].getElementsByTagName('span')[0].innerHTML!='Клавогонки') {return false;}
		
		var replyUser = '';
		var replySubject = 'Re: ' + $$('.message')[0].getElementsByClassName('subject')[0].innerHTML.substring(1);
		var replyText = $$('.message')[0].getElementsByClassName('text')[0].innerHTML.replace(/\<.*?\>/g, '').substring(1);
		
		if(replySubject.match(exp2)&&replySubject.match(exp2)[0])
			replyUser = replySubject.match(exp2)[1];
		else if($$('.message')[0].getElementsByClassName('text')[0].getElementsByTagName('a')[0])
			replyUser = $$('.message')[0].getElementsByClassName('text')[0].getElementsByTagName('a')[0].innerHTML;
		else
			return false;
		var html = '<dd class="highlight-btn"><p><input type="button" value="Ответить" onclick="createFormRM(\''+replyUser+'\', \''+replySubject+'\', \''+replyText+'\');"><input type="button" value="Удалить" onclick="popconfirm(\'Удалить это сообщение?\', function(){ window.location=\'/profile/'+__user__+'/mail/in/?delete='+mess_id+'\'; });"></p></dd>';
		
		var dl = document.createElement('dl');
		dl.setAttribute('class', 'compose');
		dl.innerHTML = html;
		
		$$('.message')[0].parentNode.insertBefore(dl, $$('.message')[0].nextSimbling);
		
	}
	return true;
}
function initProfileTools() {
	if(location.href.indexOf('http://klavogonki.ru/profile/'+__user__)<0||location.href.indexOf('compose')>0||location.href.indexOf('write')>0)
		return false;
	var set;
	if(/^http\:\/\/klavogonki\.ru\/profile\/\d{1,7}\/comments/.test(location.href)&&document.getElementById('comments_block')) {
		set =  {elem: document.getElementById('comments_block').getElementsByClassName('comment'), style: {input:'margin-top: 2px;', btn: 'margin-left:13em;'}};
		if(location.href.indexOf(__user__.toString())>0) {
			showAllComments = function() {$('show_all_comments_img').show();new Ajax.Request('/ajax/get-user-comments', {parameters: {user: __user__ },onSuccess: function(transport) {$('show_all_comments_img').hide();$('show_all_comments').hide();$('comments_block').update(transport.responseText.replace('display:none', ''));insertButton();}});};
		}
	}
	else if(/^http\:\/\/klavogonki\.ru\/profile\/\d{1,7}\/blog\/post\d+/.test(location.href)&&document.getElementsByClassName('user-content')[0]&&document.getElementsByClassName('user-content')[0].getElementsByClassName('comments')[0])
		set = {elem: document.getElementsByClassName('user-content')[0].getElementsByClassName('comments')[0].getElementsByClassName('comment'), style: {input:'margin-top: 9px;', btn: 'margin-left:13em;'}};
	else if(/^http\:\/\/klavogonki\.ru\/profile\/\d{1,7}\/mail/.test(location.href)&&document.getElementsByClassName('user-content')[0]&&document.getElementsByClassName('user-content')[0].getElementsByClassName('mail')[0])
		set =  {elem: document.getElementsByClassName('user-content')[0].getElementsByClassName('mail')[0].getElementsByClassName('message'), style: {input:'margin-top: 9px;', btn: ''}};
	else if(/^http\:\/\/klavogonki\.ru\/profile\/\d{1,7}\/blog/.test(location.href)&&document.getElementsByClassName('user-content')[0]&&document.getElementsByClassName('user-content')[0].getElementsByClassName('blog')[0])
		set = {elem: document.getElementsByClassName('user-content')[0].getElementsByClassName('blog')[0].getElementsByClassName('post'), style: {input:'margin-top: 13px;', btn: ''}};
	else
		return false;
	var s = document.createElement('style');
	s.innerHTML = '.checkboxPT{margin-right: 5px;}.checkboxPT input{'+set.style.input+'}';
	document.body.appendChild(s);
	if(!insertBottomBtns(set.style.btn))
		return false;
	return set.elem;
}

function getIDhref(e) {
	var del = e.getElementsByClassName('delete')[0];
	var obj = {};
	var temp = false;
	if(del.href)
		temp = del.href;
	else
		temp = del.getAttribute('onclick');
	if(temp) {
		temp = temp.substring(temp.indexOf('\'/profile/'+__user__)+1, temp.indexOf('\'', temp.indexOf('\'/profile/'+__user__)+5));
		obj.id = temp.replace(/.+\?delete=/, '');
		obj.url = temp.replace(/\?delete=.+/, '');
	}
	return obj;
}

function insertButton() {
	var elem = initProfileTools();
	if(!elem)
		return false;
	for(i=0;i<elem.length;i++) {
		var Mess = getIDhref(elem[i]);
		var ch_box = document.createElement('div');
		ch_box.id = 'div_del_' + Mess.id;
		ch_box.setAttribute('class', 'checkboxPT');
		ch_box.setAttribute('style', 'float:left;');
		ch_box.innerHTML = '<input urlPost="'+Mess.url+'" idMess="' + Mess.id + '" id="input_del_' + Mess.id + '" type="checkbox" /><img id="img_ok_del_' + Mess.id + '" title="Удалено" style="display: none;" src="/img/ok.gif"><img id="img_loading_del_' + Mess.id + '" title="Удаление..." style="display: none;" src="/img/small_loading.gif">';
		elem[i].getElementsByClassName('title')[0].parentNode.insertBefore(ch_box, elem[i].getElementsByClassName('title')[0]);
	}
}

function delComment() {
	var elem = document.getElementsByClassName('checkboxPT');
	var e = false;
	
	for(var i=0;i<elem.length;i++)
		if(elem[i].getElementsByTagName('input')[0].checked)
			e = elem[i];
	if(!e) {
		elems_PT_active(false);
		return;
	}

	var params_del = {};
	var id = e.getElementsByTagName('input')[0].getAttribute('idMess');
	url = e.getElementsByTagName('input')[0].getAttribute('urlPost');
	
	$('input_del_'+id).hide();
	$('input_del_'+id).checked = false;
	$('img_loading_del_'+id).show();
	
	new Ajax.Request(url ,{
		method: 'post',
		parameters: {
			delete: id,
			csrftoken: window.__csrftoken
		},
		onSuccess: function(transport) {
			$('img_loading_del_'+id).hide();
			$('img_ok_del_'+id).show();
			var s = transport.responseText;
			window.__csrftoken = s.substring(s.indexOf('__csrftoken = ')+15, s.indexOf(';', s.indexOf('__csrftoken = ')+15)-1);
			delComment();
		}});
}

function delMess(id, url) {
	$('input_del_'+id).hide();
	$('input_del_'+id).checked = false;
	$('img_loading_del_'+id).show();
	new Ajax.Request(url ,{
		method: 'post',
		parameters: {
			delete: id
		},
		onSuccess: function(transport) {
			$('img_loading_del_'+id).hide();
			$('img_ok_del_'+id).show();
		}});
}

function delMessSelected() {
	var elem = document.getElementsByClassName('checkboxPT');
	var count = 0;
	for(i=0;i<elem.length;i++)
		if(elem[i].getElementsByTagName('input')[0].checked)
			count++;
	if((count>20)||((count<=20&&count>0)&&(localStorage['PT_safemode']=='1')))
		if(!(confirm('Вы собираетесь удалить ' + count + ' записей. Уверены?')))
			return false;
	
	if(location.href.indexOf('/comments')||location.href.indexOf('/blog')) {
		elems_PT_active(true);
		delComment();
	}
	else {
		for(i=0;i<elem.length;i++) {
			if(elem[i].getElementsByTagName('input')[0].checked) {
				delMess(elem[i].getElementsByTagName('input')[0].getAttribute('idMess'), elem[i].getElementsByTagName('input')[0].getAttribute('urlPost'));
			}
		}	
	}
}

function elems_PT_active(b) {
	var elem1 = document.getElementsByClassName('checkboxPT');
	var elem2 = document.getElementById('PT_btns').getElementsByTagName('input');
	
	if(b) {
		for(i=0;i<elem1.length;i++)
			elem1[i].getElementsByTagName('input')[0].setAttribute('disabled', 'disabled');
		for(i=0;i<elem2.length;i++)
			elem2[i].setAttribute('disabled', 'disabled')
	}
	else {
		for(i=0;i<elem1.length;i++)
			elem1[i].getElementsByTagName('input')[0].removeAttribute('disabled');
		for(i=0;i<elem2.length;i++)
			elem2[i].removeAttribute('disabled');
	}
	return;
}

function messCheck(mode) {
	var elem = document.getElementsByClassName('checkboxPT');
	for(i=0;i<elem.length;i++) {
		elem[i].getElementsByTagName('input')[0].checked = mode;
	}
}

function messInvert() {
	var elem = document.getElementsByClassName('checkboxPT');
	for(i=0;i<elem.length;i++) {
		elem[i].getElementsByTagName('input')[0].checked = !elem[i].getElementsByTagName('input')[0].checked;
	}
}

function changeSafeMode(elem) {
	localStorage['PT_safemode'] = (elem.checked==true) ? '1' : '0';
}

function insertBottomBtns(style) {
	if(document.getElementById('PT_btns'))
		return false;
	var elem_ins = false;
	if(document.getElementsByClassName('pages')[0])
		var elem_ins = document.getElementsByClassName('user-content')[0].getElementsByClassName('pages')[0];
	else
		var elem_ins = document.getElementsByClassName('user-content')[0].getElementsByClassName('write')[0];
		
	if(!elem_ins)
		return false;
		
	var e = document.createElement('div');
	e.id = 'PT_btns';
	e.setAttribute('style', style);
	e.innerHTML = '<input type="button" value="Выбрать всё" onClick="messCheck(true)" /> <input type="button" value="Снять со всех" onClick="messCheck(false)" /> <input type="button" value="Инвертировать" onClick="messInvert()" /><br /><input type="checkbox" id="checkedSaveMode" onclick="changeSafeMode(this)" checked> Безопасный режим<br /><input type="button" value="Удалить выбранные" onClick="delMessSelected()" /> ';
	elem_ins.parentNode.insertBefore(e, elem_ins);
		
	localStorage['PT_safemode'] = localStorage['PT_safemode'] ? localStorage['PT_safemode'] : '1';
	document.getElementById('checkedSaveMode').checked = (localStorage['PT_safemode']=='1') ? true : false;
	
	return true;
}

if(!document.getElementById('KTS_ProfileTools')) {
	var s = document.createElement('script');
	s.innerHTML = delComment+elems_PT_active+changeSafeMode+insertBottomBtns+messInvert+messCheck+delMessSelected+delMess+insertButton+getIDhref+initProfileTools+'insertButton();'+initReplyBlock+createFormRM+'initReplyBlock()';
	document.body.appendChild(s);

	var tmp_elem = document.createElement('div');
	tmp_elem.id = 'KTS_ProfileTools';
	tmp_elem.style.display = 'none';
	document.body.appendChild(tmp_elem);	
}