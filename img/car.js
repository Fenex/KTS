/*var str_listitem = "var Listitem = Class.create"+
"({"+
	"initialize: function(info,time)"+
	"{"+
		"this.update(info,time);"+
	"},"+
	"update: function(info,time)"+
	"{"+
		"this.info = info;"+
		
		"var tpl = tplListitem;"+

		"info.html_custominfo = '<div class=custominfo><span class=gametype-normal>Обычный</span></div>';"+
		"info.remain = '00:30';"+
		"if(info.custom)"+
		"{"+
		
			"info.html_custominfo = '<div class=custominfo>';"+
			"var custominfo = new Array();"+
			
			"if(info.params.level_from>1 || info.params.level_to<8)"+
			"{			"+
				"var level_hash = new Array('Новички','Любители','Таксисты','Профи','Гонщики','Маньяки','Супермены','Кибергонщики');"+
				"if(info.params.level_from==info.params.level_to)"+
					"custominfo.push(level_hash[info.params.level_from-1]);"+
				"else {"+
					"custominfo.push(level_hash[info.params.level_from-1]+'&nbsp;&mdash;&nbsp;'+level_hash[info.params.level_to-1]); }"+
			"}		"+
			"if(info.params.gametype == 'normal')"+
				"custominfo.push('<span class=gametype-normal>Обычный</span>');			"+
			"if(info.params.gametype == 'sprint')"+
				"custominfo.push('<span class=gametype-sprint>Спринт</span>');"+
			"if(info.params.gametype == 'marathon')"+
				"custominfo.push('<span class=gametype-marathon>Марафон</span>');"+
			"if(info.params.gametype == 'noerror')"+
				"custominfo.push('<span class=gametype-noerror>Безошибочный</span>');"+
			"if(info.params.gametype == 'abra')"+
				"custominfo.push('<span class=gametype-abra>Абракадабра</span>');"+
			"if(info.params.gametype == 'digits')"+
				"custominfo.push('<span class=gametype-digits>Цифры</span>');"+
			"if(info.params.gametype == 'chars')"+
				"custominfo.push('<span class=gametype-chars>Буквы</span>');"+
			"if(/voc"+"\\"+"\-[0-9]+/.test(info.params.gametype))"+
				"custominfo.push('<span class=gametype-voc>По словарю <span style="+"\\"+"\"white-space:nowrap;"+"\\"+"\">&laquo;<a href="+"\\"+"\"/vocs/'+info.params.voc.id+'/"+"\\"+"\">'+info.params.voc.name+'</a>&raquo;</span></span>');"+
			"if(info.params.gametype == 'referats')"+
				"custominfo.push('<span class=gametype-referats>Яндекс.Рефераты</span>');"+

			"var regular_competition_html = '';"+
			"if(info.params.regular_competition)"+
				"regular_competition_html = tplRegularCompetition.evaluate(info);"+
			
			"info.html_custominfo = '<div class=custominfo>'+custominfo.join('<br>')+regular_competition_html+'</div>';"+

			"if(info.type == 'open' && !info.begintime)"+
			"{"+
				"var timeout_hash = {"+
                    "t5: '00:05',"+
					"t10: '00:10',"+
					"t20: '00:20',"+
					"t30: '00:30',"+
					"t45: '00:45',"+
					"t60: '01:00',"+
					"t120: '02:00',"+
					"t180: '03:00'};			"+
				"info.remain = timeout_hash['t'+info.params.timeout];"+
			"}"+
		"}"+
		
		
		
		
		"this.begintime = 0;		"+

		"if(info.params && info.params.competition)			"+
		"{"+
			"info.competition_html = 'competition';"+
		"}"+
		"info.enter_html = tplEnterDisabled.evaluate(info); 	"+
		"if(info.type == 'open')"+
		"{			"+
			"if(info.begintime)"+
			"{"+
				"var now = new Date();"+
				"this.begintime = info.begintime - time + now.getTime() / 1000;"+
				"var timeout = info.begintime-time;"+
				"info.remain = ((timeout/60).format()+':'+(timeout%60).format());"+
				"if(info.allowed && timeout>=7)"+
					"info.enter_html = tplEnter.evaluate(info); 	"+
				"info.html_status = tplStatus.time.evaluate(info);"+
			"}"+
			"else"+
			"{"+
				"if(info.allowed)"+
					"info.enter_html = tplEnter.evaluate(info);"+
				
				"info.html_status = tplStatus.paused.evaluate(info);"+
			"}"+
		"}"+
		"else"+
		"{"+
			"info.html_status = tplStatus.active.evaluate(info);"+
		"}"+
		
		"info.players_html = new String();"+
		"var max_players_width = 4 + Math.floor( ( $('content').getWidth() - 850 ) / 120 );"+
		"if(max_players_width < 4)"+
			"max_players_width = 4;"+

		"var reduced_display = info.players.length > max_players_width;"+
		"if(reduced_display)"+
			"var players_html_arr = new Array();"+
		"else {"+
			"info.players_html = '<table class=normal-display><tr>'; }"+
		"for(var i=0;i<info.players.length;i++)"+
		"{"+
			"if(info.players[i].user != null)"+
			"{"+
				"if(cached_users[info.players[i].user] == undefined)"+
				"{"+
					"cached_users[info.players[i].user] = clone(info.players[i]);"+
				"}"+
				
				"var player_data = clone(cached_users[info.players[i].user]);"+
				
				"player_data.id = info.players[i].id;"+
				"player_data.leave = info.players[i].leave;"+
				"player_data.rating7 = info.players[i].rating7;"+
			"}"+
			"else {"+
				"var player_data = info.players[i]; }"+
						
			"if(player_data.avatar)"+
			"{"+
				"player_data.avatar_html = '<i style="+"\\"+"\"background: white url('+player_data.avatar+') no-repeat 0% 50%;"+"\\"+"\"></i>';"+
				"player_data.padding_name = 'padding: 0 20px;';"+
			"}"+
			
			"if(!__user_prefs.no_colored_rangs)"+
				"player_data.rang = 'rang'+player_data.level;"+
			
			"if(reduced_display)"+
			"{"+
				"var tpl_player = player_data.user ? tplUserReducedPlayer : tplAnonymReducedPlayer;"+
				"players_html_arr.push(tpl_player.evaluate(player_data));"+
			"}"+
			"else"+
			"{"+
				"player_data.color = '#000000';"+
				"if(/#[a-fA-F0-9]+/.test(player_data.background))"+
					"player_data.color = colortools.capByBrightness(player_data.background);"+
			
				"if(player_data.rating7)"+
					"player_data.rating_html = tplRatingSignPlayer.evaluate(player_data);"+
	
				
				"if(player_data.leave)"+
				"{"+
					"if(!Prototype.Browser.IE) "+
						"player_data.opacity_name = 'opacity: 0.3';"+
					"if(Prototype.Browser.Opera)"+
						"player_data.background = 'white';"+	
					"player_data.opacity = 'opacity: 0.3';"+
				"}"+
				
				
			
				"var tpl_players = tplAnonymPlayer;"+
				"if(player_data.user)"+
					"tpl_players = tplUserPlayer;	"+
                "if(player_data.user!=82885) {"+
    				"info.players_html += tpl_players.evaluate(player_data);"+
                "} else {"+
                    "var tmp = tpl_players.evaluate(player_data);"+
                    "var i1 = tmp.indexOf('car-base');"+
                    "i1 = tmp.indexOf('style', i1);"+
                    "tmp.indexOf('"+"\\"+"\"', i1);"+
                    "var str1 = tmp.substring(0, i1+7);"+
                    "var str2 = tmp.substring(i1+7);"+
                    "window.ttt1 = tmp;"+
                    "i1 = str1.indexOf('style');"+
                    "var i2 = str1.indexOf('style', i1);"+
                    "str1 = str1.substring(0, i1) + str1.substring(i2+1);"+
                    "info.players_html += str1 + 'background:white url(http://rybnoe-ozero.ru/KG/KTS/car/suzuki_sx4_HB_whitebg_2.png) no-repeat;' + str2"+
                    //"info.players_html += tmp.replace(/background["+"\\"+"\: "+"\\"+"\'"+"\\"+"\/"+"\\"+"\."+"\\"+"\("+"\\"+"\w"+"\\"+"\d]+"+"\\"+"\/aero"+"\\"+"\/["+"\\"+"\d"+"\\"+"\-"+"\\"+"\."+"\\"+"\w"+"\\"+"\?"+"\\"+"\'"+"\\"+"\)]+;/g, '');"+
                    
                "}"+
			"}"+
		"}"+
		
		"if(reduced_display)"+
		"{"+
			"var rows = Math.ceil(info.players.length / (__vk ? 3 : 6));"+
			"if(rows < 3)"+
				"rows = 3;"+
			"var cols = Math.ceil(info.players.length / rows);"+
			"if(__vk && cols > 3)"+
			"{"+
				"cols = 3;"+
				"rows = Math.ceil(info.players.length / cols);"+
			"}"+
			"info.players_html += '<table class=reduced-display>';"+
			"for(var iRow=0; iRow < rows; iRow++)"+
			"{"+
				"info.players_html += '<tr>';"+
				"for(var iCol=0; iCol < cols; iCol++)"+
				"{"+
					"info.players_html += '<td>';"+
					"var idx = iRow + iCol*rows; 					"+
					"info.players_html += idx < players_html_arr.length ? players_html_arr[idx] : '&nbsp;';"+
					"info.players_html += '</td>';					"+
				"}"+
				"info.players_html += '</tr>';"+
			"}"+
			"info.players_html += '</table>';"+
		"}"+
		"else {"+
			"info.players_html += '</tr></table>'; }"+
				
		"var html = tpl.evaluate(info);"+
		"if($('game'+info.id))"+
		"{"+
			"if($('game'+info.id).prev == info.prev)"+
			"{"+
				"$('game'+info.id).replace(html);"+
			"}"+
			"else"+
			"{"+
				"$('game'+info.id).remove();"+
				"if($('game'+info.prev))		"+
					"$('game'+info.prev).insert({after:html});"+
				"else {"+
					"dbg('Prev game container "+"\\"+"\"game'+info.prev+'"+"\\"+"\" not found.'); }"+
			"}"+
		"}"+
		"else"+
		"{"+
			"if($('game'+info.prev))		"+
				"$('game'+info.prev).insert({after:html});"+
			"else {"+
				"dbg('Prev game container "+"\\"+"\"game'+info.prev+'"+"\\"+"\" not found.'); }"+
		"}"+
		
		"if($('game'+info.id))		"+
			"$('game'+info.id).prev = info.prev;"+
		"else {"+
			"dbg('Game container "+"\\"+"\"game'+info.id+'"+"\\"+"\" not found.'); }"+
		
		"for(var i=0;i<info.players.length;i++)"+
		"{"+
			"if(info.players[i].leave && !reduced_display)"+
			"{				"+
				"$('imgcont'+info.players[i].id).setOpacity(0.3);"+
      			"if(!Prototype.Browser.IE)"+
					"$('player_name'+info.players[i].id).setOpacity(0.3);"+
			"}"+
		"}"+
        "window.ert1 = info;"+
	"}"+
"});";*/

