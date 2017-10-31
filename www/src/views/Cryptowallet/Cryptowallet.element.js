var contract = web3.eth.contract(abi).at(_address);
var WtcCryptowallet = Ractive.extend({
    oninit: function () {
        console.log('Cryptowallet.oninit !');
        ractiveComponent['wtc-CryptowalletApp'].set('crypto_wallets', Messenger.crypto.wallets);
        ractiveComponent['wtc-CryptowalletApp'].set('load', true);
        ractiveComponent['wtc-CryptowalletApp'].set('showPrivate_', false);
        ractiveComponent['wtc-CryptowalletApp'].set('sub_tab', 'tx');

        if (!ractiveComponent['wtc-CryptowalletApp'].get('tab'))
            ractiveComponent['wtc-CryptowalletApp'].set('tab', 'all');


    },
    onrender: function () {
        console.log('Cryptowallet.onrender !');

    },
    oncomplete: function () {
        console.log('Cryptowallet.oncomplete !');
    }

});
ractiveComponent['wtc-CryptowalletApp'].set('usd', {ETH: 0, BTC: 0, DBC: 1});
if (localStorage.getItem('installTime') && localStorage.getItem('installTime') === 'crypto.wallet.eth.auth') {
    var priv = localStorage.getItem('walletPrivateKey'),
        address_my = keythereum.privateKeyToAddress(priv);
    Messenger.crypto.add(address_my, 'ETH', priv, true);
    Messenger.crypto.add(address_my, 'DBC', priv, true);
}
Messenger.crypto.update();
$.ajax({
    url: 'https://api.coinmarketcap.com/v1/ticker/ethereum/', type: 'get', success: function (res) {
        try {
            ractiveComponent['wtc-CryptowalletApp'].set('usd.ETH', res[0].price_usd);
        } catch (e) {
            console.error('ERROR parse coinmarketcap', e)
        }
    }
});
$.ajax({
    url: 'https://api.coinmarketcap.com/v1/ticker/bitcoin/', type: 'get', success: function (res) {
        try {
            ractiveComponent['wtc-CryptowalletApp'].set('usd.BTC', res[0].price_usd);
        } catch (e) {
            console.error('ERROR parse coinmarketcap', e)
        }
    }
});
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

