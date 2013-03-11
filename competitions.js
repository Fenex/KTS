var var_notifier = {
	rate: 0,
	gmid: 0
	};
	
var competition_timer = false;
var competition_timer_show = false;	

function check_competition() {
	new Ajax.Request('http://klavogonki.ru/gamelist.data?KTS_REQUEST', {
		method: 'post',
		parameters: { cached_users: '0' },
		onSuccess: function(transport)
		{
			var obj = JSON.parse(transport.responseText);
			//alert(obj.gamelist[0].params.competition);
			if(!obj.gamelist[0].params.competition)
				return false;
				
			var server_time = obj.time;
			var rate = obj.gamelist[0].params.regular_competition;
			var begintime = obj.gamelist[0].begintime;			
			var gmid = obj.gamelist[0].id;
			
			clearTimeout(competition_timer);
			
			if(begintime - server_time <= 0) {
				competition_timer = setTimeout(check_competition, 120 * 1000);
				return false;
			}
						
			competition_timer = setTimeout(check_competition, (begintime - server_time + 120) * 1000); //start + 2 min
			
			var bool = false;
			
			if(!rate)
				rate = 1;
				
			switch (rate) {
				case 1:
					if(KlavoTools.notifications.x1)
						bool = true;
				break;
				case 2:
					if(KlavoTools.notifications.x2)
						bool = true;
				break;
				case 3:
					if(KlavoTools.notifications.x3)
						bool = true;
				break;
				case 5:
					if(KlavoTools.notifications.x5)
						bool = true;
				break;
				default:
				break;
			}
			if(bool) {
				var timer = ((begintime - server_time - KlavoTools.notifications.timeout) < 1) ? 1 : (begintime - server_time - KlavoTools.notifications.timeout);
				var_notifier.rate = rate.toString();
				var_notifier.gmid = gmid.toString();

				competition_timer_show = setTimeout( function() {
							alertKTS('img/icon/comp_btn.png', 'Соревнование', 'Соревнование x'+var_notifier.rate+' начинается.', 'http://klavogonki.ru/g/?gmid='+var_notifier.gmid, '1');
						},
						timer * 1000 );
				
				setTimeout( function() {
							if(notifiers.comp_notifier) {
								notifiers.comp_notifier.cancel();
								notifiers.comp_notifier = false;
							}
						},
						(begintime - server_time) * 1000 );
			
			
			
			}
			
			return true;
		}
	});
}

if(KlavoTools.notifications.timeout)
	competition_timer = setTimeout(check_competition, 1);