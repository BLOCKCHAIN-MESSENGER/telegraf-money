var WtcContacts = Ractive.extend({
    oninit: function () {

        ractiveComponent['wtc-ContactsApp'].set('MyProfile', MyProfile);
        ractiveComponent['wtc-ContactsApp'].set('search_text', '');

        Messenger.friends.callback_save(function (friends) {
            ractiveComponent['wtc-ContactsApp'].set('friends', friends);
            ractiveComponent['wtc-ContactsApp'].set('friends_finish', true);
        });
        Messenger.partners.callback_save(function (partners) {
            ractiveComponent['wtc-ContactsApp'].set('partners', partners);
            ractiveComponent['wtc-ContactsApp'].set('partners_finish', true);
        });
        ractiveComponent['wtc-ContactsApp'].set('loans_finish', true);
        ractiveComponent['wtc-ContactsApp'].set('credit_finish', true);


    },
    onrender: function () {
        console.log('WebtransferChatContacts.onrender !');

    },
    oncomplete: function () {
        console.log('WebtransferChatContacts.oncomplete !');
    }
});
ractiveComponent['wtc-ContactsApp'].set('tab', 'partners');

ractiveComponent['wtc-ContactsApp'].on('SetTabContacts',function (e,tab) {
    ractiveComponent['wtc-ContactsApp'].set('tab', tab)
});
ractiveComponent['wtc-ContactsApp'].on('addPartner',function (e,tab) {
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
        html: _chat_e('Ваша реферальная ссылка: ')+'<br><div class="select-form"><input class="form-control" value="https://telegraf.money/?ref='+MyProfile.webtransfer_id+'" disabled="disabled"></div><br>'+_chat_e('Приглашайте ваших друзей в Telegraf.Money и получайте по $50 кредитным бонусом на вашу карту за каждого из них. Ваши друзья также получат по $50, зарегистрировавшись по вашей ссылке.')
    }).then(function () {
        Messenger.share();
    });
});

ractiveComponent['wtc-ContactsApp'].on('errorAvatar', function (e, index) {
    Messenger.contacts.data[index].avatar_path = false;
    ractiveComponent['wtc-ContactsApp'].set('contacts', Messenger.contacts.data);
});
ractiveComponent['wtc-ContactsApp'].on('openChats', function (e, i) {
    Messenger.openChat(Messenger[ractiveComponent['wtc-ContactsApp'].get('tab')].data[i], false);
});
ractiveComponent['wtc-ContactsApp'].on('setType', function (e, tab) {
    ractiveComponent['wtc-ContactsApp'].set('tab', tab)
});

ractiveComponent['wtc-ContactsApp'].on('addfriends', function (e, tab) {
    swal({
        title: _chat_e('Добавить контакт'),
        html: _chat_e('Введите ID пользователя которого ходите добавить к себе в список друзей '),
        input: 'text',
        customClass: 'swal-telegraf-modal select-form',
        inputClass: 'form-control',
        inputPlaceholder: 'User ID',
        buttonsStyling: false,
        confirmButtonClass: 'button-n',
        cancelButtonClass: 'cansel-btns',
        confirmButtonText: _chat_e('Найти'),
        cancelButtonText: _chat_e('Отмена'),
        showCancelButton: true,
        inputValidator: function (value) {
            return new Promise(function (resolve, reject) {
                var t = setTimeout(function () {
                    reject(_chat_e('Ошибка сервер недоступен.'))
                }, 10000);
                if (!value || value == '' || value == '0') {
                    clearTimeout(t);
                    return reject(_chat_e('Ошибка поле ID должено быть заполнено!'))
                }
                API('userInfo', {
                    webtransfer_id: value
                }, function (response) {
                    if (response.success) {
                        clearTimeout(t);
                        swal({
                            title: _chat_e('Добавить в друзья?'),
                            type: 'question',
                            customClass: 'swal-telegraf-modal',
                            buttonsStyling: false,
                            confirmButtonClass: 'button-n',
                            cancelButtonClass: 'cansel-btns',
                            confirmButtonText: _chat_e('Добавить'),
                            cancelButtonText: _chat_e('Отмена'),
                            showCancelButton: true,
                            html: '<strong>' + response.user.name_first + ' ' + response.user.name_last + ' (' + response.user.webtransfer_id + ') </strong>'
                        }).then(function () {
                            API('addFriends', {friend_id: response.user.webtransfer_id}, function (res) {
                                Messenger.friends.update();
                                if (res.success)
                                    swal({
                                        title: _chat_e('Успешно'),
                                        type: 'success',
                                        customClass: 'swal-telegraf-modal',
                                        buttonsStyling: false,
                                        confirmButtonClass: 'button-n',
                                        cancelButtonClass: 'cansel-btns',
                                        showCancelButton: false,
                                        html: _chat_e('Пользователь добавлен в список ваших друзей.')
                                    });
                                else
                                    swal({
                                        title: _chat_e('Ошибка'),
                                        type: 'error',
                                        customClass: 'swal-telegraf-modal',
                                        buttonsStyling: false,
                                        confirmButtonClass: 'button-n',
                                        cancelButtonClass: 'cansel-btns',
                                        showCancelButton: false,
                                        html: res.error
                                    });
                            });
                        });

                    } else {
                        clearTimeout(t);
                        reject(_chat_e('Ошибка пользователь с ID: ') + value + _chat_e('. Не существует в системе'));
                        reject(_chat_e('Пользователь уже есть в списке ваших друзей'));
                    }
                }, true);

            })
        }
    })
});
ractiveComponent['wtc-ContactsApp'].on('search', function (e) {
    ractiveComponent['wtc-ContactsApp'].set('search_text', e.node.value);

});
