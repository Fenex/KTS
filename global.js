/**
* @CONST is global object with settings of all modules
*
* Modules:
* @alert: popup notification (module supports Blink and WebKit engines)
* @mail: checks for new mail and changes color of the KTS icon on the toolbar
* @competitions: checks available regular competitions
* @live: checks new posts on http://klavogonki.ru/live.xml (temporary disabled!)
*        The page "http://klavogonki.ru/live.xml" is gone. Need to write new function to get live posts.
*  
**/

var CONST = {
    alert: null,
    mail: {
        getId: null,
        getMsg: null,
        interval: 20000
    },
    live: null,
    competitions: null
}

/**
*
* @KTS is global object with variables
*
*/

var KTS = {
    user_id: null,
    unread_msg: 0
}