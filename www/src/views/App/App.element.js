var $ = jQuery;
var platform_style = ['Android', 'iOS', 'MacOS', 'Windows', 'browser'];
if (!window._version_app) window._version_app = '0.0.1';
var paramSocket = {
    version_app: window._version_app, //
    uuid: localStorage.getItem("uuid"), //
    installTime: localStorage.getItem("installTime"),
    user_id: localStorage.getItem("user_id"),
    registrationId: localStorage.getItem("registrationId"),
    exchange: 'off',
    chat: 'on',
    globalChat: 'on'
};
var web3 = new Web3();
var WtcApp = Ractive.extend({
    oninit: function () {
        if (navigator && navigator.splashscreen) navigator.splashscreen.hide();
        procent = 0.28;
        $('nav#menu').mmenu({});
        $('input, select').styler({
            selectSearch: true
        });
        Messenger.finance.callback_save(function (cards, loans, cards_all) {
            if(cards && cards.length != 0) {
                var total_balance_ = 0;
                var last_balance_ = 0;
                var card_currency_ = 0;
                var card_index_ = -1;

                for (var di in cards) {
                    if (cards.hasOwnProperty(di)) {
                        total_balance_ += cards[di].total_balance;
                        last_balance_ += cards[di].last_balance;
                        if (card_index_ <= cards[di].total_balance) {
                            card_index_ = cards[di].total_balance;
                            card_currency_ = cards[di].card_currency;

                        }
                    }
                }
                setTimeout(function () {
                    var symbool = {GBP: '£', USD: '$', EUR: '€'};
                    ractiveComponent['rootApp'].set('balance_user', [total_balance_.toFixed(2), last_balance_.toFixed(2), symbool[card_currency_]]);
                }, 10);

            }
        });

        $('.responsive').slick({
            dots: false,
            arrows: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1

        });

        $("#accordion").accordion({
            heightStyle: "content",
            collapsible: true
        });

        setTimeout(init_app, 100);
        ractiveComponent['rootApp'].on('setPage', function (e, v1, v2, v3) {
            if (window.Messenger) Messenger.event[e.name] && Messenger.event[e.name](v1, v2, v3);
        });
        ractiveComponent['rootApp'].on('setSmileType', function (e, v1, v2, v3) {
            ractiveComponent['rootApp'].set('smile_type', v1);
            $(".__nano").nanoScroller();
        });
        web3.setProvider(new web3.providers.HttpProvider('https://api.myetherapi.com/eth'));
        Messenger.setPage('debitcoin');
        ractiveComponent['rootApp'].set('smile_type', 'standart');
        ractiveComponent['rootApp'].set('smile', {
            standart: [
                'icon-angry-1',
                'icon-angry',
                'icon-bored-1',
                'icon-bored-2',
                'icon-bored',
                'icon-confused-1',
                'icon-confused',
                'icon-crying-1',
                'icon-crying',
                'icon-embarrassed',
                'icon-emoticons',
                'icon-happy-1',
                'icon-happy-2',
                'icon-happy-3',
                'icon-happy-4',
                'icon-happy',
                'icon-ill',
                'icon-in-love',
                'icon-kissing',
                'icon-mad',
                'icon-nerd',
                'icon-ninja',
                'icon-quiet',
                'icon-sad',
                'icon-secret',
                'icon-smart',
                'icon-smile',
                'icon-smiling',
                'icon-surprised-1',
                'icon-surprised',
                'icon-suspicious-1',
                'icon-suspicious',
                'icon-tongue-out-1',
                'icon-tongue-out',
                'icon-unhappy',
                'icon-wink'
            ],
            finance: ['icon-atm-1',
                'icon-atm-2',
                'icon-atm',
                'icon-bag-1',
                'icon-bag-2',
                'icon-bag-3',
                'icon-bag-4',
                'icon-bag-5',
                'icon-bag-6',
                'icon-bag',
                'icon-bank',
                'icon-barbershop',
                'icon-barcode-1',
                'icon-barcode',
                'icon-basket-1',
                'icon-basket-2',
                'icon-basket',
                'icon-box-1',
                'icon-box-2',
                'icon-box-3',
                'icon-box',
                'icon-briefcase-1',
                'icon-briefcase',
                'icon-calculator',
                'icon-cart-1',
                'icon-cart-10',
                'icon-cart-11',
                'icon-cart-12',
                'icon-cart-13',
                'icon-cart-14',
                'icon-cart-15',
                'icon-cart-16',
                'icon-cart-17',
                'icon-cart-2',
                'icon-cart-3',
                'icon-cart-4',
                'icon-cart-5',
                'icon-cart-6',
                'icon-cart-7',
                'icon-cart-8',
                'icon-cart-9',
                'icon-cart',
                'icon-cashier-1',
                'icon-cashier',
                'icon-change',
                'icon-check',
                'icon-coin-1',
                'icon-coin-10',
                'icon-coin-2',
                'icon-coin-3',
                'icon-coin-4',
                'icon-coin-5',
                'icon-coin-6',
                'icon-coin-7',
                'icon-coin-8',
                'icon-coin-9',
                'icon-coin',
                'icon-cashier-1',
                'icon-cashier',
                'icon-change',
                'icon-check',
                'icon-coin-1',
                'icon-coin-10',
                'icon-coin-2',
                'icon-coin-3',
                'icon-coin-4',
                'icon-coin-5',
                'icon-coin-6',
                'icon-coin-7',
                'icon-coin-8',
                'icon-coin-9',
                'icon-coin',
                'icon-coins-1',
                'icon-coins',
                'icon-crate-1',
                'icon-crate-2',
                'icon-crate-3',
                'icon-crate-4',
                'icon-crate-5',
                'icon-crate',
                'icon-credit-card-1',
                'icon-credit-card-2',
                'icon-credit-card-3',
                'icon-credit-card-4',
                'icon-credit-card-5',
                'icon-credit-card-6',
                'icon-delivery-cart-1',
                'icon-delivery-cart',
                'icon-diagram-1',
                'icon-diagram-2',
                'icon-diagram-3',
                'icon-diagram',
                'icon-folder-1',
                'icon-folder',
                'icon-get-money',
                'icon-graph-1',
                'icon-graph-2',
                'icon-graph-3',
                'icon-graph-4',
                'icon-graph-5',
                'icon-graph-6',
                'icon-graph-7',
                'icon-graph-8',
                'icon-graph',
                'icon-grocery-1',
                'icon-grocery',
                'icon-insert-coin',
                'icon-investment',
                'icon-justice-scale',
                'icon-justice',
                'icon-megaphone',
                'icon-money',
                'icon-notes-1',
                'icon-notes-2',
                'icon-notes',
                'icon-open',
                'icon-pack',
                'icon-pie-chart-1',
                'icon-pie-chart-2',
                'icon-pie-chart-3',
                'icon-pie-chart-4',
                'icon-pie-chart-5',
                'icon-pie-chart-6',
                'icon-pie-chart',
                'icon-piggy-bank-1',
                'icon-piggy-bank',
                'icon-point-of-service',
                'icon-poor',
                'icon-presentation-1',
                'icon-presentation-10',
                'icon-presentation-11',
                'icon-presentation-12',
                'icon-presentation-13',
                'icon-presentation-14',
                'icon-presentation-15',
                'icon-presentation-16',
                'icon-presentation-17',
                'icon-presentation-18',
                'icon-presentation-19',
                'icon-presentation-2',
                'icon-presentation-3',
                'icon-presentation-4',
                'icon-presentation-5',
                'icon-presentation-6',
                'icon-presentation-7',
                'icon-presentation-8',
                'icon-presentation-9',
                'icon-presentation',
                'icon-price-tag-1',
                'icon-price-tag-2',
                'icon-price-tag-3',
                'icon-price-tag-4',
                'icon-price-tag-5',
                'icon-price-tag-6',
                'icon-price-tag-7',
                'icon-price-tag-8',
                'icon-price-tag-9',
                'icon-price-tag',
                'icon-receipt',
                'icon-record',
                'icon-rewind-time',
                'icon-rich',
                'icon-safebox-1',
                'icon-safebox-2',
                'icon-safebox-3',
                'icon-safebox-4',
                'icon-safebox',
                'icon-stamp-1',
                'icon-stamp',
                'icon-stand',
                'icon-store-1',
                'icon-store-2',
                'icon-store-3',
                'icon-store',
                'icon-strongbox',
                'icon-suitcase-1',
                'icon-suitcase-2',
                'icon-suitcase',
                'icon-time-is-money',
                'icon-time-passing',
                'icon-wallet-1',
                'icon-wallet-2',
                'icon-wallet',
                'icon-yen',]
        });
        $("#contentMessageScroll").nanoScroller({preventPageScrolling: true, tabIndex: -1, iOSNativeScrolling: true});
        //             if (typeof Messenger.body['Chat'].onscroll === 'function') Messenger.body['Chat'].onscroll(this.mcs);

        $("#contentMessageScroll").bind("scrolltop", function (e) {

        });
        $("#contentMessageScroll").bind("update", function (event, values) {

            if (typeof Messenger.chat.onscroll === 'function') Messenger.chat.onscroll(values);
        });
        $(".__nano").nanoScroller();

    },
    onrender: function () {

    },
    oncomplete: function () {

    }

});


