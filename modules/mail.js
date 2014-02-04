/**
* 
* mail module checks for new mail and changes color of the KTS icon on the toolbar depending on auth user and unread mail
*
*/

(function() {

    function setExIcon() {
        var icon = 'digits';
        var msg = KTS.unread_msg ? KTS.unread_msg : '';
        if(KTS.user_id) {
            icon = 'normal';
            if(msg)
                icon = 'dic';
        }
        
        chrome.browserAction.setIcon({path: 'img/icon/'+icon+'.png'});
        chrome.browserAction.setBadgeText({text: msg.toString()});
    }

    setInterval(function() {
        setExIcon();
        if(!KTS.user_id)
            getId();
        else
            getUnreadMsg();
    }, CONST.mail.interval);

    function getUnreadMsg() {
        microAjax('http://klavogonki.ru/api/profile/get-summary', {id: KTS.user_id}, function(res) {
            res = JSON.parse(res);
            if(!res.emails) {
                KTS.user_id = null;
                KTS.unread_msg = 0;
            } else {
                KTS.unread_msg = res.unread_messages;
            }
            setExIcon();

        });
    }
    
    function getId() {
        microAjax('http://klavogonki.ru/api/profile/get-messages-contacts', {}, function(res) {
            res = JSON.parse(res);
            if(res.err) {
                KTS.user_id = null;
                return;
            }
            
            if(res.messages[0]) {
                KTS.user_id = res.messages[0].user_id;
                
            } else {
                microAjax('http://klavogonki.ru/api/profile/send-message',
                    {
                        respondentId: 274224,
                        text: "Это системное сообщение KlavoTools."
                    },
                    function(res) {
                        getId();
                    }
                );
            }
            getUnreadMsg();
        });
    }

    getId();
})();