var WtcProfile = Ractive.extend({
    oninit: function () {
        console.log('Profile.oninit !');
        ractiveComponent['wtc-ProfileApp'].set('MyProfile', MyProfile);
        API('get_finance_data_this_user', {}, false, function (response) {
            ractiveComponent['wtc-ProfileApp'].set('finance', response);
            ractiveComponent['wtc-ProfileApp'].set('finance_load', true);
            console.log(response);
        },true);
        Messenger.auth_action.call_wait_auth(function () {
            Messenger.threads.callback_save('ProfileApp',function (threads) {
                ractiveComponent['wtc-ProfileApp'].set('threads', threads);
                ractiveComponent['wtc-ProfileApp'].set('threads_finish', Messenger.threads.finish);
                $(".__nano").nanoScroller();
            });
        });
        $(".__nano").nanoScroller();

        this.on('errorAvatarMy', function (e, v1, v2, v3) {
            if (window.Messenger) Messenger.event['errorAvatarMy'] && Messenger.event['errorAvatarMy']();
        });
    },
    onrender: function () {
        console.log('Profile.onrender !');

    },
    oncomplete: function () {
        console.log('Profile.oncomplete !');
    }
});