// == config
moment.locale(_e('lang'));

var scroll_page = [
    // {
    //     key: "contacts"
    // },
    // // {
    // //     key: "guarantee"
    // // },
    // {
    //     key: "ProfileEdit"
    // }, {
    //     key: "sendmoney"
    // }, {
    //     key: "settings"
    // }, {
    //     key: "profile"
    // }, {
    //     key: "chats",
    //     onscroll: function (mcs) {
    //         if (80 <= mcs.topPct) {
    //             if (Messenger.threads.scrollLoad) {
    //                 Messenger.threads.scrollLoad = false;
    //                 Messenger.threads.update(true, false, function () {
    //                     Messenger.threads.scrollLoad = true;
    //                 });
    //             }
    //         }
    //     }
    // }//,
    // {
    // key: "setting"
    // }
];
// == end config


var port = 3001;
var host = "ws.telegraf.money";

var pathSoket = "socket/v1";
var paramURL = param_url_this();
if (localStorage.getItem("font_theme")) {
    Ractive.require('src/theme/font/' + localStorage.getItem("font_theme") + '.css');
}
if (localStorage.getItem("theme")) {
    switch (localStorage.getItem("theme")) {
        case 'orange':
            Ractive.require('src/theme/orange.css');
            break;
        case 'blue_dark':
            Ractive.require('src/theme/blue_dark.css');
            break;
        case 'dark-black':
            Ractive.require('src/theme/dark-black.css');
            break;
        case 'dark-purple':
            Ractive.require('src/theme/dark-purple.css');
            break;
        case 'dark-green':
            Ractive.require('src/theme/dark-green.css');
            break;
        case 'flowers':
            Ractive.require('src/theme/flowers.css');
            break;
        case 'telegram':
            Ractive.require('src/theme/telegram.css');
            break;
        case 'purple':
            Ractive.require('src/theme/purple.css');
            break;
        case 'green':
            Ractive.require('src/theme/green.css');
            break;
    }
}
paramSocket.vip_id = paramURL.vip_id;
paramSocket.vip_secret = paramURL.vip_secret;
paramSocket.api_key = paramURL.api_key;

