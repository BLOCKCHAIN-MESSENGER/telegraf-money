var WtcInfo_card = Ractive.extend({
    data: function () {
        return {}
    },
    oninit: function () {
        console.log('Info_card.oninit !');
        ractiveComponent['wtc-Info_cardApp'].set('MyProfile', MyProfile);
        ractiveComponent['wtc-Info_cardApp'].set('card', scan_card_by_id(Messenger.cardID));
        ractiveComponent['wtc-Info_cardApp'].set('card_transactions', []);
        ractiveComponent['wtc-Info_cardApp'].set('card_transactions_load', false);
        Messenger.finance.callback_save(function (cards) {
            ractiveComponent['wtc-Info_cardApp'].set('finance_cards', cards);
            ractiveComponent['wtc-Info_cardApp'].set('finance_cards_load', true);
        });
        API('get_card_transactions', {card_id: Messenger.cardID, count: 40, page: 1}, false, function (response) {
            for (var i in response.result) {
                var update_time = moment(response.result[i].tranDate, moment.ISO_8601);
                var date_now = update_time.format('DD.MM.YYYY');
                var time = update_time.format('HH:mm');
                response.result[i].date = date_now;
                response.result[i].time = time;
            }
            ractiveComponent['wtc-Info_cardApp'].set('card_transactions', response.result);
            ractiveComponent['wtc-Info_cardApp'].set('card_transactions_load', true);
            $(".__nano").nanoScroller();
        }, true);
        $(".__nano").nanoScroller();

    },
    onrender: function () {

        console.log('Info_card.onrender !');

    },
    oncomplete: function () {
        console.log('Info_card.oncomplete !');
    }
});
ractiveComponent['wtc-Info_cardApp'].on('openCard', function (e, id) {
    Messenger.event('openCard', id);
});
ractiveComponent['wtc-Info_cardApp'].on('top_up', function (e, id) {
    swal()
});

ractiveComponent['wtc-Info_cardApp'].on('no_comis', function (e, type) {
    var description_text, text_modal, text_modal_down;
    if (type == 'buy') {
        text_modal = _chat_e('Введите примерную сумму, которую вы хотите потратить без комиссии.');
        text_modal_down = _chat_e('Для компенсации комиссии введите пожалуйста сумму с запасом 10% для учета возможных конвертаций и сторонних дополнительных комиссий. Время действие услуги - 60мин с момента запроса. Спасибо!');
        description_text = _chat_e('Данная услуга предоставляется в рамках маркетинговой кампании, Telegraf.Money оставляет за собой право в любой момент остановить ее действие.');
    }
    if (type == 'cash') {
        text_modal = _chat_e('Введите примерную сумму, которую вы хотите получить без комиссии.');
        text_modal_down = _chat_e('Для компенсации комиссии введите пожалуйста сумму с запасом 10% для учета возможных конвертаций и сторонних дополнительных комиссий. Время действие услуги - 60мин с момента запроса. Спасибо!');
        description_text = _chat_e('Данная услуга предоставляется в рамках маркетинговой кампании, Telegraf.Money оставляет за собой право в любой момент остановить ее действие.');
    }
    swal({
        // title: 'Подтверждение',
        // type: 'question',
        customClass: 'swal-telegraf-modal select-form text-center',
        buttonsStyling: false,
        confirmButtonClass: 'button-n',
        cancelButtonClass: 'cansel-btns',
        confirmButtonText: _chat_e('Подтвердить'),
        cancelButtonText: _chat_e('Отменить'),
        showCancelButton: true,
        text: '<div class="mv-area code-area-sec">' +

        '<form action="#" onsubmit="return false;">' +
        '<div class="select-form">' +
        '<label>' + text_modal + '</label>' +
        '<input class="form-control" placeholder="' + _chat_e('Сумма') + '" id="input_sw" autocomplete="off" type="tel"></div>' +
        '<br>' +
        '</form>' +
        '<label>' + text_modal_down + '</label>' +

        '<p class="spls-p">' + description_text + '</p>' +
        '<br>' +
        '</div>'
    }).then(function (result) {
        var value__ = $('#input_sw').val();
        swal({
            customClass: 'swal-telegraf-modal select-form text-center',
            title: _chat_e('Активация...'),
            closeOnConfirm: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: true,
            showCancelButton: false,
            showLoaderOnConfirm: true,
            text: '',
            preConfirm: function () {
                return new Promise(function (resolve, reject) {
                    // here should be AJAX request
                    setTimeout(function () {
                        resolve();
                    }, 30000);
                });
            },
        });

        swal.showLoading();
        API('cardСommissionCompensation',{card_id:Messenger.cardID,amount:value__},false,function (res) {
            if(res.error){
                return swal({
                    title: _chat_e('Успешно'),
                    type: 'error',
                    customClass: 'swal-telegraf-modal select-form',

                    buttonsStyling: false,
                    confirmButtonClass: 'button-n',
                    cancelButtonClass: 'cansel-btns',
                    confirmButtonText: _chat_e('Ok'),
                    cancelButtonText: _chat_e('Отменить'),
                    showCancelButton: false,
                    text:'ERROR:'+res.error
                });
            }
            swal({
                title: _chat_e('Успешно'),
                type: 'success',
                customClass: 'swal-telegraf-modal select-form',

                buttonsStyling: false,
                confirmButtonClass: 'button-n',
                cancelButtonClass: 'cansel-btns',
                confirmButtonText: _chat_e('Ok'),
                cancelButtonText: _chat_e('Отменить'),
                showCancelButton: false,
                text: _chat_e('Вы успешно активировали услугу. Время действие услуги - 60мин.')
            });
        },true);

    }, function () {
    });
});
