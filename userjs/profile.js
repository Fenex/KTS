//var user_profile = false;
function go_fix_hide() {
	setInterval('initBBWidgets()', 5000);
	return;
}
if(!document.getElementById('KTS_fix_hide')) {
	var s = document.createElement('script');
	s.innerHTML = go_fix_hide+'go_fix_hide();';
	document.body.appendChild(s);
	
		
	var tmp_elem = document.createElement('div');
	tmp_elem.id = 'KTS_fix_hide';
	tmp_elem.style.display = 'none';
	document.body.appendChild(tmp_elem);	
}