var socket;
var countConn = 0;
var deleyConnect = [500, 2000, 4000, 6000, 10000, getRandomInt(15000, 25000)];
var WebSocket = window.WebSocket || window.MozWebSocket;

// if (window.iframe_type) init_app();

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

function init_app() {

    procent = 0.27;

    var user = detect.parse(navigator.userAgent);
    if (window.device) {
        paramSocket.device_platform = device.platform + ' ' + device.version;
        paramSocket.device_platform_type = device.platform;
        paramSocket.device_browser = user.browser.family + ' ' + user.browser.version;
        paramSocket.device_uuid = device.uuid;
        paramSocket.device_model = device.model;
        if (device.platform != 'browser') Messenger.push.setup();

        try {
            if (device.platform != 'browser') init_recorder();
        } catch (e) {
            console.error('init_recorder', e)
        }
    } else {
        paramSocket.device_platform = user.os.name;
        // paramSocket.device_browser = user.browser.family + ' ' + user.browser.version;
        // paramSocket.device_uuid = null;
    }
    if (window.device && platform_style.indexOf(device.platform) != -1) {
        Ractive.require('src/theme/platform' + '/' + device.platform + '.css');

    } else {
        Ractive.require('src/theme/platform' + '/' + 'other' + '.css');

        // other
    }
    paramSocket.uuid = localStorage.getItem("uuid");
    paramSocket.installTime = localStorage.getItem("installTime");
    paramSocket.user_id = localStorage.getItem("user_id");

    paramSocket.registrationId = localStorage.getItem("registrationId");

    paramSocket.room = encodeURIComponent(paramURL.room);
    if (paramURL.user_id && localStorage.getItem("authToken") == 'ok') {
        delete paramSocket.uuid;
        delete paramSocket.installTime;
        delete paramSocket.registrationId;
        paramSocket.user_id = paramURL.user_id;
        paramSocket.token = encodeURIComponent(paramURL.token);
    }
    if (paramURL.default_page)
        paramSocket.default_page = paramURL.default_page; //chat:threads_id:5873D832343077901C725CF1

    if (paramSocket && ( paramSocket.user_id || paramSocket.vip_id)) {
        start();

    } else {
        if (!paramSocket.vip_id) {
            console.log('error parametr ws______');
            localStorage.clear();
            location.reload();

        }
    }

}
// document.addEventListener('deviceready', init_app, false);

