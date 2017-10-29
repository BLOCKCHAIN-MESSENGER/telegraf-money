/**
 * Created by bogdanmedvedev on 01.05.17.
 */

var WtcOrder = Ractive.extend({
    data: function () {
        return {

        }
    },
    oninit: function () {
        console.log('Order.oninit !');
        ractiveComponent['wtc-OrderApp'].set('MyProfile', MyProfile);
        ractiveComponent['wtc-OrderApp'].set('dd', ['01','02','03','04','05','06','07','08','09',10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]);
        ractiveComponent['wtc-OrderApp'].set('mm', ['01','02','03','04','05','06','07','08','09',10,11,12]);
        ractiveComponent['wtc-OrderApp'].set('yyyy', [1917,1918,1919,1920,1921,1922,1923,1924,1925,1926,1927,1928,1929,1930,1931,1932,1933,1934,1935,1936,1937,1938,1939,1940,1941,1942,1943,1944,1945,1946,1947,1948,1949,1950,1951,1952,1953,1954,1955,1956,1957,1958,1959,1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001]);

        $('.phone-inp').val(MyProfile.phone);
        $('#sex_filed').val(MyProfile.sex);
        $('#place_filed').val(MyProfile.place);
        var tmp_born= MyProfile.born.split('-');
        $('#born0').val(tmp_born[0]);
        $('#born1').val(tmp_born[1]);
        $('#born2').val(tmp_born[2]);

        $('input, select[data-styler!="off"]').styler({
            // selectSearch: true
        });

        Messenger.finance.callback_save(function (cards) {
            ractiveComponent['wtc-OrderApp'].set('finance_cards', cards);
            ractiveComponent['wtc-OrderApp'].set('finance_cards_load', true);
        });

        Messenger.auth_action.call_wait_auth(function () {
            Messenger.threads.callback_save('OrderApp', function (threads) {
                ractiveComponent['wtc-OrderApp'].set('threads', threads);
                ractiveComponent['wtc-OrderApp'].set('threads_finish', Messenger.threads.finish);
                $(".__nano").nanoScroller();
            });
        });
        Messenger.body['order_card'].callback = function () {
            ractiveComponent['wtc-OrderApp'].set('tabPage', Messenger.body['order_card'].tabPage);

        };
        Messenger.body['order_card'].callback();
        $(".__nano").nanoScroller();
    },
    onrender: function () {
        console.log('Order.onrender !');

    },
    oncomplete: function () {
        console.log('Order.oncomplete !');
    }
});

ractiveComponent['wtc-OrderApp'].on('order',function () {
    // _chat_e('Пожалуйста, заполните все поля для заказа карты')
    var orderCard = $('#order__card_form').serializeObject();
    orderCard.born = orderCard.born_2+'-'+orderCard.born_1+'-'+orderCard.born_0;
    console.log('order__card_form',orderCard);
    if (!orderCard || !orderCard.first_name || !orderCard.holder_name  || !orderCard.place || !orderCard.adr_index || !orderCard.last_name || !orderCard.adr_town || !orderCard.adr_street || !orderCard.born ||
        orderCard.first_name == '' ||
        orderCard.holder_name == '' ||
        orderCard.place == '' ||
        orderCard.adr_index == '' ||
        orderCard.last_name == '' ||
        orderCard.adr_town == '' ||
        orderCard.adr_street == '' ||
        orderCard.card_system == '' ||
        orderCard.born_2 == ''||
        orderCard.born_1 == ''||
        orderCard.born_0 == ''
    )
        return swal({
            customClass: 'swal-telegraf-modal select-form text-center',
            buttonsStyling: false,
            confirmButtonClass: 'button-n',
            cancelButtonClass: 'cansel-btns',
            title: _chat_e('Заполните данные'),
            confirmButtonText: 'Ok',
            showCancelButton: false,
            text: _chat_e('Пожалуйста, заполните все поля для заказа карты')
        }).then(function () {
            swal.close();
        });
    swal({
        customClass: 'swal-telegraf-modal select-form text-center',
        title: _chat_e('Заказ карты...'),
        closeOnConfirm: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: true,
        showCancelButton: false,
        showLoaderOnConfirm: true,
        text: _chat_e('Обработка данных может занять несколько минут'),
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
    API('orderCard', orderCard, function (result) {
        console.warn('orderCard', result);

        if (result.error) {
            if(result.error =='You need to confirm your identity for completing this transaction')
                return swal({
                    customClass: 'swal-telegraf-modal select-form text-center',
                    buttonsStyling: false,
                    confirmButtonClass: 'button-n',
                    cancelButtonClass: 'cansel-btns',
                    title: _chat_e('Вам необходимо верифицировать ваш номер телефона'),
                    type: 'error',
                    confirmButtonText: _chat_e('Ок'),
                    showCancelButton: false,
                    // text: result.error
                });
            swal({
                customClass: 'swal-telegraf-modal select-form text-center',
                buttonsStyling: false,
                confirmButtonClass: 'button-n',
                cancelButtonClass: 'cansel-btns',
                title: _chat_e('Ошибка заказа карты'),
                type: 'error',
                confirmButtonText: _chat_e('Ок'),
                showCancelButton: false,
                text: result.error
            })
        } else {

            Messenger.finance.update();
            swal({
                customClass: 'swal-telegraf-modal select-form text-center',
                buttonsStyling: false,
                confirmButtonClass: 'button-n',
                cancelButtonClass: 'cansel-btns',
                title: _chat_e('Поздравляем!'),
                type: 'success',
                confirmButtonText: _chat_e('Ок'),
                showCancelButton: false,
                text: _chat_e('Вы успешно заказали карту!')
            });
            Messenger.setPage('cards');
        }
    }, true);
});


ractiveComponent['wtc-OrderApp'].on('set_phone', function () {
    var phone = $('.phone-inp').val();
    if (!phone || phone == '' || isNaN(+phone.replace('+', ''))) {
        swal({
            customClass: 'swal-telegraf-modal select-form',
            buttonsStyling: false,
            confirmButtonClass: 'button-n',
            type: 'error',
            title: _chat_e('Ошибка'),
            html: _chat_e('Не верный формат заполнения номера телефона'),
            confirmButtonColor: '#3085d6',
            showCancelButton: false,
            confirmButtonText: _chat_e('Ок')
        });
        return false;
    }
    swal({
        customClass: 'swal-telegraf-modal select-form text-center',
        title: _chat_e('Верификация...'),
        closeOnConfirm: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: true,
        showCancelButton: false,
        showLoaderOnConfirm: true,
        text: _chat_e('Загрузка страницы верификации номера телефона'),
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

    API('edit_phone',{phone:phone},function (result) {
        if(!result || result.status != 'success' || result.error){
            swal({
                customClass: 'swal-telegraf-modal select-form',
                buttonsStyling: false,
                confirmButtonClass: 'button-n',
                type: 'error',
                title: _chat_e('Ошибка'),
                html: _chat_e('Вы данный  номер не возможно верефецировать'),
                confirmButtonColor: '#3085d6',
                showCancelButton: false,
                confirmButtonText: _chat_e('Ок')
            });
            return false;
        }
        __link(result.link,function () {
            swal.close();
        });
        setTimeout(swal.close, 10000)
    },true)
});