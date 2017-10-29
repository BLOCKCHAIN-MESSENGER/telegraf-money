'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var _path_chat = 'src/views/';
var _path_src = './src/';
// var _chat_e = function (t) {
//     return t;
// };
var _ver = '0.0.0';
var _e = _chat_e;
var _room_wt = 'webtransfer.com';
var ractiveComponent = {};
var MyProfile = localStorage.getItem('MyProfile');
if (MyProfile) {
    if (/^[\],:{}\s]*$/.test(MyProfile.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        try {
            MyProfile = JSON.parse(MyProfile);
        } catch (e) {
            MyProfile = false;
        }
    } else {
        MyProfile = false;
    }
}
var audio_context, audioRecorder;
function init_recorder() {
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        window.URL = window.URL || window.webkitURL;
        navigator.getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia ||
            cordova.plugins.iosrtc.getUserMedia;
        audio_context = new AudioContext;

        navigator.getUserMedia({audio: true}, function (stream) {
            var input = audio_context.createMediaStreamSource(stream);

            audioRecorder = new WebAudioRecorder(input, {
                workerDir: 'plugins/voice/',
                encoding: 'ogg',
                onEncoderLoading: function (recorder, encoding) {
                    console.log(' WebAudioRecorder onEncoderLoading')
                },
                onEncoderLoaded: function () {
                    console.log('WebAudioRecorder ok loaded')
                }
            });
            swal.close();
            // noty({
            //     text: _chat_e('Полученины права на работу с записоваюшим устройством. Теперь вы можете отправить Voice Message'),
            //     type: 'information',
            //     theme: 'metroui',
            //     layout: 'top',
            //     timeout: 3000,
            //     progressBar: true,
            //     animation: {
            //         open: 'animated fadeInDown',
            //         close: 'animated fadeOutUp'
            //     }
            // });
        }, function (e) {

        });
    } catch (e) {
        console.error('init_recorder', e)
    }

}
function trim(string) {
    return string.replace(/\s+/g, " ").replace(/(^\s*)|(\s*)$/g, '');
}
var init_secund = 0;
var startDate;
var clocktimer;

function clearFields() {
    init_secund = 0;
    clearTimeout(clocktimer);
    document.getElementById('voice_time_record').innerHTML = '00:00.00';
}

