var series;
var categories;
var render = 0;
ractiveComponent['wtc-DepositsApp'].set('tab', 'create');

function get_deposit_debit(type) {
    ractiveComponent['wtc-DepositsApp'].set('depositsList.' + type, false);
    ractiveComponent['wtc-DepositsApp'].set('depositsList_loader', false);


    API('get_deposit_debit', {payment_system: type}, false, function (res) {

        for (var i001  in res.data) {
            if (res.data[i001].payment_system === 'BTX' || res.data[i001].payment_system === 'ETX') {
                res.data[i001].sum = (res.data[i001].sum / 100000000).toFixed(6);
                res.data[i001].fund.sum = (res.data[i001].fund.sum / 100000000).toFixed(6);
            }
        }
        ractiveComponent['wtc-DepositsApp'].set('depositsList.' + type, res.data);
        ractiveComponent['wtc-DepositsApp'].set('depositsList_loader', true);
    }, true);
}

var WtcDeposits = Ractive.extend({
    oninit: function () {
        console.log('Debitcoin.oninit !');
        $(".__nano").nanoScroller();
        $('input, select').styler({
            selectSearch: false
        });
        $("#ex21").bootstrapSlider();
        Messenger.crypto.update();
        ractiveComponent['wtc-DepositsApp'].set('crypto_wallets', Messenger.crypto.wallets);
        ractiveComponent['wtc-DepositsApp'].set('MyProfile', MyProfile);
        ractiveComponent['wtc-DepositsApp'].set('device_platform', paramSocket.device_platform_type);
        ractiveComponent['wtc-DepositsApp'].set('payment_system_deposits', 'WDG');
        if (ractiveComponent['wtc-DepositsApp'].get('tab') === 'active') {
            get_deposit_debit(ractiveComponent['wtc-DepositsApp'].get('payment_system_deposits'));
        }
        if (ractiveComponent['wtc-DepositsApp'].get('tab') === 'create') {

            if ($('#wallets_deposit')) $('#wallets_deposit').styler().trigger('refresh');
            if ($('#payment_system')) $('#payment_system').styler().trigger('refresh');
            change_input_deposit()
            //
            // API('deposits_info', {}, false, function (res) {
            //     series = res.series;
            //     categories = res.categories;
            //     hi_graf();
            //     ractiveComponent['wtc-DepositsApp'].set('loaddepositsList', true);
            //
            // }, true);


        }
    },
    onrender: function () {
        console.log('Debitcoin.onrender !');

    },
    oncomplete: function () {
        console.log('Debitcoin.oncomplete !');
    }

});