function checkProfilePage4Car() {
    if (!document.getElementById('profile-block')) {
        setTimeout('checkProfilePage4Car()', 70);
        return false;
    }
    //document.getElementById("profile-block").getElementsByClassName("title")[0].innerHTML = "Маньяк ";
    if(/klavogonki\.ru\/profile\/82885/.test(location.href)) {
        /*var e = false;

        if(document.getElementsByClassName('car-base_')[0])
            e = document.getElementsByClassName('car-base_')[0];
        else if(document.getElementsByClassName('car-base_1')[0])
            e = document.getElementsByClassName('car-base_1')[0];
        else if(document.getElementsByClassName('car-base_2')[0])
            e = document.getElementsByClassName('car-base_2')[0];
        else if(document.getElementsByClassName('car-base_3')[0])
            e = document.getElementsByClassName('car-base_3')[0];
        if(e)
            e.style.setProperty('background', 'white url(http://rybnoe-ozero.ru/KG/KTS/car/suzuki_sx4_HB_whitebg_2.png) no-repeat', '');
*/
        if(/car/.test(location.href)) {
            var div = document.createElement('div');
            div.setAttribute('class', 'car');
            div.setAttribute('id', 'kts1');
            div.innerHTML = '<div class="car-title">Suzuki SX4</div><div class="imgcont car-img" style="background: white; margin: 0 auto;"><div class="img kts1 car-img" style="background: transparent url(http://rybnoe-ozero.ru/KG/KTS/car/suzuki_sx4_HB_whitebg_2.png) no-repeat; color: #1F5460; margin-left: 0; margin-top: 0;"></div></div>';
            var tmp = document.getElementById('profile-block').getElementsByClassName('my')[0].getElementsByClassName('car')[0];
            tmp.parentNode.insertBefore(div, tmp);

            div = document.createElement('div');
            div.setAttribute('class', 'car');
            div.setAttribute('id', 'kts2');
            div.innerHTML = '<div class="car-title">Suzuki Grand Vitara</div><div class="imgcont car-img" style="background: #A299D8; margin: 0 auto;"><div class="img kts1 car-img" style="background: transparent url(http://rybnoe-ozero.ru/KG/KTS/car/suzuki_grand_vitara_100x50.png) no-repeat; color: #1F5460; margin-left: 0; margin-top: 0;"></div></div>';
            tmp.parentNode.insertBefore(div, tmp);

            div = document.createElement('div');
            div.setAttribute('class', 'car');
            div.setAttribute('id', 'kts3');
            div.innerHTML = '<div class="car-title">Subaru Forester</div><div class="imgcont car-img" style="background: yellow; margin: 0 auto;"><div class="img kts1 car-img" style="background: transparent url(http://rybnoe-ozero.ru/KG/KTS/car/subaru_forester_100x50.png) no-repeat; color: #1F5460; margin-left: 0; margin-top: 0;"></div></div>';
            tmp.parentNode.insertBefore(div, tmp);

            div = document.createElement('div');
            div.setAttribute('class', 'car');
            div.setAttribute('id', 'kts4');
            div.innerHTML = '<div class="car-title">ВАЗ 2121</div><div class="imgcont car-img" style="background: #b0446a; margin: 0 auto;"><div class="img kts1 car-img" style="background: transparent url(http://rybnoe-ozero.ru/KG/KTS/car/vaz_2121_100x50.png) no-repeat; color: #1F5460; margin-left: 0; margin-top: 0;"></div></div>';
            tmp.parentNode.insertBefore(div, tmp);
        }
    }
}

