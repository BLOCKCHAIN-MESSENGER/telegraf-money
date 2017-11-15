var contract = web3.eth.contract(abi).at(_address);
var WtcDebitcoin = Ractive.extend({
    oninit: function () {
        console.log('Debitcoin.oninit !');

        if (window.__crypto_wallet_dbc && typeof window.__crypto_wallet_dbc === "object" && window.__crypto_wallet_dbc.wallet) {
            ractiveComponent['wtc-DebitcoinApp'].set('debit_token', Messenger.finance.crypto_wallet_dbc);
            ractiveComponent['wtc-DebitcoinApp'].set('finance_debit_coin_gold', Messenger.finance.crypto_wallet_dbc.wallet.balance.dbc);
            ractiveComponent['wtc-DebitcoinApp'].set('finance_eth', Messenger.finance.crypto_wallet_dbc.wallet.balance.eth);
            ractiveComponent['wtc-DebitcoinApp'].set('finance_ethusd', Messenger.finance.crypto_wallet_dbc.wallet.balance.ethusd);
        }else{
            ractiveComponent['wtc-DebitcoinApp'].set('debit_token.wallet.address', 'Loading...');
            ractiveComponent['wtc-DebitcoinApp'].set('finance_debit_coin_gold', '...');
        }
        ractiveComponent['wtc-DebitcoinApp'].set('MyProfile', MyProfile);
        ractiveComponent['wtc-DebitcoinApp'].set('btc_finance_btc', '...');
        ractiveComponent['wtc-DebitcoinApp'].set('eth_finance_eth', '...');
        ractiveComponent['wtc-DebitcoinApp'].set('sub_tab', 'wallet');
        ractiveComponent['wtc-DebitcoinApp'].set('showPrivate_', false);
        ractiveComponent['wtc-DebitcoinApp'].set('eth_status', true);
        ractiveComponent['wtc-DebitcoinApp'].set('cryptoAccount', false);
        var tab_ = ractiveComponent['wtc-DebitcoinApp'].get('tab');
        if (tab_ === 'gold' || tab_ === 'eth') {
            if (localStorage.getItem('installTime') && localStorage.getItem('installTime') === 'crypto.wallet.eth.auth') {
                ractiveComponent['wtc-DebitcoinApp'].set('cryptoAccount', true);

                var priv = localStorage.getItem('walletPrivateKey');
                var address_my = keythereum.privateKeyToAddress(priv);
                var wallet_my = {
                    wallet: {
                        address: address_my,
                        balance: {
                            eth: +(+web3.eth.getBalance(address_my) / 1000000000000000000).toFixed(8),
                            ethusd: 0,
                            dbc: (+contract.balanceOf(address_my) / _contract_fixed).toFixed(2)
                        }
                    }
                };
                ractiveComponent['wtc-DebitcoinApp'].set('debit_token', wallet_my);
                ractiveComponent['wtc-DebitcoinApp'].set('finance_debit_coin_gold', wallet_my.wallet.balance.dbc);
                $.ajax({
                    url: 'https://api.coinmarketcap.com/v1/ticker/ethereum/', type: 'get', success: function (res) {
                        try {
                            wallet_my.wallet.balance.ethusd = (wallet_my.wallet.balance.eth * res[0].price_usd).toFixed(2);
                            ractiveComponent['wtc-DebitcoinApp'].set('finance_ethusd', wallet_my.wallet.balance.ethusd);
                        } catch (e) {
                            console.error('ERROR parse coinmarketcap', e)
                        }
                    }
                });
                ractiveComponent['wtc-DebitcoinApp'].set('finance_eth', wallet_my.wallet.balance.eth);
                ractiveComponent['wtc-DebitcoinApp'].set('finance_ethusd', wallet_my.wallet.balance.ethusd);
            }
        }

        Messenger.auth_action.call_wait_auth(function () {
            if (tab_ === 'gold' || tab_ === 'eth') {
                if (localStorage.getItem('installTime') && localStorage.getItem('installTime') === 'crypto.wallet.eth.auth') {
                    ractiveComponent['wtc-DebitcoinApp'].set('cryptoAccount', true);

                    var priv = localStorage.getItem('walletPrivateKey');
                    var address_my = keythereum.privateKeyToAddress(priv);
                    var wallet_my = {
                        wallet: {
                            address: address_my,
                            balance: {
                                eth: +(+web3.eth.getBalance(address_my) / 1000000000000000000).toFixed(8),
                                ethusd: 0,
                                dbc: (+contract.balanceOf(address_my) / _contract_fixed).toFixed(2)
                            }
                        }
                    };
                    ractiveComponent['wtc-DebitcoinApp'].set('debit_token', wallet_my);
                    ractiveComponent['wtc-DebitcoinApp'].set('finance_debit_coin_gold', wallet_my.wallet.balance.dbc);
                    $.ajax({
                        url: 'https://api.coinmarketcap.com/v1/ticker/ethereum/', type: 'get', success: function (res) {
                            try {
                                wallet_my.wallet.balance.ethusd = (wallet_my.wallet.balance.eth * res[0].price_usd).toFixed(2);
                                ractiveComponent['wtc-DebitcoinApp'].set('finance_ethusd', wallet_my.wallet.balance.ethusd);
                            } catch (e) {
                                console.error('ERROR parse coinmarketcap', e)
                            }
                        }
                    });
                    ractiveComponent['wtc-DebitcoinApp'].set('finance_eth', wallet_my.wallet.balance.eth);
                    ractiveComponent['wtc-DebitcoinApp'].set('finance_ethusd', wallet_my.wallet.balance.ethusd);
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
                } else {
                    API('eth_status', {}, false, function (res) {
                        ractiveComponent['wtc-DebitcoinApp'].set('eth_status_dev', res.eth_status_dev);
                    });

                    // Messenger.finance.callback_save(function (cards, loans, cards_all, alldata) {
                    //     ractiveComponent['wtc-DebitcoinApp'].set('debit_token', Messenger.finance.crypto_wallet_dbc);
                    //     ractiveComponent['wtc-DebitcoinApp'].set('finance_debit_coin_gold', Messenger.finance.crypto_wallet_dbc.wallet.balance.dbc);
                    //     ractiveComponent['wtc-DebitcoinApp'].set('finance_eth', Messenger.finance.crypto_wallet_dbc.wallet.balance.eth);
                    //     ractiveComponent['wtc-DebitcoinApp'].set('finance_ethusd', Messenger.finance.crypto_wallet_dbc.wallet.balance.ethusd);
                    //     if (alldata && alldata.wallet)
                    //         ractiveComponent['wtc-DebitcoinApp'].set('finance_debit_coin_gold_virtual', alldata.wallet["debit-coin-gold"]);
                    // });
                }
            }
            if (tab_ === 'btc') {
                API('wallet_coin', {type: 'BTC'}, false, function (res) {
                    if (res.error) {
                        return swal({
                            customClass: 'swal-telegraf-modal select-form text-center',
                            buttonsStyling: false,
                            confirmButtonClass: 'button-n',
                            cancelButtonClass: 'cansel-btns',
                            title: _chat_e('Уппс...') + ', ' + res.err.code,
                            type: 'error',
                            confirmButtonText: _chat_e('Ок'),
                            showCancelButton: false,
                            text: 'Error:' + res.error
                        });
                    }
                    ractiveComponent['wtc-DebitcoinApp'].set('btc_debit_token', res);
                    ractiveComponent['wtc-DebitcoinApp'].set('btc_finance_debit_coin_gold', res.wallet.balance.dbc);
                    ractiveComponent['wtc-DebitcoinApp'].set('btc_finance_btc', res.wallet.balance.btc);
                    ractiveComponent['wtc-DebitcoinApp'].set('btc_finance_btcusd', res.wallet.balance.btcusd);
                }, true);

                Messenger.finance.callback_save(function (cards, loans, cards_all, alldata) {

                    if (alldata && alldata.wallet)
                        ractiveComponent['wtc-DebitcoinApp'].set('finance_debit_coin_gold_virtual', alldata.wallet["debit-coin-gold"]);
                });
            }
            Messenger.finance.callback_save(function (cards, loans, cards_all, alldata) {
                if (!cards || cards.length == 0) cards = false;
                console.log(arguments);

                ractiveComponent['wtc-DebitcoinApp'].set('finance_cards', cards);
                if (alldata) {
                    ractiveComponent['wtc-DebitcoinApp'].set('finance_debit_coin_silver', alldata.wallet["debit-coin"]);
                    ractiveComponent['wtc-DebitcoinApp'].set('finance_cards_load', true);
                }

            });
        });

        // API('get_balance_wallet_coin', {type: 'ETH'}, false, function (result_balance) {
        //     ractiveComponent['wtc-DebitcoinApp'].set('finance_debit_coin_gold', result_balance.balance);
        // });
        // }, true);


    },
    onrender: function () {
        console.log('Debitcoin.onrender !');

    },
    oncomplete: function () {
        console.log('Debitcoin.oncomplete !');
    }
});

