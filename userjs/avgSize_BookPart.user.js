// ==UserScript== 
// @name           Klavogonki: average size of the books part
// @namespace      klavogonki
// @version        1.0
// @include        http://klavogonki.ru/vocs/*
// @author         Lexin
// ==/UserScript== 

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