function checkGamePage4Car() {
    if(!document&&!document.body)
        setTimeout('checkGamePage4Car()', 500);
    var bool = false;
    var e = document.getElementById('players').getElementsByClassName('car');
    for(var i=0; i<e.length; i++) {
        if(e[i].getElementsByClassName('nick_content')[0].getElementsByTagName('a')[0].innerHTML=='Fenex') {
            e[i].getElementsByClassName('imgcont')[0].getElementsByTagName('div')[0].style.setProperty('background', 'white url(http://rybnoe-ozero.ru/KG/KTS/car/suzuki_sx4_HB_whitebg_2.png) no-repeat', '');
            bool = true;
            break;
        }
    }

    if(game&&game.gamestatus=='racing')
        bool = true;

    if(!bool)
        setTimeout('checkGamePage4Car()', 500);
}

function checkGameListPage4Car() {
    if(!Class) {
        setTimeout('checkGameListPage4Car()', 100);
        return false;
    }
    var s = document.createElement('script');
    s.innerHTML = str_listitem;
    document.body.appendChild(s);
}

var script = document.createElement("script");
if(/klavogonki\.ru\/profile\/82885/.test(location.href)) {
    script.innerHTML = checkProfilePage4Car + ';checkProfilePage4Car();';
}/*
else if(/klavogonki\.ru\/g\//.test(location.href)) {
    script.innerHTML = checkGamePage4Car + ';checkGamePage4Car();';
} else if(/klavogonki\.ru\/gamelist/.test(location.href)) {
    script.innerHTML = 'var str_listitem = "' + str_listitem+'";' + checkGameListPage4Car + ';checkGameListPage4Car();';
}*/

function try_insert() {
    if(!document||!document.body||!document.body.appendChild) {
        setTimeout('try_insert()', 100);
        return false;           
    }
    document.body.appendChild(script); 
}

try_insert();