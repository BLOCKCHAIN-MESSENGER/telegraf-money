if (window.device) {
var app = {
        // Application Constructor
        initialize: function () {
            this.bindEvents();
        },
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function () {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        // deviceready Event Handler
        //
        // The scope of 'this' is the event. In order to call the 'receivedEvent'
        // function, we must explicitly call 'app.receivedEvent(...);'
        onDeviceReady: function () {
            console.log('onDeviceReady');

            if (window.cordova) {
                window.open = cordova.InAppBrowser.open;

            }
            if (config_lang[localStorage.getItem('lang')]) {
                console.log('onDeviceReady');
                $.getScript("src/js/lang/" + config_lang[localStorage.getItem('lang')] + ".js", function () {
                    procent = 0.10;
                    $.getScript("src/js/init.js?ver=1.0.0", function () {
                        init();
                        console.log('init');
                    });
                });
            } else {
                console.log('onDeviceReady');
                $.getScript("src/js/lang/" + config_lang.default + ".js", function () {
                    procent = 0.10;
                    $.getScript("src/js/init.js?ver=1.0.0", function () {
                        init();
                        console.log('init');
                    });
                });
            }
            // var user = detect.parse(navigator.userAgent);
            // if (window.device) {
            //     app.setupPush();
            // } else if (('Chrome' == user.browser.family || 'Firefox' == user.browser.family)) {
            //     app.setupPush();
            // }
            app.setupPush();

            app.receivedEvent('deviceready');
        },
        // Update DOM on a Received Event
        receivedEvent: function (id) {

        },
        setupPush: function () {
            console.log('registrationId: '+ localStorage.getItem('registrationId'));


        }
    };
}
function param_url_this() {
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
}