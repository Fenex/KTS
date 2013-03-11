if(!localStorage['KTSInfo']) {
	localStorage['KTSInfo'] = '0';
}

function getKTSInfo_1(xml) {
	var i = parseInt(localStorage['KTSInfo']);
	while(xml.getElementById(i.toString())) {
		i++;
	}
	i--;
	if(i.toString()!=localStorage['KTSInfo']) {
		var elem = xml.getElementById(i.toString());
		localStorage['KTSInfo'] = i.toString();
		if(userid!=161212) {
			alertKTS(elem.getElementsByTagName('img')[0].textContent, elem.getElementsByTagName('title')[0].textContent, elem.getElementsByTagName('text')[0].textContent, elem.getElementsByTagName('url')[0].textContent, '2');
		}
	}
	return true;
}

function getKTSInfo() {
	new Ajax.Request('http://rybnoe-ozero.ru/KG/KTS/news.xml', {
		method: 'POST',
		parameters: { },
		onSuccess: function(transport)
		{
			getKTSInfo_1(transport.responseXML);
		}});
}

setInterval(getKTSInfo, 1000 * 60 * 10);