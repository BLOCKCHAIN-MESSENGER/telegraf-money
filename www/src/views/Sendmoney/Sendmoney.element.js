var WtcSendmoney = Ractive.extend({
    data: function () {
        return {
            form: {
                user_id: ''
            }
        };
    },
    oninit: function () {
        console.log('sendmoney.oninit !');
        ractiveComponent['wtc-SendmoneyApp'].set('byUserId', true);
        ractiveComponent['wtc-SendmoneyApp'].set('MyProfile', MyProfile);

        Messenger.finance.callback_save(function (cards) {
            if (!cards || cards.length == 0) cards = false;
            ractiveComponent['wtc-SendmoneyApp'].set('finance_cards', cards);
            ractiveComponent['wtc-SendmoneyApp'].set('finance_cards_load', true);

            setTimeout(function () {
                $('#mycard-sendmoney').styler().trigger('refresh');
                change_cardSendmoneyApp($('#mycard-sendmoney').val());
            }, 10);

        });

        $('input, select').styler({
            selectSearch: false
        });
        var timeOut = false;
        Messenger.friends.callback_save(function (friends) {
            ractiveComponent['wtc-SendmoneyApp'].set('recipents_contacts', friends);
            $('#recipents_variant-sendmoney').styler().trigger('refresh');
        });
        // Messenger.threads.callback_save('SendmoneyApp',function (threads) {
        //
        //     ractiveComponent['wtc-SendmoneyApp'].set('recipents_chats', threads);
        //     $('#recipents_variant-sendmoney').styler().trigger('refresh');
        // });

        $(".__nano").nanoScroller();

    },
    onrender: function () {
        console.log('sendmoney.onrender !');

    },
    oncomplete: function () {
        console.log('sendmoney.oncomplete !');
    }
});
function select_user_send_money(id) {
    if (id == 'id') {
        if (ractiveComponent['wtc-SendmoneyApp'].get('scanUserByID') && ractiveComponent['wtc-SendmoneyApp'].get('scanUserByID').user)
            select_user_send_money(ractiveComponent['wtc-SendmoneyApp'].get('scanUserByID').user.webtransfer_id);
        ractiveComponent['wtc-SendmoneyApp'].set('byUserId', true);
        ractiveComponent['wtc-SendmoneyApp'].set('scanUserByID_status_list', 'err');

    }
    else {
        ractiveComponent['wtc-SendmoneyApp'].set('byUserId', false);
        ractiveComponent['wtc-SendmoneyApp'].set('scanUserByID_status_list', 'ok');
        $('#recipent-card-sendmoney')[0].innerHTML = '<option class="" disabled selected>' + _chat_e('Загрузка...') + '</option>';
        if ($('#recipent-card-sendmoney').styler() && $('#recipent-card-sendmoney').styler().trigger) $('#recipent-card-sendmoney').styler().trigger('refresh');
    }
    API('get_finance_data_by_user', {webtransfer_id: id}, false, function (data) {
        var html = '';
        data.cards.forEach(function (el) {
            html = '<option class="lts" value="' + el.card_id + '">' + el.card_name.replace(/(^|\s)Webtransfer(\s|$)/g, '') + '</option>' + html;
        });

        if (html == '')
            html = '<option class="" disabled selected>' + _chat_e('Нет активных карт') + '</option>';
        $('#recipent-card-sendmoney')[0].innerHTML = html;

        setTimeout(function () {
            $('#recipent-card-sendmoney').styler().trigger('refresh');
            ractiveComponent['wtc-SendmoneyApp'].set('recipent', data.user);
        }, 10);
    }, true);
}
function change_cardSendmoneyApp(card_id) {
    console.log('change', card_id);
    var finance_cards = ractiveComponent['wtc-SendmoneyApp'].get('finance_cards');
    for (var key in  finance_cards) {
        if (finance_cards[key].card_id == card_id) {
            var a = finance_cards[key].last_balance;
            a = a - (a * 0.005 + 0.1);
            var setvalue5 = +(a - a % 1).toFixed(0);
            if (finance_cards[key].card_start_balanses > 0)
                setvalue5 = setvalue5 - finance_cards[key].card_start_balanses;
            var maxval = +(setvalue5 - setvalue5 % 1).toFixed(0);
            if (maxval <= 0) maxval = 0;
            ractiveComponent['wtc-SendmoneyApp'].set('max_ammount', maxval);
            ractiveComponent['wtc-SendmoneyApp'].set('currency', finance_cards[key].card_currency);
            ractiveComponent['wtc-SendmoneyApp'].set('select_card', card_id);
            var symbool = {GBP: '£', USD: '$', EUR: '€'};

            ractiveComponent['wtc-SendmoneyApp'].set('currency_symbool', symbool[finance_cards[key].card_currency]);

        }
    }
}

