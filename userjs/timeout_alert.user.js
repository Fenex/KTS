// ==UserScript==
// @name		kg_timeout_alert
// @author		Fenex, un4given (u.menya.vse@zzzae.biz), originally by Andre Macareno
// @version		3.0.1 KTS
// @description	beeps before game start
// @include		http://klavogonki.ru/g/*
// @include		http://www.klavogonki.ru/g/*
// ==/UserScript==

function try_inject_script()
{
	if(!game) {
		setTimeout(try_inject_script, 500);
		return;
	}
	
	if(game.params.timeout < 45) {
		return;
	}
	
	soundManager.createSound('to_alert', 'http://klavogonki.ru/typo.mp3');
	
	game.to_alert_timer = setInterval(
		function() {
			var time = document.getElementById('waiting_timeout').innerHTML.match(/(\d{2}).(\d{2})/);
			if(!time || time.length!=3)
				return;
			var sec = parseInt(time[2]);
			var min = parseInt(time[1]);
			if(min == 0 && sec < 18) {
				if(game.to_alert_timer)
					clearInterval(game.to_alert_timer);
				soundManager.play("to_alert");
			}
		}, 500);
	
}

function init()
{
	//prevent execution in iframes (FF especially likes this)
	if (parent.location.href != self.location.href) return;
	setTimeout(try_inject_script, 500);
}

if(!document.getElementById('KTS_timeout_alert')) {
	var s = document.createElement('script');
	s.innerHTML = try_inject_script + '('+init+')();';
	document.body.appendChild(s);
	
	var tmp_elem = document.createElement('div');
	tmp_elem.id = 'KTS_timeout_alert';
	tmp_elem.style.display = 'none';
	document.body.appendChild(tmp_elem);
}