ractiveComponent['wtc-DepositsApp'].on('stopProfit', function (e, el) {
    console.log(e, el);
    var _S = el.profit.sum;
    if (el.fund.sum < _S)
        _S = el.fund.sum;
    _S = Math.ceil(_S * 10000) / 10000;

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
        html: _chat_e('Вы действительно хотите вывести прибыль депозита.') + '<br>ID: #' + el.id + '<br>' + _chat_e('Сумма вывода:') + ' ' + _S + ' DBC',
        showLoaderOnConfirm: true,
        preConfirm: function () {
            swal({
                customClass: 'swal-telegraf-modal select-form text-center',
                title: _chat_e('Вывод депозита на кошелек DEBIT Coin...'),
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

            API('stop_profit_deposit_debit', {
                amount: _S,
                deposit_id: el.id
            }, false, function (res) {
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
                if (res.result && res.result.error) {
                    return swal({
                        customClass: 'swal-telegraf-modal select-form text-center',
                        buttonsStyling: false,
                        confirmButtonClass: 'button-n',
                        cancelButtonClass: 'cansel-btns',
                        title: _chat_e('Уппс...'),
                        type: 'error',
                        confirmButtonText: _chat_e('Ок'),
                        showCancelButton: false,
                        text: 'Error:' + res.result.error
                    });
                }
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
                    text: _chat_e('Перевод отправлен в обработку txHash:') + ' <a href="' + scan_url_ + res.result.data.blockchainTnxId + '" target="_blank">' + res.result.data.blockchainTnxId + '</a>'
                });

            }, true);
        }
    });
});
ractiveComponent['wtc-DepositsApp'].on('get_deposits', function (e, key) {
    ractiveComponent['wtc-DepositsApp'].set('payment_system_deposits', key);

    get_deposit_debit(key);
});
ractiveComponent['wtc-DepositsApp'].on('stopDeposit', function (e, el) {
    console.log(e, el);
    var _S = el.sum;
    if (el.fund.sum < _S)
        _S = el.fund.sum;
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
        html: _chat_e('Вы действительно хотите остановить депозит.') + '<br>ID: #' + el.id + '<br>' + _chat_e('Сумма вывода:') + ' ' + _S + ' DBC',
        showLoaderOnConfirm: true,
        preConfirm: function () {
            swal({
                customClass: 'swal-telegraf-modal select-form text-center',
                title: _chat_e('Вывод депозита на кошелек DEBIT Coin...'),
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

            API('stop_deposit_debit', {
                amount: _S,
                deposit_id: el.id
            }, false, function (res) {
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
                if (res.result.error) {
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

                return swal({
                    customClass: 'swal-telegraf-modal select-form text-center',
                    buttonsStyling: false,
                    confirmButtonClass: 'button-n',
                    cancelButtonClass: 'cansel-btns',
                    title: _chat_e('Успешно'),
                    type: 'success',
                    confirmButtonText: _chat_e('Ок'),
                    showCancelButton: false,
                    text: _chat_e('Перевод отправлен в обработку txHash:') + ' <a href="' + scan_url_ + res.result.data.blockchainTnxId + '" target="_blank">' + res.result.data.blockchainTnxId + '</a>'
                });

            }, true);
        }
    });
});
ractiveComponent['wtc-DepositsApp'].on('start', function () {
    swal({
        customClass: 'swal-telegraf-modal select-form text-center',
        title: _chat_e('Запуск депозита...'),
        closeOnConfirm: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: true,
        showCancelButton: false,
        showLoaderOnConfirm: true,
        text: _chat_e('Запуск депозита может занять несколько секунд'),
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                // here should be AJAX request
                setTimeout(function () {
                    resolve();
                }, 10000);
            });
        },
    });
    swal.showLoading();
    var duration = ["3", "7", "14", "21", "30", "90", "180", "365"];

    if (!duration[($('#ex21').val() - 1)]) {
        noty({
            text: '<strong>' + _chat_e('Ошибка!') + '</strong><br>' + _chat_e('Ошибка срока депозита'),
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
        return false;
    }
    if (isNaN(+$('#amount_deposits').val())) {
        noty({
            text: '<strong>' + _chat_e('Ошибка!') + '</strong><br>' + _chat_e('Ошибка суммы депозита'),
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
        return false;
    }
    if (isNaN(+$('#input_deposits_prc').val())) {
        noty({
            text: '<strong>' + _chat_e('Ошибка!') + '</strong><br>' + _chat_e('Ошибка Процента депозита'),
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
        return false;
    }
    var payment_system = $('#payment_system');


    if (payment_system.find(':selected').data('type') === 'DBC') {
        if (+$('#amount_deposits').val() > +payment_system.find(':selected').data('balance')) {
            noty({
                text: '<strong>' + _chat_e('Ошибка!') + '</strong><br>' + _chat_e('У вас недостаточно средств') + " DBC",
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
            return false;
        }
        if (Crypto.getBalance(payment_system.val(), 'ETH') < 0.001) {
            noty({
                text: '<strong>' + _chat_e('Ошибка!') + '</strong><br>' + _chat_e('У вас недостаточно средств') + " min:0.001 ETH " + _chat_e('Для оплаты комиссии за транзакцию.'),
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
            return false;
        }
    }

    var scan_url_ = 'https://etherscan.io/tx/';
    var fixedAmm = 1;
    var gasPrice = 15;
    if (payment_system.find(':selected').data('type') === 'BTX') scan_url_ = 'https://blockchain.info/tx/';


    swal.showLoading();

    API('startBlockchainDepositDebitCoin', {
        payment_system: payment_system.find(':selected').data('type'),
        from_address: payment_system.val(),
        amount: $('#amount_deposits').val() * fixedAmm,
        duration: duration[($('#ex21').val() - 1)],
        percent: $('#input_deposits_prc').val(),
        percent_type: $('#prc_type').val(),

    }, false, function (res) {
        if (res.error)
            return swal({
                customClass: 'swal-telegraf-modal select-form text-center',
                buttonsStyling: false,
                confirmButtonClass: 'button-n',
                cancelButtonClass: 'cansel-btns',
                title: _chat_e('Уппс...'),
                type: 'error',
                confirmButtonText: _chat_e('Ок'),
                showCancelButton: false,
                text: 'Try later (' + res.error + ')'
            });
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
            text: _chat_e('Вы действительно хотите перевести:') + ' <strong>' + ($('#amount_deposits').val() * fixedAmm) + ' ' +payment_system.find(':selected').data('type') + '</strong><br>' + _chat_e('На адрес:') + ' Deposit fund <strong>' + res.address_fund +'</strong> GasPrice: <strong>' + gasPrice + ' Gwei</strong>',
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
                    }
                });

                swal.showLoading();
                Crypto.transferDBC({
                    from: payment_system.val(),
                    gasPrice: gasPrice,
                    to: res.address_fund,
                    amount: +res.deposit.sum
                }, function (hash) {
                    swal({
                        customClass: 'swal-telegraf-modal select-form text-center',
                        buttonsStyling: false,
                        confirmButtonClass: 'button-n',
                        cancelButtonClass: 'cansel-btns',
                        title: _chat_e('Успех'),
                        type: 'success',
                        confirmButtonText: _chat_e('Ок'),
                        showCancelButton: false,
                        text: 'TX: <a href="' + scan_url_ + hash + '" target="_blank">' + hash + '</a>'
                    });
                });
            }
        });
    }, true);

});

function change_input_deposit() {
    var duration = ["3", "7", "14", "21", "30", "90", "180", "365"];

    var param = {
        amount: $('#amount_deposits').val(),
        duration: duration[($('#ex21').val() - 1)],
        percent: $('#input_deposits_prc').val()
    };
    hi_graf();
    ractiveComponent['wtc-DepositsApp'].set('deposit_amount', +(+param.amount).toFixed(2));
    ractiveComponent['wtc-DepositsApp'].set('deposit_total', +(+param.amount + (param.amount / 100 * param.percent * param.duration)).toFixed(2));
    ractiveComponent['wtc-DepositsApp'].set('deposit_profit', +(+param.amount / 100 * param.percent * param.duration).toFixed(2));
}

$('#select_deposits_amount').on('keydown', '#amount_deposits', function (e) {
    if (190 == e.keyCode || 188 == e.keyCode) {
        if (e.target.value.indexOf('.') != -1)
            e.preventDefault();

    }
    -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 188, 190]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
});
$('#select_deposits_prc').on('keydown', '#input_deposits_prc', function (e) {

    if (190 == e.keyCode || 188 == e.keyCode) {
        if (e.target.value.indexOf('.') != -1)
            e.preventDefault();

    }
    -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 188, 190]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
});
$('#select_deposits_prc').on('keyup', '#input_deposits_prc', function (e) {
    if (190 == e.keyCode || 188 == e.keyCode) {
        if (e.target.value.indexOf('.') == -1)
            $('#input_deposits_prc').val(e.target.value.replace(e.key, '.'));
        else {
            $('#input_deposits_prc').val(e.target.value.replace(e.key, '.'));

        }
    }
});
$('#select_deposits_amount').on('keyup', '#amount_deposits', function (e) {
    if (190 == e.keyCode || 188 == e.keyCode) {
        if (e.target.value.indexOf('.') == -1)
            $('#amount_deposits').val(e.target.value.replace(e.key, '.'));
        else {
            $('#amount_deposits').val(e.target.value.replace(e.key, '.'));

        }
    }
});
change_input_deposit();
// var series_modal    = JSON.parse('{"":{"":{"":{"STANDARD":[{"name":"profit","data":[10.3,10.3,10.3,0,7.5,0,0,0,0,0,250.47,250.47,250.47,0,0,0,0,0,0,0,0,0,0,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,135,134,0,0,0,0,0,0,0,52.5,52.5,52.5,52.5,52.5,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,0,112.5,112.5,112.5,112.5,112.5,112.5,112.5,112.5,112.5,112.5,112.5,112.5,112.5,112.5,112.5,112.5,112.5,112.5,112.5,0,0.61,0.61,0.61,0.61,0.61,0.61,0.61,0.61,0.61,0.61,0.61,0.61,0.61,0.61,0.61,0.61,0.61,0.61,0.61,0.61,0.61,0.61,0.61,0.61,0.61,0,37.5,37.5,37.5,37.5,37.5,37.5,37.5,37.5,37.5,37.5,37.5,37.5,0]},{"name":"remainder","data":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{"name":"profit"},{"name":"remainder"},{"name":"profit"},{"name":"remainder"},{"name":"profit"},{"name":"remainder"},{"name":"profit"},{"name":"remainder"},{"name":"profit"},{"name":"remainder"},{"name":"profit"},{"name":"remainder"},{"name":"profit"},{"name":"remainder"},{"name":"profit"},{"name":"remainder"},{"name":"profit"},{"name":"remainder"},{"name":"profit"},{"name":"remainder"},{"name":"profit"},{"name":"remainder"},{"name":"profit"},{"name":"remainder"},{"name":"profit"},{"name":"remainder"},{"name":"profit"},{"name":"remainder"},{"name":"profit"},{"name":"remainder"}]}}}}');
// var categories_modal    = JSON.parse('{"":{"":{"":{"STANDARD":{"name":["2017-06-11","2017-06-12","2017-06-13","2017-06-14","2017-06-11","2017-06-12","2017-06-13","2017-06-11","2017-06-12","2017-06-13","2017-06-11","2017-06-12","2017-06-13","2017-06-14","2017-06-11","2017-06-12","2017-06-13","2017-06-11","2017-06-12","2017-06-13","2017-06-11","2017-06-12","2017-06-13","2017-06-11","2017-06-12","2017-06-13","2017-06-14","2017-06-15","2017-06-16","2017-06-17","2017-06-18","2017-06-19","2017-06-20","2017-06-21","2017-06-22","2017-06-23","2017-06-24","2017-06-25","2017-06-26","2017-06-27","2017-06-28","2017-06-29","2017-06-30","2017-07-01","2017-07-02","2017-07-03","2017-06-11","2017-06-12","2017-06-13","2017-06-11","2017-06-12","2017-06-13","2017-06-11","2017-06-12","2017-06-13","2017-06-14","2017-06-15","2017-06-16","2017-06-11","2017-06-12","2017-06-13","2017-06-11","2017-06-12","2017-06-13","2017-06-14","2017-06-15","2017-06-16","2017-06-17","2017-06-18","2017-06-19","2017-06-20","2017-06-21","2017-06-22","2017-06-23","2017-06-24","2017-06-25","2017-06-26","2017-06-27","2017-06-28","2017-06-11","2017-06-12","2017-06-13","2017-06-14","2017-06-15","2017-06-16","2017-06-17","2017-06-18","2017-06-19","2017-06-20","2017-06-21","2017-06-22","2017-06-23","2017-06-24","2017-06-25","2017-06-26","2017-06-27","2017-06-28","2017-06-29","2017-06-30","2017-06-11","2017-06-12","2017-06-13","2017-06-14","2017-06-15","2017-06-16","2017-06-17","2017-06-18","2017-06-19","2017-06-20","2017-06-21","2017-06-22","2017-06-23","2017-06-24","2017-06-25","2017-06-26","2017-06-27","2017-06-28","2017-06-29","2017-06-30","2017-07-01","2017-07-02","2017-07-03","2017-07-04","2017-07-05","2017-07-06","2017-06-11","2017-06-12","2017-06-13","2017-06-14","2017-06-15","2017-06-16","2017-06-17","2017-06-18","2017-06-19","2017-06-20","2017-06-21","2017-06-22","2017-06-23"]}}}}}');
//
// var table_data    = JSON.parse('{"":{"":{"":{"STANDARD":{"percent":"STANDARD","percent_type":"","duration":"","deposits_count":null,"deposits_started":null,"deposits_finished":null,"deposits_withdrawn":null,"deposits_profit_done":null,"deposits_profit_today":null}}}}}');


