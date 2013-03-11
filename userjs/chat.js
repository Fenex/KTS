chrome.extension.sendRequest({reason: "getChatSettings"}, function(response) {nextChatLoad(response.settings.IgnoreList, response.settings.chatLeftLinks)});

function nextChatLoad(IgnoreList, links) {
	var SCR = new Object();
	
	var str_add_msginlist1 = "chat.addMsgInList = function(args)"+
	"{"+
		"if(args.user_id.length > 7){return;}"+
		"var user = this.user_data[args.user_id].user;"+
		
		"var time = args.time.getHours() + ':' + args.time.getMinutes().format() + ':' + args.time.getSeconds().format();"+
		
		"var room_html = '';"+
		"if(args.type == 'game')"+
			"room_html = '<span class=room>[заезд]</span>';"+
		"if(args.type == 'private')"+
		"{"+
			"if(args.to) {"+
				"room_html = '<a href="+"\\"+"\"javascript:chat.insertPrivate('+args.to_id+');"+"\\"+"\" class="+"\\"+"\"room private"+"\\"+"\">[шепчет '+args.to+']</a>';"+
			"} else {"+
				"room_html = '<a href="+"\\"+"\"javascript:chat.insertPrivate('+args.user_id+');"+"\\"+"\" class="+"\\"+"\"room private"+"\\"+"\">[шепчет вам]</a>';"+
			"}"+
		"}";
		if(IgnoreList) {
			str_add_msginlist1 += "if(localStorage['black_ids']) {"+
				"var arr_fnx_black_ads = localStorage['black_ids'].split(',');"+
				"for(i=0;i<arr_fnx_black_ads.length;i++) {"+
					"if((arr_fnx_black_ads[i].toString()==args.user_id.toString())&&(!(args.type=='system'||args.type=='system_my')))"+
						"return;"+
				"}"+
			"}";
		}
		
		str_add_msginlist1 += "var cont_outer = $('chat-'+args.room).select('.messages > div').last();"+
		"var cont = $('chat-'+args.room).select('.messages > div > div').last();"+
		
		"var needScroll = (cont_outer.scrollTop+cont_outer.getHeight()) >= cont_outer.scrollHeight;"+

        "args.text = args.text.substring(0,5000);"+		
		"args.text = args.text.replace(/</g, '&lt;');"+
		"args.text = args.text.replace(/>/g, '&gt;');"+

		"args.text = args.text.replace(/http:"+"\\"+"\\"+"/"+"\\"+"\\"+"/(?:www"+"\\"+"\\"+".)?klavogonki"+"\\"+"\\"+".ru"+"\\"+"\\"+"/g"+"\\"+"\\"+"/"+"\\"+"\\"+"?gmid=("+"\\"+"\\"+"d+)"+"\\"+"\\"+"&?/g, '[<a class="+"\\"+"\"gamelink-not-resolved gamelink-$1"+"\\"+"\" href="+"\\"+"\"/g/?gmid=$1"+"\\"+"\">Заезд #$1</a>]');"+
		"args.text = args.text.replace(/http:"+"\\"+"\\"+"/"+"\\"+"\\"+"/([^ ]*)/g, '<a target=_blank href="+"\\"+"\"http://$1"+"\\"+"\">http://$1</a>');"+
		"args.text = args.text.replace(/https:"+"\\"+"\\"+"/"+"\\"+"\\"+"/([^ ]*)/g, '<a target=_blank href="+"\\"+"\"https://$1"+"\\"+"\">https://$1</a>');"+
		"args.text = args.text.replace(/ftp:"+"\\"+"\\"+"/"+"\\"+"\\"+"/([^ ]*)/g, '<a target=_blank href="+"\\"+"\"ftp://$1"+"\\"+"\">ftp://$1</a>');"+
		
		"if(this.filter)"+
		"{"+
			"var replace_str = '$1<span class=censored>[вырезано]</span>';"+
			"args.text = args.text.replace(/­/g,'');"+
			"args.text = ' '+args.text+' ';"+
			"args.text = args.text.replace(/([^а-яА-Я])[а-яА-Я]*[хx?]+[уy]+[eеийяё]+[а-яА-Я]*(?=[^а-яА-Я])/gi, replace_str);"+
			"args.text = args.text.replace(/([^а-яА-Я])[хx?]+[уy]+ю+[а-яА-Я]*(?=[^а-яА-Я])/gi, replace_str);"+
			"args.text = args.text.replace(/([^а-яА-Я])[а-яА-Я]*м+у+д+[^рс]+[а-яА-Я]*(?=[^а-яА-Я])/gi, replace_str);"+
			"args.text = args.text.replace(/([^а-яА-Я])[а-яА-Я]*[аеeoиоуыьъ]+[eеё]+б+[а-яА-Я]*(?=[^а-яА-Я])/gi, replace_str);"+
			"args.text = args.text.replace(/([^а-яА-Я])[eеё]+б+[а-яА-Я]*(?=[^а-яА-Я])/gi, replace_str);"+
			"args.text = args.text.replace(/([^а-яА-Я])[а-яА-Я]*п+[иeеё]+[cсз]+д+[а-яА-Я]*(?=[^а-яА-Я])/gi, replace_str);"+
			"args.text = args.text.replace(/([^а-яА-Я])[а-яА-Я]*б+л+я+д+[а-яА-Я]*(?=[^а-яА-Я])/gi, replace_str);"+
			"args.text = args.text.replace(/([^а-яА-Я])б+л+я+[а-яА-Я]*(?=[^а-яА-Я])/gi, replace_str);"+
			"args.text = args.text.replace(/([^а-яА-Я])[а-яА-Я]*п+и+д+[оеаeo]+[рp]+[а-яА-Я]*(?=[^а-яА-Я])/gi, replace_str);"+
			"args.text = args.text.replace(/([^а-яА-Я])[а-яА-Я]*г+[aoао]+в+[eеё]*н+[а-яА-Я]*(?=[^а-яА-Я])/gi, replace_str);"+
			"args.text = args.text.replace(/([^а-яА-Я])[cс]+ц*у+[кч]+[eеaoаои]+[а-яА-Я]*(?=[^а-яА-Я])/gi, replace_str);"+
			"args.text = args.text.replace(/^ (.*) $/,'$1');"+
		"}"+
		
		"while(/([^"+"\\"+"\\"+"/ ­]{40,})([^"+"\\"+"\\"+"/ ­]{40,})/.test(args.text))"+
		"{"+
			"args.text = args.text.replace(/([^"+"\\"+"\\"+"/ ­]{40,})([^"+"\\"+"\\"+"/ ­]{40,})/, '$1­$2');"+
		"}"+
		"args.text = args.text.replace(/­/, '<wbr/>');"+
		
		"var smilies = {"+
			"smile: /(:-"+"\\"+"\\"+")|:"+"\\"+"\\"+")|:smile:)/g,"+
			"biggrin: /(:-D|:D|:biggrin:)/g,"+
			"angry: /(>:"+"\\"+"\\"+"(|:angry:)/g,"+
			"blink: /(oO|Oo|o_O|O_o|оО|Оо|о_О|О_о|:blink:)/g,"+
			"blush: /:blush:/g,"+
			"cool: /(8"+"\\"+"\\"+")|:cool:)/g,"+
			"dry: /:dry:/g,"+
			"excl: /:excl:/g,"+
			"happy: /("+"\\"+"\\"+"^"+"\\"+"\\"+"^|"+"\\"+"\\"+"^_"+"\\"+"\\"+"^|:happy:)/g,"+
			"huh: /:huh:/g,"+
			"laugh: /:laugh:/g,"+
			"mellow: /:mellow:/g,"+
			"ohmy: /:ohmy:/g,"+
			"ph34r: /:ph34r:/g,"+
			"rolleyes: /:rolleyes:/g,"+
			"sad: /(:"+"\\"+"\\"+"(|:-"+"\\"+"\\"+"(|:sad:)/g,"+
			"sleep: /:sleep:/g,"+
			"tongue: /(:P|:-P|:Р|:-Р|:tongue:)/g,"+
			"unsure: /:unsure:/g,"+
			"wacko: /("+"\\"+"\\"+"%"+"\\"+"\\"+")|:wacko:)/g,"+
			"wink: /(;"+"\\"+"\\"+")|;-"+"\\"+"\\"+")|:wink:)/g,"+
			"wub: /:wub:/g,"+
			"first: /:first:/g,"+
			"second: /:second:/g,"+
			"third: /:third:/g,"+
			"power: /:power:/g,"+
			"badcomp: /:badcomp:/g,"+
			"complaugh: /:complaugh:/g,"+
			"girlnotebook: /:girlnotebook:/g,"+
			"crazy: /:crazy:/g,"+
			"boredom: /:boredom:/g,"+
			"cry: /:cry:/g,"+
			"bye: /:bye:/g,"+
			"dance: /:dance:/g,"+
			"gamer: /:gamer:/g,"+
			"rofl: /:rofl:/g,"+
			"beer: /:beer:/g,"+
			"kidtruck: /:kidtruck:/g,"+
			"angry2: /:angry2:/g,"+
			"spiteful: /:spiteful:/g,"+
			"sorry: /:sorry:/g,"+
			"boykiss: /:boykiss:/g,"+
			"girlkiss: /(:girlkiss:|:"+"\\"+"\\"+"*|:-"+"\\"+"\\"+"*)/g,"+
			"kissed: /:kissed:/g,"+
			"yes: /:yes:/g,		"+
			"no: /:no:/g,"+
			"hi: /:hi:/g,"+
			"ok: /:ok:/g"+
		"};"+
		"for(var name in smilies)"+
		"{			"+
			"args.text = args.text.replace(smilies[name], '<img class=smile src="+"\\"+"\"/img/smilies/'+name+'.gif"+"\\"+"\" alt="+"\\"+"\":'+name+':"+"\\"+"\" title="+"\\"+"\":'+name+':"+"\\"+"\">');"+
		"}"+
		
		"args.text = args.text.replace(/script/g, 'sсript');"+
        "args.text = args.text.replace(/http:"+"\\"+"\\"+"/"+"\\"+"\\"+"/"+"usersсript.{1,2}org"+"\\"+"\\"+"/sсripts/g, 'http://userscripts.org/scripts');"+
		"args.text = args.text.replace(/http:"+"\\"+"\\"+"/"+"\\"+"\\"+"/"+"usersсript.{1,2}org/g, 'http://userscripts.org');"+
		
		"if(args.type=='normal') {"+
			"args.text = args.text.replace(this.params.user.login, '<b>'+this.params.user.login+'</b>');"+
		"}"+
		
		"var KTS_left_links = '';";
		
		if(links) {
			str_add_msginlist1 += "KTS_left_links = this.params.user.moderator=='1' ? '<span style="+"\\"+"\"cursor:pointer; color:'+user.background+';"+"\\"+"\" onclick="+"\\"+"\"chat.kick('+args.user_id+')"+"\\"+"\">[<b>&times;</b>]</span>' : '';"+
			"KTS_left_links += '<a target="+"\\"+"\"_blank"+"\\"+"\" href="+"\\"+"\"http://klavogonki.ru/profile/'+args.user_id+'"+"\\"+"\" style="+"\\"+"\"cursor:pointer;"+"\\"+"\">[&#1769;]</a>';";
		}
		str_add_msginlist1 += "if(args.type == 'system') {"+
			"cont.insert('<p><span class=time>['+time+']</span><span class=system-message>Пользователь '+user.login+' '+args.text+'</span></p>');	"+
		"} else if (args.type == 'private') {"+
			"cont.insert('<p>'+KTS_left_links+'<span class=time>['+time+']</span><span class=username style="+"\\"+"\"color:'+user.background+'"+"\\"+"\">&lt;<span onclick="+"\\"+"\"chat.insertPrefix('+args.user_id+');"+"\\"+"\">'+user.login+'</span>&gt;</span>'+room_html+'<span class=private>'+args.text+'</span></p>');"+
		"} else if (args.user_id == '324864') {"+
			"cont.insert('<p><span class=time>['+time+']</span><span class=system-message>&lt;Клавобот&gt; '+room_html+args.text+'</span></p>');"+
		"} else if(args.text.match(/^"+"\\"+"\\/me/)) {"+
			"cont.insert('<p>'+KTS_left_links+'<span class=time>['+time+']</span><span class=system-message>'+user.login+' '+args.text.replace('/me','')+'</span></p>');"+
		"} else {"+
			"cont.insert('<p>'+KTS_left_links+'<span class=time>['+time+']</span><span class=username style="+"\\"+"\"color:'+user.background+'"+"\\"+"\">&lt;<span onclick="+"\\"+"\"chat.insertPrefix('+args.user_id+');"+"\\"+"\">'+user.login+'</span>&gt;</span>'+room_html+args.text+'</p>');"+
		"}";
	
		str_add_msginlist1 += "var links = cont.select('.gamelink-not-resolved');"+

		"for(var i=0;i<links.length;i++)"+
		"{"+
			"var m = links[i].className.match(/gamelink-("+"\\"+"\\"+"d+)/);"+
			"var els = $$('.gamelink-not-resolved.gamelink-'+m[1]);"+
			"for(var j=0;j<els.length;j++){els[j].removeClassName('gamelink-not-resolved');}"+
			"new Ajax.Request( '/ajax/fetchgameinfo', {"+
				"method: 'get',"+
				"parameters: {"+
					"game: m[1] },"+
				"onSuccess: function(transport)"+
				"{"+
					"eval('var json='+transport.responseText+';');"+
					"var text = '';"+
					"if(json.type == 'practice')"+
						"return;"+
					"if(json.type == 'private')"+
						"text = 'Игра с друзьями ';"+
					"if(json.type == 'normal')"+
						"text = 'Открытая игра ';"+
					"if(json.competition){text = 'Соревнование ';if(json.regular_competition){text += '(x'+json.regular_competition+') ';}}"+
					"text += json.gametype_html;"+
					"var els = $$('.gamelink-'+json.game_id);"+
					"for(var j=0;j<els.length;j++)"+
						"els[j].update(text);"+
				"}});"+
		"}";
		
	str_add_msginlist1 += "if(needScroll)"+
			"cont_outer.scrollTop = cont_outer.scrollHeight;"+
		
		"if( args.room != 'general' && "+
			"(this.active_room == 'general' || $('chat-wrapper').hasClassName('hidden')) && "+
			"this.blink_new_ingame == null)"+
			"this.blink_new_ingame = setInterval(function()"+
			"{"+
				"$$('#chat-title .game.c span').last().toggleClassName('new');"+
			"}, 500);"+
	"};";

	SCR.updateUserList = function(room) {

		var _this = this;
		
		this.user_list[room].sort( function (a,b) 
			{
				if(!_this.user_data[a] || !_this.user_data[a].user || !_this.user_data[a].user.login)
					return 0;
				if(!_this.user_data[b] || !_this.user_data[b].user || !_this.user_data[b].user.login)
					return 0;
				a_login = String.prototype.toLowerCase ? _this.user_data[a].user.login.toLowerCase() : _this.user_data[a].user.login;
				b_login = String.prototype.toLowerCase ? _this.user_data[b].user.login.toLowerCase() : _this.user_data[b].user.login;
				return ( a_login < b_login ? -1 : ( a_login > b_login ? 1 : 0 ) );
			} );
		
		var html = '';
		for(var i in this.user_list[room])
		{		
			var user_id = this.user_list[room][i];
			if ((typeof user_id == 'function') || (user_id.toString().length > 7))
				continue;
			
			if(user_id == "324864" || user_id =="21")
				continue;
			
			var item = this.user_data[user_id];
					
			var avatar_html = '';
			if(item.user.avatar)
				avatar_html = 'style="background: transparent url('+item.user.avatar+') no-repeat 0% 0%"';
			
			var game_html = '';
			if(item.game_id && room == 'general' )
				game_html = 'в игре';
			
			var str_KTS = '';
			if(item.user.KTS) {
				var t = ['', 'C', 'S'];
				str_KTS = '<a class=info style="margin-left:-5px;" title="KT'+t[parseInt(item.user.KTS)]+'"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAB3RJTUUH3AkPEREzDbaPkgAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAADYSURBVHjaY2AYBYzYBPPV1FyBVCgQywLxYyBePfHWrd3Y1DKjC2SpqrqKsbPXt1+7xiJy/bqXnpKSyuMnT7S0BAQen3737h66eiZ0gV///kW4GhvrgNgnjh9neHHxIr+VqKgOSBybCzAM+PHvn+yvDx94QOzf//8z+Bw9uuXply88IHFiDXj67PnzryB24YULW5aamfl8+/v3K0icKAN+/vu3Ysvr1zdA7IWmpj7Rp05tOfr+/Q2QONGxYCUu7vHn//9oIFMeiB+yMDIuPfby5Q7CkToKyAIAJhhg0ym+29QAAAAASUVORK5CYII=" /></a>';
			}
			
			var moderator_tools = '';
			if(room == 'general' && this.params.user && moderators.indexOf(this.params.user.id) != -1)
				moderator_tools = ' <div class=moderator-tools><a onclick="chat.kick('+user_id+');">&times;</a></div>';
			
			var icons = '<a class=info title="Профиль" href="/profile/'+Strophe.getNodeFromJid(this.real_jids[user_id])+'/"><img src="/img/information-small.png"></a>';
			if(moderators.indexOf(parseInt(this.real_jids[user_id])) != -1)
				icons += '<img src="/img/moderator_icon-2.gif" style="position: relative; top: 2px" title="Модератор">';
			
			html += '<ins class="user'+user_id+' '+(this.unvoiced[user_id] ? 'revoked' : '')+'">'+moderator_tools+'<a class=name '+avatar_html+' title="Написать в приват" onclick="chat.insertPrivate('+user_id+');">'+item.user.login+'</a>'+icons+str_KTS+game_html+'</ins>';
					
			
		}
		
		$('chat-'+room).select('.userlist-content').last().update(html);
	}
		
/*	SCR.onMessage = function(msg) {
		var _this = this;
		
		var to = msg.getAttribute('to');
		var from = msg.getAttribute('from');
		var elems = msg.getElementsByTagName('body');
		
		var room;		
		
		if (elems.length > 0) {
			var body = elems[0];	
			
			var user_id, type;
			if(msg.getAttribute('type') == 'chat')
			{
				type = 'private';
				user_id = Strophe.getNodeFromJid(from);
				room = this.active_room;
			}
			else
			{
				type = 'normal';
				user_id = Strophe.getResourceFromJid(from);
				room = Strophe.getNodeFromJid(from);
			}
			
			if(!(/^[0-9]{2,7}$/.test(user_id)))
				return true;
			
			var x = getElementByAttribute(msg, 'x', 'xmlns', 'klavogonki:userdata');
			if(x)
			{
				var data = xml2array(x);					
				if(data.user) {
					data.user = this.filterUserData(data.user);					
					this.user_data[user_id] = data;
				}
			}
			
			if(!this.user_data[user_id])
				return true;
			
			var time = new Date();
			
			var x;
			if( x = getElementByAttribute(msg, 'x', 'xmlns', 'jabber:x:delay') )
			{
				var m = x.getAttribute('stamp').match(/(\d{4})(\d{2})(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
				time = new Date( Date.UTC(m[1],m[2],m[3],m[4],m[5],m[6]) );
			}
			
			if(!/(^general$)|(^game[\d]{5}$)|(^kts$)/.test(room))
				return true;
			
			this.addMsgInList({
				room: room,
				text: Strophe.getText(body),
				user_id: user_id, 
				time: time, 
				type: type });
		}

		return true;
	}*/

/*	SCR.onPresence = function(msg) {
		
		var room = Strophe.getNodeFromJid(msg.getAttribute('from'));
		var fnx = getElementByAttribute(msg, 'error', 'code', '403');
		
		if(fnx) {
			addMsgInList_my( {
				room: room,
				text: Strophe.getText(fnx.childNodes[0]),
				time: new Date() 
			});
			addMsgInList_my( {
				room: room,
				text: Strophe.getText(fnx.childNodes[1]),
				time: new Date() 
			});
		    return true;
		}
			
		var user_id = Strophe.getResourceFromJid(msg.getAttribute('from'));
		if(!(/^[\d]{2,}$/.test(user_id)))
			return true;
		this.real_jids[user_id] = '';
		
		var x = getElementByAttribute(msg, 'x', 'xmlns', 'http://jabber.org/protocol/muc#user');;
	    if(x) {
		    var items = x.getElementsByTagName('item');		
		    if(items.length) {
			    var jid = items[0].getAttribute('jid');
			    if(jid) {
				    this.real_jids[user_id] = jid;
			    }
		    }
	    }
		
		if(this.user_list[room] == undefined)
			this.user_list[room] = [];
			
		if(msg.getAttribute('type') == 'unavailable')
		{
			if( this.user_list[room].indexOf(user_id) != -1 )
				this.user_list[room].splice( this.user_list[room].indexOf(user_id), 1 );		
			this.user_list_dirty[room] = true;
			
			
			/*var x = getElementByAttribute(msg, 'x', 'xmlns', 'http://jabber.org/protocol/muc#user');
			if(x)
			{
				var status = x.getElementsByTagName('status');
				if(status.length && status[0].getAttribute('code') == 307)
				{
					var item = x.getElementsByTagName('item');
					var reason = item[0].childNodes[0];
					var reason_data = Strophe.getText(reason).split(':');
					
					var reason_periods = {
						0: 'удалён из чата',
						1: 'заблокирован на 1 минуту',
						5: 'заблокирован на 5 минут',
						10: 'заблокирован на 10 минут',
						30: 'заблокирован на 30 минут',
						60: 'заблокирован на 1 час',
						180: 'заблокирован на 3 часа',
						360: 'заблокирован на 6 часов',
						720: 'заблокирован на 12 часов',
						1440: 'заблокирован на 24 часа',
						4320: 'заблокирован на 3 суток',
						10080: 'заблокирован на 1 неделю',
						20160: 'заблокирован на 2 недели',
						43200: 'заблокирован на 1 месяц',
						129600: 'заблокирован на 3 месяца',
						2: 'заблокирован на неопределённый срок'};

					var str_per = reason_periods[reason_data[1]];
					if(!str_per) {str_per = reason_periods[2]};
					
					this.addMsgInList( {
						room: room,
						text: str_per+' модератором '+reason_data[0]+' по причине: '+reason_data[2], 
						user_id: user_id, 
						time: new Date(), 
						type: 'system'
					});
					
					if(this.params.user && user_id == this.params.user.id)
					{
						$$('#chat-general .messages input.send, #chat-general .messages input.text').each(function (el){ el.disabled = true; });
						this.connection.disconnect();
					}
				}
				/*else if(status.length && status[0].getAttribute('code') == 301) {
					var item = x.getElementsByTagName('item');
					var reason = item[0].childNodes[0];
					var reason_data = Strophe.getText(reason).split(':');
					this.addMsgInList( {
						room: room,
						text: 'заблокирован на неопределённый срок модератором '+reason_data[2]+' по причине: '+reason_data[1],
						user_id: user_id, 
						time: new Date(), 
						type: 'system'
					});
				}
			}*/
		/*}
		
		else if(msg.getAttribute('type') == 'error')
		{
			addMsgInList_my( {
						room: room,
						text: 'Ошибка при выполнении операции.',
						time: new Date() 
					});
		}
		else if(msg.getAttribute('type') == 'cancel')
		{
			addMsgInList_my( {
						room: room,
						text: 'Откат при выполнении операции.',
						time: new Date() 
					});
		}
		
		else
		{		
			if(chat.user_list[room].indexOf(user_id) == -1)
			{	
				var x = getElementByAttribute(msg, 'x', 'xmlns', 'klavogonki:userdata');
				if(x)
				{
					var data = xml2array(x);					
					if(data.user)	// not invisible guest
					{
						data.user = this.filterUserData(data.user);
						this.user_data[user_id] = data;
						this.user_list[room].push(user_id);
						this.user_list_dirty[room] = true;
					}
				}
				else {
					this.user_data[user_id] = {user: {login: Strophe.getNodeFromJid(this.real_jids[user_id]), background: '#000000'}}; 	
					this.user_list[room].push(user_id);
					this.user_list_dirty[room] = true;
				}
				if(user_id == Strophe.getNodeFromJid(this.connection.jid))
				{
					x = getElementByAttribute(msg, 'x', 'xmlns', 'http://jabber.org/protocol/muc#user');
					var item = x.childNodes[0];
					this.role[room] = item.getAttribute('role');
				}
			}
		}
		return true;
	}*/

	SCR.kick = function(user_id)
	{
		if(user_id==324864 || user_id==82885 || user_id==21){return;}
		var item = this.user_data[user_id];
		var _this = this;
		
		var name = user_id;
		if(item && item.user && item.user.login)
			name = item.user.login;
		popconfirm('Заблокировать пользователя <span style="color:brown;font-weight:bold;">'+name+'</span> на <select id=chat_kick_period><option value=0>кик</option><option value=1>1 минуту</option><option value=5>5 минут</option><option value=10>10 минут</option><option value=30>30 минут</option><option value=60>1 час</option><option value=180>3 часа</option><option value=360>6 часов</option><option value=720>12 часов</option><option value=1440>сутки</option><option value=4320>3 суток</option></select><br/>Причина: <input type=text id=chat_kick_reason>',
			function()
			{
				_this.connection.send(
					$iq( { 
						from: _this.connection.jid,
						id: 'voice2',
						to: 'general@conference.jabber.klavogonki.ru',
						type: 'set' } )
					.c( 'query', { xmlns: 'http://jabber.org/protocol/muc#admin' } )
					.c( 'item', { nick: user_id, role: 'visitor' } )
					.c( 'reason' )
					.t( _this.params.user.login+':'+$('chat_kick_period').value+':'+$('chat_kick_reason').value )				
					.up().up().up()
					.tree() );
			
				new Ajax.Request('/ajax/chat-kick', {
					parameters: {
						jid: _this.real_jids[user_id],
						period: $('chat_kick_period').value,
						reason: $('chat_kick_reason').value},
					onSuccess: function()
					{	
					}});
			});
	}
		
	SCR.sendMsg = function(room) {
		if(!this.connected)
			return;
			
		var _this = this;
		var msg = $('chat-'+room).select('input.text').last().value;
		
		msg = msg.replace(/^ +$/,'');
		if(msg.length == 0)
			return;
			
		var to,type;
		
		msg = msg.replace(/вики:([^ ]*)/ig, 'http://klavogonki.ru/wiki/$1');		
		var m = msg.match(/^<(.*?)>(.*)$/);
		msg = msg.replace(/</g,'&lt;');
		msg = msg.replace(/>/g,'&gt;');
		msg = msg.replace(/&/g,'&amp;');

		if(m)
		{
			var user_id = null;
			msg = m[2];
			var found_user_id = null;
			for( var i in this.cached_user_ids )
				if(this.cached_user_ids[i] == m[1])
					found_user_id = i;
					
			if(found_user_id)
				this.sendPrivateMsg(found_user_id, msg);
			else
			{		
				new Ajax.Request('/.fetchuser', {
					parameters: {
						login: m[1]},
					onSuccess: function(transport)
					{
						eval('var json='+transport.responseText+';');
						if(!json.id)
						{
							popalert('Пользователь с таким именем не найден.');
							return;
						}
						_this.cached_user_ids[json.id] = m[1];
						_this.sendPrivateMsg(json.id, msg);
						
					}});
			}	
		}
		else
		{	
			//if(Strophe.getNodeFromJid(this.connection.jid) == 21)
			//	return;
			$('chat-'+room).select('input.text').last().value = '';
			this.connection.send(
				$msg( { 
					from: this.connection.jid,
					to: room+'@conference.jabber.klavogonki.ru',
					type: 'groupchat' } )
				.c( 'body' )
				.t( msg )
				.up()
				.cnode( this.getXUserdata().tree() )
				.tree() );
		}
	}
		
	/*SCR.changeActiveRoom = function(room) {
		try	{
			if(kts_chat&&kts_chat.active)
				kts_chat.close(false);
		}catch(e){};
		if(!this.connected && room != this.active_room)
			return;
		
		var _this = this;
		
		if(this.active_room)
			$('chat-'+this.active_room).hide();
		this.active_room = room;
		$('chat-'+this.active_room).show();
			
		if(room == 'general')
		{
			$$('#chat-general .messages > div > div').last().update('');
			$$('#chat-general .userlist-content').last().update('');
			
			var elems = $$('#chat-title .game');
			for( var i=0;i<elems.length;i++ )
				elems[i].removeClassName('active');
			var elems = $$('#chat-title .general');
			for( var i=0;i<elems.length;i++ )
				elems[i].addClassName('active');
		}
		else
		{
			var elems = $$('#chat-title .general');
			for( var i=0;i<elems.length;i++ )
				elems[i].removeClassName('active');
			var elems = $$('#chat-title .game');
			for( var i=0;i<elems.length;i++ )
				elems[i].addClassName('active');
			
			if(this.blink_new_ingame)
			{
				clearInterval(this.blink_new_ingame);
				this.blink_new_ingame = null;
			}
			$$('#chat-title .game.c span').last().removeClassName('new');
		}
		
		if(this.params.game_id)
		{
			setPrefCookie( 'chat_active_room', room == 'general' ? 'general' : 'game');
		}
		
		if(this.resize)
			delete this.resize;
		this.resize = new Resizeable($$('#chat-wrapper #chat-'+room+' .messages > div').last(), {
			handle: $$('#chat-title .dummy .resize-bar').last(),
			maxHeight: 400,
			resize: function(el)
			{			
				setChatHeight(el.getHeight(), true);
			},
			update: function(el)
			{
				setChatHeight(el.getHeight());
			} });
	}*/
	
	SCR.monitoringChat = function() {
		if(!this.connection.connected&&!this.manualDisconnect) {
			this.addMsgInList_KTS( {
						room: this.active_room,
						text: 'KlavoTools обнаружил потерю связи. Выполняется переподключение...',
						time: new Date() 
					});
			this.connect();
		}
	}
	
	SCR.addMsgInList_KTS = function(args) {
		if((!args.text)||(args.text.trim()=='')){return;}
		var time = args.time.getHours() + ':' + args.time.getMinutes().format() + ':' + args.time.getSeconds().format();
		var cont_outer = $('chat-'+args.room).select('.messages > div').last();
		var cont = $('chat-'+args.room).select('.messages > div > div').last();
		var needScroll = (cont_outer.scrollTop+cont_outer.getHeight()) >= cont_outer.scrollHeight;
		cont.insert('<p><span class=time>['+time+']</span><span class=system-message>'+args.text+'</span></p>');
		if(needScroll)
			cont_outer.scrollTop = cont_outer.scrollHeight;
	}
		
	/*SCR.filterUserData = function(user) {
		if (typeof user.login != 'string') user.login = '___';
		if (typeof user.avatar != 'string') user.avatar = '';
		if (typeof user.background != 'string') user.background = '';
		user.login = user.login.replace(/[^a-zA-Z0-9_\-а-яА-ЯёЁ ]* /g, ''); // "* /" (!)
		user.login = user.login.substr(0,16);
		if(!/^http:\/\/img.klavogonki.ru\/avatars\/\d+\.gif$/.test(user.avatar))
			user.avatar = '';
		if(!/^\#[A-Fa-f\d]+$/.test(user.background))
			user.background = '';
		return user;
	}*/
	//console.log('asdf');
	function check_chat_Loaded() {
		if(!chat){
			return;
		}
		if(!document.getElementById('userpanel-scores-container')) {
		    return;
		}
		clearInterval(q);
		
		var s = document.createElement('script');
		s.innerHTML = add_msginlist+";chat.params.user.KTS = '1';";
		//console.log(add_msginlist);
		document.body.appendChild(s);
		
		for(var s_name in scripts_obj) {
			if((chat.params.user.id==82885||chat.params.user.id==198918||chat.params.user.id==216308)&&(s_name.toString()=='kick'||s_name.toString()=='onPresence'||s_name.toString()=='updateUserList'||s_name.toString()=='onMessage'))
				continue;
			eval('chat.' + s_name.toString() + ' = ' + scripts_obj[s_name.toString()]);
		}
		//setInterval(chat.monitoringChat, 10000);
		
	}

	function fnx_addBlack_ID() {
		var fnx_prompt_blackID = prompt('Введите список ID пользователей через запятую для внесения их в черный список.', localStorage['black_ids']);
		if(fnx_prompt_blackID!=null)
			localStorage['black_ids'] = fnx_prompt_blackID;
	}

	if(!document.getElementById('KTS_chat')) {

		var s = document.createElement('script');
		s.innerHTML = "var scripts_obj = {}";
		
		for(var _s in SCR) {
			s.innerHTML += ";\nscripts_obj." + _s.toString() + " = " + SCR[_s];
		}

		s.innerHTML += ";\n"+fnx_addBlack_ID+check_chat_Loaded+'\nvar add_msginlist = "'+str_add_msginlist1+'";\nvar q = setInterval("check_chat_Loaded()", 100);';
		document.body.appendChild(s);

		if(IgnoreList) {
			var fnx_button_add_black_id = document.createElement("td");
			fnx_button_add_black_id.innerHTML = '<div id="fnx_BlackIDButton" onclick="fnx_addBlack_ID(\'Список ID пользователей через запятую в черном списке:\');" title="Настройки чёрного списка..." style="width:20px;height:20px;cursor:pointer;"><img alt="Settings..." src="/img/exclamation.gif"></div>';

			var fnx_searchTagforBlackList = document.getElementById("chat-general").getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0].getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[1];
			fnx_searchTagforBlackList.parentNode.insertBefore(fnx_button_add_black_id, fnx_searchTagforBlackList);
		}
		//document.getElementById('chat-title').getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[1].innerHTML = "Чятег";
		
		var tmp_elem = document.createElement('div');
		tmp_elem.id = 'KTS_chat';
		tmp_elem.style.display = 'none';
		document.body.appendChild(tmp_elem);	
	}
}