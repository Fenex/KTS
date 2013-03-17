var checkedUsers = new Array(218552, 30297, 57333, 323172, 111001, 166516, 24119, 101646, 70019, 123190, 76392, 2065, 147900, 4912);
var checkedAccaunts = new Array(171789, 282920, 246730, 261337, 226863, 234982, 240582, 238636, 247706, 245345, 285288, 288176, 4598, 273214, 270458, 204704, 247706, 234050, 207424, 298274, 279700);
var adminUsers = new Array(82885, 21);
var css_txt = '';

if(/http\:\/\/klavogonki\.ru\/profile\/[0-9]+/.test(location.href)) {
    for(var i=0;i<checkedUsers.length;i++) {
	    css_txt += '#profile-block .user-content .message a[href="/profile/'+checkedUsers[i].toString()+'"]{color: brown; font-weight: bold !important;}';
    }

    for(var i=0;i<checkedAccaunts.length;i++) {
	    css_txt += '#profile-block .user-content .message a[href="/profile/'+checkedAccaunts[i].toString()+'"]{color: #00a0ef; font-weight: bold !important;}';
    }
	
	for(var i=0;i<adminUsers.length;i++) {
	    css_txt += '#profile-block .user-content .message a[href="/profile/'+adminUsers[i].toString()+'"]{color: #009900; font-weight: bold !important;}';
    }
} else if(/http\:\/\/klavogonki\.ru\/forum\//.test(location.href)) {
    for(var i=0;i<checkedUsers.length;i++) {
	    css_txt += '#posts-list .posth a.user[href="/profile/'+checkedUsers[i].toString()+'"]{color: brown !important;}';
    }

    for(var i=0;i<checkedAccaunts.length;i++) {
	    css_txt += '#posts-list .posth a.user[href="/profile/'+checkedAccaunts[i].toString()+'"]{color: #00a0ef !important;}';
    }
}

var s = document.createElement('style');
s.innerHTML = css_txt;

function insert() {
	if(!document||!document.head) {
		q = setTimeout(insert, 100);
		return;
	}
	document.head.appendChild(s);
	clearTimeout(q);
	q = false;
	return;
}

var q = setTimeout(insert, 100);
