﻿function createPictPath(file_name, color) {
	return chrome.extension.getURL('img/'+color+'/'+file_name);
}
var style = {};

//style.general = 'ul.c2516f{display:none !important;}span[style="text-align: right; margin-top: 15px; font-size: 11px; color: #777"]{display:none !important;}span[style="color: #777; font-size: 11px"]{display:none !important;}#userbar-code-popup{position:fixed !important;}.mix-tovar{display:none !important;}';

style.general = '.pages .selected{background-color: transparent !important;font-weight: bold;}#playads{display:none !important;}#playads_dummy{display:none !important;}#profile-block .user-content .comments .write textarea {width: 97% !important;}.banner-back {display:none !important;}#topics-list .item td.last-post{vertical-align: middle !important;}#topics-list .item td{height: 40px;padding: 0px 0px !important;}';

if(/^http\:\/\/klavogonki\.ru\/profile\/82885/.test(location.href))
	style.general+='.car11 {background: transparent url("http://karlmarx.lib54.ru/fenex/car/VAZ2107.png") no-repeat !important;}div[class="img car11 car-base_ "], div[class="img car11 car-base_ car-img"] {background: transparent url("http://img.klavogonki.ru/aero/82885-16.gif") no-repeat !important;}';

style.gray = '.gamelist-create {background:#ebebeb none repeat scroll 0 0 !important;margin-bottom:20px !important;}#head.green-back{background:white url('+createPictPath('n2o1jHUrNy.png', 'gray')+') repeat-x scroll 0 0 !important;}#params, #invite, #friends-list, .columns .right-col .info, #profile-block .right-col .comments{background:#ebebeb none repeat scroll 0 0 !important;}#friends-list{border:1px solid #ebebeb !important;}.indexstats-block{background-color:#ebebeb !important;}.col3 #top{background-color:#ebebeb !important;}#create .params{background-color:#ebebeb !important;}.highlight-btn p{background-color:#ebebeb !important;}#toplist ul.mode li.active span{background:transparent url('+createPictPath('RgofLHCdbf.png', 'gray')+') no-repeat scroll 100% 50% !important;}#toplist ul.mode li.active{background:#ebebeb url('+createPictPath('oRx7gj2nnK.png', 'gray')+') repeat scroll -0.5em 50% !important;}ul.trimenu li.active{background:#ebebeb url('+createPictPath('tKQkcSyFSU.gif', 'gray')+') no-repeat scroll 50% 100% !important;}#popconfirm .back{position:fixed !important;}.tuning ul.leftmenu li.active span{background:transparent url('+createPictPath('RgofLHCdbf.png', 'gray')+') no-repeat scroll 100% 50% !important;}.tuning ul.leftmenu li.active {background:#ebebeb url('+createPictPath('oRx7gj2nnK.png', 'gray')+') repeat scroll -0.5em 50% !important;}.bar{background:transparent !important; border-top:2px dotted #ebebeb !important;}ul.trimenu .write a {color:#7c3224 !important;}#review .ball .content {background:transparent url('+createPictPath('dQldZmcuT5.gif', 'gray')+') no-repeat scroll 0 100% !important;}#review .ball .top{background:transparent url('+createPictPath('d7c7ppeLBV.gif', 'gray')+') no-repeat scroll 0 0 !important;}.portrait div{background:transparent url('+createPictPath('main_comments.png', 'gray')+') no-repeat scroll 0 0 !important;}#posts-list .posth{background-color:#f4f4f4 !important;}#topics-list .item.even td {background:#f4f4f4 none repeat scroll 0 0 !important;}#chat-title table .pin {background:transparent url('+createPictPath('chat_button.gif', 'gray')+') no-repeat scroll 0 -34px !important;}#chat-title table .mostright {background:transparent url('+createPictPath('chat_button.gif', 'gray')+') no-repeat scroll 0 0 !important;}.chat {background-color:#ebebeb !important; border-color:-moz-use-text-color #6c8d8e #6c8d8e !important;}#chat-title {color:#0E286D !important;}#chat-inline-placeholder .handle {background:transparent url('+createPictPath('chat_dd.gif', 'gray')+') no-repeat scroll 0 0 !important; left:3px !important; top:3px !important;}#chat-title table .l {background:#838383 none repeat scroll 0 0 !important;}#chat-title table .c {background:#838383 none repeat scroll 0 0 !important;}#chat-title table .r {background:#838383 none repeat scroll 0 0 !important;}#chat-title table .active.l {background:#838383 url('+createPictPath('chat_left_active_1.gif', 'gray')+') no-repeat scroll 0 0 !important;}#chat-title table .active.c {background:transparent url('+createPictPath('chat_center.gif', 'gray')+') repeat-x scroll 0 0 !important;}#chat-title table .active.r {background:transparent url('+createPictPath('chat_right_active.gif', 'gray')+') no-repeat scroll 0 0 !important;}#chat-title table .dummy {background:#838383 none repeat scroll 0 0 !important;}#chat-title table .active.mostleft.l {background: transparent url('+createPictPath('chat_left_active_0.gif', 'gray')+') no-repeat scroll 0 0 !important;}#chat-title table .mostright:hover{background-position:-18px 0 !important;}#chat-title table .pin:hover{background-position:-18px -34px !important;}#chat-title table .mostleft.l {background:transparent url('+createPictPath('chat_left.gif', 'gray')+') no-repeat 0 0 !important;}div#gamelist .name .rang1:hover{color:#8d8d8d !important;}div#gamelist .name .rang2:hover{color:#4f9a97 !important;}div#gamelist .name .rang3:hover{color:#187818 !important;}div#gamelist .name .rang4:hover{color:#8c8100 !important;}div#gamelist .name .rang5:hover{color:#ba5800 !important;}div#gamelist .name .rang6:hover{color:#bc0143 !important;}div#gamelist .name .rang7:hover{color:#5e0b9e !important;}div#gamelist .name .rang8:hover{color:#00037c !important;}div#players .player .rang1:hover{color:#8d8d8d !important;}div#players .player .rang2:hover{color:#4f9a97 !important;}div#players .player .rang3:hover{color:#187818 !important;}div#players .player .rang4:hover{color:#8c8100 !important;}div#players .player .rang5:hover{color:#ba5800 !important;}div#players .player .rang6:hover{color:#bc0143 !important;}div#players .player .rang7:hover{color:#5e0b9e !important;}div#players .player .rang8:hover{color:#00037c !important;}#errors_text p{background-color:#ebebeb !important;}#errors_tab{background:#ebebeb url('+createPictPath('errorstab1.gif', 'gray')+') no-repeat scroll 0 0 !important;}div.hidemain, #hidetop, #hidecont{background-color:#f4f4f4 !important;}.quotemain { background:#f4f4f4 none repeat scroll 0 0 !important;}#params a.n:hover{color:#777777 !important;}#head .right .menu a.active{background-image:url('+createPictPath('QGT25nu8L8.gif', 'gray')+') !important;}div#statistics{background-color:#ebebeb !important;}div#counter-panel{background-color:#ebebeb !important;}#profile-block .stats-mode dd {background: #ebebeb none repeat scroll 0 0 !important;}#profile-block .stats-mode-tri {background: #ebebeb url('+createPictPath('06116d587d68.png', 'gray')+') no-repeat scroll 50% 100% !important;}#profile-block #rating-history {background-color: #f0f0ff !important;}#profile-block #bonuses-dl a#rating-history-link:hover {color: #22aa00 !important;}#profile-block #buy-scores-link.active, #profile-block #give-scores-link.active, #profile-block #activate-premium-link.active, #profile-block #rating-history-link.active, #profile-block #auth-pass-link.active, #profile-block #auth-login-link.active {background-color:#f0f0ff !important;}#profile-block #scores-actions {background-color: #f0f0ff !important;}#profile-block #buy-scores .desc {color:#000080 !important;}#profile-block #buy-scores .desc {background-color: #bbbbff !important;}#profile-block #buy-scores .methods li.active{background-color: #bbbbff !important;}#profile-block .user-content .blog .filter s {background-color: #ebebeb !important;}#profile-block .user-content .userinfo-block a.buy:hover {color: #22AA00 !important;}#profile-block .user-content .userinfo-block a.bonuses:hover {color: #008cc7 !important;}#profile-block .user-content .userinfo-block a.note:hover {color: #777777 !important;}#profile-block .user-content .mail .title .delete span:hover {color: #bb2200 !important;}#content .content-col .add a:hover{color: #22aa00 !important;}';

