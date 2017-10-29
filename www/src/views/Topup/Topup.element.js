var WtcTopup = Ractive.extend({
    data: function () {
        return {}
    },
    oninit: function () {
        console.log('Topup.oninit !');
        ractiveComponent['wtc-TopupApp'].set('MyProfile', MyProfile);
        Messenger.finance.callback_save(function (cards) {
            if (!cards || cards.length == 0) cards = false;

            ractiveComponent['wtc-TopupApp'].set('finance_cards', cards);
            ractiveComponent['wtc-TopupApp'].set('finance_cards_load', true);

        });
        ractiveComponent['wtc-TopupApp'].set('bonus', 0);
        ractiveComponent['wtc-TopupApp'].set('total', 0);

        // if (26854266 != MyProfile.webtransfer_id) {
        //     window.open('https://banc.exchange/en/payment/exchange', '_system');
        // }

        if(_chat_e('lang') == 'ru'){
            ractiveComponent['wtc-TopupApp'].set('pay_system', [
                {operation_tag: 'PER', title: 'PerfectMoney', img: 'perfect.png', size: '50'},
                {operation_tag: 'PAY', title: 'Payeer', img: 'payeer.png', style_img: 'margin-top:25px;', size: '50'},
                {operation_tag: 'OKP', title: 'Okpay', img: 'okpay.png', size: '50'},
                {operation_tag: 'QIW', title: 'Qiwi', img: 'bl-5.png'},
                {operation_tag: 'QIW_sberbank', title: 'sberbank', img: 'sberbank_block.png'},
                {operation_tag: 'QIW_Alfabank', title: 'Alfabank', img: 'Alfabank_block.png'},
                {operation_tag: 'QIW_Tinkoff', title: 'Tinkoff', img: 'Tinkoff_block.png'},
                {operation_tag: 'QIW_vtb24', title: 'vtb24', img: 'vtb_block.png'},
                {operation_tag: 'QIW_promsviazBank', title: 'promsviazBank', img: 'PromsviazBank_block.png'},
                {operation_tag: 'QIW_unicredit', title: 'unicredit', img: 'unicredit_block.png'},
                {operation_tag: 'QIW_gazprombank_block', title: 'gazprombank', img: 'gazprombank_block.png'},
                {operation_tag: 'QIW_avangard', title: 'avangard', img: 'avangard_block.png'},
                {operation_tag: 'PSC', title: 'PaySafeCard', img: 'paysafecard.png'},
                {operation_tag: 'MRC', title: 'Mistercash', img: 'bl-1.png'},
                {operation_tag: 'MLB', title: 'Multibanco', img: 'bl-7.png'},
                {operation_tag: 'IDL', title: 'iDEAL', img: 'bl-3.png'},
                {operation_tag: 'ABQ', title: 'Abaqoos', img: 'bl2-2.png'},
                {operation_tag: 'EUT', title: 'euTeller', img: 'bl2-3.png'},
                {operation_tag: 'BLK', title: 'Banklink', img: 'bl2-4.png'},
                {operation_tag: 'EKO', title: 'eKonto', img: 'bl2-5.png'},
                {operation_tag: 'EPS', title: 'EPS', img: 'bl2-6.png'},
                {operation_tag: 'EPA', title: 'ePay', img: 'bl2-7.png', style_img: 'margin-top:4px;'},
                {operation_tag: 'P24', title: 'Przelewy24', img: 'p24.png'},
                {operation_tag: 'SPO', title: 'Sporopay', img: 'bl2-9.png'},
            ]);
        }else
        ractiveComponent['wtc-TopupApp'].set('pay_system', [
            {operation_tag: 'PER', title: 'PerfectMoney', img: 'perfect.png', size: '50'},
            {operation_tag: 'PAY', title: 'Payeer', img: 'payeer.png', style_img: 'margin-top:25px;', size: '50'},
            {operation_tag: 'OKP', title: 'Okpay', img: 'okpay.png', size: '50'},
            {operation_tag: 'QIW', title: 'Qiwi', img: 'bl-5.png'},
            {operation_tag: 'PSC', title: 'PaySafeCard', img: 'paysafecard.png'},
            {operation_tag: 'MRC', title: 'Mistercash', img: 'bl-1.png'},
            {operation_tag: 'MLB', title: 'Multibanco', img: 'bl-7.png'},
            {operation_tag: 'IDL', title: 'iDEAL', img: 'bl-3.png'},
            {operation_tag: 'ABQ', title: 'Abaqoos', img: 'bl2-2.png'},
            {operation_tag: 'EUT', title: 'euTeller', img: 'bl2-3.png'},
            {operation_tag: 'BLK', title: 'Banklink', img: 'bl2-4.png'},
            {operation_tag: 'EKO', title: 'eKonto', img: 'bl2-5.png'},
            {operation_tag: 'EPS', title: 'EPS', img: 'bl2-6.png'},
            {operation_tag: 'EPA', title: 'ePay', img: 'bl2-7.png', style_img: 'margin-top:4px;'},
            {operation_tag: 'P24', title: 'Przelewy24', img: 'p24.png'},
            {operation_tag: 'SPO', title: 'Sporopay', img: 'bl2-9.png'},
            {operation_tag: 'QIW_sberbank', title: 'sberbank', img: 'sberbank_block.png'},
            {operation_tag: 'QIW_Alfabank', title: 'Alfabank', img: 'Alfabank_block.png'},
            {operation_tag: 'QIW_Tinkoff', title: 'Tinkoff', img: 'Tinkoff_block.png'},
            {operation_tag: 'QIW_vtb24', title: 'vtb24', img: 'vtb_block.png'},
            {operation_tag: 'QIW_promsviazBank', title: 'promsviazBank', img: 'PromsviazBank_block.png'},
            {operation_tag: 'QIW_unicredit', title: 'unicredit', img: 'unicredit_block.png'},
            {operation_tag: 'QIW_gazprombank_block', title: 'gazprombank', img: 'gazprombank_block.png'},
            {operation_tag: 'QIW_avangard', title: 'avangard', img: 'avangard_block.png'},
        ]);
    },
    onrender: function () {
        console.log('Topup.onrender !');

    },
    oncomplete: function () {
        console.log('Topup.oncomplete !');
    }
});
ractiveComponent['wtc-TopupApp'].on('back', function (i, pay) {
    ractiveComponent['wtc-TopupApp'].set('exchanges_page', false);

});
function calculate(a1, a2) {
    var value1 = $('#topup_val_1').val();
    var value2 = $('#topup_val_2').val();
    var exchange = ractiveComponent['wtc-TopupApp'].get('exchange_select');
    if (a1) {
        value2 = (value1 / exchange.rate).toFixed(2);
        $('#topup_val_2').val((value1 / exchange.rate).toFixed(2));
    }
    if (a2) {
        // value2/exchange.rate
        value1 = (value2 * exchange.rate).toFixed(2);
        $('#topup_val_1').val((value2 * exchange.rate).toFixed(2));


    }
    var bonus = 0;
    if (value2 < 300) {
        bonus = value2 * 0.30;
    }
    else if (value2 < 500) {
        bonus = value2 * 0.40;

    }
    else if (value2 >= 500) {
        bonus = value2 * 0.50;

    }
    ractiveComponent['wtc-TopupApp'].set('bonus', +bonus.toFixed(2));
    ractiveComponent['wtc-TopupApp'].set('total', +((+value2) + (+bonus)).toFixed(2));
}
ractiveComponent['wtc-TopupApp'].on('order_pay', function (i, pay) {
    var value1 = $('#topup_val_1').val();
    var exchange = ractiveComponent['wtc-TopupApp'].get('exchange_select');
    var pay_select = ractiveComponent['wtc-TopupApp'].get('pay_select');
    var card_id_cloud = ractiveComponent['wtc-TopupApp'].get('select_card');

    if (isNaN(+value1) || +value1 < 1) {
        return noty({
            text: _chat_e('Сумма не может быть меньше') + ' <strong>1 USD</strong>',
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


    swal({
        customClass: 'swal-telegraf-modal select-form text-center',
        title: _chat_e('Загрузка...'),
        closeOnConfirm: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: true,
        showCancelButton: false,
        showLoaderOnConfirm: true,
        text: _chat_e('Создание заявки!'),
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
    console.log({
        exchange_id: exchange.exchanger_id,
        from: pay_select.operation_tag,
        amount: value1,
        cloud_card_id: card_id_cloud,
        currency_card: 'USD'
    });
    API('topup_card', {
        exchange_id: exchange.exchanger_id,
        from: pay_select.operation_tag,
        amount: value1,
        cloud_card_id: card_id_cloud,
        currency_card: 'USD'
    }, false, function (result) {
        if (result.error) {
            swal.close();
            return noty({
                text: _chat_e('Ошибка: ') + (result.error),
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

        if (result.data.data.length == [] || result.data.data.length) {
            ractiveComponent['wtc-TopupApp'].set('form', result.data);
        }
        else {
            ractiveComponent['wtc-TopupApp'].set('form', {link:'https://telegraf.money/redirect?link='+result.data.link+'&post='+encodeURIComponent(JSON.stringify(result.data.data))});
        }
        setTimeout(function () {
            console.log($('#pay_start')[0]);
            $('#pay_start')[0].click();

        },300);

        console.log(result.data);
        setTimeout(function () {
            ractiveComponent['wtc-TopupApp'].set('exchanges_page', false);
            ractiveComponent['wtc-TopupApp'].set('topup_select', false);
            swal.close();

        }, 1000);
    }, true);

});
ractiveComponent['wtc-TopupApp'].on('selectPay', function (i, pay) {

    swal({
        customClass: 'swal-telegraf-modal select-form text-center',
        title: _chat_e('Загрузка...'),
        closeOnConfirm: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: true,
        showCancelButton: false,
        showLoaderOnConfirm: true,
        text: _chat_e('Загрузка Списка обменников с системы:') + ' ' + pay.title,
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
    API('merchant_exchange_rate', {from: pay.operation_tag}, false, function (result) {
        ractiveComponent['wtc-TopupApp'].set('exchanges_page', true);
        ractiveComponent['wtc-TopupApp'].set('topup_select', false);

        ractiveComponent['wtc-TopupApp'].set('exchanges', result.data);
        ractiveComponent['wtc-TopupApp'].set('pay_select', pay);
        setTimeout(function () {
            swal.close();
        }, 100);
    }, true);

});
ractiveComponent['wtc-TopupApp'].on('selectExchange', function (i, pay) {
    ractiveComponent['wtc-TopupApp'].set('topup_select', true);
    ractiveComponent['wtc-TopupApp'].set('exchange_select', pay);
    calculate(null,true)

});
ractiveComponent['wtc-TopupApp'].on('back_topup', function (i, pay) {
    ractiveComponent['wtc-TopupApp'].set('topup_select', false);
    ractiveComponent['wtc-TopupApp'].set('exchange_select', null);

});