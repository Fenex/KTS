// ==UserScript==
// @name           BB-Tools
// @version        2.5.4
// @namespace      klavogonki
// @author         Fenex
// @description    BB-Tools in forum and comments.
// @include        http://klavogonki.ru/forum*
// @include        http://klavogonki.ru/profile/*
// @include        http://klavogonki.ru/vocs/*
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
function getCursorPos(input) {
	var result = {start: 0, end: 0};
	if (input.setSelectionRange) {
		result.start = input.selectionStart;
		result.end = input.selectionEnd;
	}
	else if (!document.selection) 
		return false;
	else if (document.selection.createRange) {
		var range = document.selection.createRange();
		var stored_range = range.duplicate();
		stored_range.moveToElementText(input);
		stored_range.setEndPoint('EndToEnd', range);
		result.start = stored_range.text.length - range.text.length;
		result.end = result.start + range.text.length;
	}
	return result;
}
function insertTag(startTag, endTag, txtId ) {
	var txtarea = document.getElementById(txtId);
	txtarea.focus();
	var scrtop = txtarea.scrollTop;
	var cursorPos = getCursorPos(txtarea);
	var txt_pre = txtarea.value.substring(0, cursorPos.start);
	var txt_sel = txtarea.value.substring(cursorPos.start, cursorPos.end);
	var txt_aft = txtarea.value.substring(cursorPos.end);
	if (endTag==1){txt_sel="";endTag="";}
	if (cursorPos.start == cursorPos.end)
		var nuCursorPos = cursorPos.start + startTag.length;
	else
		var nuCursorPos=String(txt_pre + startTag + txt_sel + endTag).length;
	txtarea.value = txt_pre + startTag + txt_sel + endTag + txt_aft;
	returnCursor(txtarea,nuCursorPos,nuCursorPos);
	if (scrtop)
		txtarea.scrollTop = scrtop;
}
function sendBBTag(tagName, txtId) {
	var startTag = '[' + tagName + ']';
	var endTag = '[/' + tagName + ']';
	insertTag(startTag, endTag, txtId);
	return false;
}
function returnCursor(txtarea, start, end) {
	if(txtarea.createTextRange) 
	{
		var range = txtarea.createTextRange();
		range.move("character", start);
		range.select();
	} 
	else if (txtarea.selectionStart) 
		txtarea.setSelectionRange(start, end);
}
function sendBBTag_prompt(param, txtId) {
	var txtarea = document.getElementById(txtId);
	var cPos = getCursorPos(txtarea);
	switch (param) {
		case 'url':
			var href = prompt('Пожалуйста, введите полный URL адрес', 'http://');
			if(typeof(href)=='object') {return;}
			var user_txt = "";
			if(cPos.start==cPos.end) {
				user_txt = prompt('Пожалуйста, введите заголовок для этого пункта', txtarea.value.substring(cPos.start, cPos.end));
				if(typeof(user_txt)=='object') {return;}
				insertTag('[url="' + href + '"]'+user_txt+'[/url]', '', txtId);
			}
			else
			insertTag('[url="' + href + '"]', '[/url]', txtId);
		
			break;
		case 'img':
			var href = prompt('Пожалуйста, введите URL адрес для этого изображения', txtarea.value.substring(cPos.start, cPos.end));
			if(typeof(href)=='object'){return;}
			insertTag('[img]' + href + '[/img]', 1, txtId);
			break;
		case 'color':
			var href = prompt('Пожалуйста, введите название цвета, либо его код', '#000000');
			if(typeof(href)=='object'){return;}
			if(cPos.start==cPos.end) {
				var user_txt = prompt('Пожалуйста, введите текст', txtarea.value.substring(cPos.start, cPos.end));
				if(typeof(user_txt)=='object'){return;}
				insertTag('[color="' + href + '"]'+user_txt+'[/color]', '', txtId);
			}
			else
				insertTag('[color="' + href + '"]', '[/color]', txtId);
			break;
		case 'background':
			var href = prompt('Пожалуйста, введите название цвета, либо его код', '#000000');
			if(typeof(href)=='object') {return;}
			if(cPos.start==cPos.end) {
				user_txt = prompt('Пожалуйста, введите текст', txtarea.value.substring(cPos.start, cPos.end));
				if(typeof(user_txt)!='object'){return;}
				insertTag('[background="' + href + '"]'+user_txt+'[/background]', '', txtId);
			}
			else
				insertTag('[background="' + href + '"]', '[/background]', txtId);
			break;
		case 'size':
			var href = prompt('Пожалуйста, введите размер шрифта', '2');
			if(typeof(href)=='object'){return;}
			if(cPos.start==cPos.end) {
				user_txt = prompt('Пожалуйста, введите текст', txtarea.value.substring(cPos.start, cPos.end));
				if(typeof(user_txt)=='object'){return;}
				insertTag('[size="' + href + '"]'+user_txt+'[/size]', '', txtId);
			}
			else
				insertTag('[size="' + href + '"]', '[/size]', txtId);
			break;
		default:
			alert('error');
			break;
	}
}
function sendBBTag_list(txtId) {
	var txtarea = document.getElementById(txtId);
	var txt = '[list';
	var list_type = true;
	if(confirm('Создать нумерованный список?'))
		txt += '=1]\n';
	else
		txt +=']\n';
	var a = '0';
	for(;;) {
		var a = prompt('Сколько создать пунктов?', '0');
		if(typeof(a)=='object'){return;}
		if((parseInt(a).toString()=='NaN')||(parseInt(a)<0)) {
			if(confirm('Ошибка при вводе. Повторить?'))
				continue;
			else
				return;
		}
		else {
			a = parseInt(a);
			break;
		}
	}
	if(a==0)
		a = 100;
	for(i=1;i<=a;i++) {
		var j = prompt('Введите текст '+i+': ','');
		if(typeof(j)=='object')
			break;
		txt +='[*]'+j+'\n';
	}
	txt += '[/list]';
	insertTag(txt, '', txtId);
}	
function generateButtonsCode(a) {
return '<div class="bb_tools" id="bb_tools_'+a+'"><img title="Полужирный" src="http://klavogonki.ru/img/forum/rte-bold.png" onclick="sendBBTag(\'b\', \''+a+'_textarea\');" /><img title="Курсив" src="http://klavogonki.ru/img/forum/rte-italic.png" onclick="sendBBTag(\'i\', \''+a+'_textarea\');" /><img title="Подчеркивание" src="http://klavogonki.ru/img/forum/rte-underlined.png" onclick="sendBBTag(\'u\', \''+a+'_textarea\');" /><img title="Зачеркнутый" src="http://klavostat.ru/icon/strike.PNG" onclick="sendBBTag(\'s\', \''+a+'_textarea\');" /><img title="Вставить ссылку" src="http://klavogonki.ru/img/forum/rte-link-button.png" onclick="sendBBTag_prompt(\'url\', \''+a+'_textarea\');" /><img title="Вставить изображение" src="http://klavogonki.ru/img/forum/rte-image-button.png" onclick="sendBBTag_prompt(\'img\', \''+a+'_textarea\');" /><img title="Цитата" src="http://klavogonki.ru/img/forum/rte-quote-button.png" onclick="sendBBTag(\'quote\', \''+a+'_textarea\');" /><img title="Цитата выделенного" src="http://klavogonki.ru/img/forum/rte-quotesel-button.png" onclick="ips_text_editor_lite(\''+a+'\');selected = $selection.getText();ipb_quotesel();" /><img title="Скрытый текст" src="http://klavogonki.ru/img/forum/rte-hide-button.png" onclick="sendBBTag(\'hide\', \''+a+'_textarea\');" /><img title="По левому краю" src="http://klavostat.ru/icon/left.PNG" onclick="sendBBTag(\'left\', \''+a+'_textarea\');" /><img title="По центру" src="http://klavostat.ru/icon/center.PNG" onclick="sendBBTag(\'center\', \''+a+'_textarea\');" /><img title="По правому краю" src="http://klavostat.ru/icon/right.PNG" onclick="sendBBTag(\'right\', \''+a+'_textarea\');" /><img title="Сдвиг" src="http://klavostat.ru/icon/tab.PNG" onclick="sendBBTag(\'list\', \''+a+'_textarea\');" /><img title="Степень" src="http://klavostat.ru/icon/sup.PNG" onclick="sendBBTag(\'sup\', \''+a+'_textarea\');" /><img title="Индекс" src="http://klavostat.ru/icon/sub.PNG" onclick="sendBBTag(\'sub\', \''+a+'_textarea\');" /><img title="Размер текста" src="http://klavostat.ru/icon/size.PNG" onclick="sendBBTag_prompt(\'size\', \''+a+'_textarea\');" /><img title="Цвет текста" src="http://klavostat.ru/icon/color.PNG" onclick="sendBBTag_prompt(\'color\', \''+a+'_textarea\');" /><img title="Цвет фона" src="http://klavostat.ru/icon/background.PNG" onclick="sendBBTag_prompt(\'background\', \''+a+'_textarea\');" /><img title="Вставить список" src="http://klavostat.ru/icon/list.PNG" onclick="sendBBTag_list(\''+a+'_textarea\');" /><img title="Код" src="http://klavostat.ru/icon/code.PNG" onclick="sendBBTag(\'code\', \''+a+'_textarea\');" /><img title="HTML-Код" src="http://klavostat.ru/icon/html.PNG" onclick="sendBBTag(\'html\', \''+a+'_textarea\');" /><img title="Смайлы" src="http://klavogonki.ru/img/smilies/smile.gif" onclick="smileTab_func(\''+a+'\');" /><select style="vertical-align: top;" id="BBtools_color" onchange="insertTag(\'[color=#\'+this.value+\']\', \'[/color]\', \''+a+'_textarea\');this.selectedIndex = 0;"><option value="0">ВЫБОР ЦВЕТА</option><option value="061956" style="color:#061956">Экстракибер</option><option value="2E32CE" style="color:#2E32CE">Кибергонщик</option><option value="5E0B9E" style="color:#5E0B9E">Супермен</option><option value="BC0143" style="color:#BC0143">Маньяк</option><option value="BA5800" style="color:#BA5800">Гонщик</option><option value="8C8100" style="color:#8C8100">Профи</option><option value="187818" style="color:#187818">Таксист</option><option value="4F9A97" style="color:#4F9A97">Любитель</option><option value="8D8D8D" style="color:#8D8D8D">Новичок</option><option value="3D4856" style="color:#3D4856">Абракадабра</option><option value="698725" style="color:#698725">Яндекс.Рефераты</option><option value="4692AA" style="color:#4692AA">Безошибочный</option><option value="D43E68" style="color:#D43E68">Марафон</option><option value="B55900" style="color:#B55900">Буквы</option><option value="833F3A" style="color:#833F3A">Спринт</option><option value="524CA7" style="color:#524CA7">По словарю</option></select></div>';
}
function innerButtonsCode(i) {
	var tmp = document.getElementById(i+'-controls');
	tmp.style.display = 'none';
	var e = document.createElement('span');
	e.innerHTML = generateButtonsCode(i);
	tmp.parentNode.insertBefore(e, tmp);
}
function smileTab_func(a) {
	if(tab_smiles==a) {
		tab_smiles = 0;
		$('table_smiles').hide();
	}
	else { 
		tab_smiles=a;
		$('table_smiles').show();
	}
}
function insertSmileInPost(a) {	
	insertTag('[img]http://klavogonki.ru/img/smilies/'+a+'.gif[/img]', '', tab_smiles+'_textarea');
}
function Obj(a) {
	if((DragObj)&&(!a)) {
		clearInterval(window.timeout_smiletable);
		localStorage.setItem('smileTab_Xpos', DragObj.style.left);
		localStorage.setItem('smileTab_Ypos', DragObj.style.top);
		DragObj = null;
		return;
	}
	if((!DragObj)&&(a)) {
	    DragObj = document.getElementById('table_smiles');
		window.timeout_smiletable = setInterval('move_smileTable()', 10);
		return;
    }
}
function move_smileTable() {
	if(DragObj) {  
		//document.getElementById('userpanel-scores').innerHTML = (window.mouseX-document.documentElement.scrollLeft) + " | " + (window.mouseY-document.documentElement.scrollTop);
        DragObj.style.left = window.mouseX-(document.documentElement.scrollLeft ||  document.body.scrollLeft)-15+"px";
        DragObj.style.top = window.mouseY-(document.documentElement.scrollTop || document.body.scrollTop)-15+"px";
    }
}
if(!document.getElementById('KTS_BB_Tools')) {
	var post_elems = document.getElementsByClassName('post-container');
	for (i=0;i<post_elems.length;i++) {
		if(!(post_elems[i].id)){continue;}
		var index_post = post_elems[i].id.substring(5);
		innerButtonsCode('text-'+index_post);
	}
	if(document.getElementById('fast-reply_textarea')) {
	innerButtonsCode('fast-reply');
	}
	if(document.getElementById('text_textarea')) {
	innerButtonsCode('text');
	}
	if(document.getElementById('message_textarea')) {
	innerButtonsCode('message');
	}
	if(document.getElementById('bio_textarea')) {
	innerButtonsCode('bio');
	}
	var st = document.createElement('style');
	st.innerHTML = 'div.bb_tools img{cursor:pointer;}#table_smiles{font-size:12px;margin:0 0 2em;position:fixed;z-index:7;}.popup-box table{border-collapse:collapse;border-bottom:0px;}div#table_smiles table tr td.c img{cursor:pointer;}.popup-box .move {-moz-background-clip:border;-moz-background-inline-policy:continuous;-moz-background-origin:padding;background:#ffffff none repeat scroll 0 0;cursor:move;height:10px;position:absolute;left:12px;top:12px;width:10px;z-index:2;}.popup-box .move ins {-moz-background-clip:border;-moz-background-inline-policy:continuous;-moz-background-origin:padding;background:transparent url(http://klavogonki.ru/img/chat/dragdrop.gif) no-repeat scroll 0 0;height:10px;position:absolute;width:10px;}';
	document.body.appendChild(st);

	var s1 = document.createElement('script');
	s1.textContent = "var DragObj = null;var tab_smiles;\n"+sendBBTag+"\n"+sendBBTag_prompt+"\n"+insertTag+"\n"+getCursorPos+"\n"+returnCursor+"\n"+generateButtonsCode+"\n"+innerButtonsCode+"\n"+sendBBTag_list+"\n"+insertSmileInPost+"\n"+smileTab_func+"\n"+move_smileTable+"\n"+Obj+"\n";
	document.body.appendChild(s1);

	var sm = document.createElement('div');
	sm.innerHTML = '<div style="display:none; width:300px; top:'+localStorage.getItem('smileTab_Ypos')+'; left:'+localStorage.getItem('smileTab_Xpos')+';" id="table_smiles" class="popup-box"><table><tbody><tr><td class="tl"></td><td class="t"></td><td class="tr"></td></tr><tr><td class="l"></td><td class="c"><img alt="smile" onclick="insertSmileInPost(\'smile\');" src="/img/smilies/smile.gif" /><img alt="biggrin" onclick="insertSmileInPost(\'biggrin\');" src="/img/smilies/biggrin.gif"><img alt="angry" onclick="insertSmileInPost(\'angry\');" src="/img/smilies/angry.gif"><img alt="angry2" onclick="insertSmileInPost(\'angry2\');" src="/img/smilies/angry2.gif"><img alt="blink" onclick="insertSmileInPost(\'blink\');" src="/img/smilies/blink.gif"><img alt="blush" onclick="insertSmileInPost(\'blush\');" src="/img/smilies/blush.gif"><img alt="cool" onclick="insertSmileInPost(\'cool\');" src="/img/smilies/cool.gif"><img alt="dry" onclick="insertSmileInPost(\'dry\');" src="/img/smilies/dry.gif"><img alt="excl" onclick="insertSmileInPost(\'excl\');" src="/img/smilies/excl.gif"><img alt="happy" onclick="insertSmileInPost(\'happy\');" src="/img/smilies/happy.gif"><img alt="huh" onclick="insertSmileInPost(\'huh\');" src="/img/smilies/huh.gif"><img alt="laugh" onclick="insertSmileInPost(\'laugh\');" src="/img/smilies/laugh.gif"><img alt="mellow" onclick="insertSmileInPost(\'mellow\');" src="/img/smilies/mellow.gif"><img alt="ohmy" onclick="insertSmileInPost(\'ohmy\');" src="/img/smilies/ohmy.gif"><img alt="ph34r" onclick="insertSmileInPost(\'ph34r\');" src="/img/smilies/ph34r.gif"><img alt="rolleyes" onclick="insertSmileInPost(\'rolleyes\');" src="/img/smilies/rolleyes.gif"><img src="/img/smilies/sad.gif" alt="sad" onclick="insertSmileInPost(\'sad\');"><img src="/img/smilies/sleep.gif" alt="sleep" onclick="insertSmileInPost(\'sleep\');"><img src="/img/smilies/tongue.gif" alt="tongue" onclick="insertSmileInPost(\'tongue\');"><img src="/img/smilies/unsure.gif" alt="unsure" onclick="insertSmileInPost(\'unsure\');"><img src="/img/smilies/wacko.gif" alt="wacko" onclick="insertSmileInPost(\'wacko\');"><img src="/img/smilies/wink.gif" alt="wink" onclick="insertSmileInPost(\'wink\');"><img src="/img/smilies/wub.gif" alt="wub" onclick="insertSmileInPost(\'wub\');"><img src="/img/smilies/power.gif" alt="power" onclick="insertSmileInPost(\'power\');"><img src="/img/smilies/spiteful.gif" alt="spiteful" onclick="insertSmileInPost(\'spiteful\');"><img src="/img/smilies/sorry.gif" alt="sorry" onclick="insertSmileInPost(\'sorry\');"><img src="/img/smilies/first.gif" alt="first" onclick="insertSmileInPost(\'first\');"><img src="/img/smilies/second.gif" alt="second" onclick="insertSmileInPost(\'second\');"><img src="/img/smilies/third.gif" alt="third" onclick="insertSmileInPost(\'third\');"><img alt="badcomp" onclick="insertSmileInPost(\'badcomp\');" src="/img/smilies/badcomp.gif"><img src="/img/smilies/complaugh.gif" alt="complaugh" onclick="insertSmileInPost(\'complaugh\');"><img src="/img/smilies/girlnotebook.gif" alt="girlnotebook" onclick="insertSmileInPost(\'girlnotebook\');"><img src="/img/smilies/crazy.gif" alt="crazy" onclick="insertSmileInPost(\'crazy\');"><img src="/img/smilies/boredom.gif" alt="boredom" onclick="insertSmileInPost(\'boredom\');"><img src="/img/smilies/cry.gif" alt="cry" onclick="insertSmileInPost(\'cry\');"><img src="/img/smilies/bye.gif" alt="bye" onclick="insertSmileInPost(\'bye\');"><img src="/img/smilies/dance.gif" alt="dance" onclick="insertSmileInPost(\'dance\');"><img src="/img/smilies/gamer.gif" alt="gamer" onclick="insertSmileInPost(\'gamer\');"><img src="/img/smilies/rofl.gif" alt="rofl" onclick="insertSmileInPost(\'rofl\');"><img src="/img/smilies/beer.gif" alt="beer" onclick="insertSmileInPost(\'beer\');"><img src="/img/smilies/kidtruck.gif" alt="kidtruck" onclick="insertSmileInPost(\'kidtruck\');"><img src="/img/smilies/boykiss.gif" alt="boykiss" onclick="insertSmileInPost(\'boykiss\');"><img src="/img/smilies/girlkiss.gif" alt="girlkiss" onclick="insertSmileInPost(\'girlkiss\');"><img src="/img/smilies/kissed.gif" alt="kissed" onclick="insertSmileInPost(\'kissed\');"><img src="/img/smilies/yes.gif" alt="yes" onclick="insertSmileInPost(\'yes\');"><img src="/img/smilies/no.gif" alt="no" onclick="insertSmileInPost(\'no\');"><img src="/img/smilies/hi.gif" alt="hi" onclick="insertSmileInPost(\'hi\');"><img src="/img/smilies/ok.gif" alt="ok" onclick="insertSmileInPost(\'ok\');"></td><td class="r"></td></tr><tr><td class="bl"></td><td class="b"></td><td class="br"></td></tr></tbody></table><div class="close"><ins onclick="tab_smiles = 0;$(\'table_smiles\').hide();"></ins></div><div class="move"><ins onmousedown="Obj(true);" onmouseup="Obj(false);"></ins></div></div>';

	var tmp = document.getElementById('head');
	tmp.parentNode.insertBefore(sm, tmp);

	var tmp_elem = document.createElement('div');
	tmp_elem.id = 'KTS_BB_Tools';
	tmp_elem.style.display = 'none';
	document.body.appendChild(tmp_elem);	
}
