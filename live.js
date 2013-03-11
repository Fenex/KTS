var live_pubDate = {};
live_pubDate.date = new Date('1970');
live_pubDate.status = false;
//live_pubDate.status = true; //DEBUG
live_pubDate.msg = new Array();

var KTS_live_timer = false;
var array_news = new Array();

function getLive_1(xml) {
	var items = xml.getElementsByTagName('item');
	for(var i=0; i<items.length; i++) {
		if(live_pubDate.date < new Date(items[i].getElementsByTagName('pubDate')[0].textContent)) {
			live_pubDate.date = new Date(items[i].getElementsByTagName('pubDate')[0].textContent);
		}
	}
	live_pubDate.status = true;
	return true;
}

function getLive_2(xml) {
	var items = xml.getElementsByTagName('item');
	for(var i=0; i<items.length; i++) {
		if(live_pubDate.date < new Date(items[i].getElementsByTagName('pubDate')[0].textContent)) {
			live_pubDate.msg[live_pubDate.msg.length] = items[i];
		}
	}
	/************ DEBUG ***************
	*
	*	for(var i=0; i<2; i++) {
	*		live_pubDate.msg[live_pubDate.msg.length] = items[i];
	*	}
	**********************************/
	var date = new Date('1970');
	var timeout = 1;
	array_news = new Array();
	for(var i=0; i<live_pubDate.msg.length; i++) {
		if(date < new Date(live_pubDate.msg[i].getElementsByTagName('pubDate')[0].textContent)) {
			date = new Date(live_pubDate.msg[i].getElementsByTagName('pubDate')[0].textContent);
		}
		live_pubDate.date = date;
		var title = live_pubDate.msg[i].getElementsByTagName('title')[0].textContent.replace(/[\t\r\n]/g, '').replace(/["']/g, '\"');
		var description = live_pubDate.msg[i].getElementsByTagName('description')[0].textContent.replace(/[\t\r\n]/g, '').replace(/["']/g, '\"');
		var link = live_pubDate.msg[i].getElementsByTagName('link')[0].textContent.replace(/[\t\r\n]/g, '').replace(/["']/g, '\"');
		ktslog("live2. title: " + title + "; link: " +  link);
		array_news.push({title: title, description: description, link: link});		
	}
	ktslog('array_news:');
	ktslog(array_news);
	for(var i=0; i<array_news.length; i++)	{
		setTimeout(publishLive, timeout); 
		timeout += 1000;
	}
	live_pubDate.msg = new Array();
	return true;
}

function publishLive() {
	var array = array_news.shift();
	ktslog("live2_in_function. title: " + array.title + "; link: " +  array.link);
	alertKTS('', array.title, array.description, array.link, 0);
}

function getLive() {
	new Ajax.Request('http://klavogonki.ru/live.xml?KTS_REQUEST', {
		method: 'POST',
		parameters: { },
		onSuccess: function(transport)
		{	
			if(!live_pubDate.status)
				getLive_1(transport.responseXML);
			else
				getLive_2(transport.responseXML);
		}});
}

//DEBUG
//KTS_timeout = 10000;

if(KlavoTools.notifications.live) {
	KTS_live_timer = setInterval(getLive, KTS_timeout);
}