style.blue = '.gamelist-create {background:#ccddff none repeat scroll 0 0 !important;margin-bottom:20px !important;}#head.green-back{background:white url('+createPictPath('n2o1jHUrNy.png', 'blue')+') repeat-x scroll 0 0 !important;}#params, #invite, #friends-list, .columns .right-col .info, #profile-block .right-col .comments{background:#ccddff none repeat scroll 0 0 !important;}#friends-list{border:1px solid #ccddff !important;}.indexstats-block{background-color:#ccddff !important;}.col3 #top{background-color:#ccddff !important;}#create .params{background-color:#ccddff !important;}.highlight-btn p{background-color:#ccddff !important;}#toplist ul.mode li.active span{background:transparent url('+createPictPath('RgofLHCdbf.png', 'blue')+') no-repeat scroll 100% 50% !important;}#toplist ul.mode li.active{background:#ccddff url('+createPictPath('oRx7gj2nnK.png', 'blue')+') repeat scroll -0.5em 50% !important;}ul.trimenu li.active{background:#ccddff url('+createPictPath('tKQkcSyFSU.gif', 'blue')+') no-repeat scroll 50% 100% !important;}#popconfirm .back{position:fixed !important;}.tuning ul.leftmenu li.active span{background:transparent url('+createPictPath('RgofLHCdbf.png', 'blue')+') no-repeat scroll 100% 50% !important;}.tuning ul.leftmenu li.active {background:#ccddff url('+createPictPath('oRx7gj2nnK.png', 'blue')+') repeat scroll -0.5em 50% !important;}.bar{background:transparent !important; border-top:2px dotted #ccddff !important;}ul.trimenu .write a {color:#7c3224 !important;}#review .ball .content {background:transparent url('+createPictPath('dQldZmcuT5.gif', 'blue')+') no-repeat scroll 0 100% !important;}#review .ball .top{background:transparent url('+createPictPath('d7c7ppeLBV.gif', 'blue')+') no-repeat scroll 0 0 !important;}.portrait div{background:transparent url('+createPictPath('main_comments.png', 'blue')+') no-repeat scroll 0 0 !important;}#posts-list .posth{background-color:#EAEAFF !important;}#topics-list .item.even td {background:#f7f7ff none repeat scroll 0 0 !important;}#chat-title table .pin {background:transparent url('+createPictPath('chat_button.gif', 'blue')+') no-repeat scroll 0 -34px !important;}#chat-title table .mostright {background:transparent url('+createPictPath('chat_button.gif', 'blue')+') no-repeat scroll 0 0 !important;}.chat {background-color:#ccddff !important; border-color:-moz-use-text-color #6c8d8e #6c8d8e !important;}#chat-title {color:#0E286D !important;}#chat-inline-placeholder .handle {background:transparent url('+createPictPath('chat_dd.gif', 'blue')+') no-repeat scroll 0 0 !important; left:3px !important; top:3px !important;}#chat-title table .l {background:#6688BB none repeat scroll 0 0 !important;}#chat-title table .c {background:#6688BB none repeat scroll 0 0 !important;}#chat-title table .r {background:#6688BB none repeat scroll 0 0 !important;}#chat-title table .active.l {background:#6688BB url('+createPictPath('chat_left_active_1.gif', 'blue')+') no-repeat scroll 0 0 !important;}#chat-title table .active.c {background:transparent url('+createPictPath('chat_center.gif', 'blue')+') repeat-x scroll 0 0 !important;}#chat-title table .active.r {background:transparent url('+createPictPath('chat_right_active.gif', 'blue')+') no-repeat scroll 0 0 !important;}#chat-title table .dummy {background:#6688BB none repeat scroll 0 0 !important;}#chat-title table .active.mostleft.l {background: transparent url('+createPictPath('chat_left_active_0.gif', 'blue')+') no-repeat scroll 0 0 !important;}#chat-title table .mostright:hover{background-position:-18px 0 !important;}#chat-title table .pin:hover{background-position:-18px -34px !important;}#chat-title table .mostleft.l {background:transparent url('+createPictPath('chat_left.gif', 'blue')+') no-repeat 0 0 !important;}div#gamelist .name .rang1:hover{color:#8d8d8d !important;}div#gamelist .name .rang2:hover{color:#4f9a97 !important;}div#gamelist .name .rang3:hover{color:#187818 !important;}div#gamelist .name .rang4:hover{color:#8c8100 !important;}div#gamelist .name .rang5:hover{color:#ba5800 !important;}div#gamelist .name .rang6:hover{color:#bc0143 !important;}div#gamelist .name .rang7:hover{color:#5e0b9e !important;}div#gamelist .name .rang8:hover{color:#00037c !important;}div#players .player .rang1:hover{color:#8d8d8d !important;}div#players .player .rang2:hover{color:#4f9a97 !important;}div#players .player .rang3:hover{color:#187818 !important;}div#players .player .rang4:hover{color:#8c8100 !important;}div#players .player .rang5:hover{color:#ba5800 !important;}div#players .player .rang6:hover{color:#bc0143 !important;}div#players .player .rang7:hover{color:#5e0b9e !important;}div#players .player .rang8:hover{color:#00037c !important;}#errors_text p{background-color:#ccddff !important;}#errors_tab{background:#ccddff url('+createPictPath('errorstab1.gif', 'blue')+') no-repeat scroll 0 0 !important;}div.hidemain, #hidetop, #hidecont{background-color:#F7F7FF !important;}.quotemain { background:#F7F7FF none repeat scroll 0 0 !important;}#params a.n:hover{color:#777777 !important;}#head .right .menu a.active{background-image:url('+createPictPath('QGT25nu8L8.gif', 'blue')+') !important;}div#statistics{background-color:#CCDDFF !important;}div#counter-panel{background-color:#CCDDFF !important;}#profile-block .stats-mode dd {background: #ccddff none repeat scroll 0 0 !important;}#profile-block .stats-mode-tri {background: #ccddff url('+createPictPath('06116d587d68.png', 'blue')+') no-repeat scroll 50% 100% !important;}#profile-block #rating-history {background-color: #f0f0ff !important;}#profile-block #bonuses-dl a#rating-history-link:hover {color: #22aa00 !important;}#profile-block .comments .delete {color:#EE3939 !important;}#profile-block .user-content .comments .title .post_subject:hover{color:#ee3939 !important;}#profile-block #buy-scores-link.active, #profile-block #give-scores-link.active, #profile-block #activate-premium-link.active, #profile-block #rating-history-link.active, #profile-block #auth-pass-link.active, #profile-block #auth-login-link.active {background-color:#f0f0ff !important;}#profile-block #scores-actions {background-color: #f0f0ff !important;}#profile-block #buy-scores .desc {color:#000080 !important;}#profile-block #buy-scores .desc {background-color: #bbbbff !important;}#profile-block #buy-scores .methods li.active{background-color: #bbbbff !important;}#profile-block .user-content .blog .filter s {background-color: #ccddff !important;}#content .content-col a:hover, #content .about a:hover, #posts-list table.foot td.pages a:hover, #posts-list table.list a:hover,#topics-list table.foot td.pages a:hover, #topics-list table.list a:hover, #forums-list a:hover, #profile-block .right-col .comments .comment .info .author a:hover, #footer #links a:hover, #profile-block dl.menu a:hover, #play-right a:hover, #profile-block div.user-content a:hover, #chat-content td.userlist div.userlist-content ins a:hover{color:#d4620e !important;}#profile-block .user-content .userinfo-block a.buy:hover {color: #22AA00 !important;}#profile-block .user-content .userinfo-block a.bonuses:hover {color: #008cc7 !important;}#profile-block .user-content .userinfo-block a.note:hover {color: #777777 !important;}#profile-block .user-content .comments .title a.post_subject:hover, #profile-block .right-col .comments .comment .info .author a.post_subject:hover {color: #000000 !important;}#profile-block .user-content .mail .title .delete span:hover {color: #bb2200 !important;}#content .content-col .add a:hover{color: #22aa00 !important;}';

