/**
 * Created by bogdanmedvedev on 25.10.16.
 */
var iframe_type = true;

if (!window.app) {
    window.app = {
        initialize: function () {


            if (config_lang[localStorage.getItem('lang')])
                $.getScript("src/js/lang/" + config_lang[localStorage.getItem('lang')] + ".js", function () {
                    procent = 0.10;
                    $.getScript("src/js/init.js?ver=1.0.0", function () {
                        init();
                    });
                });
            else {
                $.getScript("src/js/lang/" + config_lang.default + ".js", function () {
                    procent = 0.10;
                    $.getScript("src/js/init.js?ver=1.0.0", function () {
                        init();
                    });
                });
            }
        }
    };


}

//
// var options = {
//     icon: "https://telegraf.money/Telegraf.Messenger/www/src/img/logo.png",
//     body: "Demo Application Version:2.4.4 "
// };
//
// var notification = new Notification("Telegraf Money", options);
// notification.onclick = function () {
//     notification.close();
//     if (nw && nw.Window)
//         nw.Window.show();
// };
//
// notification.onshow = function () {
//
//
//     // auto close after 1 second
//     setTimeout(function () {
//         notification.close();
//     }, 30000);
// };