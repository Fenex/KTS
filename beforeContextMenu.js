function getIDfromHref(e) {
	if(e.hasAttribute('href')) {
		if(location.host!='klavogonki.ru')
			return 0;
		
        var params = e.getAttribute('href').match(/(profile|u\/#|vocs)\/(\d+)/);
        if(params && params[1] && params[2]) {
            return {type: params[1], id: params[2]};
		}

        if (location.href.indexOf('/u/#/') != -1) {
            params = e.getAttribute('href').match(/#\/(\d+)/);
            if(params && params[1]) return {type: 'profile', id: params[1]};
        }

        return 0;
	}
}
document.addEventListener("mousedown", function(event){
    //right click only
    if(event.button == 2) { 
		var params = getIDfromHref(event.target) || getIDfromHref(event.target.parentNode);
		chrome.extension.sendRequest({reason: "contextMenu", params: params}, function(response) {/*console.log(response.answer);*/});
    }
}, true);