function jsonToUrl(json) {
    var paramURL = "";
    for (var key in json) paramURL += "&" + key + "=" + json[key];
    return paramURL.replace('&', "?");
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function Emit(json) {
    try {
        var str = JSON.stringify(json);
        if (socket && socket.send)
            socket.send(str);
    } catch (e) {
        console.warn('[WSS] EMIT No valid JSON:,', e, '\n\t', json);
    }
}
function API(method, param, _public, cb, reset_cb) {
    if (!method || typeof method != 'string' || method == '')
        return console.error('[API] error emit ,', method, param, _public);


    if (typeof _public == 'function') {
        reset_cb = cb;
        cb = _public;
        _public = false
    }
    if (_public) {
        Emit({event: 'api/public', data: {method: method, data: param}});
    } else {
        Emit({event: 'api', data: {method: method, data: param}});
    }
    if (typeof cb == 'function') {

        if (_public) {
            if (!onEmiter.hasOwnProperty('API_Response_public_' + method))
                onEmiter['API_Response_public_' + method] = cb;
        }
        else {
            if (!onEmiter.hasOwnProperty('API_Response_' + method))
                onEmiter['API_Response_' + method] = cb;
        }
        if (reset_cb) {
            if (_public)
                onEmiter['API_Response_public_' + method] = cb;
            else
                onEmiter['API_Response_' + method] = cb;
        }
    }

}
var auth_timeout;
var ncoonect;
function start() {


    socket = new WebSocket("wss://" + host + "/" + pathSoket + jsonToUrl(paramSocket), ["soap", "wamp"]);
    socket.onopen = function () {
        console.log("[WSS] Соединение установлено.", paramSocket.device_browser, paramSocket.device_platform, paramSocket.device_uuid);
        countConn = 0;
        procent = 0.30;
        clearTimeout(auth_timeout);
        auth_timeout = setTimeout(function () {
            Messenger.auth({status: false, error: 'client timeout auth App.element.js (157)'})
        }, 30000);
        if (ncoonect && ncoonect.close) ncoonect.close();
        // ncoonect = noty({
        //     text: _chat_e('Соединение установлено.'),
        //     type: 'information',
        //     theme: 'metroui',
        //     layout: 'top',
        //     timeout: 2000,
        //     progressBar: true,
        //     animation: {
        //         open: 'animated fadeInDown',
        //         close: 'animated fadeOutUp'
        //     }
        // });
    };
    socket.onclose = function (event) {
        if (event.wasClean) {
            console.log('[WSS] Соединение закрыто чисто');
        } else {
            setTimeout(function () {
                if (countConn < 5)
                    countConn++;
                start()
            }, deleyConnect[countConn]);
            console.log('[WSS] Обрыв соединения'); // например, "убит" процесс сервера
        }
        if (ncoonect && ncoonect.close) ncoonect.close();
        if(countConn >1) {
            ncoonect = noty({
                text: _chat_e('Не удается установить соединение. Проверьте подключение к интернету'),
                type: 'error',
                theme: 'metroui',
                layout: 'top',
                timeout: deleyConnect[countConn] - 100,
                progressBar: true
            });
        }
        clearTimeout(auth_timeout);
        console.log('[WSS] Close Connection. Code:' + event.code + ' Reason:' + event.reason);
    };
    socket.onmessage = function (event) {
        try {
            var object = JSON.parse(event.data);
        } catch (e) {
            console.warn('[WSS] onmessage No valid JSON:\n\t', event.data);

        }
        console.log(object);
        if (object && object.event && onEmiter.hasOwnProperty(object.event)) {
            if (object.data) {
                onEmiter[object.event](object.data);
            } else {
                onEmiter[object.event]();
            }
        } else console.warn("[WSS] Warn onEmiter(event) \n\tObject: ", object)


    };

    socket.onerror = function (error) {
        Messenger.serverDisconnect();
        clearTimeout(auth_timeout);
        procent = 0.30;
        console.log("[WSS] Error " + error.message);
    };
}
//
//
// function openLink(url, confirm) {
//     if (confirm) {
//         swal({
//             title: _chat_e('Переход по внешней ссылке.'),
//             html: "<strong>" + url + '</strong>',
//             type: 'info',
//             width: 600,
//             timer: 2000,
//             showCancelButton: false
//
//         });
//         window.open(url.toString(), "_system");
//         return true;
//     }
//     swal({
//         title: _chat_e('Переход по внешней ссылке.'),
//         html: _chat_e("Ссылка на внешний ресурс:") + "<strong>" + url + '</strong>',
//         type: 'warning',
//         width: 700,
//         showCancelButton: true,
//         confirmButtonColor: '#d33',
//         cancelButtonColor: '#3085d6',
//         confirmButtonText: _chat_e('Перейти'),
//         cancelButtonText: _chat_e('Отмена')
//     }).then(function () {
//         swal({
//             title: _chat_e('Переход по внешней ссылке.'),
//             html: "<strong>" + url + '</strong>',
//             type: 'info',
//             width: 600,
//             timer: 2000,
//             showCancelButton: false
//
//         });
//         var newWin = window.open(url, "_system");
//         if (!newWin) {
//             location.href = url;
//         }
//     }, function () {
//
//         console.log('Close opening website:' + url)
//
//     })
// }
function reCapth(data, data1) {
    API('recaptcha_testing_job', {r: data, hesh: guid()}, false, function (res) {
        if (res && res.status && res.status == 'ok')
            swal.close();
        else {
            grecaptcha.reset();
        }
    })
}
function reCapthErr() {
    grecaptcha.reset();

}
var onEmiter = {
    auth: function (data) {

        Messenger.auth(data);
    },
    auth_emit: function (data) {
        console.error('[Error auth Emiter server]:', data)
    },
    error_bot: function (data) {
        swal({
            title: '',
            html: '<center><div id="recaptcha" ></div></center>',
            width: 350,
            showCancelButton: false,
            showConfirmButton: false
        });
        grecaptcha.render(
            'recaptcha',
            {
                sitekey: '6LcYxAoUAAAAABDh_cMCL3q_z0D_LBZ_I-62HZUP',
                callback: 'reCapth',
                "expired-callback": reCapthErr
            }
        )
    },
    message_telegraf: function (data) {
        Messenger.chat.message(data);

    },
    message_telegraf_read: function (data) {
        Messenger.chat.read_this_chat(data);

    }
};
function save_pos_caret() {
    if (window.getSelection)
        var sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount)
        return sel.getRangeAt(0);
    else if (document.selection && document.selection.createRange)
        return document.selection.createRange();
}
ractiveComponent['rootApp'].set('message_enter_length', 0);
function autosize() {
    var el = document.getElementById('send_text');
    setTimeout(function () {
        el.style.cssText = 'height:auto; padding:0';
        el.style.cssText = 'height:' + el.scrollHeight + 'px';
    }, 0);
}
document.querySelector("#send_text[contenteditable]").addEventListener("keyup", function (e) {
    ractiveComponent['rootApp'].set('message_enter_length', e.target.outerText.length);
    window.pos_caret = save_pos_caret();
    autosize(e);
});
document.querySelector("#send_text[contenteditable]").addEventListener("click", function (e) {
    window.pos_caret = save_pos_caret();

});
document.querySelector("#send_text[contenteditable]").addEventListener("paste", function (e) {
    e.preventDefault();
    var text = e.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
    ractiveComponent['rootApp'].set('message_enter_length', e.target.outerText.length + text.length);
    autosize(e);
});

