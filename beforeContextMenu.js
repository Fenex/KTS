function getIDfromHref(e) {
	if(e.hasAttribute('href')) {
		if(location.host!='klavogonki.ru')
			return 0;
		if(params = e.getAttribute('href').match(/(profile|vocs)\/([\d]+)/)) {
			if(!params) { return 0; }
			return {type: params[1], id: params[2]};
		}
	}
}
document.addEventListener("mousedown", function(event){
    //right click only
    if(event.button == 2) { 
		var params = getIDfromHref(event.target) || getIDfromHref(event.target.parentNode);
		chrome.extension.sendRequest({reason: "contextMenu", params: params}, function(response) {/*console.log(response.answer);*/});
    }
}, true);