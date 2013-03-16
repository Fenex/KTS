var q1 = false;

function slowHide(d) {
	d++;
    if(d==256) {
        $('checkbox_status_saved').innerHTML = '&nbsp;';
        return;
    }
    var str = d.toString(16);
    if(str.length==1)
        str = '0' + str;
    str += str + str;
    $('checkbox_status_saved').style.color = '#' + str;
    q1 = setTimeout( function() { slowHide(d) }, 12);
}

function showAnswer(answer) {
	if(answer=='ok') {
		$('checkbox_status_saved').innerHTML = 'Настройки сохранены.';
        $('checkbox_status_saved').style.color = '#000000';
	} else {
		$('checkbox_status_saved').innerHTML = 'Ошибка сохранения.';
        $('checkbox_status_saved').style.color = 'red';
	}
	if(q1)
		clearTimeout(q1);
    if(answer=='ok')    
        q1 = setTimeout( function() { slowHide(0); }, 1500);
}

function changeTimeoutValue() {
	var flag = (document.getElementById('timeout_value').selectedIndex==0) ? true : false;
	var e = document.getElementById('KTS_notifications').getElementsByClassName('user_set');
	for(var i=0;i<e.length-2;i++)
		e[i].disabled = flag;

	return;
}

function getCheckedStyle() {
	var style = 'beige';
	if ($('KTS_style_radio_blue').checked) {
		style = 'blue';
	}
	else if ($('KTS_style_radio_gray').checked) {
		style = 'gray';
	}
	else if ($('KTS_style_radio_pink').checked) {
		style = 'pink';
	}
	else if ($('KTS_style_radio_green').checked) {
		style = 'green';
	}
	
	return style;
}

function setSettings() {
	var settings = JSON.parse(localStorage['settings']);
	
	var e = document.getElementById('KTS_scripts').getElementsByClassName('user_set');
	for(i=0;i<e.length;i++)
		settings.userjs[e[i].getAttribute('name')] = e[i].checked ? true : false;
	
	e = document.getElementById('KTS_notifications').getElementsByClassName('user_set');
	for(i=0;i<e.length;i++)
		settings.notifications[e[i].getAttribute('name')] = e[i].checked ? true : false;

	settings.style = getCheckedStyle();
	
	//если все хХ отключены, отключаем таймер
	e = document.getElementById('KTS_notifications').getElementsByClassName('user_set');
	var flag_disabled = true;
	for(var i=0;i<e.length-2;i++) {
		if(e[i].checked) {
			flag_disabled = false;
			break;
		}
	}
	if(flag_disabled) {
		document.getElementById('timeout_value').selectedIndex = 0;
		changeTimeoutValue();
	}

	settings.notifications.timeout = parseInt(document.getElementById('timeout_value').value);
	
	localStorage['settings'] = JSON.stringify(settings);
	
	chrome.extension.sendRequest({reason: "setSettings"}, function(response) {showAnswer(response.answer)});
}

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#timeout_value').addEventListener('change', changeTimeoutValue);
	document.querySelector('#btn_save').addEventListener('click', setSettings);
});

//window.onkeypress = function(){if(window.event.keyCode.toString()=='111'){showDevCheckBox()}};