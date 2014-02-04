function microAjax(url, params, callbackFunction)
{
	this.bindFunction = function (caller, object) {
		return function() {
			return caller.apply(object, [object]);
		};
	};

	this.stateChange = function (object) {
		if (this.request.readyState==4)
			this.callbackFunction(this.request.responseText);
	};

	this.getRequest = function() {
		if (window.ActiveXObject)
			return new ActiveXObject('Microsoft.XMLHTTP');
		else if (window.XMLHttpRequest)
			return new XMLHttpRequest();
		return false;
	};

	this.params2Str = function(params) {
		if(!params)
			return;
			
		if(params.method=='POST') {
			this.method = 'POST';
		}

		var output = '';
		
		for(var name in params) {
			if(name=='method')
				continue;
			output += name + '=' + encodeURIComponent(params[name]) + '&';
		}
		
		return output;
	};
	
	this.method = 'GET';
	this.param_obj = params;
	this.params = this.params2Str(params);
	this.callbackFunction = callbackFunction;
	this.url = url;
	this.request = this.getRequest();
	
	if(this.request) {
		var req = this.request;
		req.onreadystatechange = this.bindFunction(this.stateChange, this);

		if (this.method == "POST") {
			req.open("POST", this.url, true);
			req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			//req.setRequestHeader('Connection', 'close');
			req.send(this.params);
		} else {
			req.open("GET", this.url + '?' + this.params, true);
			req.send(null);
		}

	
	}
}

