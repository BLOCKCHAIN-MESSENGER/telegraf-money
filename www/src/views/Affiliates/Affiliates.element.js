var WtcAffiliates = Ractive.extend({
    data: function () {
        return {}
    },
    oninit: function () {
        console.log('Affiliates.oninit !');
        ractiveComponent['wtc-AffiliatesApp'].set('MyProfile', MyProfile);
        Messenger.finance.callback_save(function (cards, microinvest) {
            ractiveComponent['wtc-AffiliatesApp'].set('finance_cards', cards);
            ractiveComponent['wtc-AffiliatesApp'].set('finance_cards_load', true);
        });
        Messenger.body['Affiliates'].callback = function () {
            ractiveComponent['wtc-AffiliatesApp'].set('tabPage', Messenger.body['Affiliates'].tabPage);
            if (Messenger.body['Affiliates'].tabPage == 'profit') {

                API('get_partners_expected_income', {}, false, function (res) {
                    if (res && res.incame)

                        ractiveComponent['wtc-AffiliatesApp'].set('profit',  res.incame.filter(function (el) {
                            if(el.date_kontract && (new Date(el.date_kontract))> (new Date('2017-04-11'))) return true;
                            else return false;
                        }));
                    else
                        ractiveComponent['wtc-AffiliatesApp'].set('profit', []);

                    ractiveComponent['wtc-AffiliatesApp'].set('profit_load', true);
                }, false);
            }

            $('#cards_my').styler().trigger('refresh');
            $(".__nano").nanoScroller();
        };
        Messenger.partners.callback_save(function (partners) {
            ractiveComponent['wtc-AffiliatesApp'].set('partners', partners);
            ractiveComponent['wtc-AffiliatesApp'].set('partners_finish', true);
        });
        Messenger.body['Affiliates'].callback();
        API('getPartnerTxDebitCoin', {}, false, function (response) {
            if (!response.partner || !response.partner[0] || !response.partner[0].referal) {
                response.partner = [{referal: 10}];
            }

            var total_proff = 0;
            for (var i in response.txes) {
                var price;
                if (!response.txes[i].period || +response.txes[i].period === 1) {
                    price = 0.1248
                }
                else if (+response.txes[i].period === 2) {
                    price = 0.1743
                }
                else if (+response.txes[i].period === 3) {
                    price = 0.4324

                } else if (+response.txes[i].period === 4) {
                    price = 0.7533234
                } else if (+response.txes[i].period === 5) {
                    price = 0.6
                } else if (+response.txes[i].period === 6) {
                    price = 0.75
                } else if (+response.txes[i].period === 7) {
                    price = 0.60
                } else {
                    price = 1
                }
                var update_time = moment(response.txes[i].update_at);
                var date_now = update_time.format('DD.MM.YYYY');
                var time = update_time.format('HH:mm');
                response.txes[i].date = date_now;
                response.txes[i].time = time;
                response.txes[i].partner_profit = 0;
                if (response.txes[i].pay_status === '1')
                    response.txes[i].partner_profit = +(+response.txes[i].dbc / 100 * +response.partner[0].referal).toFixed(2);

                total_proff += response.txes[i].partner_profit;
                response.txes[i].type_ = '+';
            }
            ractiveComponent['wtc-DebitcoinApp'].set('transactions_partner', response.txes);
            ractiveComponent['wtc-DebitcoinApp'].set('total_proff', (total_proff.toFixed(2)));
            ractiveComponent['wtc-DebitcoinApp'].set('transactions_partner_info', response.partner[0]);
        });

    },
    onrender: function () {
        console.log('Affiliates.onrender !');

    },
    oncomplete: function () {
        console.log('Affiliates.oncomplete !');
    }
});


ractiveComponent['wtc-AffiliatesApp'].on('add_share',function (e,tab) {
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
        html: _chat_e('Ваша реферальная ссылка: ') + '<br><div class="select-form"><input class="form-control" value="https://telegraf.money/?ref=' + MyProfile.webtransfer_id + '" ></div><br>' + _chat_e('Приглашайте ваших друзей в Telegraf.Money и получайте по $50 кредитным бонусом на вашу карту за каждого из них. Ваши друзья также получат по $50, зарегистрировавшись по вашей ссылке.')
    }).then(function () {
        Messenger.share();
    });


});
ractiveComponent['wtc-AffiliatesApp'].on('addPartner',function (e,tab) {
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

