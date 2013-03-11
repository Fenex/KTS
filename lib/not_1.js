var n = {};
n.title = localStorage['notification_title'];
n.text = localStorage['notification_text'];
n.img = localStorage['notification_img'];
n.url = localStorage['notification_url'];
n.mode = localStorage['notification_mode'];
function OpenURL() {
	if(n.url!='false')
		chrome.tabs.create({url: n.url});
	if(n.mode=='1') {
		chrome.extension.sendRequest({reason: "closeNotifComp"}, function(response) {});
	}
	else if(n.mode=='3') {
		chrome.extension.sendRequest({reason: "closeNotifMsg"}, function(response) {});
	}
}
document.addEventListener('click', OpenURL);

//set background of notification
if(n.mode=='2')
	document.write('<style>body{font-size: 10pt;background: #F2F4FF;}body table{border:1px;}</style>');
else if(n.mode=='3')
	document.write('<style>body{font-size: 10pt;background: #FBE6B0;}body table{border:1px;}</style>');
else
	document.write('<style>body{font-size: 10pt;}body table{border:1px;}</style>');

if(n.mode=='1'||n.mode=='2'||n.mode=='3') {
document.write('<table width="100%">');
	document.write('<tr>');
		document.write('<td width="64px" rowspan="2">');
			document.write("<img style='cursor:pointer;' width='64px' height='64px' src='" + n.img + "' /" + ">");
		document.write('</td>');
		document.write('<td><b>');
			document.write(n.title);
		document.write('</b></td>');
	document.write('</tr>');
	document.write('<tr>');
		document.write('<td>');
			document.write(n.text);
		document.write('</td>');
	document.write('</tr>');
document.write('</table>');
//} else if(n.mode=='3') {
//	document.write('<div><b><i>Новое личное сообщение</i></b>'+n.title+'</div>');
//	document.write(n.text);
} else {
	document.write('<div><b><i>Прямой эфир: </i></b>'+n.title+'</div>');
	document.write(n.text);
}