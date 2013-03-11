// ==UserScript==
// @name           count_FriendsVocs
// @namespace      klavogonki
// @include        /^http\:\/\/klavogonki\.ru\/profile\/\d+.$/
// @author         Fenex
// @version        1.0.0 KTS
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
if(!document.getElementById('KTS_count_FriendsVocs')) {
	var e = document.getElementsByClassName('friends-list');
	if(e[0]) {
		for(i=0;i<e.length;i++) {
			var dt = e[i].parentNode.parentNode.getElementsByTagName('dt')[0];
			var count = e[i].getElementsByTagName('li').length;
			dt.innerHTML = dt.innerHTML.substring(0, dt.innerHTML.length-1) + " (" + count + "):";
		}
	}

	var tmp_elem = document.createElement('div');
	tmp_elem.id = 'KTS_count_FriendsVocs';
	tmp_elem.style.display = 'none';
	document.body.appendChild(tmp_elem);
}