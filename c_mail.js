if(document&&document.getElementById('head')) {
    var obj = new Object();
    obj.id = false;
    obj.newmail = false;

    var elem = false;

    if(elem = document.getElementById('userpanel-level')) {
        obj.id = parseInt(elem.parentNode.getElementsByClassName('name')[0].getElementsByTagName('a')[0].getAttribute('href').replace(/[^0-9]/g, ''));
        if(elem.parentNode.getElementsByClassName('newmail')[0])
            obj.newmail = true;
    }
    chrome.extension.sendRequest({reason: "info_mail", obj: obj}, function(response) {/*alert(response.answer)*/});
}