ractiveComponent['wtc-SendmoneyApp'].on('send_money_step_1', function () {
    ractiveComponent['wtc-SendmoneyApp'].set('load', true);

    //
    var form = $('#sendMoney_forma').serializeObject();

    if (form.recipient == MyProfile.webtransfer_id) {
        var transfer = {
            from_card_id: form.from_card,
            to_user_id: form.recipient,
            to_card_id: form.to_card,
            summ: form.ammount,
        };
        if (transfer.to_user_id == 'id') transfer.to_user_id = form.user_id;
        API('transfer_to_card', transfer, function (res) {
            Messenger.finance.update();
            ractiveComponent['wtc-SendmoneyApp'].set('load', false);

            if (res.error) {
                if (res.code == '003' || res.error == "Invalid code. Error: Wrong code. Please, try again.")
                    return noty({
                        text: _chat_e('Ошибка безопасности') + ' <br>' + _chat_e('Вы не прошли проверку двух-факторной авторизации!'),
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
                else
                    return noty({
                        text: _chat_e('Неизвестная ошибка данные  об ошибке:') + res.error,
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
            return noty({
                text: _chat_e('Успешно!') + '<br>' + _chat_e('Перевод отправлен.'),
                type: 'success',
                theme: 'metroui',
                layout: 'topCenter',
                timeout: 4000,
                progressBar: true,
                animation: {
                    open: 'animated fadeInDown',
                    close: 'animated fadeOutUp'
                }
            });

        }, true);
    } else {
        if (form.ammount < 5) {
            noty({
                text: _chat_e('Минимальная сумма: ') + 5 + " USD",
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
            ractiveComponent['wtc-SendmoneyApp'].set('load', false);

            return false;
        }

        secure(_chat_e('Перевод личных средств') + '', function (secure_result) {

            var transfer = {
                from_card_id: form.from_card,
                to_user_id: form.recipient,
                to_card_id: form.to_card,
                summ: form.ammount,
                // note: form.note,
                purpose: secure_result.type,
                code: secure_result.code
            };
            if (transfer.to_user_id == 'id') transfer.to_user_id = form.user_id;
            API('transfer_to_card', transfer, function (res) {
                Messenger.finance.update();
                ractiveComponent['wtc-SendmoneyApp'].set('load', false);
                if (res.error) {
                    if (res.code == '003' || res.error == "Invalid code. Error: Wrong code. Please, try again.")
                        return noty({
                            text: _chat_e('Ошибка безопасности') + ' <br>' + _chat_e('Вы не прошли проверку двух-факторной авторизации!'),
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
                    else
                        return noty({
                            text: _chat_e('Неизвестная ошибка данные  об ошибке:') + res.error,
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
                return noty({
                    text: _chat_e('Успешно!') + '<br>' + _chat_e('Перевод отправлен.'),
                    type: 'success',
                    theme: 'metroui',
                    layout: 'topCenter',
                    timeout: 4000,
                    progressBar: true,
                    animation: {
                        open: 'animated fadeInDown',
                        close: 'animated fadeOutUp'
                    }
                });

            }, true);

        }, function () {
            ractiveComponent['wtc-SendmoneyApp'].set('load', false);

            return noty({
                text: _chat_e('Ошибка безопасности') + ' <br>' + _chat_e('Вы не прошли проверку двух-факторной авторизации! (err_type_secure)'),
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
        });
    }
    // Messenger.setPage('confirm_send_money')
});


ractiveComponent['wtc-SendmoneyApp'].observe('scanUserByID', function (res) {
    if (res && res.user) {
        select_user_send_money(res.user.webtransfer_id);
        ractiveComponent['wtc-SendmoneyApp'].set('byUserId', true);
        ractiveComponent['wtc-SendmoneyApp'].set('scanUserByID_status_list', 'err');
    }

});