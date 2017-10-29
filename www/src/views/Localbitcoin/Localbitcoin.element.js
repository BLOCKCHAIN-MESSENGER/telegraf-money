var WtcLocalbitcoin = Ractive.extend({
    oninit: function () {
        console.log('Localbitcoin.oninit !');
        ractiveComponent['wtc-LocalbitcoinApp'].set('MyProfile', MyProfile);
        Messenger.auth_action.call_wait_auth(function () {
            Messenger.threads.callback_save('ProfileApp', function (threads) {
                ractiveComponent['wtc-LocalbitcoinApp'].set('threads', threads);
                ractiveComponent['wtc-LocalbitcoinApp'].set('threads_finish', Messenger.threads.finish);
                $(".__nano").nanoScroller();
            });
        });
        $(".__nano").nanoScroller();

        this.on('errorAvatarMy', function (e, v1, v2, v3) {
            if (window.Messenger) Messenger.event['errorAvatarMy'] && Messenger.event['errorAvatarMy']();
        });
        $('.close-chat').click(function () {
            if (!$('.cards-wrapper.exchange-wrapper').hasClass("hide-chat-block"))
                $('.cards-wrapper.exchange-wrapper').addClass("hide-chat-block");
            else
                $('.cards-wrapper.exchange-wrapper').removeClass("hide-chat-block");


        });
    },
    onrender: function () {
        console.log('Profile.onrender !');

    },
    oncomplete: function () {
        console.log('Profile.oncomplete !');
    }
});
