var WtcBonus = Ractive.extend({
    oninit: function () {
        console.log('Bonus.oninit !');
        $(".__nano").nanoScroller();
        $('input, select').styler({
            selectSearch: false
        });
        $("#ex21").bootstrapSlider();
        if (bonus_tab)
            ractiveComponent['wtc-BonusApp'].set('tab', bonus_tab);
        ractiveComponent['wtc-BonusApp'].set('MyProfile', MyProfile);
        Messenger.finance.callback_save(function (cards, loans, cards_all, alldata) {
            if (!cards || cards.length == 0) cards = false;

            ractiveComponent['wtc-BonusApp'].set('finance_cards', cards);
            if (alldata) {
                ractiveComponent['wtc-BonusApp'].set('wallets', alldata.wallet);

                ractiveComponent['wtc-BonusApp'].set('finance_cards_load', true);
            }

        });


    },
    onrender: function () {
        console.log('Bonus.onrender !');

    },
    oncomplete: function () {
        console.log('Bonus.oncomplete !');
    }

});

ractiveComponent['wtc-BonusApp'].on('moderate', function (e, id) {
    swal({
        customClass: 'swal-telegraf-modal select-form text-center',
        title: '',
        closeOnConfirm: false,
        showConfirmButton: true,
        showCancelButton: false,
        showLoaderOnConfirm: true,
        text: _chat_e('Может занять несколько секунд'),
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                // here should be AJAX request
                setTimeout(function () {
                    resolve();
                }, 3000);
            });
        },
    });
    swal.showLoading();
    if ('iOS' != paramSocket.device_platform_type && 'ios' != paramSocket.device_platform_type && 'Android' != paramSocket.device_platform_type && 'android' != paramSocket.device_platform_type) {
        return swal({
            customClass: 'swal-telegraf-modal select-form text-center',
            buttonsStyling: false,
            confirmButtonClass: 'button-n',
            cancelButtonClass: 'cansel-btns',
            title: _chat_e('Уппс...'),
            type: 'error',
            confirmButtonText: _chat_e('Ок'),
            showCancelButton: false,
            text: _chat_e('Данное  заданние нужно выполнить с устройства под управлением iOS или Android')
        });
    }
    API('review_bonus', {
        device_platform: paramSocket.device_platform,
        device_platform_type: paramSocket.device_platform_type,
        device_browser: paramSocket.device_browser,
        device_uuid: paramSocket.device_uuid,
        device_model: paramSocket.device_model,
        version_app: paramSocket.version_app,
    }, false, function (res) {
        localStorage.setItem('review_bonus', (new Date().getTime() + 30 * 24 * 60 * 60000));

        if (res.success)

            return swal({
                customClass: 'swal-telegraf-modal select-form text-center',
                buttonsStyling: false,
                confirmButtonClass: 'button-n',
                cancelButtonClass: 'cansel-btns',
                title: _chat_e('Успех'),
                type: 'success',
                confirmButtonText: _chat_e('Ок'),
                showCancelButton: false,
                text: _chat_e('Бонус будет зачислен на счет в течение 48 часов.')
            });
        else {
            if (res.error == 'wait_check') res.error = _chat_e('Вы уже запросили получение бонуса');
            return swal({
                customClass: 'swal-telegraf-modal select-form text-center',
                buttonsStyling: false,
                confirmButtonClass: 'button-n',
                cancelButtonClass: 'cansel-btns',
                title: _chat_e('Уппс...'),
                type: 'error',
                confirmButtonText: _chat_e('Ок'),
                showCancelButton: false,
                text: res.error
            });
        }

    }, true)
});
ractiveComponent['wtc-BonusApp'].on('openToggle', function (e, id) {
    if ('add_share' == id) {
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


        }, 10);
    } else {


        $('body .guarantee-wrapper .credit-main-area .toggle .body-' + id).toggle('');
    }
});
ractiveComponent['wtc-BonusApp'].set('tab', bonus_tab);
