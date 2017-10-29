var WtcCards = Ractive.extend({
    data: function () {
        return {}
    },
    oninit: function () {
        console.log('cards.oninit !');
        ractiveComponent['wtc-CardsApp'].set('MyProfile', MyProfile);



    },
    onrender: function () {
        console.log('cards.onrender !');

    },
    oncomplete: function () {
        console.log('cards.oncomplete !');
    }
});
var show_info = 0;
Messenger.finance.callback_save(function (cards, loans, cards_all) {
    // if (show_info >= 1 && show_info < 100 && cards.length == 0 || show_info < 100 && cards.length == 0 ) {
    //     show_info = 101;
    //     swal({
    //         title: '',
    //         // type: 'question',
    //         customClass: 'swal-telegraf-modal select-form text-center',
    //         buttonsStyling: false,
    //         confirmButtonClass: 'button-n',
    //         cancelButtonClass: 'cansel-btns',
    //         confirmButtonText: _chat_e('Получить'),
    //         cancelButtonText: _chat_e('Позже'),
    //         showCancelButton: true,
    //         text: _chat_e('Активируй виртуальную карту Visa/MasterCard и получи ') + '<br><h2 style="    margin-bottom: -37px;margin-top: 10px;">' + _chat_e('Бонус $50') + '</h2>'
    //     }).then(function (result) {
    //         Messenger.setPage('order')
    //
    //     }, function () {
    //         swal.close()
    //     });
    // }
    // show_info++;

    ractiveComponent['wtc-CardsApp'].set('finance_cards', cards);
    if (cards_all)
        ractiveComponent['wtc-CardsApp'].set('finance_cards_ALL', cards_all);
    ractiveComponent['wtc-CardsApp'].set('finance_cards_load', true);
    $(".__nano").nanoScroller();

    // добавить карту
    //Activate Free Visa/MC Card and Get $50 Bonus
    //Получи Бонус 50долл и сразу должно вести в активацию карты

});
ractiveComponent['wtc-CardsApp'].on('openCard', function (e, id) {
    Messenger.event['openCard'](id);
});

ractiveComponent['wtc-CardsApp'].on('activeCard', function (e, id) {
    if (id == 'virtual') {
        Messenger.setPage('order')
    } else {
        swal({
            customClass: 'swal-telegraf-modal select-form text-center',
            title: _chat_e('Активация карты...'),
            closeOnConfirm: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: true,
            showCancelButton: false,
            showLoaderOnConfirm: true,
            text: _chat_e('Активация карты может занять несколько минут'),
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
        API('activate_card', {card_id: id}, function (result) {
            if (result.error) {
                swal({
                    customClass: 'swal-telegraf-modal select-form text-center',
                    buttonsStyling: false,
                    confirmButtonClass: 'button-n',
                    cancelButtonClass: 'cansel-btns',
                    title: _chat_e('Ошибка активации карты'),
                    type: 'error',
                    confirmButtonText: _chat_e('Ок'),
                    showCancelButton: false,
                    text: result.error
                })
            } else {
                swal({
                    customClass: 'swal-telegraf-modal select-form text-center',
                    buttonsStyling: false,
                    confirmButtonClass: 'button-n',
                    cancelButtonClass: 'cansel-btns',
                    title: _chat_e('Успех'),
                    type: 'success',
                    confirmButtonText: _chat_e('Ок'),
                    showCancelButton: false,
                    text: _chat_e('Вы успешно активировали карту:') + id
                });
                Messenger.finance.update();

            }

        }, true)
    }
});

$(document).mouseup(function (e) {
    var container = $(".stz");
    if (container.has(e.target).length === 0) {
        container.hide();
    }
});