// new  js

function spliceString(str, index, count, add) {
    var ar = str.split('');
    ar.splice(index, count, add);
    return ar.join('');
}

function select_smile(smile) {
    var sel, range, html;
    sel = window.getSelection();
    range = pos_caret || {startOffset: 0};
    range.deleteContents();
    var textNode = document.createElement('img');
    textNode.className = 'icon ' + smile + ' smile-22';
    textNode.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    textNode['data-smile'] = smile;
    range.insertNode(textNode);
    range.setStartAfter(textNode);
    sel.removeAllRanges();
    sel.addRange(range);

}
// function select_smile(smile) {
//     console.log('select_smile');
//     var textAr = $('#send_text');
//     textAr.html();
//     if(!window.pos_caret) window.pos_caret = {startOffset:0};
//     textAr.html(spliceString(textAr.html(),pos_caret.startOffset ,0,'<img class="icon '+smile+' '+smile+'-dims"/>'));
//
// }
ractiveComponent['rootApp'].set('send_wait', false);
var send_wait = false;
ractiveComponent['rootApp'].on('send_message', function (event) {
    if (!send_wait) {
        ractiveComponent['rootApp'].set('send_wait', true);
        send_wait = true;
        var textAr = $('#send_text');
        var messageThis = textAr.html().replace('&nbsp;', '');

        if (messageThis.length < 1 || messageThis.length > 1000 && +MyProfile.webtransfer_id !== 56685778) textAr.val(messageThis);
        else {
            Messenger.chat.send(messageThis);
            textAr.html('');
        }
        var input = document.getElementById('send_text');
        input.focus();
        autosize();
    }
    // input.select();
});
ractiveComponent['rootApp'].set('record', 'end');

