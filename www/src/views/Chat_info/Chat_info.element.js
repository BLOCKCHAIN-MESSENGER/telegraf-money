/**
 * Created by bogdanmedvedev on 25.03.17.
 */
var WtcChat_info = Ractive.extend({
    data: function () {
        return {}
    },
    oninit: function () {
        console.log('Chat_info.oninit !');
        ractiveComponent['wtc-Chat_infoApp'].set('MyProfile', MyProfile);
        Messenger.auth_action.call_wait_auth(function () {
            Messenger.threads.callback_save('Chat_infoApp', function (threads) {
                ractiveComponent['wtc-Chat_infoApp'].set('threads', threads);
                ractiveComponent['wtc-Chat_infoApp'].set('threads_finish', Messenger.threads.finish);

            });
        });
        ractiveComponent['wtc-Chat_infoApp'].set('thread', Messenger.threads.open);
        function sort_for_data_name(a, b) {
            if (a.info.name_first+a.info.name_last < b.info.name_first+b.info.name_last) return 1;
            if (a.info.name_first+a.info.name_last > b.info.name_first+b.info.name_last) return -1;
            return 0;
        }

        Messenger.chat.threads.users.sort(sort_for_data_name);
        ractiveComponent['wtc-Chat_infoApp'].set('users', Messenger.chat.threads.users);
        ractiveComponent['wtc-Chat_infoApp'].set('limit', 30);
        ractiveComponent['wtc-Chat_infoApp'].set('page', 1);

        $(".scroll_chat_info").nanoScroller({preventPageScrolling: true, tabIndex: -1, iOSNativeScrolling: true});
        //             if (typeof Messenger.body['Chat'].onscroll === 'function') Messenger.body['Chat'].onscroll(this.mcs);
        //
        // $(".scroll_chat_info").bind("scrollend", function (e) {
        //
        //     console.log('end scroll');
        //     var page = ractiveComponent['wtc-Chat_infoApp'].get('page');
        //     console.log('end scroll1');
        //
        //     ractiveComponent['wtc-Chat_infoApp'].set('page', (page + 1));
        //     console.log('end scroll2');
        //
        //     $(".scroll_chat_info").nanoScroller('update');
        //     console.log('end scroll3',page);
        //
        //
        // });


    },
    onrender: function () {
        console.log('cards.onrender !');

    },
    oncomplete: function () {
        console.log('cards.oncomplete !');
    }
});
ractiveComponent['wtc-Chat_infoApp'].on('page_get', function (e, type) {
    var page = ractiveComponent['wtc-Chat_infoApp'].get('page');
    if (type == 'next') {
        ractiveComponent['wtc-Chat_infoApp'].set('page', page + 1);

    }
    if (type == 'prev') {
        if (page > 0)
            ractiveComponent['wtc-Chat_infoApp'].set('page', page - 1);
    }
});
