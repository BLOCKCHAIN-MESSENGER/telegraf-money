var WtcCredit = Ractive.extend({
    oninit: function () {
        console.log('Credit.oninit !');
        $(".__nano").nanoScroller();

        var init_card = false;
        Messenger.finance.callback_save(function (cards, microinvests) {
            ractiveComponent['wtc-CreditApp'].set('currency', 'USD');
            ractiveComponent['wtc-CreditApp'].set('currency_symbool', '$');
            ractiveComponent['wtc-CreditApp'].set('finance_cards', cards);
            ractiveComponent['wtc-CreditApp'].set('finance_cards_load', true);
            ractiveComponent['wtc-CreditApp'].set('microinvests', microinvests);

            if (!init_card) {
                init_card = true;
                if (cards[0])
                    change_card(cards[0].card_id);

            }

            ractiveComponent['wtc-CreditApp'].set('cards', cards);

            setTimeout(Messenger.body['credit'].callback, 10);

            var summa = 0;
            var current_income = 0;
            for (var k in  microinvests) {
                if (microinvests.hasOwnProperty(k)) {
                    summa += +microinvests[k].summa;
                    current_income += +microinvests[k].current_income;
                }
            }
            ractiveComponent['wtc-CreditApp'].set('microinvests_summa', summa.toFixed(2));
            ractiveComponent['wtc-CreditApp'].set('microinvests_current_income', current_income.toFixed(2));
            ractiveComponent['wtc-CreditApp'].set('microinvests_total', (+summa + (+current_income.toFixed(2))));
            // $(Messenger.body.credit.selector).mCustomScrollbar('update');
        });
        $('input, select').styler({
            selectSearch: false
        });
        API('list_creditors', {}, false, function (result) {
            if(result.error){
                return  noty({
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
            }
            var res = result.data.participants.filter(function (el) {
                if (el.type == 'wl') {return false;}
                return true;

            });
            ractiveComponent['wtc-CreditApp'].set('list_creditors', res);
            $('#user_id_operator').styler().trigger('refresh');

        }, true);
        Messenger.body['credit'].callback = function () {
            ractiveComponent['wtc-CreditApp'].set('tabPage', Messenger.body['credit'].tabPage);
            $('#card_id_credit').styler().trigger('refresh');

            $('#select_ammount').on('keydown', '#amount_credit', function (e) {
                console.log(e.keyCode);
                -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
            });

        };
        Messenger.body['credit'].callback();
        setTimeout(function () {
            $('#user_id_operator').styler().trigger('refresh');
        }, 100);
    },
    onrender: function () {
        console.log('Credit.onrender !');

    }

    ,
    oncomplete: function () {
        console.log('Credit.oncomplete !');
    }
});
ractiveComponent['wtc-CreditApp'].on('startBorrow', function () {
    console.log('startBorrow');
    swal({
        title: _chat_e('Попробуйте позже...'),
        type: 'error',
        confirmButtonText: 'Ok',
        cancelButtonText: 'Отменить',
        showCancelButton: false,
        text: _chat_e('Данная возможность находится в разработке :(')
    });
});
ractiveComponent['wtc-CreditApp'].on('stopCredit', function (i, invest) {
    var index = 0;
    var microinvests = [invest];
    var id = microinvests[index].id;

    swal({
        title: _chat_e('Подтверждение'),
        type: 'question',

        customClass: 'swal-telegraf-modal select-form',

        buttonsStyling: false,
        confirmButtonClass: 'button-n',
        cancelButtonClass: 'cansel-btns',
        confirmButtonText: _chat_e('Да'),
        cancelButtonText: _chat_e('Отменить'),
        showCancelButton: true,
        text: _chat_e('Вы действительно хотите остановить займ') + ' <strong>#' + microinvests[index].id + '</strong> <br>' + _chat_e('суммой:') + ' <strong>' + microinvests[index].summa + ' USD</strong> + ' + _chat_e('прибыль:') + ' <strong>' + microinvests[index].current_income + ' USD </strong><br>' + _chat_e('и вернуть средства на карту') + ' <br><strong>' + microinvests[index].card.card_name.replace('Webtransfer ', '') + '</strong>',
        showLoaderOnConfirm: true,
        preConfirm: function () {
            ractiveComponent['wtc-CreditApp'].set('load_invest', true);
            swal({
                customClass: 'swal-telegraf-modal select-form text-center',
                title: _chat_e('Остановка Кредита до Востребования...'),
                closeOnConfirm: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: true,
                showCancelButton: false,
                showLoaderOnConfirm: true,
                text: _chat_e('Остановка Кредита может занять несколько секунд'),
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
            return new Promise(function (resolve) {
                API('stop_fast_arbitrage', {
                    id: id
                    // code: $('#code_stop_credit').val()
                }, false, function (response) {
                    ractiveComponent['wtc-CreditApp'].set('load_invest', false);

                    if (response.error || response.status == null || response.status == false) {
                        noty({
                            text: '<strong>' + _chat_e('Ошибка!') + '</strong><br>' + _chat_e('Ошибка не удалось остановить займ: ') + response.error,
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
                        swal.close();
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
                            text: '' + _chat_e('Вам на карту:') + microinvests[index].card.card_name.replace(/(^|\s)Webtransfer(\s|$)/g, '') + ' ' + _chat_e('отправленно') + ' <strong>' + ((+microinvests[index].summa) + (+microinvests[index].current_income)) + ' USD</strong>'
                        });
                    }
                    Messenger.finance.update();
                }, true);
            })
        }
    });
});
ractiveComponent['wtc-CreditApp'].on('startLoans', function () {
    var finance_cards = ractiveComponent['wtc-CreditApp'].get('finance_cards');
    for (var key in  finance_cards) {
        if (finance_cards[key].card_id == $('#card_id_credit').val()) {
            var a = finance_cards[key].last_balance;
            console.log(finance_cards[key].card_currency);
            if (isNaN((+$('#amount_credit').val()))) {
                noty({
                    text: _chat_e('Некорректно указана сумма  займа:') + ": " + $('#amount_credit').val(),
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

                return false;
            }
            if ((+$('#amount_credit').val()) < 1) {
                noty({
                    text: _chat_e('Сумма не может быть меньше') + ' <strong>1 ' + finance_cards[key].card_currency + '</strong>',
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

                return false;
            }
            if ($('#user_id_operator').val() == '' || !$('#user_id_operator').val()) {
                noty({
                    text: _chat_e('Вы не выбрали оператора КВД ставки'),
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

                return false;
            }

            swal({
                title: _chat_e('Подтверждение'),
                type: 'question',
                customClass: 'swal-telegraf-modal select-form',

                buttonsStyling: false,
                confirmButtonClass: 'button-n',
                cancelButtonClass: 'cansel-btns',
                confirmButtonText: _chat_e('Выдать займ'),
                cancelButtonText: _chat_e('Отменить'),
                showCancelButton: true,
                text: _chat_e('Вы действительно хотите выдать займ суммой:') + ' <strong>' + (+$('#amount_credit').val()) + ' ' + finance_cards[key].card_currency + '</strong> ' + _chat_e('с карты') + ' <strong>' + finance_cards[key].card_name.replace(/(^|\s)Webtransfer(\s|$)/g, '') + '</strong>',
                showLoaderOnConfirm: true,
                preConfirm: function () {
                    swal({
                        customClass: 'swal-telegraf-modal select-form text-center',
                        title: _chat_e('Запуск Кредита до Востребования...'),
                        closeOnConfirm: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: true,
                        showCancelButton: false,
                        showLoaderOnConfirm: true,
                        text: _chat_e('может занять несколько секунд'),
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
                    ractiveComponent['wtc-CreditApp'].set('load_invest', true);

                    return new Promise(function (resolve) {
                        API('start_fast_arbitrage', {
                            credit_user_id: $('#user_id_operator').val(),
                            card_id: $('#card_id_credit').val(),
                            summ: $('#amount_credit').val()
                        }, false, function (response) {
                            ractiveComponent['wtc-CreditApp'].set('load_invest', false);

                            if (response.error) {
                                var errooor = _chat_e(response.error);
                                if (errooor == '_ERR_String') errooor = response.error;
                                noty({
                                    text: _chat_e('Ошибка: ') + errooor,
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
                                swal.close();
                            } else
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
                                    text: _chat_e('Вы успешно запустили кредит суммой') + ': <strong>' + (+$('#amount_credit').val()) + ' ' + finance_cards[key].card_currency + '</strong>'
                                });

                            Messenger.finance.update();
                        }, true);
                    })
                }
            });

        }
    }

});
ractiveComponent['wtc-CreditApp'].on('openCredit', function (e, id) {
    $('body .credit-wrapper .credit-main-area .toggle .body-' + id).toggle('');
});
function change_card(card_id) {
    var finance_cards = ractiveComponent['wtc-CreditApp'].get('finance_cards');
    for (var key in  finance_cards) {
        if (finance_cards[key].card_id == card_id) {
            var a = finance_cards[key].last_balance;
            a = a - (a * 0.005 + 0.1);
            var setvalue5 = +(a - a % 1).toFixed(0);
            if (finance_cards[key].card_start_balanses > 0)
                setvalue5 = setvalue5 - finance_cards[key].card_start_balanses;
            $('#amount_credit').val(+(setvalue5 - setvalue5 % 1).toFixed(0));
            ractiveComponent['wtc-CreditApp'].set('currency', finance_cards[key].card_currency);
            ractiveComponent['wtc-CreditApp'].set('select_card', card_id);
            var symbool = {GBP: '£', USD: '$', EUR: '€'};

            ractiveComponent['wtc-CreditApp'].set('currency_symbool', symbool[finance_cards[key].card_currency]);

        }
    }
}
