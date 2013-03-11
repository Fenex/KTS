// ==UserScript==
// @name           KlavoEvents
// @namespace      fnx
// @include        http://klavogonki.ru*
// @author         Fenex, DIgorevich
// @version        1.3.4 KTS
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
if(!document.getElementById('KTS_KlavoEvents')) {
	var str_ver = "var KEobj = new Object();KEobj.ver = '1.3.4';KEobj.mode = 'user';\n";
	var elem = document.getElementById('head').getElementsByClassName('menu')[0];
	var createElem = document.createElement('a');
	createElem.setAttribute('href', 'javascript:changeViewerEvents();');
	createElem.innerHTML = 'События';
	createElem.id = 'klavo_events';

    //var pos = 1;
    //if(__user__==82885)
    var pos = elem.getElementsByTagName('a').length;
	elem.insertBefore(createElem, elem.getElementsByTagName('a')[pos]);

	var e_cnt = document.createElement('div');
	e_cnt.id = 'content_0';
	e_cnt.setAttribute('style', 'display:none;');
	document.getElementById('content').parentNode.insertBefore(e_cnt, document.getElementById('content'));

	var ev_load = document.createElement('div');
	ev_load.id = 'event_load';
	ev_load.style.display = 'none';
	ev_load.innerHTML = '<div class="r tl"><div class="tr"><div class="bl"><div class="br"><div class="rc">	<div class="event_load-content">Загрузка событий...</div></div></div></div></div>';
	document.getElementById('content').parentNode.insertBefore(ev_load, document.getElementById('content'));
	function showFirstPost(id_mess, _scroll1) {
		arr_scroll[id_mess] = _scroll1;
		if($('evtd_'+id_mess).innerHTML=='') {
			$('imgEventLoading_'+id_mess).show();
			new Ajax.Request($('link_'+id_mess).href, {
				method: 'get',
				onSuccess: function(transport)
				{
					$('imgEventLoading_'+id_mess).hide();
					var txt = transport.responseText;
					var txt_search = txt.toLowerCase();
					txt_search = txt_search.replace(/\'/g, "\"");
					var start_i = txt_search.indexOf('<tr class="posth ">');
					var end_i = txt_search.indexOf('<div class=post-opts');
					if(start_i>end_i)
						return;
					$('evtd_'+id_mess).innerHTML = txt.substring(start_i, end_i)+'</td></tr><tr><td><center><span class="showhide" onclick="hideFirstPost('+id_mess+',document.documentElement.scrollTop || document.body.scrollTop)">Скрыть</span></center></td></tr>';
					var elements = $('evtd_'+id_mess).getElementsByClassName('hidecont');
					for(i=0;i<elements.length;i++)
						elements[i].show();
					elements = $('evtd_'+id_mess).getElementsByClassName('post-opts');
					for(i=0;i<elements.length;i++)
						elements[i].hide();
					$('evtd_'+id_mess).getElementsByClassName('post-container')[0].getElementsByClassName('title')[0].getElementsByTagName('a')[1].hide();
					$('evtd_'+id_mess).getElementsByClassName('post-container')[0].getElementsByClassName('title')[0].getElementsByTagName('span')[0].hide();
					if($('evtd_'+id_mess).getElementsByClassName('post-container')[0].getElementsByClassName('text')[0].getElementsByClassName('modified')>0)
						$('evtd_'+id_mess).getElementsByClassName('post-container')[0].getElementsByClassName('text')[0].getElementsByClassName('modified')[0].hide();
				}});
		}
		$("href_func_show_"+id_mess).innerHTML = '';
		$('evtd_'+id_mess).show();
		$('href_func_hide_'+id_mess).show();
	}
	function hideFirstPost(id_mess) {
		$('href_func_show_'+id_mess).innerHTML = 'Показать';
		$('evtd_'+id_mess).hide();
		$('href_func_hide_'+id_mess).hide();
		if(document.documentElement.scrollTop)
			document.documentElement.scrollTop = arr_scroll[id_mess];
		if(document.body.scrollTop)
			document.body.scrollTop = arr_scroll[id_mess];
	}
	function getValueByTag(str, tag) {
		var p1 = str.indexOf('['+tag+']');
		var p2 = str.indexOf('[/'+tag+']');
		if((p1<0)||(p2<0))
			return false;
		return (str.substring(p1+2+tag.length, p2));
	}
	function go_next(a) {
		arr_events = a.split('[event]');
		var txt = '<h4>Лента событий</h4><div id="scriptKE_message" style="display:none;"></div><table class="list"><tr style="color:#888888;" class="header"><td>№</td><td>Дата</td><td style="padding-left: 20px;">Название</td><td style="text-align:right;" id="script_ver"></td></tr>';
		for(i=1;i<arr_events.length-1;i++) {
			var ev_bgcolor = 'style="background:#' + getValueByTag(arr_events[i], 'color')+';"';
			txt += '<tr onmouseout="$(\'href_func_show_'+i+'\').hide();" onmouseover="$(\'href_func_show_'+i+'\').show();" class="item " '+ev_bgcolor+'><td class="titlenote"><span class="topic-note">'+i+'</span></td><td class="tddate">['+getValueByTag(arr_events[i], 'date')+']</td><td class="title">';
			var avatar = ' style="padding-left: 20px;"';
			var post =  (getValueByTag(arr_events[i], 'post').trim().length>0) ? getValueByTag(arr_events[i], 'post') : getValueByTag(arr_events[i], 'href')+'/page1/#post1';
			if(getValueByTag(arr_events[i], 'avatar').length>0)
				avatar = ' style="padding-left: 20px; background: transparent url(http://img.klavogonki.ru/avatars/'+getValueByTag(arr_events[i], 'avatar')+'.gif) no-repeat 0% 0%;"';
			txt += '<a' + avatar + ' id="link_'+i+'" href=http://klavogonki.ru/forum/events/'+getValueByTag(arr_events[i], 'href')+'><noindex>'+getValueByTag(arr_events[i], 'name') + '</noindex></a> <a href="/forum/events/'+post+'"><img src="/img/bullet_go.gif" /></a></td><td class="rightcol"><span class="showhide" style="display:none;" id="href_func_show_'+i+'" onclick="showFirstPost('+i+',document.documentElement.scrollTop || document.body.scrollTop)">Показать</span><span class="showhide" style="display:none;" id="href_func_hide_'+i+'" onclick="hideFirstPost('+i+')">Скрыть</span> <img style="display:none;" id="imgEventLoading_'+i+'" src="/img/small_loading.gif" /></td></tr><tr class="noitem"><td colspan="4" id="evtd_'+i+'" style="display:none;"></td></tr>';
		}
		txt += '</table>';
		$('content_0').innerHTML = txt;
	}

	function go_next_system(a) {
		if(!a) {return;}
		var ver = getValueByTag(a, 'version');
		$('script_ver').innerHTML = '<span title="' + KEobj.ver + ' KTS">Версия скрипта: '+KEobj.ver+ ' KTS <img src="/img/ok.gif" /></span>';
		var m = getValueByTag(a, 'message');
		if(m)
			insertKE_Message(m);
	}
	function insertKE_Message(m) {
		var m_type = getValueByTag(m, 'type');
		if((m_type=='0')&&(KEobj.mode=='user'))
			return;
		var m_text = getValueByTag(m, 'text');
		if(m_text<1)
			return;
		m_text = m_text.replace(/{{/g, '<');
		m_text = m_text.replace(/}}/g, '>');
		$('scriptKE_message').innerHTML = m_text;
		var m_color = getValueByTag(m, 'color');
		var m_align = getValueByTag(m, 'align');
		var m_bgcolor = getValueByTag(m, 'bgcolor');
		if(m_color)
			$('scriptKE_message').style.color = '#'+m_color;
		if(m_bgcolor)
			$('scriptKE_message').style.background = '#'+m_bgcolor;
		if((m_align)&&((m_align=='center')||(m_align=='right')||(m_align=='left')))
			$('scriptKE_message').align = m_align;
		$('scriptKE_message').show();
	}
	function changeViewerEvents() {
		if($('content_0').style.display=='none')
			showEventsInfo();
		else {
			$('content_0').hide();
			$('content_0').innerHTML = '';
			$('content').show();
			if(active_menu)
				active_menu.setAttribute('class', 'active');
			$('klavo_events').removeAttribute('class');
		}
	}
	function showEventsInfo() {
		active_menu = $('klavo_events').parentNode.getElementsByClassName('active')[0];
		if(active_menu)
			active_menu.removeAttribute('class');
		$('klavo_events').setAttribute('class', 'active');
		$('content').hide();
		$('content_0').show();
		$('event_load').show();
		new Ajax.Request('/profile/251164/blog/post1/', {
		method: 'get',
		onSuccess: function(transport)
		{
			var txt = transport.responseText;
			$('event_load').hide();
			txt = txt.substr(txt.indexOf('<div class=subject>KlavoEvents</div>'));
			txt = getValueByTag(txt, 'klavoevents');
			txt = txt.replace(/\<.*?\>/g, '');
			go_next(txt);
			go_next_system(getValueByTag(txt, 'system'));
		}});
	}
	var s = document.createElement('script');
	s.innerHTML = "var arr_scroll = new Array();"+str_ver+insertKE_Message+getValueByTag+go_next+showEventsInfo+changeViewerEvents+showFirstPost+hideFirstPost+go_next_system;
	document.body.appendChild(s);
	var s = document.createElement('style');
	s.innerHTML = "#event_load{background:#eee url('http://klavogonki.ru/img/gray_back.gif') no-repeat 0 0;width:300px;}#event_load .rc{padding:20px;}#event_load .event_load-content{font-size:20px;color:#dd6600;background:transparent url('http://klavogonki.ru/img/loading.gif') no-repeat left;padding:20px 60px;}";
	s.innerHTML += "#content_0 .list .noitem{background:#FAF9F2;} #content_0 .list .noitem td{border-top: 1px solid #DDDDDD;border-bottom: 1px solid #DDDDDD;padding: 6px 6px;} #content_0 .list{border-collapse: collapse;width:100%;}#content_0 .list .item td{border-bottom: 1px solid #DDDDDD;border-top: 1px solid #DDDDDD;white-space: nowrap;padding: 6px 6px;}#content_0 .list .item td.tddate{color:#888888;width:1pt;}#content_0 .list .item td.topic-note{width:1%;}#content_0 .list .item td.titlenote{width:1pt;}#content_0 .list .item td.rightcol{text-align:left;}#content_0 .list .item td.title{width:1pt;}#content_0 span.showhide{cursor:pointer;color:#888888;}";
	document.body.appendChild(s);
	
	var tmp_elem = document.createElement('div');
	tmp_elem.id = 'KTS_KlavoEvents';
	tmp_elem.style.display = 'none';
	document.body.appendChild(tmp_elem);	
}
