// ==UserScript== 
// @name           Klavogonki: average size of the books part
// @namespace      klavogonki
// @version        1.0 KTS
// @include        http://klavogonki.ru/vocs/*
// @author         Lexin
// ==/UserScript== 

if(!document.getElementById('KTS_avgSize_BookPart')) {
	var content = document.getElementsByClassName("user-content")[0].getElementsByTagName("dd")[6]; 
	var textPos = content.innerHTML.indexOf("<div"); 
	var stat = content.innerHTML.substr(0, textPos); 
	var reBlanks = /\s*$/;
	stat = stat.replace(reBlanks, ""); 
	var text = content.innerHTML.substr(textPos); 
	var re = /\d+/g; 
	var parts = re.exec(stat); 
	var length = re.exec(stat); 
	var partLength = length / parts; 
	if (!isNaN(partLength)) 
		content.innerHTML = stat + ", " + partLength.toFixed(0) + " символов на отрывок " + text;
	
	var tmp_elem = document.createElement('div');
	tmp_elem.id = 'KTS_avgSize_BookPart';
	tmp_elem.style.display = 'none';
	document.body.appendChild(tmp_elem);	
}