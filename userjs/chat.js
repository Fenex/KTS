function exe() {
	var chat = null;
		
	var moderators = [
			21,
			97322,
			123190,
			948,
			24119,
			7450,
			122587,
			80142,
			82885,
			150888,
			138413,
			251006,
			263138
	];

	window.recalcFixedChat = function()
	{
		if(!chat)
			return;
		if(MSIE6)
			return;
		if($('chat-wrapper').parentNode.id == 'chat-inline-placeholder')
			return;
		
		var totalHeight = $(document.body).getHeight();
		var viewHeight = document.viewport.getHeight();
		
		var scroll = document.viewport.getScrollOffsets().top;
		
		var offset = $('chat-wrapper').viewportOffset().top;
		if(Prototype.Browser.Opera)
			offset -= scroll;
		
		if(typeof __buggyFixedPosition != 'undefined')
		{
			$('chat-container').style.position = 'absolute';
			$('chat-container').style.top = ( scroll + viewHeight - $('chat-container').getHeight() ) + 'px';
		}
		else
		{		
			$('chat-container').style.bottom = '0px';
			/*if(offset + $('chat-wrapper').getHeight() > viewHeight)
			{
				$('chat-wrapper').addClassName('fixed');
			}
			else
			{
				$('chat-wrapper').removeClassName('fixed');
			}*/
		}
		
		/*var cont = $.select('.messages div').last();
		
		if(cont.scrollTop != cont.scrollHeight)
		{
			cont.scrollTop = cont.scrollHeight;
		}*/
	}

	function xml2array(node)
	{	
		try {
			if( node.firstChild.nodeType == 3 )	// TEXT_NODE
				return node.textContent || node.text;
		} catch (e) {
			return {};
		}

		var result = {};
		for(var i=0;i<node.childNodes.length;i++)
		{
			result[node.childNodes[i].tagName] = xml2array(node.childNodes[i]);
		}
		return result;
			
	}


	function getElementByAttribute( node, tagName, attr, value )
	{
		var elems = node.getElementsByTagName(tagName);
		for(var i=0;i<elems.length;i++)
			if( elems[i].getAttribute(attr) == value )
				return elems[i];
		return null;
	}

	window.toggleChatVisible = function()
	{
		if( $('chat-wrapper').parentNode.id == 'chat-inline-placeholder' )
			return;
		
		$('chat-wrapper').toggleClassName('hidden');
		if( chat.params.game_id )
			setPrefCookie('chat-game-hide', $('chat-wrapper').hasClassName('hidden'));
		else
			setPrefCookie('chat-general-hide', $('chat-wrapper').hasClassName('hidden'));
		recalcFixedChat();
		
		if( $('chat-wrapper').hasClassName('hidden') )
		{
			if(chat.resize)
				delete chat.resize;
			if(chat.active_room == 'general')
				chat.leaveRoom('general');
			
			$$('#chat-title .mostright').last().title = 'Ð Ð°Ð·Ð²ÐµÑ€Ð½ÑƒÑ‚ÑŒ';
		}
		if( !$('chat-wrapper').hasClassName('hidden') )		
		{
			if(chat.active_room == 'general')
			{
				chat.enterRoom('general');
			}
			else
			{
				$$('#chat-title .game.c span').last().removeClassName('new');
				if(chat.blink_new_ingame)
				{
					clearInterval(chat.blink_new_ingame);
					chat.blink_new_ingame = null;
				}
			}
			
			$$('#chat-title .mostright').last().title = 'CÐ²ÐµÑ€Ð½ÑƒÑ‚ÑŒ';
			
		}
	}

	window.toggleChatFixed = function()
	{
		if( $('chat-wrapper').hasClassName('hidden') )
			return;
			
		if( $('chat-wrapper').parentNode.id == 'chat-inline-placeholder' )
		{
			$('chat-fixed-placeholder').appendChild(
				$('chat-inline-placeholder').removeChild($('chat-wrapper')) );
			$('chat-inline-placeholder').hide();	
			
			setPrefCookie('inline_chat', false);
		}
		else
		{
			$('chat-inline-placeholder').show();		
			$('chat-inline-placeholder').appendChild(
				$('chat-fixed-placeholder').removeChild($('chat-wrapper')) );
			
			
			setPrefCookie('inline_chat', true);
			
			setChatHeight( __vk ? 40 : 120, true);
		}
		
		recalcFixedChat();
		
		
	}

	window.chatLeaveRoom = function(room) {
		chat.leaveRoom(room);
	}

	function setChatHeight(height, withMargin)
	{
		var elems = $$('#chat-wrapper .messages-content');
		for(var i=0;i<elems.length;i++)
			elems[i].setStyle({height: height - 6 + 'px'});
		
		elems = $$('#chat-wrapper .userlist-content, #chat-wrapper .smile-tab');			
		for(var i=0;i<elems.length;i++)
			elems[i].setStyle({height: height + 26 + 'px'});
		
		if(withMargin)
			$('chat-wrapper').setStyle({marginTop: height + 5 + 'px'});
		
		setPrefCookie(chat.params.game_id ? 'chat-game-height' : 'chat-general-height', height - 6);
		
		recalcFixedChat();
	}

	function openSmileTab()
	{
		
		$$('#chat-wrapper .userlist-content').each( function(el) { el.toggle(); } );
		$$('#chat-wrapper .smile-tab').each( function(el) { el.toggle(); } );
		$$('#chat-wrapper .smile-btn').each( function(el) { el.toggleClassName('active'); } );
	}

	function insertSmile(smile)
	{
		var input = $('chat-'+chat.active_room).select('input.text').last();
		input.value += ':'+smile+':';
		input.focus();
	}

	function changeChatFilter()
	{
		chat.filter = chat.filter ? 0 : 1;
		if(chat.filter)
			deletePrefCookie('no_chat_filter');
		else
			setPrefCookie('no_chat_filter', 1);
		$$('#chat-wrapper .filter-btn').each( function(el) { el.toggleClassName('active'); } );
	}
		
	var Chat = function(params)
	{
		var _this = this;

		this.params = params;
		this.user_list = new Object();
		this.user_data = new Object();
		this.unvoiced = new Object();
		this.cached_user_ids = new Object();
		this.resize = null;
		this.connected = false;
		this.blink_new_ingame = null;
		this.user_list_dirty = new Object();
		this.real_jids = new Object();
		
		this.role = new Object();
		
		this.filter = 1;
		if(getPrefCookie('no_chat_filter'))	
			this.filter = 0;
		
		
		if( this.params.user )
		{
			if( this.params.user.background.charAt(0) == '#' )
				this.params.user.background = colortools.capByBrightness(this.params.user.background);
			else
				this.params.user.background = 'black';
		}
		
		this.rooms = ['general'];
		
		if(this.params.game_id)
		{
			this.rooms.push('game'+this.params.game_id);
			this.active_room = 'game'+this.params.game_id;
			this.changeActiveRoom('game'+this.params.game_id);
		}
		else
		{
			this.active_room = 'general';
			this.changeActiveRoom('general');
		}
		
		recalcFixedChat();	
		$$('#chat-title .mostright').last().observe( 'click', toggleChatVisible );	
		if(typeof this.params.game_id != 'undefined')
			$$('#chat-title .pin').last().observe( 'click', toggleChatFixed );
		$$('#chat-title .dummy .hide-bar').last().observe( 'click', toggleChatVisible );
		//$$('#chat-title .dummy').last().observe( 'click', shrinkChat );
		
	}

	Chat.prototype.connect = function()
		{
			var _this = this;
			this.connection = new Strophe.Connection('/xmpp-httpbind/');
							
			var jid = 'anon.jabber.klavogonki.ru/web';
			if(this.params.user)
				jid = this.params.user.id + '@jabber.klavogonki.ru/web';
			this.connection.connect(jid,
								   this.params.pass,
								   function(status) { _this.onConnect(status); } );
			
			this.connection.rawInput = function(data)
			{
				if(/\<body\s+type=['"]terminate['"]/.test(data))
				{
					_this.connection.connect(jid,
							   _this.params.pass,
							   function(status) 
					{ 
						_this.onConnect(status);
						if(_this.params.game_id && _this.active_room == 'general')
							_this.enterRoom('general');
						_this.changeActiveRoom(_this.active_room);
							
					} );
					
					_this.connected = false;
				}
			};
		}


	Chat.prototype.onConnect = function(status)
	{
		if (status == Strophe.Status.CONNECTING) {
			
		} else if (status == Strophe.Status.CONNFAIL) {
			
		} else if (status == Strophe.Status.DISCONNECTING) {
			
		} else if (status == Strophe.Status.DISCONNECTED) {
			
		} else if (status == Strophe.Status.CONNECTED) {
					 
			this.connected = true;
			
			var _this = this;
			this.connection.addHandler(function(msg) { return _this.onMessage(msg); }, null, 'message', null, null,  null);
			this.connection.addHandler(function(msg) { return _this.onPresence(msg); }, null, 'presence', null, null,  null);

			for( var i=0;i<this.rooms.length;i++ )
			{
				$('chat-'+this.rooms[i]).select('input.send').last().observe('click', (function(_this,i)	    			
				{
					return function()
					{
						_this.sendMsg(_this.rooms[i]);
					};
				}) (_this,i) );
			}
					
			if(this.params.game_id)
				this.enterRoom('game'+this.params.game_id);
			else if( !$('chat-wrapper').hasClassName('hidden') )
				this.enterRoom('general');
			
			if(this.params.game_id)
			{
				$$('#chat-title .general.c').last().observe( 'click', function() 
				{
					
					_this.enterRoom('general');
					
					_this.changeActiveRoom('general');
				} );
				$$('#chat-title .game.c').last().observe( 'click', function() 
				{
					
					
					_this.leaveRoom('general');
					
					_this.changeActiveRoom('game'+_this.params.game_id);
					
				} );
			}
			
			this.userlist_update_interval = setInterval( function()
			{
				for(var i in _this.rooms)
				{
					var room = _this.rooms[i];
					if(_this.user_list_dirty[room])
					{
						_this.updateUserList(room);
						_this.user_list_dirty[room] = false;
					}
				}
			}, 2000 );
		
		
				
			if(this.params.user)
			{
				var els = $$('#chat-wrapper .send');			
				for( var i=0;i<els.length;i++ )
					els[i].disabled = false;
			}
			
			
			/*this.connection.send(
				$iq( { from: this.connection.jid,
				 id: 'create1',
				 to: this.params.room+'@conference.jabber.klavogonki.ru',
				 type: 'get'} )
				.c( 'query', { xmlns: 'http://jabber.org/protocol/muc#owner' } )
				.tree());*/
			
			
		}
	};

	Chat.prototype.changeActiveRoom = function(room)
	{
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
	}

	Chat.prototype.getXUserdata = function(items)
	{
		var data = $build( 'x', { xmlns: 'klavogonki:userdata' } );
		
		data.c('user');
		
		for(var k in this.params.user)
			if( typeof(this.params.user[k]) == 'string' )
				data.c(k).t(this.params.user[k]).up();
		
		if( this.params.game_id )
			data.up().c('game_id').t(this.params.game_id);
		
		return data;
	}


	Chat.prototype.enterRoom = function(room)
	{
		if(!this.connected)
			return;
		
		var pres = $pres( { 
			from: this.connection.jid,
			to: room+'@conference.jabber.klavogonki.ru/' + Strophe.getNodeFromJid(this.connection.jid) } )
		.c( 'x', { xmlns: 'http://jabber.org/protocol/muc' } )	
		.up();
		
		
		
		if( this.params.user )
		{	
			pres.cnode( this.getXUserdata().tree() );
		}
		
			
		this.connection.send( pres.tree() );

		this.user_list[room] = [];
	}

	Chat.prototype.leaveRoom = function(room)
	{
		if(!this.connected)
			return;
		
		this.connection.send( $pres( { 
			from: this.connection.jid,
			to: room+'@conference.jabber.klavogonki.ru/' + Strophe.getNodeFromJid(this.connection.jid),
			type: 'unavailable' } )		
			.tree()); 
		
		$$('#chat-'+room+' .messages > div > div').last().update('');
		$$('#chat-'+room+' .userlist-content').last().update('');
	}

	Chat.prototype.sendPrivateMsg = function(user_id, msg)
	{			
		var user_name = this.cached_user_ids[user_id];
		this.addMsgInList({
			room: this.active_room,
			text: msg, 
			user_id: this.params.user.id, 
			time: new Date(), 
			type: 'private',
			to: user_name,
			to_id: user_id});
		
		this.connection.send(
				$msg( { 
					from: Strophe.getNodeFromJid(this.connection.jid)+'@jabber.klavogonki.ru/web',
					to: user_id+'@jabber.klavogonki.ru/web',
					type: 'chat' } )
				.c( 'body' )
				.t( msg )
				.up()
				.cnode( this.getXUserdata().tree() )
				.tree() );
		
		$('chat-'+this.active_room).select('input.text').last().value = '<'+user_name+'>';
	}

	Chat.prototype.sendMsg = function(room)
	{
		if(!this.connected)
			return;
			
		var _this = this;
		var msg = $('chat-'+room).select('input.text').last().value;
		
		msg = msg.replace(/^ +$/,'');
		if(msg.length == 0)
			return;
			
		var to,type;
			
		var m = msg.match(/^<(.*?)>(.*)$/);	
		
		msg = msg.replace(/</,'&lt;');
		msg = msg.replace(/>/,'&gt;');
		
		msg = msg.replace(/&/,'&amp;');
		
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
						var json;
						eval('json='+transport.responseText+';');
						if(!json.id)
						{
							popalert('ÐŸÐ¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»ÑŒ Ñ Ñ‚Ð°ÐºÐ¸Ð¼ Ð¸Ð¼ÐµÐ½ÐµÐ¼ Ð½Ðµ Ð½Ð°Ð¹Ð´ÐµÐ½.');
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
	//			return;
			
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

	Chat.prototype.onMessage = function(msg) 
	{
		try {
			var _this = this;
			
			var to = msg.getAttribute('to');
			var from = msg.getAttribute('from');
			var elems = msg.getElementsByTagName('body');
			
			var room;
				
			if (elems.length > 0) {
				var body = elems[0];	
				
				var user_id, type;
				if(msg.getAttribute('type') == 'groupchat')
				{
					type = 'normal';
					user_id = Strophe.getResourceFromJid(from);
					room = Strophe.getNodeFromJid(from);
				}
				else
				{
					type = 'private';
					user_id = Strophe.getNodeFromJid(from);
					room = this.active_room;	
					if(!this.real_jids[user_id] || /@anon/.test(this.real_jids[user_id]))
						return true;
				}
				
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
					console.lo
					time = new Date( Date.UTC(m[1],m[2]-1,m[3],m[4],m[5],m[6]) );
				}
				
				this.addMsgInList({
					room: room,
					text: Strophe.getText(body), 
					user_id: user_id, 
					time: time, 
					type: type });
				
				
				
			}
		}
		catch(e) {		
		}
		return true;
	}

	Chat.prototype.addMsgInList = function(args)
	{
		if(args.user_id.length > 7)
			return;
		
		var _this = this;
		
		var user = this.user_data[args.user_id].user;
		
		var time = args.time.getHours().format() + ':' + args.time.getMinutes().format() + ':' + args.time.getSeconds().format();
		
		var room_html = '';
		if(args.type == 'game')
			room_html = '<span class=room>[Ð·Ð°ÐµÐ·Ð´]</span>';
		if(args.type == 'private')
		{
			if(args.to)
				room_html = '<a class="room private">[ÑˆÐµÐ¿Ñ‡ÐµÑ‚ '+args.to+']</a>';
			else
				room_html = '<a class="room private">[ÑˆÐµÐ¿Ñ‡ÐµÑ‚ Ð²Ð°Ð¼]</a>';
		}
		
		var cont_outer = $('chat-'+args.room).select('.messages > div').last();
		var cont = $('chat-'+args.room).select('.messages > div > div').last(); 
		
		var needScroll = (cont_outer.scrollTop+cont_outer.getHeight()) >= cont_outer.scrollHeight;
		
		args.text = args.text.replace(/</g, '&lt;');
		args.text = args.text.replace(/>/g, '&gt;');
		
		// game link parse
		args.text = args.text.replace(/http:\/\/(?:www\.)?klavogonki\.ru\/g\/\?gmid=(\d+)\&?/g, '[<a class="gamelink-not-resolved gamelink-$1" href="/g/?gmid=$1">Ð—Ð°ÐµÐ·Ð´ #$1</a>]');
		args.text = args.text.replace(/(https?:\/\/[^ '"]*)/g, '<a target=_blank href="$1">$1</a>');
		
		// Ð¼Ð°Ñ‚
		if(this.filter)
		{
			var replace_str = '$1<span class=censored>[Ð²Ñ‹Ñ€ÐµÐ·Ð°Ð½Ð¾]</span>';
			args.text = args.text.replace(/Â­/g,'');
			args.text = ' '+args.text+' ';
			args.text = args.text.replace(/([^Ð°-ÑÐ-Ð¯])[Ð°-ÑÐ-Ð¯]*[Ñ…xÎ§]+[Ñƒy]+[eÐµÐ¸Ð¹ÑÑ‘]+[Ð°-ÑÐ-Ð¯]*(?=[^Ð°-ÑÐ-Ð¯])/gi, replace_str);
			args.text = args.text.replace(/([^Ð°-ÑÐ-Ð¯])[Ñ…xÎ§]+[Ñƒy]+ÑŽ+[Ð°-ÑÐ-Ð¯]*(?=[^Ð°-ÑÐ-Ð¯])/gi, replace_str);
			args.text = args.text.replace(/([^Ð°-ÑÐ-Ð¯])[Ð°-ÑÐ-Ð¯]*Ð¼+Ñƒ+Ð´+[^Ñ€Ñ]+[Ð°-ÑÐ-Ð¯]*(?=[^Ð°-ÑÐ-Ð¯])/gi, replace_str);
			args.text = args.text.replace(/([^Ð°-ÑÐ-Ð¯])[Ð°-ÑÐ-Ð¯]*[Ð°ÐµeoÐ¸Ð¾ÑƒÑ‹ÑŒÑŠ]+[eÐµÑ‘]+Ð±+[Ð°-ÑÐ-Ð¯]*(?=[^Ð°-ÑÐ-Ð¯])/gi, replace_str);
			args.text = args.text.replace(/([^Ð°-ÑÐ-Ð¯])[eÐµÑ‘]+Ð±+[Ð°-ÑÐ-Ð¯]*(?=[^Ð°-ÑÐ-Ð¯])/gi, replace_str);
			args.text = args.text.replace(/([^Ð°-ÑÐ-Ð¯])[Ð°-ÑÐ-Ð¯]*Ð¿+[Ð¸eÐµÑ‘]+[cÑÐ·]+Ð´+[Ð°-ÑÐ-Ð¯]*(?=[^Ð°-ÑÐ-Ð¯])/gi, replace_str);
			args.text = args.text.replace(/([^Ð°-ÑÐ-Ð¯])[Ð°-ÑÐ-Ð¯]*Ð±+Ð»+Ñ+Ð´+[Ð°-ÑÐ-Ð¯]*(?=[^Ð°-ÑÐ-Ð¯])/gi, replace_str);
			args.text = args.text.replace(/([^Ð°-ÑÐ-Ð¯])Ð±+Ð»+Ñ+[Ð°-ÑÐ-Ð¯]*(?=[^Ð°-ÑÐ-Ð¯])/gi, replace_str);
			args.text = args.text.replace(/([^Ð°-ÑÐ-Ð¯])[Ð°-ÑÐ-Ð¯]*Ð¿+Ð¸+Ð´+[Ð¾ÐµÐ°eo]+[Ñ€p]+[Ð°-ÑÐ-Ð¯]*(?=[^Ð°-ÑÐ-Ð¯])/gi, replace_str);
			args.text = args.text.replace(/([^Ð°-ÑÐ-Ð¯])[Ð°-ÑÐ-Ð¯]*Ð³+[aoÐ°Ð¾]+Ð²+[eÐµÑ‘]*Ð½+[Ð°-ÑÐ-Ð¯]*(?=[^Ð°-ÑÐ-Ð¯])/gi, replace_str);
			args.text = args.text.replace(/([^Ð°-ÑÐ-Ð¯])[cÑ]+Ñ†*Ñƒ+[ÐºÑ‡]+[eÐµaoÐ°Ð¾Ð¸]+[Ð°-ÑÐ-Ð¯]*(?=[^Ð°-ÑÐ-Ð¯])/gi, replace_str);
			args.text = args.text.replace(/^ (.*) $/,'$1');
		}
		
		// Ð´Ð»Ð¸Ð½Ð½Ñ‹Ðµ ÑÑ‚Ñ€Ð¾ÐºÐ¸
		while(/([^\/ Â­]{40,})([^\/ Â­]{40,})/.test(args.text))
		{
			args.text = args.text.replace(/([^\/ Â­]{40,})([^\/ Â­]{40,})/, '$1Â­$2');
		}
		args.text = args.text.replace(/Â­/, '<wbr/>');
		
		// ÑÐ¼Ð°Ð¹Ð»Ñ‹
		var smilies = {
			smile: /(:-\)|:\)|:smile:)/g,
			biggrin: /(:-D|:D|:biggrin:)/g,
			angry: /(>:\(|:angry:)/g,
			blink: /(oO|Oo|o_O|O_o|Ð¾Ðž|ÐžÐ¾|Ð¾_Ðž|Ðž_Ð¾|:blink:)/g,
			blush: /:blush:/g,
			cool: /(8\)|:cool:)/g,
			dry: /:dry:/g,
			excl: /:excl:/g,
			happy: /(\^\^|\^_\^|:happy:)/g,
			huh: /:huh:/g,
			laugh: /:laugh:/g,
			mellow: /:mellow:/g,
			ohmy: /:ohmy:/g,
			ph34r: /:ph34r:/g,
			rolleyes: /:rolleyes:/g,
			sad: /(:\(|:-\(|:sad:)/g,
			sleep: /:sleep:/g,
			tongue: /(:P|:-P|:Ð |:-Ð |:tongue:)/g,
			unsure: /:unsure:/g,
			wacko: /(\%\)|:wacko:)/g,
			wink: /(;\)|;-\)|:wink:)/g,
			wub: /:wub:/g,
			first: /:first:/g,
			second: /:second:/g,
			third: /:third:/g,
			power: /:power:/g,
			badcomp: /:badcomp:/g,
			complaugh: /:complaugh:/g,
			girlnotebook: /:girlnotebook:/g,
			crazy: /:crazy:/g,
			boredom: /:boredom:/g,
			cry: /:cry:/g,
			bye: /:bye:/g,
			dance: /:dance:/g,
			gamer: /:gamer:/g,
			rofl: /:rofl:/g,
			beer: /:beer:/g,
			kidtruck: /:kidtruck:/g,
			angry2: /:angry2:/g,
			spiteful: /:spiteful:/g,
			sorry: /:sorry:/g,
			boykiss: /:boykiss:/g,
			girlkiss: /(:girlkiss:|:\*|:-\*)/g,
			kissed: /:kissed:/g,
			yes: /:yes:/g,		
			no: /:no:/g,
			hi: /:hi:/g,
			ok: /:ok:/g		
		};

		for(var name in smilies)
		{			
			args.text = args.text.replace(smilies[name], '<img class=smile src="/img/smilies/'+name+'.gif" alt=":'+name+':" title=":'+name+':">');
		}
		
		args.text = args.text.replace(/script/g, 'sÑript');
		
		var $el;
		
		if(args.type == 'system')
			$el = $$$('<p><span class=time>['+time+']</span><span class=system-message>ÐŸÐ¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»ÑŒ '+user.login+' '+args.text+'</span></p>');	
		else if(args.type == 'private')
			$el = $$$('<p><span class=time>['+time+']</span><span class=username style="color:'+user.background+'">&lt;<span data-user="'+args.user_id+'">'+user.login+'</span>&gt;</span>'+room_html+'<span class=private>'+args.text+'</span></p>');
		else if(args.user_id == '324864')
			$el = $$$('<p><span class=time>['+time+']</span><span class=system-message>&lt;ÐšÐ»Ð°Ð²Ð¾Ð±Ð¾Ñ‚&gt; '+room_html+args.text+'</span></p>');
		else if(args.text.match(/^\/me/))
			$el = $$$('<p><span class=time>['+time+']</span><span class=system-message>'+user.login+' '+args.text.replace('/me','')+'</span></p>');
		else
			$el = $$$('<p><span class=time>[<span>'+time+'</span>]</span><span class=username style="color:'+user.background+'">&lt;<span data-user="'+args.user_id+'">'+user.login+'</span>&gt;</span>'+room_html+args.text+'</p>');
		
		if(args.type == 'private')
		{
			$el.find('.private').click(function() {
				if(args.to)
					_this.insertPrivate(args.to_id);
				else
					_this.insertPrivate(args.user_id);
			})				
		}
		
		$el.find('.username span').click(function(e) {
			var user_id = this.getAttribute('data-user');
			
			if(e.ctrlKey) {
				window.open('http://klavogonki.ru/profile/' + user_id);
				window.focus();
			}
			else if(e.altKey&&_this.params.user.moderator)
				_this.kick(user_id);
			else
				_this.insertPrefix(user_id);
		})
		
		if(args.room == 'general')
			$el.find('.time span').addClass('clickable').click(function() {
				window.open('http://klavogonki.ru/chatlogs/'+args.time.getFullYear()+'-'+(args.time.getMonth()+1).format()+'-'+args.time.getDate().format()+'.html#'+time, '_blank');
				window.focus();
			})
		
		cont.insert($el.get(0));
		
		// ÑÑÑ‹Ð»ÐºÐ¸ Ð½Ð° Ð¸Ð³Ñ€Ñ‹
		var links = cont.select('.gamelink-not-resolved');
		for(var i=0;i<links.length;i++)
		{
			var m = links[i].className.match(/gamelink-(\d+)/);
			var els = $$('.gamelink-not-resolved.gamelink-'+m[1]);
			for(var j=0;j<els.length;j++)
				els[j].removeClassName('gamelink-not-resolved');
			new Ajax.Request( '/ajax/fetchgameinfo', {
				method: 'get',
				parameters: {
					game: m[1] },
				onSuccess: function(transport)
				{
					var json;
					eval('json='+transport.responseText+';');
					var text = '';
					if(json.type == 'practice')
						return;
					if(json.type == 'private')
						text = 'Ð˜Ð³Ñ€Ð° Ñ Ð´Ñ€ÑƒÐ·ÑŒÑÐ¼Ð¸ ';
					if(json.type == 'normal')
						text = 'ÐžÑ‚ÐºÑ€Ñ‹Ñ‚Ð°Ñ Ð¸Ð³Ñ€Ð° ';
					if(json.competition)
					{
						text = 'Ð¡Ð¾Ñ€ÐµÐ²Ð½Ð¾Ð²Ð°Ð½Ð¸Ðµ '
						if(json.regular_competition)
							text += '(x'+json.regular_competition+') ';
					}
					text += json.gametype_html;
					var els = $$('.gamelink-'+json.game_id);
					for(var j=0;j<els.length;j++)
						els[j].update(text);
				}});
		}
		
		
		
		if(needScroll)
			cont_outer.scrollTop = cont_outer.scrollHeight;
		
		// Ð¼Ð¸Ð³Ð°ÐµÐ¼ ÑƒÐ²ÐµÐ´Ð¾Ð¼Ð»ÐµÐ½Ð¸ÐµÐ¼
		if( args.room != 'general' && 
			(this.active_room == 'general' || $('chat-wrapper').hasClassName('hidden')) && 
			this.blink_new_ingame == null)
			this.blink_new_ingame = setInterval(function()
			{
				$$('#chat-title .game.c span').last().toggleClassName('new');
			}, 500);
	}

	Chat.prototype.onPresence = function(msg) 
	{
		try {
			if(!(/^[a-z0-9_-]+@conference.jabber.klavogonki.ru\/\d+$/.test(msg.getAttribute('from'))))
				return true;
			
			var user_id = Strophe.getResourceFromJid(msg.getAttribute('from'));
			var room = Strophe.getNodeFromJid(msg.getAttribute('from'));
			this.real_jids[user_id] = '';
			
			var x = getElementByAttribute(msg, 'x', 'xmlns', 'http://jabber.org/protocol/muc#user');;
			if(x) {					
				var items = x.getElementsByTagName('item');		
				if(items.length) {
					var jid = items[0].getAttribute('jid');
					if(jid) {
						this.real_jids[user_id] = jid;
						
						if(/@anon/.test(jid))
							return true;
					}
				}
			}
			
			if(this.user_list[room] == undefined)
				this.user_list[room] = [];
				
			
			// REMOVE
			if(msg.getAttribute('type') == 'unavailable')
			{
				if( this.user_list[room].indexOf(user_id) != -1 )
					this.user_list[room].splice( this.user_list[room].indexOf(user_id), 1 );		
				this.user_list_dirty[room] = true;
			}
			// ERROR
			else if(msg.getAttribute('type') == 'error')
			{
				
			}
			// ADD 
			else
			{	
				
				if(this.user_list[room].indexOf(user_id) == -1)
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
				
				
				x = getElementByAttribute(msg, 'x', 'xmlns', 'http://jabber.org/protocol/muc#user');
				if(x)
				{
					
					var item = x.getElementsByTagName('item');
								
					// Ð»Ð¸ÑˆÐµÐ½Ð¸Ðµ Ð³Ð¾Ð»Ð¾ÑÐ°
					if(item[0].getAttribute('role') == 'visitor') {
						
						if(this.params.user && user_id == this.params.user.id)
						{					
							$$('#chat-general .messages input').each(function (el){ 
								el.disabled = true;
							});
							$$('#chat-general .messages input.text').each(function (el){ 
								el.value = "Ð’Ñ‹ Ð½Ðµ Ð¼Ð¾Ð¶ÐµÑ‚Ðµ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð»ÑÑ‚ÑŒ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ñ Ð² ÑÑ‚Ð¾Ñ‚ Ñ‡Ð°Ñ‚";
							});									
						}
						
						this.unvoiced[user_id] = true;
						this.updateUserList(room);
					}
					
					// Ð²Ð¾ÑÑÑ‚Ð°Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ
					if(item[0].getAttribute('role') == 'participant') {
						if(this.params.user && user_id == this.params.user.id) {
							$$('#chat-general .messages input').each(function (el){ 
								el.disabled = false;
							});
							$$('#chat-general .messages input.text').each(function (el){ 
								el.value = "";
							});
						}
						
						this.unvoiced[user_id]= false;
						this.updateUserList(room);
					}
					
				}
			}
			
			
		}
		catch(e) {		
		}
		return true;
		
	}

	Chat.prototype.updateUserList = function(room)
	{
		var _this = this;
		
		this.user_list[room].sort( function (a,b) 
			{
				if(!_this.user_data[a] || !_this.user_data[a].user || !_this.user_data[a].user.login)
					return 0;
				if(!_this.user_data[b] || !_this.user_data[b].user || !_this.user_data[b].user.login)
					return 0;
				var a_login = String.prototype.toLowerCase ? _this.user_data[a].user.login.toLowerCase() : _this.user_data[a].user.login;
				var b_login = String.prototype.toLowerCase ? _this.user_data[b].user.login.toLowerCase() : _this.user_data[b].user.login;
				return ( a_login < b_login ? -1 : ( a_login > b_login ? 1 : 0 ) );
			} );
		
		var html = '';
		for(var i in this.user_list[room])
		{		
			var user_id = this.user_list[room][i];
			if ((typeof user_id == 'function') || (user_id.toString().length > 7))
				continue;
			
			if(user_id == "21" || user_id == "324864")
				continue;
			
			var item = this.user_data[user_id];
					
			var avatar_html = '';
			if(item.user.avatar)
				avatar_html = 'style="background: transparent url('+item.user.avatar+') no-repeat 0% 0%"';
			
			var game_html = '';
			if(item.game_id && room == 'general' )
				game_html = 'Ð² Ð¸Ð³Ñ€Ðµ';
			
			var moderator_tools = '';
			if(room == 'general' && this.params.user && moderators.indexOf(this.params.user.id) != -1)
				moderator_tools = ' <div class=moderator-tools><a class=kick-btn data-user="'+user_id+'">&times;</a></div>';
			
			var icons = '<a class=info title="ÐŸÑ€Ð¾Ñ„Ð¸Ð»ÑŒ" href="/profile/'+Strophe.getNodeFromJid(this.real_jids[user_id])+'/"><img src="/img/information-small.png"></a>';
			if(moderators.indexOf(parseInt(this.real_jids[user_id])) != -1)
				icons += '<img src="/img/moderator_icon-2.gif" style="position: relative; top: 2px" title="ÐœÐ¾Ð´ÐµÑ€Ð°Ñ‚Ð¾Ñ€">';
			
			html += '<ins class="user'+user_id+' '+(this.unvoiced[user_id] ? 'revoked' : '')+'"><a class=name '+avatar_html+' title="ÐÐ°Ð¿Ð¸ÑÐ°Ñ‚ÑŒ Ð² Ð¿Ñ€Ð¸Ð²Ð°Ñ‚" data-user="'+user_id+'">'+item.user.login+'</a>'+icons+moderator_tools+game_html+'</ins>';
					
			
		}
		
		$('chat-'+room).select('.userlist-content').last().update(html);
		
		$$$('#chat-'+room+' .moderator-tools .kick-btn').click(function() {
			_this.kick(this.getAttribute('data-user'));
		})
		
		$$$('#chat-'+room+' ins .name').click(function() {
			_this.insertPrivate(this.getAttribute('data-user'));
		})
		
	}

	Chat.prototype.insertPrivate = function(user_id)
	{
		var input = $('chat-'+this.active_room).select('input.text').last();
		input.value = '<'+this.user_data[user_id].user.login+'>';
		input.focus();
	}

	Chat.prototype.insertPrefix = function(user_id)
	{
		var input = $('chat-'+this.active_room).select('input.text').last();
		input.value += this.user_data[user_id].user.login+', ';
		input.focus();
	}

	Chat.prototype.kick = function(user_id)
	{
		var item = this.user_data[user_id];
		var _this = this;
		
		var name = user_id;
		if(item && item.user && item.user.login)
			name = item.user.login;
		popconfirm('Ð—Ð°Ð±Ð»Ð¾ÐºÐ¸Ñ€Ð¾Ð²Ð°Ñ‚ÑŒ Ð¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ñ‚ÐµÐ»Ñ '+name+' Ð½Ð° <select id=chat_kick_period><option value=1>1 Ð¼Ð¸Ð½ÑƒÑ‚Ñƒ</option><option value=5>5 Ð¼Ð¸Ð½ÑƒÑ‚</option><option value=10>10 Ð¼Ð¸Ð½ÑƒÑ‚</option><option value=30>30 Ð¼Ð¸Ð½ÑƒÑ‚</option><option value=60>1 Ñ‡Ð°Ñ</option><option value=180>3 Ñ‡Ð°ÑÐ°</option><option value=360>6 Ñ‡Ð°ÑÐ¾Ð²</option><option value=720>12 Ñ‡Ð°ÑÐ¾Ð²</option><option value=1440>ÑÑƒÑ‚ÐºÐ¸</option><option value=4320>3 ÑÑƒÑ‚Ð¾Ðº</option></select><br/>ÐŸÑ€Ð¸Ñ‡Ð¸Ð½Ð°: <input type=text id=chat_kick_reason>',
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

	Chat.prototype.grantModerator = function(user_id)
	{
		this.connection.send(
				$iq( { 
					from: this.connection.jid,
					id: 'admin1',
					//to: 'general@conference.jabber.klavogonki.ru',
					to: 'general@conference.jabber.klavogonki.ru',
					type: 'set' } )
				.c( 'query', { xmlns: 'http://jabber.org/protocol/muc#admin' } )
				.c( 'item', { jid: user_id+'@jabber.klavogonki.ru', affiliation: 'admin' } )
				.up().up()
				.tree() );
		
		this.connection.send(
			$iq( { 
				from: this.connection.jid,
				id: 'mod1',			
				//to: 'general@conference.jabber.klavogonki.ru',
				to: 'game21339@conference.jabber.klavogonki.ru',
				type: 'set' } )
			.c( 'query', { xmlns: 'http://jabber.org/protocol/muc#admin' } )
			.c( 'item', { nick: user_id, role: 'moderator' } )
			.up().up()
			.tree() );
	}

	Chat.prototype.revokeModerator = function(user_id)
	{
		this.connection.send(
				$iq( { 
					from: this.connection.jid,
					id: 'admin2',
					to: 'general@conference.jabber.klavogonki.ru',
					type: 'set' } )
				.c( 'query', { xmlns: 'http://jabber.org/protocol/muc#admin' } )
				.c( 'item', { jid: user_id+'@jabber.klavogonki.ru', affiliation: 'member' } )
				.up().up()
				.tree() );
		
		this.connection.send(
			$iq( { 
				from: this.connection.jid,
				id: 'mod2',
				to: 'general@conference.jabber.klavogonki.ru',
				type: 'set' } )
			.c( 'query', { xmlns: 'http://jabber.org/protocol/muc#admin' } )
			.c( 'item', { nick: user_id, role: 'participant' } )
			.up().up()
			.tree() );
	}

	Chat.prototype.grantAllModerators = function() {
		for(var i=0;i<moderators.length;i++)
			this.grantModerator(moderators[i]);
	}

	Chat.prototype.filterUserData = function(user) {
		if (typeof user.login != 'string') user.login = '___';
		if (typeof user.avatar != 'string') user.avatar = '';
		if (typeof user.background != 'string') user.background = '';
		user.login = user.login.replace(/[^a-zA-Z0-9_\-а-яА-ЯёЁ ]*/g, '');
		user.login = user.login.substr(0,16);
		if(!/^http:\/\/img.klavogonki.ru\/avatars\/\d+\.gif$/.test(user.avatar))
			user.avatar = '';
		if(!/^\#[A-Fa-f\d]+$/.test(user.background))
			user.background = '';
		return user;
	}
	
	chat = new Chat({"user":{"id":82885,"login":"Fenex","avatar":"http:\/\/img.klavogonki.ru\/avatars\/82885.gif","background":"#009900","moderator":"1"},"pass":"9c13ef74168f1277df3dec5748d66ec1"});
}

var script = document.createElement('script');
script.innerHTML = exe + "\r\nexe();";
document.body.appendChild(script);