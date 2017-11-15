var WtcDialogs = Ractive.extend({
    oninit: function () {


        console.log('Dialogs.oninit !');

        $(".__nano").nanoScroller();

    },
    onrender: function () {
        console.log('Dialogs.onrender !');

    },
    oncomplete: function () {
        console.log('Dialogs.oncomplete !');
    }
});
var StoreThreads = localStorage.getItem('threads');
if (StoreThreads) {
    try {
        ractiveComponent['wtc-DialogsApp'].set('threads', JSON.parse(StoreThreads));
        ractiveComponent['wtc-DialogsApp'].set('threads_finish', true);
        $(".__nano").nanoScroller();

    } catch (e) {
    }
}
Messenger.auth_action.call_wait_auth(function () {
    Messenger.threads.callback_save('DialogsApp',function (threads) {
        ractiveComponent['wtc-DialogsApp'].set('threads', threads);
        ractiveComponent['wtc-DialogsApp'].set('threads_finish', Messenger.threads.finish);
        $(".__nano").nanoScroller();
        localStorage.setItem('threads', JSON.stringify(threads));
    });
});
var timeoutUpdate_threads = false;
ractiveComponent['wtc-DialogsApp'].on('errorAvatar', function (e, index) {
    clearTimeout(Messenger.threads.update);
    Messenger.threads.data[index].avatar_path = false;
    timeoutUpdate_threads = setTimeout(Messenger.threads.update, 100)
});
ractiveComponent['wtc-DialogsApp'].on('errorAvatarGroup', function (e, index) {
    clearTimeout(Messenger.threads.update);
    Messenger.threads.data[index].group_photo = false;
    timeoutUpdate_threads = setTimeout(Messenger.threads.update, 100)
});
ractiveComponent['wtc-DialogsApp'].on('openChats', function (e, index) {
    Messenger.openChat(Messenger.threads.data[index]);
});