style.pink = '.gamelist-create {background:#fccfcf none repeat scroll 0 0 !important;margin-bottom:20px !important;}#head.green-back{background:white url('+createPictPath('n2o1jHUrNy.png', 'pink')+') repeat-x scroll 0 0 !important;}#params, #invite, #friends-list, .columns .right-col .info, #profile-block .right-col .comments{background:#fccfcf none repeat scroll 0 0 !important;}#friends-list{border:1px solid #fccfcf !important;}.indexstats-block{background-color:#fccfcf !important;}.col3 #top{background-color:#fccfcf !important;}#create .params{background-color:#fccfcf !important;}.highlight-btn p{background-color:#fccfcf !important;}#toplist ul.mode li.active span{background:transparent url('+createPictPath('RgofLHCdbf.png', 'pink')+') no-repeat scroll 100% 50% !important;}#toplist ul.mode li.active{background:#fccfcf url('+createPictPath('oRx7gj2nnK.png', 'pink')+') repeat scroll -0.5em 50% !important;}ul.trimenu li.active{background:#fccfcf url('+createPictPath('tKQkcSyFSU.gif', 'pink')+') no-repeat scroll 50% 100% !important;}#popconfirm .back{position:fixed !important;}.tuning ul.leftmenu li.active span{background:transparent url('+createPictPath('RgofLHCdbf.png', 'pink')+') no-repeat scroll 100% 50% !important;}.tuning ul.leftmenu li.active {background:#fccfcf url('+createPictPath('oRx7gj2nnK.png', 'pink')+') repeat scroll -0.5em 50% !important;}.bar{background:transparent !important; border-top:2px dotted #fccfcf !important;}ul.trimenu .write a {color:#7c3224 !important;}#review .ball .content {background:transparent url('+createPictPath('dQldZmcuT5.gif', 'pink')+') no-repeat scroll 0 100% !important;}#review .ball .top{background:transparent url('+createPictPath('d7c7ppeLBV.gif', 'pink')+') no-repeat scroll 0 0 !important;}.portrait div{background:transparent url('+createPictPath('main_comments.png', 'pink')+') no-repeat scroll 0 0 !important;}#posts-list .posth{background-color:#fef4f4 !important;}#topics-list .item.even td {background:#fef4f4 none repeat scroll 0 0 !important;}#chat-title table .pin {background:transparent url('+createPictPath('chat_button.gif', 'pink')+') no-repeat scroll 0 -34px !important;}#chat-title table .mostright {background:transparent url('+createPictPath('chat_button.gif', 'pink')+') no-repeat scroll 0 0 !important;}.chat {background-color:#fccfcf !important; border-color:-moz-use-text-color #6c8d8e #6c8d8e !important;}#chat-title {color:#0E286D !important;}#chat-inline-placeholder .handle {background:transparent url('+createPictPath('chat_dd.gif', 'pink')+') no-repeat scroll 0 0 !important; left:3px !important; top:3px !important;}#chat-title table .l {background:#ed2f2f none repeat scroll 0 0 !important;}#chat-title table .c {background:#ed2f2f none repeat scroll 0 0 !important;}#chat-title table .r {background:#ed2f2f none repeat scroll 0 0 !important;}#chat-title table .active.l {background:#ed2f2f url('+createPictPath('chat_left_active_1.gif', 'pink')+') no-repeat scroll 0 0 !important;}#chat-title table .active.c {background:transparent url('+createPictPath('chat_center.gif', 'pink')+') repeat-x scroll 0 0 !important;}#chat-title table .active.r {background:transparent url('+createPictPath('chat_right_active.gif', 'pink')+') no-repeat scroll 0 0 !important;}#chat-title table .dummy {background:#ed2f2f none repeat scroll 0 0 !important;}#chat-title table .active.mostleft.l {background: transparent url('+createPictPath('chat_left_active_0.gif', 'pink')+') no-repeat scroll 0 0 !important;}#chat-title table .mostright:hover{background-position:-18px 0 !important;}#chat-title table .pin:hover{background-position:-18px -34px !important;}#chat-title table .mostleft.l {background:transparent url('+createPictPath('chat_left.gif', 'pink')+') no-repeat 0 0 !important;}div#gamelist .name .rang1:hover{color:#8d8d8d !important;}div#gamelist .name .rang2:hover{color:#4f9a97 !important;}div#gamelist .name .rang3:hover{color:#187818 !important;}div#gamelist .name .rang4:hover{color:#8c8100 !important;}div#gamelist .name .rang5:hover{color:#ba5800 !important;}div#gamelist .name .rang6:hover{color:#bc0143 !important;}div#gamelist .name .rang7:hover{color:#5e0b9e !important;}div#gamelist .name .rang8:hover{color:#00037c !important;}div#players .player .rang1:hover{color:#8d8d8d !important;}div#players .player .rang2:hover{color:#4f9a97 !important;}div#players .player .rang3:hover{color:#187818 !important;}div#players .player .rang4:hover{color:#8c8100 !important;}div#players .player .rang5:hover{color:#ba5800 !important;}div#players .player .rang6:hover{color:#bc0143 !important;}div#players .player .rang7:hover{color:#5e0b9e !important;}div#players .player .rang8:hover{color:#00037c !important;}#errors_text p{background-color:#fccfcf !important;}#errors_tab{background:#fccfcf url('+createPictPath('errorstab1.gif', 'pink')+') no-repeat scroll 0 0 !important;}div.hidemain, #hidetop, #hidecont{background-color:#fef4f4 !important;}.quotemain { background:#fef4f4 none repeat scroll 0 0 !important;}#params a.n:hover{color:#777777 !important;}#head .right .menu a.active{background-image:url('+createPictPath('QGT25nu8L8.gif', 'pink')+') !important;}div#statistics{background-color:#fccfcf !important;}div#counter-panel{background-color:#fccfcf !important;}#profile-block .stats-mode dd {background: #fccfcf none repeat scroll 0 0 !important;}#profile-block .stats-mode-tri {background: #fccfcf url('+createPictPath('06116d587d68.png', 'pink')+') no-repeat scroll 50% 100% !important;}#profile-block #rating-history {background-color: #f0f0ff !important;}#profile-block #bonuses-dl a#rating-history-link:hover {color: #22aa00 !important;}#profile-block .comments .delete {color:#EE3939 !important;}#profile-block .user-content .comments .title .post_subject:hover{color:#ee3939 !important;}#profile-block #buy-scores-link.active, #profile-block #give-scores-link.active, #profile-block #activate-premium-link.active, #profile-block #rating-history-link.active, #profile-block #auth-pass-link.active, #profile-block #auth-login-link.active {background-color:#f0f0ff !important;}#profile-block #scores-actions {background-color: #f0f0ff !important;}#profile-block #buy-scores .desc {color:#000080 !important;}#profile-block #buy-scores .desc {background-color: #bbbbff !important;}#profile-block #buy-scores .methods li.active{background-color: #bbbbff !important;}#profile-block .user-content .blog .filter s {background-color: #fccfcf !important;}#content .content-col a:hover, #content .about a:hover, #posts-list table.foot td.pages a:hover, #posts-list table.list a:hover,#topics-list table.foot td.pages a:hover, #topics-list table.list a:hover, #forums-list a:hover, #profile-block .right-col .comments .comment .info .author a:hover, #footer #links a:hover, #profile-block dl.menu a:hover, #play-right a:hover, #profile-block div.user-content a:hover, #chat-content td.userlist div.userlist-content ins a:hover{color:#d4620e !important;}#profile-block .user-content .userinfo-block a.buy:hover {color: #22AA00 !important;}#profile-block .user-content .userinfo-block a.bonuses:hover {color: #008cc7 !important;}#profile-block .user-content .userinfo-block a.note:hover {color: #777777 !important;}#profile-block .user-content .comments .title a.post_subject:hover, #profile-block .right-col .comments .comment .info .author a.post_subject:hover {color: #000000 !important;}#profile-block .user-content .mail .title .delete span:hover {color: #bb2200 !important;}#content .content-col .add a:hover{color: #22aa00 !important;}';

