var WtcAffiliates = Ractive.extend({
    data: function () {
        return {}
    },
    oninit: function () {
        console.log('Affiliates.oninit !');
        ractiveComponent['wtc-AffiliatesApp'].set('MyProfile', MyProfile);
        ractiveComponent['wtc-AffiliatesApp'].set('tabPage', Messenger.body['Affiliates'].tabPage);


        Messenger.finance.callback_save(function (cards, microinvest) {
            ractiveComponent['wtc-AffiliatesApp'].set('finance_cards', cards);
            ractiveComponent['wtc-AffiliatesApp'].set('finance_cards_load', true);
        });

        if (ractiveComponent['wtc-AffiliatesApp'].get('tabPage') === 'my') {

            API('get_affiliates_referals', {}, false, function (res) {
                ractiveComponent['wtc-AffiliatesApp'].set('partners_finish', true);
                // if (res.error)
                //     return noty({
                //         text: '<strong>' + _chat_e('Ошибка!') + '</strong><br>' + res.error,
                //         type: 'error',
                //         theme: 'metroui',
                //         layout: 'topCenter',
                //         timeout: 4000,
                //         progressBar: true,
                //         animation: {
                //             open: 'animated fadeInDown',
                //             close: 'animated fadeOutUp'
                //         }
                //     });

                ractiveComponent['wtc-AffiliatesApp'].set('partners', res.data.referals);
            }, true);
        }
        if (ractiveComponent['wtc-AffiliatesApp'].get('tabPage') === 'profit') {

            API('get_affiliates_tx', {}, false, function (res) {
                ractiveComponent['wtc-AffiliatesApp'].set('profit_load', true);

                if (res.error) return noty({
                    text: '<strong>' + _chat_e('Ошибка!') + '</strong><br>' + res.error,
                    type: 'error',
                    theme: 'metroui',
                    layout: 'topCenter',
                    timeout: 4000,
                    progressBar: true,
                    animation: {
                        open: 'animated fadeInDown',
                        close: 'animated fadeOutUp'
                    }
                });
                ractiveComponent['wtc-AffiliatesApp'].set('profit', res.data.tx);
            }, true);
        }
        setTimeout(function () {
            $('#cards_my').styler().trigger('refresh');
            $(".__nano").nanoScroller();
        }, 10)

    },
    onrender: function () {
        console.log('Affiliates.onrender !');

    },
    oncomplete: function () {
        console.log('Affiliates.oncomplete !');
    }
});
API('get_affiliates_data', {}, false, function (res) {
    if (res.error) return noty({
        text: '<strong>' + _chat_e('Ошибка!') + '</strong><br>' + result.error,
        type: 'error',
        theme: 'metroui',
        layout: 'topCenter',
        timeout: 4000,
        progressBar: true,
        animation: {
            open: 'animated fadeInDown',
            close: 'animated fadeOutUp'
        }
    });
    ractiveComponent['wtc-AffiliatesApp'].set('affiliates_data', res.data);
}, true);

ractiveComponent['wtc-AffiliatesApp'].on('add_share', function (e, tab) {
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
        html: _chat_e('Ваша реферальная ссылка: ') + '<br><div class="select-form"><input class="form-control" value="https://telegraf.money/?invite=' + ractiveComponent['wtc-AffiliatesApp'].get('affiliates_data').invitation + '" ></div><br><span style="    font-size: 16px;">' + _chat_e('Приглашайте ваших друзей в Telegraf.Money и получайте % на ваш счет за каждого из них. Ваши друзья также получат бонус, зарегистрировавшись по вашей ссылке.')+'</span>'
    }).then(function () {
        Messenger.share();
    });


});
ractiveComponent['wtc-AffiliatesApp'].on('addPartner', function (e, tab) {
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
        html: _chat_e('Ваша реферальная ссылка: ') + '<br><div class="select-form"><input class="form-control" value="https://telegraf.money/?invite=' + ractiveComponent['wtc-AffiliatesApp'].get('affiliates_data').invitation + '" ></div><br><span style="    font-size: 16px;">' + _chat_e('Приглашайте ваших друзей в Telegraf.Money и получайте % на ваш счет за каждого из них. Ваши друзья также получат бонус, зарегистрировавшись по вашей ссылке.')+'</span>'
    }).then(function () {
        Messenger.share();
    });
});