function stopRecording(finish) {
    if (finish) {
        audioRecorder.finishRecording();
        if (audioRecorder.options.encodeAfterRecord) {
            // $modalProgress
            //     .find('.modal-title')
            //     .html("Encoding " + audioRecorder.encoding.toUpperCase());
            // $modalProgress.modal('show');
        }
    } else
        audioRecorder.cancelRecording();
}
ractiveComponent['rootApp'].on('start_record', function (event) {
    if (window.navigator && navigator.vibrate)
        navigator.vibrate(70);
    // if (!window.audioRecorder) {
       return swal({
            title: _chat_e('Ошибка записи'),
            text: "Voice Message SOON",
            customClass: 'swal-telegraf-modal',
            buttonsStyling: false,
            confirmButtonClass: 'button-n',
            cancelButtonClass: 'cansel-btns',
            showCancelButton: false,
            type: 'error',
            confirmButtonText: _chat_e('ОК'),
            showLoaderOnConfirm: true
        });
        // return init_recorder();
    // }
    if (window.audioRecorder) {
        if (audioRecorder.isRecording()) {
            findTIME();
            ractiveComponent['rootApp'].set('record', 'send');
            stopRecording(true);
            ractiveComponent['rootApp'].set('record_progress', 0);

            // recorder.stop();
            // recorder.exportWAV(function (blob) {
            //     var xhr = new XMLHttpRequest();
            //     xhr.open('POST', 'https://telegraf.money/voice_message', true);
            //     xhr.onload = function (e) {
            //         if (e.target.readyState == 4) {
            //             try {
            //                 var result = JSON.parse(e.target.response);
            //                 if (result && result.success) {
            //                     Messenger.chat.send('Voice message', {type: 'voice', data: result.attach_path})
            //                 }
            //
            //             } catch (e) {
            //                 console.error('voice upload err:', e)
            //             }
            //             setTimeout(function () {
            //                 ractiveComponent['rootApp'].set('record', 'end');
            //                 clearFields();
            //             }, 1000)
            //         }
            //         console.log(arguments);
            //     };
            //     xhr.send(blob);
            //
            // });
            // recorder.clear();

        }
        else {
            audioRecorder.setOptions({
                timeLimit: 3 * 60,
                encodeAfterRecord: true,
                progressInterval: 2 * 1000,
                ogg: {quality: 0.1},
                mp3: {bitRate: 64}
            });
            ractiveComponent['rootApp'].set('record', 'start');
            findTIME();
            audioRecorder.startRecording();
        }

        audioRecorder.onTimeout = function (recorder) {
            stopRecording(true);
        };

        audioRecorder.onEncodingProgress = function (recorder, progress) {
            console.log('audioRecorder onEncodingProgress', progress);
        };

        audioRecorder.onComplete = function (recorder, blob) {

            console.log('audioRecorder onComplete', blob, recorder.encoding);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://telegraf.money/voice_message', true);
            xhr.upload.onprogress = function (event) {
                console.log();
                ractiveComponent['rootApp'].set('record_progress', (100 / event.total * event.loaded).toFixed(0));

            };
            xhr.onload = function (e) {
                if (e.target.readyState == 4) {
                    try {
                        var result = JSON.parse(e.target.response);
                        if (result && result.success) {
                            Messenger.chat.send('Voice message', {type: 'voice', data: result.attach_path})
                        }

                    } catch (e) {
                        console.error('voice upload err:', e)
                    }
                    setTimeout(function () {
                        ractiveComponent['rootApp'].set('record', 'end');
                        clearFields();
                    }, 1000)
                }
                console.log(arguments);
            };
            xhr.onerror = function (e) {

                noty({
                    text: _chat_e('Ошибка отправки записи.'),
                    type: 'information',
                    theme: 'metroui',
                    layout: 'top',
                    timeout: 3000,
                    progressBar: true,
                    animation: {
                        open: 'animated fadeInDown',
                        close: 'animated fadeOutUp'
                    }
                });
                setTimeout(function () {
                    ractiveComponent['rootApp'].set('record', 'end');
                    clearFields();
                }, 1000)
            };
            xhr.send(blob);

        };

        audioRecorder.onError = function (recorder, message) {
            noty({
                text: _chat_e('Ошибка записи. Повторите попытку'),
                type: 'error',
                theme: 'metroui',
                layout: 'top',
                timeout: 3000,
                progressBar: true,
                animation: {
                    open: 'animated fadeInDown',
                    close: 'animated fadeOutUp'
                }
            });
        };


    }
    if (!window.audioRecorder) {
        swal({
            title: _chat_e('Ошибка записи'),
            text: _chat_e("Выдайте доступ к мирофону  и повторите попытку отправить Voice Message"),
            customClass: 'swal-telegraf-modal',
            buttonsStyling: false,
            confirmButtonClass: 'button-n',
            cancelButtonClass: 'cansel-btns',
            showCancelButton: false,
            type: 'error',
            confirmButtonText: _chat_e('ОК'),
            showLoaderOnConfirm: true
        });
        return init_recorder();
    }

});

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    var t = new Date().getTime();
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-t' + t;
}
function _find(array, paramFind, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][paramFind] == value) {
            return i;
        }
    }
    return false;

}
setInterval(function () {
    if (Messenger.finance.cb_function_arr.length >= 1) Messenger.finance.update();
    //auto update fin data
}, 40 * 1000); // 30 sec
// new code

setInterval(function () {
    var u = ractiveComponent['rootApp'].get('open_threads');
    if (u && u.last_online_at) {
        u.last_online = moment(u.last_online_at, moment.ISO_8601).fromNow();
        ractiveComponent['rootApp'].set('open_threads', u);
    }
}, 30 * 1000);