function updateWalletOfCloudServer(callback) {


    swal({
        customClass: 'swal-telegraf-modal select-form text-center',
        title: _chat_e('Скачивание кошельков из облака Telegraf.money'),
        closeOnConfirm: false,
        allowOutsideClick: false,
        showConfirmButton: true,
        showCancelButton: false,
        showLoaderOnConfirm: true,
        text: _chat_e('Может занять несколько секунд'),
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
    var error_load_server_wallet = setTimeout(function () {
        swal.close();
        noty({
            text: _chat_e('Не удалось скачать кошельки, из облака Telegraf.money'),
            type: 'warning',
            theme: 'metroui',
            layout: 'topCenter',
            timeout: 4000,
            progressBar: true,
            animation: {
                open: 'animated fadeInDown',
                close: 'animated fadeOutUp'
            }
        });
    }, 10000);
    API('cloudGetCryproWallet', {}, false, function (res) {
        res.wallets.forEach(function (el) {
            if (el.type === 'ETH') Messenger.crypto.add(el.wallet.address, 'DBC', el.wallet.PrivateKey);
            Messenger.crypto.add(el.wallet.address, el.type, el.wallet.PrivateKey);
        });
        swal.close();
        clearTimeout(error_load_server_wallet);
    }, true)
}

function loadSubTab(pageS) {

    ractiveComponent['wtc-CryptowalletApp'].set('sub_tab', pageS);
    var wallet = ractiveComponent['wtc-CryptowalletApp'].get('wallet');


    if (pageS === 'tx') {

        ractiveComponent['wtc-CryptowalletApp'].set('transactions_load', false);
        if (wallet.type === 'DBC'){
            ethplorer('getAddressHistory', wallet.address, {
                apiKey: 'freekey',
                token: _address
            }, {}, function (response) {
                console.log(response);
                for (var i in response.operations) {
                    var update_time = moment(new Date(response.operations[i].timestamp * 1000));
                    var date_now = update_time.format('DD.MM.YYYY');
                    var time = update_time.format('HH:mm');
                    response.operations[i].date = date_now;
                    response.operations[i].time = time;
                    response.operations[i].type_ = '+';
                    response.operations[i].hash = response.operations[i].hash || response.operations[i].transactionHash;
                    response.operations[i].value = +(+response.operations[i].value/_contract_fixed).toFixed(4);
                    if (response.operations[i].from === wallet.address)
                        response.operations[i].type_ = '-';
                }
                ractiveComponent['wtc-CryptowalletApp'].set('transactions', response.operations);
                ractiveComponent['wtc-CryptowalletApp'].set('transactions_load', true);
            });
        }
        if (wallet.type === 'ETH') {
            etherscan('api', '', {
                "module": "account",
                "action": "txlist",
                "address": wallet.address,
                "page": "1",
                "offset": "30",
                "sort": "desc",
                "apikey": "freekey"
            }, {}, function (response) {
                console.log(response);
                for (var i in response.result) {
                    var update_time = moment(new Date(response.result[i].timeStamp * 1000));
                    var date_now = update_time.format('DD.MM.YYYY');
                    var time = update_time.format('HH:mm');
                    response.result[i].date = date_now;
                    response.result[i].time = time;

                    response.result[i].value = +(+response.result[i].value / 1000000000000000000).toFixed(8);
                    if (response.result[i].value > 1) response.result[i].value = response.result[i].value.toFixed(4);
                    else if (response.result[i].value > 0.29) response.result[i].value = response.result[i].value.toFixed(5);
                    else if (response.result[i].value > 0.1) response.result[i].value = response.result[i].value.toFixed(6);
                    response.result[i].fee = +(+response.result[i].gasPrice * +response.result[i].cumulativeGasUsed / 100000000000000000000).toFixed(6);
                    response.result[i].type_ = '+';
                    if (response.result[i].from === wallet.address)
                        response.result[i].type_ = '-';
                }
                ractiveComponent['wtc-CryptowalletApp'].set('transactions', response.result);
                ractiveComponent['wtc-CryptowalletApp'].set('transactions_load', true);
            });
        }
        if (response.type === 'BTC') {
            ractiveComponent['wtc-DebitcoinApp'].set('transactions' ,[]);

            ractiveComponent['wtc-DebitcoinApp'].set('transactions_load' + response.type, true);

        }
    }
}

lsbridge.subscribe('crypto_wallets', function (data) {
    console.log('crypto_wallets', data); // prints: { message: 'Hello world!'}
    ractiveComponent['wtc-CryptowalletApp'].set('crypto_wallets', data);

});

ractiveComponent['wtc-CryptowalletApp'].on('barcodeScanner', function (e, pageS) {
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
ractiveComponent['wtc-CryptowalletApp'].on('setSubTab', function (e, pageS) {
    loadSubTab(pageS);

});
ractiveComponent['wtc-CryptowalletApp'].on('showPrivate', function (e, curr) {

    var wallet = ractiveComponent['wtc-CryptowalletApp'].get('wallet');

    ractiveComponent['wtc-CryptowalletApp'].set('showPrivate_', !ractiveComponent['wtc-CryptowalletApp'].get('showPrivate_'));

    return ractiveComponent['wtc-CryptowalletApp'].set('debit_tokenPrivateKey', wallet.privateKey);

});
ractiveComponent['wtc-CryptowalletApp'].on('keyStoreFile', function (e) {
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


    return swal({
        customClass: 'swal-telegraf-modal select-form text-center',
        buttonsStyling: false,
        confirmButtonClass: 'button-n',
        cancelButtonClass: 'cansel-btns',
        title: _chat_e('Уппс...'),
        type: 'error',
        confirmButtonText: _chat_e('Ок'),
        showCancelButton: false,
        text: 'Coming soon! Please see Private Key'
    });

});
ractiveComponent['wtc-CryptowalletApp'].on('updateWalletOfCloudServer', updateWalletOfCloudServer);
ractiveComponent['wtc-CryptowalletApp'].on('AddCryptoWallet', function () {
    $('#newModal').modal('show');
});
ractiveComponent['wtc-CryptowalletApp'].on('import_crypto_wallet_privatekey', function () {
    // $('#newModal').modal('show');

    var form_type = $('input[name="addresstype"]:checked').val();
    $('#newModal').modal('hide');
    if (form_type === 'ETH' || form_type === 'DBC')
        importFromPrivateKeyETH(function (address, private, type) {
            Messenger.crypto.add(address, form_type, private, true);

            noty({
                text: _chat_e('Кошелек успешно импортирован:') + ' ' + form_type + ' ' + address,
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
        })
});
ractiveComponent['wtc-CryptowalletApp'].on('new_crypto_wallet', function () {
    var form_type = $('input[name="addresstype"]:checked').val();
    $('#newModal').modal('hide');
    if (form_type === 'ETH' || form_type === 'DBC')
        createWalletETH(function (address, private, type) {
            Messenger.crypto.add(address, form_type, private, true);

            noty({
                text: _chat_e('Кошелек успешно создан:') + ' ' + form_type + ' ' + address,
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
        })
});
ractiveComponent['wtc-CryptowalletApp'].on('wallet_open', function (e, w) {
    ractiveComponent['wtc-CryptowalletApp'].set('wallet', w);
    ractiveComponent['wtc-CryptowalletApp'].set('tab', w.address);
    loadSubTab('tx');
});

document.getElementById('file-input-keystore')
    .addEventListener('change', function (e) {
        var form_type = $('input[name="addresstype"]:checked').val();
        $('#newModal').modal('hide');
        importFromKeyStoreETH(e, function (address, private, type) {
            Messenger.crypto.add(address, form_type, private, true);

            noty({
                text: _chat_e('Кошелек успешно импортирован:') + ' ' + form_type + ' ' + address,
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
        })
    }, false);


ractiveComponent['wtc-CryptowalletApp'].on('openModal', function (e, pageS) {
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
    if (pageS === 'get' || pageS === 'getbtc') {
        $('#cardModal').modal();
        $('#buy_debitcoin').css('display', 'none');
        document.getElementById("qr_code_vdc2").innerHTML = '';
        new QRCode(document.getElementById("qr_code_vdc2"), {
            text: ractiveComponent['wtc-CryptowalletApp'].get('wallet').address,
            width: 170,
            height: 170,
            colorDark: "#000000",
            colorLight: "#fff",
            correctLevel: QRCode.CorrectLevel.L
        });
    }

});
ractiveComponent['wtc-CryptowalletApp'].on('sendCoin', function (e, type) {
    var __typeCoin = 'DBC';
    var commision = '</strong> GasPrice: <strong>' + GweiByID($("#ex21").bootstrapSlider('getValue')) + ' Gwei</strong>';
    if (type === 'ETH') {
        __typeCoin = 'ETH';
    }
    if (type === 'DBC') {
        __typeCoin = 'DBC';
    }
    if (type === 'BTC') {
        commision = '</strong> Fee: <strong>0.0001 BTC</strong>'
        __typeCoin = 'BTC';
        return noty({
            text: _chat_e('Скоро'),
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

    var myAddress = ractiveComponent['wtc-CryptowalletApp'].get('wallet').address;


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
            if (__typeCoin === 'ETH') {
                Crypto.transferETH({
                    from: myAddress,
                    to: $('#address-wallet-inp').val(),
                    gasPrice: GweiByID($("#ex21").bootstrapSlider('getValue')),
                    amount: $('#amount-wallet-inp').val()
                }, function (hash) {

                    var scan_url_ = 'https://etherscan.io/tx/';
                    return swal({
                        customClass: 'swal-telegraf-modal select-form text-center',
                        buttonsStyling: false,
                        confirmButtonClass: 'button-n',
                        cancelButtonClass: 'cansel-btns',
                        title: _chat_e('Успешно'),
                        type: 'success',
                        confirmButtonText: _chat_e('Ок'),
                        showCancelButton: false,
                        text: _chat_e('Перевод отправлен в обработку txHash:') + ' <a href="' + scan_url_ + hash + '" target="_blank">' + hash + '</a>'
                    });

                }, true);
            }
            if (__typeCoin === 'DBC') {
                Crypto.transferDBC({
                    from: myAddress,
                    to: $('#address-wallet-inp').val(),
                    gasPrice: GweiByID($("#ex21").bootstrapSlider('getValue')),
                    amount: $('#amount-wallet-inp').val()
                }, function (hash) {

                    var scan_url_ = 'https://etherscan.io/tx/';
                    return swal({
                        customClass: 'swal-telegraf-modal select-form text-center',
                        buttonsStyling: false,
                        confirmButtonClass: 'button-n',
                        cancelButtonClass: 'cansel-btns',
                        title: _chat_e('Успешно'),
                        type: 'success',
                        confirmButtonText: _chat_e('Ок'),
                        showCancelButton: false,
                        text: _chat_e('Перевод отправлен в обработку txHash:') + ' <a href="' + scan_url_ + hash + '" target="_blank">' + hash + '</a>'
                    });

                }, true);
            }
        }
    });
});