function hi_graf(index, rendering) {
    if (rendering) render = rendering;
    console.log(rendering, render);
    if (render == 1) {
        $('#b8').css('display', 'block');
        var duration = ["3", "7", "14", "21", "30", "90", "180", "365"];

        var ps = $('#payment_system').val();
        var days = duration[($('#ex21').val() - 1)];
        var percent_type = $('#prc_type').val();
        var xAxis = '';

        function sort_series_before_print(series_for_graphic, xAxis) {
            if (!xAxis || !series_for_graphic)
                return false;


            var sorted_xaxis = xAxis.slice(0);

            sorted_xaxis.sort(function (a, b) {
                return a - b;
            });

            console.error('start sorting');
            console.log('--101', xAxis);
            console.log('--201', sorted_xaxis);
            console.log('--301', series_for_graphic);


            var series_copy = series_for_graphic;

            $.each(series_copy, function (index1, item1) {
                var itemp_t = item1['data'];
                series_copy[index1]['data'] = [];

                $.each(itemp_t, function (index2, item2) {


                    var percent_as_key = xAxis[index2];
                    series_copy[index1]['data'][percent_as_key] = item2;
                    console.log('--002', index1 + ' : ' + percent_as_key + ' = ' + item2);
                });
            });


            $.each(series_copy, function (index1, item1) {
                var itemp_t = item1['data'];
                series_copy[index1]['data'] = [];
                console.log('--005', itemp_t);
                var keys = [];
                var len, k, i;

                for (k in itemp_t) {
                    if (itemp_t.hasOwnProperty(k)) {
                        keys.push(k);
                    }
                }

                keys.sort(function (a, b) {
                    return a - b;
                });

                len = keys.length;

                for (i = 0; i < len; i++) {
                    k = keys[i];

                    console.log('--001', k + ':' + itemp_t[k]);
                    if (itemp_t[k] >= 1000)
                        series_copy[index1]['data'].push(itemp_t[k]);
                }
            });


            return series_copy;
        }

        if (!categories || !categories[ps] || !categories[ps][percent_type] || !categories[ps][percent_type][days] || !categories[ps][percent_type][days]['name']) {
            xAxis = '';

        }
        else {
            xAxis = categories[ps][percent_type][days]['name'];
        }


        var series_for_graphic = '';
        if (!series || !series[ps] || !series[ps][percent_type] || !series[ps][percent_type][days]) {
            series_for_graphic = '';
        }
        else {
            series_for_graphic = series[ps][percent_type][days];
            series_for_graphic = sort_series_before_print(series_for_graphic, xAxis);
        }

        if (xAxis)
            xAxis.sort(function (a, b) {
                return a - b;
            });
        var x_axis_temp = [];
        $.each(xAxis, function (index, value) {
            x_axis_temp[index] = Number(value).toFixed(2) + '%';
        });

        var title = 'Deposit offer statistics';
        var yAxis_title = 'Total in currency';
        Highcharts.chart('b8', {
            chart: {
                type: 'column'
            },
            title: {

                text: title
            },
            yAxis: {
                min: 0,
                title: {
                    text: yAxis_title
                }
            },
            xAxis: {
                categories: x_axis_temp
            },

            credits: {
                enabled: false
            },
            series: series_for_graphic
        });
    }
}

// hi_graf(null, 1);

ractiveComponent['wtc-DepositsApp'].on('openToggle', function (e, id) {
    $('body .deposits-wrapper .credit-main-area .toggle .body-' + id).toggle('');
});