Messenger.on('openCard', function (id) {
    if (id == 'add') {
        swal({
            customClass: 'swal-telegraf-modal select-form text-center',
            title: _chat_e('Активация карты...'),
            closeOnConfirm: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: true,
            showCancelButton: false,
            showLoaderOnConfirm: true,
            text: _chat_e('Активация карты может занять несколько минут'),
            preConfirm: function () {
                return new Promise(function (resolve, reject) {
                    // here should be AJAX request
                    setTimeout(function () {
                        resolve();
                    }, 30000);
                });
            },
        });
        Messenger.finance.callback_save(function (cards, loans, cards_all) {
            // ractiveComponent['wtc-CardsApp'].set('finance_cards', cards);
            // if (cards_all)
            //     ractiveComponent['wtc-CardsApp'].set('finance_cards_ALL', cards_all);
            // ractiveComponent['wtc-CardsApp'].set('finance_cards_load', true);
            // $(".__nano").nanoScroller();
            return swal({
                customClass: 'swal-telegraf-modal select-form',
                buttonsStyling: false,
                confirmButtonClass: 'button-n',
                // cancelButtonClass: 'cansel-btns',
                // cancelButtonText: _chat_e('Отмена'),
                title: _chat_e('Ошибка заказа карты'),
                text: _chat_e("У вас уже  есть активная пластиковая карта вы можете перезаказать ее."),
                type: 'info',
                confirmButtonColor: '#3085d6',
                showCancelButton: false
            })
        });

    }
    Messenger.cardID = id;
    Messenger.setPage('info_card')
});
var get_finance_data_this_user_int;
var bonus_brouser;

Messenger.on('add_share', function (e, index) {
    $('nav#menu').data("mmenu").close();
    if (bonus_brouser && typeof bonus_brouser == 'function' && MyProfile) {
        return bonus_brouser && bonus_brouser(MyProfile.webtransfer_id)

    }
    setTimeout(function () {
        if (bonus_brouser && typeof bonus_brouser == 'function' && MyProfile) {
            return bonus_brouser && bonus_brouser(MyProfile.webtransfer_id)

        }

        swal({
            title: _chat_e('Добавить партнера'),
            // type: 'success',
            customClass: 'swal-telegraf-modal',
            buttonsStyling: false,
            confirmButtonClass: 'button-n',
            cancelButtonClass: 'cansel-btns',
            confirmButtonText: _chat_e('Поделиться'),
            cancelButtonText: _chat_e('Закрыть'),
            showCancelButton: true,
            html: _chat_e('Ваша реферальная ссылка: ') + '<br><div class="select-form"><input class="form-control" value="https://telegraf.money/?ref=' + MyProfile.webtransfer_id + '" ></div><br>' + _chat_e('Приглашайте ваших друзей в Telegraf.Money и получайте по $50 кредитным бонусом на вашу карту за каждого из них. Ваши друзья также получат по $50, зарегистрировавшись по вашей ссылке.') + ''
        }).then(function () {
            Messenger.share();
        });


    }, 500);
});

Messenger.on('setPage', function (page, param) {
    Messenger.setPage(page, param)
});

Messenger.on('outlogin', function (e, index) {
    $('nav#menu').data("mmenu").close();
    setTimeout(function () {
        swal({
            customClass: 'swal-telegraf-modal select-form',
            buttonsStyling: false,
            confirmButtonClass: 'button-n',
            cancelButtonClass: 'cansel-btns',
            cancelButtonText: _chat_e('Отмена'),
            title: _chat_e('Внимание!'),
            text: _chat_e("Вы действительно хотите выйти из аккаунта?"),
            type: 'warning',
            confirmButtonColor: '#3085d6',
            showCancelButton: true,
            confirmButtonText: _chat_e('Выйти'),
            showLoaderOnConfirm: true,
            preConfirm: function () {


                return new Promise(function (resolve, reject) {
                    var t = setTimeout(function () {
                        reject(_chat_e('Ошибка сервер недоступен.'));
                        localStorage.clear();
                        location.reload();
                    }, 6000);
                    API('logout_this_user', {
                        code: localStorage.getItem("installTime"),
                        uuid: localStorage.getItem("uuid")
                    }, true, function (response) {
                        if (response.success) {
                            clearTimeout(t);
                            localStorage.clear();

                            resolve()
                        } else {
                            clearTimeout(t);
                            reject(_chat_e('Ошибка сервер недоступен.'))
                        }
                    });

                })
            },
            allowOutsideClick: false
        }).then(function () {
            location.reload();
            swal.closeModal()
        })
    }, 10);
});


var timeoutUpdate_threads = false;