style.green = '.gamelist-create {background:#d4ead4 none repeat scroll 0 0 !important;margin-bottom:20px !important;}#head.green-back{background:white url('+createPictPath('n2o1jHUrNy.png', 'green')+') repeat-x scroll 0 0 !important;}#params, #invite, #friends-list, .columns .right-col .info, #profile-block .right-col .comments{background:#d4ead4 none repeat scroll 0 0 !important;}#friends-list{border:1px solid #d4ead4 !important;}.indexstats-block{background-color:#d4ead4 !important;}.col3 #top{background-color:#d4ead4 !important;}#create .params{background-color:#d4ead4 !important;}.highlight-btn p{background-color:#d4ead4 !important;}#toplist ul.mode li.active span{background:transparent url('+createPictPath('RgofLHCdbf.png', 'green')+') no-repeat scroll 100% 50% !important;}#toplist ul.mode li.active{background:#d4ead4 url('+createPictPath('oRx7gj2nnK.png', 'green')+') repeat scroll -0.5em 50% !important;}ul.trimenu li.active{background:#d4ead4 url('+createPictPath('tKQkcSyFSU.gif', 'green')+') no-repeat scroll 50% 100% !important;}#popconfirm .back{position:fixed !important;}.tuning ul.leftmenu li.active span{background:transparent url('+createPictPath('RgofLHCdbf.png', 'green')+') no-repeat scroll 100% 50% !important;}.tuning ul.leftmenu li.active {background:#d4ead4 url('+createPictPath('oRx7gj2nnK.png', 'green')+') repeat scroll -0.5em 50% !important;}.bar{background:transparent !important; border-top:2px dotted #d4ead4 !important;}ul.trimenu .write a {color:#7c3224 !important;}#review .ball .content {background:transparent url('+createPictPath('dQldZmcuT5.gif', 'green')+') no-repeat scroll 0 100% !important;}#review .ball .top{background:transparent url('+createPictPath('d7c7ppeLBV.gif', 'green')+') no-repeat scroll 0 0 !important;}.portrait div{background:transparent url('+createPictPath('main_comments.png', 'green')+') no-repeat scroll 0 0 !important;}#posts-list .posth{background-color:#edf6ed !important;}#topics-list .item.even td {background:#edf6ed none repeat scroll 0 0 !important;}#chat-title table .pin {background:transparent url('+createPictPath('chat_button.gif', 'green')+') no-repeat scroll 0 -34px !important;}#chat-title table .mostright {background:transparent url('+createPictPath('chat_button.gif', 'green')+') no-repeat scroll 0 0 !important;}.chat {background-color:#d4ead4 !important; border-color:-moz-use-text-color #6c8d8e #6c8d8e !important;}#chat-title {color:#0E286D !important;}#chat-inline-placeholder .handle {background:transparent url('+createPictPath('chat_dd.gif', 'green')+') no-repeat scroll 0 0 !important; left:3px !important; top:3px !important;}#chat-title table .l {background:#339933 none repeat scroll 0 0 !important;}#chat-title table .c {background:#339933 none repeat scroll 0 0 !important;}#chat-title table .r {background:#339933 none repeat scroll 0 0 !important;}#chat-title table .active.l {background:#339933 url('+createPictPath('chat_left_active_1.gif', 'green')+') no-repeat scroll 0 0 !important;}#chat-title table .active.c {background:transparent url('+createPictPath('chat_center.gif', 'green')+') repeat-x scroll 0 0 !important;}#chat-title table .active.r {background:transparent url('+createPictPath('chat_right_active.gif', 'green')+') no-repeat scroll 0 0 !important;}#chat-title table .dummy {background:#339933 none repeat scroll 0 0 !important;}#chat-title table .active.mostleft.l {background: transparent url('+createPictPath('chat_left_active_0.gif', 'green')+') no-repeat scroll 0 0 !important;}#chat-title table .mostright:hover{background-position:-18px 0 !important;}#chat-title table .pin:hover{background-position:-18px -34px !important;}#chat-title table .mostleft.l {background:transparent url('+createPictPath('chat_left.gif', 'green')+') no-repeat 0 0 !important;}div#gamelist .name .rang1:hover{color:#8d8d8d !important;}div#gamelist .name .rang2:hover{color:#4f9a97 !important;}div#gamelist .name .rang3:hover{color:#187818 !important;}div#gamelist .name .rang4:hover{color:#8c8100 !important;}div#gamelist .name .rang5:hover{color:#ba5800 !important;}div#gamelist .name .rang6:hover{color:#bc0143 !important;}div#gamelist .name .rang7:hover{color:#5e0b9e !important;}div#gamelist .name .rang8:hover{color:#00037c !important;}div#players .player .rang1:hover{color:#8d8d8d !important;}div#players .player .rang2:hover{color:#4f9a97 !important;}div#players .player .rang3:hover{color:#187818 !important;}div#players .player .rang4:hover{color:#8c8100 !important;}div#players .player .rang5:hover{color:#ba5800 !important;}div#players .player .rang6:hover{color:#bc0143 !important;}div#players .player .rang7:hover{color:#5e0b9e !important;}div#players .player .rang8:hover{color:#00037c !important;}#errors_text p{background-color:#d4ead4 !important;}#errors_tab{background:#d4ead4 url('+createPictPath('errorstab1.gif', 'green')+') no-repeat scroll 0 0 !important;}div.hidemain, #hidetop, #hidecont{background-color:#edf6ed !important;}.quotemain { background:#edf6ed none repeat scroll 0 0 !important;}#params a.n:hover{color:#777777 !important;}#head .right .menu a.active{background-image:url('+createPictPath('QGT25nu8L8.gif', 'green')+') !important;}div#statistics{background-color:#d4ead4 !important;}div#counter-panel{background-color:#d4ead4 !important;}#profile-block .stats-mode dd {background: #d4ead4 none repeat scroll 0 0 !important;}#profile-block .stats-mode-tri {background: #d4ead4 url('+createPictPath('06116d587d68.png', 'green')+') no-repeat scroll 50% 100% !important;}#profile-block #rating-history {background-color: #f0f0ff !important;}#profile-block #bonuses-dl a#rating-history-link:hover {color: #22aa00 !important;}#profile-block #buy-scores-link.active, #profile-block #give-scores-link.active, #profile-block #activate-premium-link.active, #profile-block #rating-history-link.active, #profile-block #auth-pass-link.active, #profile-block #auth-login-link.active {background-color:#f0f0ff !important;}#profile-block #scores-actions {background-color: #f0f0ff !important;}#profile-block #buy-scores .desc {color:#000080 !important;}#profile-block #buy-scores .desc {background-color: #bbbbff !important;}#profile-block #buy-scores .methods li.active{background-color: #bbbbff !important;}#profile-block .user-content .blog .filter s {background-color: #d4ead4 !important;}#profile-block .user-content .userinfo-block a.buy:hover {color: #22AA00 !important;}#profile-block .user-content .userinfo-block a.bonuses:hover {color: #008cc7 !important;}#profile-block .user-content .userinfo-block a.note:hover {color: #777777 !important;}#profile-block .user-content .mail .title .delete span:hover {color: #bb2200 !important;}#content .content-col .add a:hover{color: #22aa00 !important;}';

function insertStyle(name) {
	if(document&&document.getElementById('style_KTS'))
		return;
	var s = document.createElement('style');
	s.setAttribute('id', 'style_KTS');
	switch(name) {
		case "gray":
			s.innerHTML = style.general+style.gray;
		break;
		case "blue":
			s.innerHTML = style.general+style.blue;
		break;
		case "pink":
			s.innerHTML = style.general+style.pink;
		break;
		case "green":
			s.innerHTML = style.general+style.green;
		break;
		case "beige":
			s.innerHTML = style.general;
	}
    document.head.appendChild(s);
}
chrome.extension.sendRequest({reason: "getStyle"}, function(response) {
			insertStyle(response.style);
});
