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

                    Messenger.finance.callback_save(function (cards, loans, cards_all, alldata) {
                        ractiveComponent['wtc-DebitcoinApp'].set('debit_token', Messenger.finance.crypto_wallet_dbc);
                        ractiveComponent['wtc-DebitcoinApp'].set('finance_debit_coin_gold', Messenger.finance.crypto_wallet_dbc.wallet.balance.dbc);
                        ractiveComponent['wtc-DebitcoinApp'].set('finance_eth', Messenger.finance.crypto_wallet_dbc.wallet.balance.eth);
                        ractiveComponent['wtc-DebitcoinApp'].set('finance_ethusd', Messenger.finance.crypto_wallet_dbc.wallet.balance.ethusd);
                        if (alldata && alldata.wallet)
                            ractiveComponent['wtc-DebitcoinApp'].set('finance_debit_coin_gold_virtual', alldata.wallet["debit-coin-gold"]);
                    });
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

Messenger.auth_action.call_wait_auth(function () {
    setInterval(function () {
        API('wallet_coin', {type: 'DBC'}, false, function (res) {
            ractiveComponent['wtc-DebitcoinApp'].set('debit_token', res);
            ractiveComponent['wtc-DebitcoinApp'].set('finance_debit_coin_gold', res.wallet.balance.dbc);
            ractiveComponent['wtc-DebitcoinApp'].set('finance_eth', res.wallet.balance.eth);
            ractiveComponent['wtc-DebitcoinApp'].set('finance_ethusd', res.wallet.balance.ethusd);
        }, true);

    }, 5000);
    var clipboard99 = new Clipboard('#basic-addon2299');
    var clipboard = new Clipboard('#basic-addon22');
    var clipboard2 = new Clipboard('#basic-addon222');
    var clipboard233 = new Clipboard('#basic-addon22233');

    clipboard99.on('success', function (e) {
        noty({
            text: _chat_e('Успешно!') + '<br>' + _chat_e('Адрес скопирован в буфер обмена.'),
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

        e.clearSelection();
    });
    clipboard99.on('error', function (e) {
        window.prompt(_chat_e('Скопировать в буфер обмена: Ctrl + C, Enter'), $('#address-wallet-inp-get').val());
    });
    clipboard.on('success', function (e) {
        noty({
            text: _chat_e('Успешно!') + '<br>' + _chat_e('Адрес скопирован в буфер обмена.'),
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

        e.clearSelection();
    });
    clipboard.on('error', function (e) {
        window.prompt(_chat_e('Скопировать в буфер обмена: Ctrl + C, Enter'), $('#address-wallet-inp-get').val());
    });
    clipboard2.on('success', function (e) {
        noty({
            text: _chat_e('Успешно!') + '<br> Partner ' + _chat_e('Адрес скопирован в буфер обмена.'),
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

        e.clearSelection();
    });
    clipboard2.on('error', function (e) {
        window.prompt(_chat_e('Скопировать в буфер обмена: Ctrl + C, Enter'), $('#address-wallet-inp-get').val());
    });
    clipboard233.on('success', function (e) {
        noty({
            text: _chat_e('Успешно!') + '<br> ' + _chat_e('Адрес скопирован в буфер обмена.'),
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

        e.clearSelection();
    });
    clipboard233.on('error', function (e) {
        window.prompt(_chat_e('Скопировать в буфер обмена: Ctrl + C, Enter'), $('#address-wallet-inp-get').val());
    });
    function GweiByID(id) {
        var oid = {1: 3, 2: 9, 3: 15, 4: 21, 5: 30, 6: 40};
        return oid[id];
    }

    ractiveComponent['wtc-DebitcoinApp'].set('tab', 'gold');
    ractiveComponent['wtc-DebitcoinApp'].on('openModal', function (e, pageS) {
        if (pageS == 'send') {
            $('#cardModal2').modal();
            $("#ex21").bootstrapSlider({
                ticks_toolti: true, formatter: function (id) {
                    return GweiByID(id) + ' Gwei';

                }
            });
            setTimeout(function () {
                $("#ex21").bootstrapSlider('refresh')
            }, 501);
            setTimeout(function () {
                $("#ex21").bootstrapSlider('refresh')
            }, 1500);

        }
        if (pageS == 'virualdbc') {
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
                text: _chat_e('Вы действительно хотите перевести:') + ' <strong>' + ractiveComponent['wtc-DebitcoinApp'].get('finance_debit_coin_gold_virtual') + ' eDBC</strong><br>' + _chat_e('На основной адрес DBC'),
                showLoaderOnConfirm: true,
                preConfirm: function () {
                    swal({
                        customClass: 'swal-telegraf-modal select-form text-center',
                        title: _chat_e('Создание перевода DEBIT Coin...'),
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

                    API('eDBC_transfrer_DBC', {
                        amount: ractiveComponent['wtc-DebitcoinApp'].get('finance_debit_coin_gold_virtual')
                    }, false, function (res) {
                        Messenger.finance.update();
                        if (res.error) {
                            return swal({
                                customClass: 'swal-telegraf-modal select-form text-center',
                                buttonsStyling: false,
                                confirmButtonClass: 'button-n',
                                cancelButtonClass: 'cansel-btns',
                                title: _chat_e('Уппс...'),
                                type: 'error',
                                confirmButtonText: _chat_e('Ок'),
                                showCancelButton: false,
                                text: 'Error:' + res.error
                            });
                        }
                        return swal({
                            customClass: 'swal-telegraf-modal select-form text-center',
                            buttonsStyling: false,
                            confirmButtonClass: 'button-n',
                            cancelButtonClass: 'cansel-btns',
                            title: _chat_e('Успешно'),
                            type: 'success',
                            confirmButtonText: _chat_e('Ок'),
                            showCancelButton: false,
                            text: _chat_e('Перевод отправлен в обработку txHash:') + ' ' + res.txHash
                        });

                    }, true);
                }
            });
        }
        if (pageS == 'get') {
            $('#cardModal').modal();
            $('#buy_debitcoin').css('display', 'block');

            document.getElementById("qr_code_vdc2").innerHTML = '';
            new QRCode(document.getElementById("qr_code_vdc2"), {
                text: ractiveComponent['wtc-DebitcoinApp'].get('debit_token').wallet.address,
                width: 170,
                height: 170,
                colorDark: "#000000",
                colorLight: "#fff",
                correctLevel: QRCode.CorrectLevel.L
            });
        }
        if (pageS == 'getbtc') {
            $('#cardModal').modal();
            $('#buy_debitcoin').css('display', 'none');
            document.getElementById("qr_code_vdc2").innerHTML = '';
            new QRCode(document.getElementById("qr_code_vdc2"), {
                text: ractiveComponent['wtc-DebitcoinApp'].get('btc_debit_token').wallet.address,
                width: 170,
                height: 170,
                colorDark: "#000000",
                colorLight: "#fff",
                correctLevel: QRCode.CorrectLevel.L
            });
        }

    });
    ractiveComponent['wtc-DebitcoinApp'].on('sendCoin', function (e, tab) {
        var __typeCoin = 'DBC';
        var commision = '</strong> GasPrice: <strong>' + GweiByID($("#ex21").bootstrapSlider('getValue')) + ' Gwei</strong>';
        if (tab === 'eth') {
            __typeCoin = 'ETH';
        }
        if (tab === 'btc') {
            commision = '</strong> Fee: <strong>0.0001 BTC</strong>'
            __typeCoin = 'BTC';
        }
        if ($('#amount-wallet-inp').val() <= 0 || isNaN($('#amount-wallet-inp').val())) {
            return noty({
                text: _chat_e('Ошибка:') + ' <br>' + _chat_e('Неверная сумма перевода'),
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
        var tab_ = ractiveComponent['wtc-DebitcoinApp'].get('tab');

        var myAddress;
        if (tab_ === 'gold') {
            myAddress = ractiveComponent['wtc-DebitcoinApp'].get('debit_token').wallet.address;
        }

        if (tab_ === 'eth') {
            myAddress = ractiveComponent['wtc-DebitcoinApp'].get('debit_token').wallet.address;
        }
        if (tab_ === 'btc') {
            myAddress = ractiveComponent['wtc-DebitcoinApp'].get('btc_debit_token').wallet.address;
        }

        if ($('#address-wallet-inp').val() === '' || $('#address-wallet-inp').val().length < 10 || $('#address-wallet-inp').val().length > 60) {
            return noty({
                text: _chat_e('Ошибка:') + ' <br>' + _chat_e('Неверный адрес кошелька'),
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
        $('#cardModal2').modal('hide');
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
            text: _chat_e('Вы действительно хотите перевести:') + ' <strong>' + $('#amount-wallet-inp').val() + ' ' + __typeCoin + '</strong><br>' + _chat_e('На адрес:') + ' <strong>' + $('#address-wallet-inp').val() + commision,
            showLoaderOnConfirm: true,
            preConfirm: function () {
                swal({
                    customClass: 'swal-telegraf-modal select-form text-center',
                    title: _chat_e('Создание перевода...'),
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

                API('transfer_coin', {
                    from: myAddress,
                    to: $('#address-wallet-inp').val(),
                    type: __typeCoin,
                    gasPrice: GweiByID($("#ex21").bootstrapSlider('getValue')),
                    amount: $('#amount-wallet-inp').val()
                }, false, function (res) {
                    if (res.error) {
                        if (1155121 === res.error_code) {
                            swal.close();
                            $('#cardModal3').modal('show');
                            return false;
                        }
                        return swal({
                            customClass: 'swal-telegraf-modal select-form text-center',
                            buttonsStyling: false,
                            confirmButtonClass: 'button-n',
                            cancelButtonClass: 'cansel-btns',
                            title: _chat_e('Уппс...'),
                            type: 'error',
                            confirmButtonText: _chat_e('Ок'),
                            showCancelButton: false,
                            text: 'Error:' + res.error
                        });
                    }
                    var scan_url_ = 'https://etherscan.io/tx/';
                    if (res.type === 'BTC') scan_url_ = 'https://blockchain.info/tx/';
                    return swal({
                        customClass: 'swal-telegraf-modal select-form text-center',
                        buttonsStyling: false,
                        confirmButtonClass: 'button-n',
                        cancelButtonClass: 'cansel-btns',
                        title: _chat_e('Успешно'),
                        type: 'success',
                        confirmButtonText: _chat_e('Ок'),
                        showCancelButton: false,
                        text: _chat_e('Перевод отправлен в обработку txHash:') + ' <a href="' + scan_url_ + res.txHash + '" target="_blank">' + res.txHash + '</a>'
                    });

                }, true);
            }
        });
    });
});
ractiveComponent['wtc-DebitcoinApp'].on('barcodeScanner', function (e, pageS) {
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            if (result && result.text && result.text.length < 10 && result.text.length >= 60) {
                $('#address-wallet-inp').val(result.text);
                $('#address-wallet-i').css('color', '#00f317')
            } else {
                return swal({
                    customClass: 'swal-telegraf-modal select-form text-center',
                    buttonsStyling: false,
                    confirmButtonClass: 'button-n',
                    cancelButtonClass: 'cansel-btns',
                    title: _chat_e('Уппс...'),
                    type: 'error',
                    confirmButtonText: _chat_e('Ок'),
                    showCancelButton: false,
                    text: _chat_e('QR-Код не является адресом кошелька')
                });
            }
        },
        function (error) {
            return swal({
                customClass: 'swal-telegraf-modal select-form text-center',
                buttonsStyling: false,
                confirmButtonClass: 'button-n',
                cancelButtonClass: 'cansel-btns',
                title: _chat_e('Уппс...'),
                type: 'error',
                confirmButtonText: _chat_e('Ок'),
                showCancelButton: false,
                text: _chat_e('Ошибка QR-Кода')
            });
        },
        {
            preferFrontCamera: false, // iOS and Android
            showFlipCameraButton: true, // iOS and Android
            showTorchButton: true, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            prompt: _chat_e("Поместите QR-Код внутри области сканирования"), // Android
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats: "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
            orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations: false, // iOS
            disableSuccessBeep: false // iOS
        }
    );

});
ractiveComponent['wtc-DebitcoinApp'].on('setSubTab', function (e, pageS) {
    ractiveComponent['wtc-DebitcoinApp'].set('sub_tab', pageS);
    var tab_ = ractiveComponent['wtc-DebitcoinApp'].get('tab');
    var type_currency, myAddress;
    if (tab_ === 'gold') {
        type_currency = 'DBC';
        myAddress = ractiveComponent['wtc-DebitcoinApp'].get('debit_token').wallet.address;
    }

    if (tab_ === 'eth') {
        type_currency = 'ETH';
        myAddress = ractiveComponent['wtc-DebitcoinApp'].get('debit_token').wallet.address;
    }
    if (tab_ === 'btc') {
        type_currency = 'BTC';
        myAddress = ractiveComponent['wtc-DebitcoinApp'].get('btc_debit_token').wallet.address;
    }

    if (pageS == 'tx') {
        ractiveComponent['wtc-DebitcoinApp'].set('transactions_load', false);

        API('tx_crypto', {address: myAddress, count: 40, page: 1, type: type_currency}, false, function (response) {
            if (response.error)
                return noty({
                    text: _chat_e('Ошибка:') + ' <br>' + response.error,
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
            if (response.type === 'DBC') {
                for (var i in response.tx) {
                    var update_time = moment(new Date(response.tx[i].timestamp * 1000));
                    var date_now = update_time.format('DD.MM.YYYY');
                    var time = update_time.format('HH:mm');
                    response.tx[i].date = date_now;
                    response.tx[i].time = time;
                    response.tx[i].type_ = '+';
                    if (response.tx[i].from == myAddress)
                        response.tx[i].type_ = '-';
                }
                ractiveComponent['wtc-DebitcoinApp'].set('transactions' + response.type, response.tx);
                ractiveComponent['wtc-DebitcoinApp'].set('transactions_load' + response.type, true);
            }

            if (response.type === 'ETH') {
                for (var i in response.tx) {
                    var update_time = moment(new Date(response.tx[i].timestamp * 1000));
                    var date_now = update_time.format('DD.MM.YYYY');
                    var time = update_time.format('HH:mm');
                    response.tx[i].date = date_now;
                    response.tx[i].time = time;
                    response.tx[i].type_ = '+';
                    if (response.tx[i].from == myAddress)
                        response.tx[i].type_ = '-';
                }
                ractiveComponent['wtc-DebitcoinApp'].set('transactions' + response.type, response.tx);
                ractiveComponent['wtc-DebitcoinApp'].set('transactions_load' + response.type, true);
            }
            if (response.type === 'BTC') {
                for (var i in response.tx) {
                    var update_time = moment(new Date(response.tx[i].time * 1));
                    var date_now = update_time.format('DD.MM.YYYY');
                    var time = update_time.format('HH:mm');
                    response.tx[i].date = date_now;
                    response.tx[i].time = time;
                    response.tx[i].type_ = '+';
                    response.tx[i].value = response.tx[i].result;

                    if (+response.tx[i].result === 0) {
                        for (var i2 in response.tx[i].inputs) {
                            response.tx[i].value += -response.tx[i].inputs[i2].prev_out.value
                        }
                        response.tx[i].type_ = '-';
                    }
                    response.tx[i].value = (-response.tx[i].value) / 100000000;
                }
                ractiveComponent['wtc-DebitcoinApp'].set('transactions' + response.type, response.tx);
                ractiveComponent['wtc-DebitcoinApp'].set('transactions_load' + response.type, true);
            }
        });
    }
    //     new QRCode(document.getElementById("qr_code_vdc"), {
    //         text: res.wallet.address,
    //         width: 200,
    //         height: 200,
    //         colorDark: "#000000",
    //         colorLight: "#fff",
    //         correctLevel: QRCode.CorrectLevel.L
    //     });

});
ractiveComponent['wtc-DebitcoinApp'].on('showPrivate', function (e, curr) {
    if (!curr) curr = 'DBC';

    if (curr === "DBC" || curr === "ETH") {
        if (localStorage.getItem('installTime') && localStorage.getItem('installTime') === 'crypto.wallet.eth.auth') {
            ractiveComponent['wtc-DebitcoinApp'].set('showPrivate_', !ractiveComponent['wtc-DebitcoinApp'].get('showPrivate_'));

            return ractiveComponent['wtc-DebitcoinApp'].set('debit_tokenPrivateKey', localStorage.getItem('walletPrivateKey'));

        }
    }
    if (!ractiveComponent['wtc-DebitcoinApp'].get('showPrivate_')) {
        swal({
            customClass: 'swal-telegraf-modal select-form text-center',
            title: _chat_e('Загрузка...'),
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
            }
        });

        swal.showLoading();
        API('wallet_coin', {type: curr, secure: true}, false, function (res) {
            ractiveComponent['wtc-DebitcoinApp'].set('debit_tokenPrivateKey', res.wallet.PrivateKey);
            ractiveComponent['wtc-DebitcoinApp'].set('debit_tokenPrivateKey_2', res.wallet.passwordKeystore);
            ractiveComponent['wtc-DebitcoinApp'].set('showPrivate_', !ractiveComponent['wtc-DebitcoinApp'].get('showPrivate_'));
            setTimeout(swal.close, 300);
        }, true);
    } else {
        ractiveComponent['wtc-DebitcoinApp'].set('showPrivate_', !ractiveComponent['wtc-DebitcoinApp'].get('showPrivate_'));
        ractiveComponent['wtc-DebitcoinApp'].set('debit_tokenPrivateKey', false);

    }
});
ractiveComponent['wtc-DebitcoinApp'].on('keyStoreFile', function (e) {
    swal({
        customClass: 'swal-telegraf-modal select-form text-center',
        title: _chat_e('Загрузка...'),
        closeOnConfirm: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: true,
        showCancelButton: false,
        showLoaderOnConfirm: true,
        text: _chat_e('Подготовка к скачиванию Keystore File'),
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                // here should be AJAX request
                setTimeout(function () {
                    resolve();
                }, 10000);
            });
        }
    });


    swal.showLoading();
    API('wallet_coin', {type: 'DBC', secure: true}, false, function (res) {

        $.fileDownload(res.wallet.KeystoreURL)
            .fail(function () {
                return swal({
                    customClass: 'swal-telegraf-modal select-form text-center',
                    buttonsStyling: false,
                    confirmButtonClass: 'button-n',
                    cancelButtonClass: 'cansel-btns',
                    title: _chat_e('Уппс...'),
                    type: 'error',
                    confirmButtonText: _chat_e('Ок'),
                    showCancelButton: false,
                    text: 'File download failed!'
                });
            });
        setTimeout(function () {
            return swal({
                customClass: 'swal-telegraf-modal select-form text-center',
                buttonsStyling: false,
                confirmButtonClass: 'button-n',
                cancelButtonClass: 'cansel-btns',
                title: 'Keystore File',
                type: 'success',
                confirmButtonText: _chat_e('Ок'),
                showCancelButton: false,
                text: _chat_e('Пароль:') + ' ' + res.wallet.passwordKeystore
            });
        }, 200);
    }, true);

});
ractiveComponent['wtc-DebitcoinApp'].set('sub_tab', 'wallet');


function transfer_coin(user, param, callback) {
    if (!param.from)return callback && callback(null, {
            error: 'param from undefined',
            success: false,
            code: 500,
            status: 'error'
        });
    if (!param.to)return callback && callback(null, {
            error: 'param to undefined',
            success: false,
            code: 500,
            status: 'error'
        });

    if (!param.amount)return callback && callback(null, {
            error: 'param amount undefined',
            success: false,
            code: 500,
            status: 'error'
        });
    if (isNaN(+param.amount)) {
        callback && callback(null,
            {
                error: "amount in Nan",
                error_obj: {'param': 'amount', value: param.amount},
                success: false
            });
    }
    if (!param.type) param.type = 'DBC';
    if (!param.gasPrice || isNaN(param.gasPrice)) param.gasPrice = 21;
    if (+param.gasPrice > 30) param.gasPrice = 21;
    if (+param.gasPrice < 0) param.gasPrice = 21;
    param.type = param.type.toUpperCase();
    var subType = 'DBC';
    if (param.type === 'ETH') {
        param.type = 'ETH';
        subType = 'ETH';
    }

    if (param.type === 'BTC') {
        param.type = 'BTC';
        subType = 'BTC';
    }
    if (param.type === 'DBC') {
        param.type = 'ETH';
        subType = 'DBC';
    }
    if (param.type === 'VDC') {
        param.type = 'ETH';
        subType = 'DBC';
    }


    if (param.type != 'ETH' && param.type != 'BTC') {
        return callback && callback(null, {
                error: 'param.type dont support',
                success: false
            })
    }
    if (subType === 'ETH') {
        if (!web3.isAddress(param.to))
            return callback && callback(null,
                    {
                        error: "The address you entered is not an address of ETH Wallet",
                        error_obj: {address: param.to},
                        success: false
                    });
        if (!util.isValidAddress(param.to))
            return callback && callback(null,
                    {
                        error: "The address you entered is not an address of ETH Wallet",
                        error_obj: {address: param.to},
                        success: false
                    });
        if (!web3.isAddress(param.from))
            return callback && callback(null,
                    {
                        error: "The address you entered is not an address of ETH Wallet (sender)",
                        error_obj: {address: param.to},
                        success: false
                    });
        if (!ethUtil.isValidAddress(param.from))
            return callback && callback(null,
                    {
                        error: "The address you entered is not an address of ETH Wallet (sender)",
                        error_obj: {address: param.to},
                        success: false
                    });
        var nonce = web3.eth.getTransactionCount(param.from, "pending");
        var balance = +(+web3.eth.getBalance(param.from) / 1000000000000000000).toFixed(8);
        if (balance < (80000 * param.gasPrice / 1000000000).toFixed(9))
            return callback && callback(null,
                    {
                        error: "Тot enough money ETH you wallet to pay for gas. min balance:" + (80000 * param.gasPrice / 1000000000).toFixed(9),
                        error_code: 1155121,
                        error_obj: {
                            address: param.from,
                            eth: balance,
                            minimal: (80000 * param.gasPrice / 1000000000).toFixed(9)
                        },
                        success: false
                    });

        var privateKey = new Buffer(param.PrivateKey, 'hex');

        var gasPriceHex = ethUtil.bufferToHex(param.gasPrice * 1000000000);
        var gasLimitHex = ethUtil.bufferToHex(80000);
        var nonceHex = ethUtil.bufferToHex(nonce);
        var tx = new Tx({
            nonce: nonceHex,
            gasPrice: gasPriceHex,
            gasLimit: gasLimitHex,
            to: param.to,
            from: param.from,
            value: web3.toHex(web3.toWei(+param.amount, 'ether')),
            "chainId": 1
        });
        tx.sign(privateKey);

        var serializedTx = tx.serialize();

        web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
            if (err) {
                console.log('Error sendRawTransaction:', err);
                callback && callback(null,
                    {
                        error: "Error ETH Geth server please try latter",
                        error_code: 500500,
                        error_obj: err,
                        success: false
                    });
            }
            else {
                callback && callback(null,
                    {
                        txHash: hash,
                        success: true
                    });

            }
        });
    }

    // if (subType === 'DBC') {
    //     if (!web3.isAddress(param.to))
    //         return callback && callback(null,
    //                 {
    //                     error: "The address you entered is not an address of Debit Coin Wallet",
    //                     error_obj: {address: param.to},
    //                     success: false
    //                 });
    //     if (!util.isValidAddress(param.to))
    //         return callback && callback(null,
    //                 {
    //                     error: "The address you entered is not an address of Debit Coin Wallet",
    //                     error_obj: {address: param.to},
    //                     success: false
    //                 });
    //
    //     console.log('transfer_coin: ', user.webtransfer_id, active, param.to);
    //
    //     db.wallets.findOne({
    //         "user_id": user.webtransfer_id,
    //         "wallet.address": param.from,
    //         "type": param.type,
    //         "active": active,
    //     }, (err, response_s) => {
    //         if (err) {
    //             callback && callback(null,
    //                 {
    //                     error: "error db-wallets(" + err.name + "): " + err.messagee,
    //                     error_obj: err,
    //                     success: false
    //                 });
    //             return false;
    //         }
    //         if (!response_s) {
    //         callback && callback(null,
    //             {
    //                 error: "Error You wallets not found or blocked",
    //                 error_obj: err,
    //                 success: false
    //             });
    //         return false;
    //     }
    //     let nonce = web3.eth.getTransactionCount(response_s.wallet.address, "pending");
    //     let balance = response_s.wallet.balance.eth;
    //     if (balance < (80000 * param.gasPrice / 1000000000).toFixed(9))
    //         return callback && callback(null,
    //                 {
    //                     error: "Тot enough money ETH you wallet to pay for gas. min balance:" + (80000 * param.gasPrice / 1000000000).toFixed(9),
    //                     error_code: 1155121,
    //                     error_obj: {
    //                         address: response_s.wallet.address,
    //                         eth: response_s.wallet.balance.eth,
    //                         minimal: (80000 * param.gasPrice / 1000000000).toFixed(9)
    //                     },
    //                     success: false
    //                 });
    //
    //     let privateKey = new Buffer(response_s.wallet.PrivateKey, 'hex');
    //     let solidityFunction = new SolidityFunction('', _.find(abi, {name: 'transfer'}), '');
    //
    //     let payloadData = solidityFunction.toPayload([param.to, (+param.amount * _contract_fixed)]).data;
    //     let gasPriceHex = util.bufferToHex(param.gasPrice * 1000000000);
    //     let gasLimitHex = util.bufferToHex(80000);
    //     let nonceHex = util.bufferToHex(nonce);
    //     let tx = new Tx({
    //         nonce: nonceHex,
    //         gasPrice: gasPriceHex,
    //         gasLimit: gasLimitHex,
    //         to: _address,
    //         from: response_s.wallet.address,
    //         value: '0x00',
    //         data: payloadData,
    //         "chainId": 1
    //     });
    //     tx.sign(privateKey);
    //
    //     let serializedTx = tx.serialize();
    //
    //     web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
    //         if (err) {
    //             console.log('Error sendRawTransaction:', err);
    //             callback && callback(null,
    //                 {
    //                     error: "Error Web3 please try latter",
    //                     error_code: 500500,
    //                     error_obj: err,
    //                     success: false
    //                 });
    //         }
    //         else {
    //             callback && callback(null,
    //                 {
    //                     txHash: hash,
    //                     success: true
    //                 });
    //
    //
    //             new db.tx({
    //                 user_id: user.webtransfer_id,
    //                 currency: 'DBC',
    //                 tx: {
    //                     to: param.to,
    //                     from: response_s.wallet.address,
    //                     value: +param.amount,
    //                     hash: hash
    //                 },
    //                 nonce: +nonce + 1,
    //                 blockNumber_send: web3.eth.blockNumber,
    //                 wallet: response_s.wallet.address,
    //                 callback_url: param.callback_url,
    //                 status: 1
    //             }).save();
    //             db.wallets.findOne({
    //                 "wallet.address": param.to,
    //                 "type": param.type,
    //                 "active": active,
    //             }, (err, response_to) => {
    //
    //                 if (response_to && response_to.user_id)
    //             API.emit('create_message', {
    //                 webtransfer_id: +main_address_user_id
    //             }, {
    //                 message: 'You received a transfer of ' + ((+param.amount).toFixed(2)) + ' DBC <br><br>From:<a target="_blank" href="https://etherscan.io/address/' + response_s.wallet.address + '"><br>' + response_s.wallet.address + '</a><br><br>Tx Hash:<br><a target="_blank" href="https://etherscan.io/tx/' + hash + '">' + hash + '</a>',
    //                 message_hesh: 'tx_' + (new Date()).getTime(),
    //                 recipient_id: response_to.user_id
    //             });
    //         });
    //         }
    //     });
    // });
    // }

}