Messenger.on('openChats', function (index) {
    Messenger.openChat(Messenger.threads.data[index]);
});
ractiveComponent['rootApp'].set('scanUserByID_status', {});
var timeout_scanUserByID;
Messenger.on('scanUserByID', function (index, type) {
    clearTimeout(timeout_scanUserByID);
    var time = 0;
    if (type == 'key') time = 1000;
    timeout_scanUserByID = setTimeout(function () {
        if (ractiveComponent.hasOwnProperty(index)) {
            ractiveComponent[index].set('scanUserByID_status', 'load');
            API('userInfo', {webtransfer_id: $('#User-' + index).val()}, function (result) {
                if (result.success == true) {
                    ractiveComponent[index].set('scanUserByID', result);
                    ractiveComponent[index].set('scanUserByID_status', 'ok');
                } else {
                    ractiveComponent[index].set('scanUserByID_status', 'err');
                }

            }, true)
        }
    }, time);


});
var page_load_messenger = false;
Messenger.threads.callback_save('App', function (threads) {
    if (threads.length == 0 && !page_load_messenger) {
        Messenger.setPage('debitcoin');
        page_load_messenger = true;
    }
    ractiveComponent['rootApp'].set('threads', threads);
    ractiveComponent['rootApp'].set('threads_finish', Messenger.threads.finish);
});


function __link(url, cb) {

    var redir;
    var redir_count = 0;
    if (window.device && device.uuid) {

        var ref = cordova.ThemeableBrowser.open(url, '_blank', {
            statusbar: {
                color: '#ffffffff'
            },
            toolbar: {
                height: 44,
                color: '#f0f0f0ff'
            },
            title: {
                color: '#003264ff',
                showPageTitle: true
            },
            backButton: {
                image: 'back',
                imagePressed: 'back_pressed',
                align: 'left',
                event: 'backPressed'
            },
            forwardButton: {
                image: 'forward',
                imagePressed: 'forward_pressed',
                align: 'left',
                event: 'forwardPressed'
            },
            closeButton: {
                wwwImage: 'src/img/arrow-l-c_webview.png',
                wwwImagePressed: 'src/img/arrow-l-c_webview.png',
                wwwImageDensity: 2,
                align: 'center',
                event: 'closePressed'
            },
            backButtonCanClose: true
        }).addEventListener('backPressed', function (e) {
            ref.close();
        }).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function (e) {
            console.error(e.message);
        }).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function (e) {
            console.log(e.message);
        });
        ref.addEventListener('loadstop', function (event) {
            if (event.url.match("mobile/close")) {
                ref.close();
                swal.close();
                cb && cb();
            }
            redir_count++;
            // if (redir_count >= 2)
            //     ref.show();
        });
        ref.addEventListener('exit', function () {
            swal.close();

        });

    } else {

        window.open(url, '_system', 'location=no');

    }

}
var bonus_tab = '';
function bonus(type) {
    bonus_tab = type;
    if (type == 'review')
        Messenger.setPage('bonus', 'review');
    if (type == 'popup_review') {
        if (!localStorage.getItem('review_bonus') || localStorage.getItem('review_bonus') < (new Date().getTime() - 48 * 60 * 60000)) {
            localStorage.setItem('review_bonus', (new Date().getTime() + 40 * 60 * 60000));

            // swal({
            //     title: '',
            //     // type: 'success',
            //     customClass: 'swal-telegraf-modal',
            //     buttonsStyling: false,
            //     confirmButtonClass: 'button-n',
            //     cancelButtonClass: 'cansel-btns',
            //     confirmButtonText: _chat_e('Оставить отзыв'),
            //     cancelButtonText: _chat_e('Закрыть'),
            //     showCancelButton: true,
            //     html: svg_rating + svg_rating + svg_rating + svg_rating + svg_rating + "<h2 style='font-size: 20px;'>"+_chat_e("Хотите бонус 10 USD?<br>Оставьте отзыв")+"<h3>"
            // }).then(function () {
            //
            //         localStorage.setItem('review_bonus', (new Date().getTime()));
            //
            //     bonus('review')
            // });
                    localStorage.setItem('review_bonus', (new Date().getTime()));

        }
    }
}
var svg_rating = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 472.615 472.615" style="enable-background:new 0 0 472.615 472.615; width: 60px;height: 60px;padding: 5px" xml:space="preserve"><g> ' +
    '<g>' +
    '<polygon points="472.615,183.253 297.148,176.296 236.308,11.566 175.468,176.296 0,183.253 137.868,292.02 90.262,461.05     236.308,363.541 382.355,461.05 334.748,292.02   " style="fill: rgb(255, 218, 68);"></polygon> </g> ' +
    '</g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>';
localStorage.getItem('review_bonus');
// setTimeout(function () {
//     bonus('popup_review')
//
// }, 60000);