function startTIME() {
    var thisDate = new Date();
    var t = thisDate.getTime() - startDate.getTime();
    var ms = t % 1000;
    t -= ms;
    ms = Math.floor(ms / 10);
    t = Math.floor(t / 1000);
    var s = t % 60;
    t -= s;
    t = Math.floor(t / 60);
    var m = t % 60;
    t -= m;
    t = Math.floor(t / 60);
    var h = t % 60;
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    if (ms < 10) ms = '0' + ms;
    if (init_secund == 1) document.getElementById('voice_time_record').innerHTML = m + ':' + s + '.' + ms;
    clocktimer = setTimeout("startTIME()", 10);
}
function findTIME() {
    if (init_secund == 0) {
        startDate = new Date();
        startTIME();
        init_secund = 1;
    } else {
        init_secund = 0;
        clearTimeout(clocktimer);
    }
}
function init() {
    procent = 0.15;

    // $('body').append('<div id="ractive_chat_module" style="height: 100%"></div>');
    // $('body').append('<div id="ractive_chat_module2" style="height: 100%"></div>');
    var _componentsLoad = function _componentsLoad(cb) {
        Ractive.getHtml(_path_chat + 'templates' + '.html?ver=' + _ver).then(function (templates) {
            var arr_templts = templates.split('##!!!##');
            var parts = [];
            var name = '';
            for (var i in arr_templts) {
                if (arr_templts[i].length) {
                    parts = arr_templts[i].split('##!:!##');
                    name = parts[0];

                    Ractive.components[name] = Ractive.extend({
                        isolated: false,
                        template: parts[1],
                        nameComponents: name,
                        onrender: function () {
                            if (window.Messenger)
                                Messenger.event['ComponentsOnRender'] && Messenger.event['ComponentsOnRender'](this.nameComponents);
                            this.on('*', function (e, v1, v2, v3) {
                                if (window.Messenger && e && e.name)
                                    Messenger.event[e.name] && Messenger.event[e.name](v1, v2, v3);
                            });
                        }
                    });
                }
            }
            procent += 0.1;
            cb && cb();
        });

    };
    var requireElement = function requireElement(param, paralel, cb) {
        paralel = paralel || {
                cnt: 0, afterlast: function afterlast() {
                }
            };
        paralel.cnt++;
        var name;
        if ('string' == typeof param) {
            name = param;
            param = {name: name};
        } else {
            name = param.name;
        }

        if (!name) {
            throw new Error('You have to specify a file/name Ractive.requireElement');
        }
        var src = param.src || name;
        name = name.split("/");
        var cls = name;
        name = 'wtc-' + name.join('-');
        var fileName = cls[cls.length - 1].capitalizeFirstLetter();
        for (var i in cls) {
            cls[i] = cls[i].capitalizeFirstLetter();
        }
        cls = 'Wtc' + cls.join('');
        if (fileName == 'Auth') {
            param.element = '#ractive_chat_module2';
            $('#ractive_chat_module2').css('display', 'block');
            $('#ractive_chat_module').css('display', 'none');
        } else {
            $('#ractive_chat_module2').css('display', 'none');
            $('#ractive_chat_module').css('display', 'block');
        }
        if (!Ractive.components[name]) {
            Ractive.require(_path_chat + src + '/' + fileName + '.min.css');

            Ractive.getHtml(_path_chat + src + '/' + fileName + '.html').then(function (template) {

                if (Ractive.DEBUG) console.log('Element ' + name + ' loaded');
                if (fileName == 'App') {

                    ractiveComponent['rootApp'] = new Ractive({
                        el: '#ractive_chat_module',
                        template: template,
                        data: {
                            _e: _chat_e,
                            notificationCount: 0,
                            MyProfile: MyProfile,
                            _path_src: _path_src
                        },
                        oninit: function oninit() {
                            console.log('#ractive_chat_module init!');
                            // this.on({
                            //
                            // });
                        },
                        oncomplete: function oncomplete() {
                            Ractive.require(_path_chat + src + '/' + fileName + '.element.js').then(function () {
                                Ractive.components[name] = window[cls].extend({
                                    template: template
                                });
                                ractiveComponent[cls] = new window[cls]();
                                paralel.cnt--;
                                setTimeout(function () {
                                    if (0 >= paralel.cnt && !paralel.ran) {
                                        paralel.ran = true;
                                        paralel.afterlast();
                                    }
                                }, 1);
                            });
                        }
                    });
                } else {


                    ractiveComponent[name + 'App'] = new Ractive({
                        el: param.element,
                        template: template,
                        data: {
                            _e: _chat_e,
                            MyProfile: MyProfile,
                            _path_src: _path_src
                        },
                        oninit: function oninit() {
                            this.on('setPage', function (e, v1, v2, v3) {
                                if (window.Messenger) Messenger.event[e.name] && Messenger.event[e.name](v1, v2, v3);
                            });
                        },
                        oncomplete: function oncomplete() {

                            Ractive.require(_path_chat + src + '/' + fileName + '.element.min.js?ver=' + _ver).then(function () {

                                Ractive.components[name] = window[cls].extend({
                                    template: template
                                });
                                ractiveComponent[cls] = new window[cls]();
                                paralel.cnt--;
                                setTimeout(function () {
                                    if (0 >= paralel.cnt && !paralel.ran) {
                                        paralel.ran = true;
                                        paralel.afterlast(name);
                                    }
                                }, 1);
                            });
                        }
                    });
                }
            });
        } else {
            paralel.cnt--;
            if (0 >= paralel.cnt && !paralel.ran) {
                paralel.ran = true;
                paralel.afterlast(name);
            }
        }
    };
    window['requireElement'] = requireElement;
    // requireElement({name: 'Auth', element: '#ractive_chat_module'});

    if (param_url_this().vip_id) {
        _componentsLoad(function () {
            requireElement({name: 'App'});
        });
    } else {
        var paramURL = param_url_this();

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://telegraf.money/api/v1/?method=public_test_auth_token&token=' + encodeURIComponent(paramURL.token) + '&user_id=' + paramURL.user_id, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;

            // по окончании запроса доступны:
            // status, statusText
            // responseText, responseXML (при content-type: text/xml)

            if (this.status == 200) {
                var result = JSON.parse(this.responseText);
                if (result.success == true && result.status == 'success') {
                    localStorage.setItem("authToken", 'ok');
                    _componentsLoad(function () {
                        requireElement({name: 'App'});
                    });
                    return true;
                }

            }
            localStorage.setItem("authToken", 'err');
            if (localStorage.getItem("walletPrivateKey") && localStorage.getItem("auth"))
                _componentsLoad(function () {
                    requireElement({name: 'App'});
                    procent = 0.25;
                });
            else if (!localStorage.getItem("installTime") || !localStorage.getItem("user_id") || !localStorage.getItem("uuid")) {
                requireElement({name: 'Auth', element: '#ractive_chat_module'});
                procent = 0.25;
            } else {
                _componentsLoad(function () {
                    requireElement({name: 'App'});
                    procent = 0.25;
                });
            }
        };
    }
}
String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
function setLang(lang) {
    localStorage.setItem('lang', lang);
    location.reload();
}