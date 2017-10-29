var WtcGuarantee = Ractive.extend({
    data: function () {
        return {
            form: {user_id: ''}
        }
    },
    oninit: function () {
        console.log('WebtransferChatGuarantee.oninit !');
        var init_card = false;

        Messenger.guarantee.callback_save(function (orders) {
            ractiveComponent['wtc-GuaranteeApp'].set('orders', orders);
        });
        Messenger.finance.callback_save(function (cards, microinvest) {
            ractiveComponent['wtc-GuaranteeApp'].set('finance_cards', cards);
            ractiveComponent['wtc-GuaranteeApp'].set('microinvest', microinvest);
            ractiveComponent['wtc-GuaranteeApp'].set('finance_cards_load', true);
            // var html = '';
            // cards.forEach(function (el) {
            //     html = '<option class="lts" value="' + el.card_id + '">' + el.card_name.replace(/(^|\s)Webtransfer(\s|$)/g, '') + '$ ' + el.last_balance + '</option>' + html;
            // });
            if (!init_card) {
                init_card = true;
                // if (cards[cards.length - 1])
                // change_card(cards[cards.length - 1].card_id);

            }
            // if (html == '')
            //     html = '<option class="" disabled selected>У вас нет активных карт</option>';
            // $('#cards_my')[0].innerHTML = html;

            Messenger.body['guarantee'].callback = function () {
                ractiveComponent['wtc-GuaranteeApp'].set('tabPage', Messenger.body['guarantee'].tabPage);
                $('#cards_my').styler().trigger('refresh');
                $(".__nano").nanoScroller();
            };
            Messenger.body['guarantee'].callback();
        });
        $('input, select').styler({
            selectSearch: true
         });


    },
    onrender: function () {
        console.log('WebtransferChatGuarantee.onrender !');

    },
    oncomplete: function () {
        console.log('WebtransferChatGuarantee.oncomplete !');
    }
});
var timeoutUpdate_threads = false;
var arr_ammount_gr = [];
for (var i = 5; i < 100; i = i + 5)arr_ammount_gr.push({name: i + ' USD', value: i});
ractiveComponent['wtc-GuaranteeApp'].set('ammount_list', arr_ammount_gr);
var arr_time_gr = [];
for (var t = 1; t < 31; t++)arr_time_gr.push({name: t, value: t});
ractiveComponent['wtc-GuaranteeApp'].set('time_list', arr_time_gr);
var arr_pr_gr = [];
for (var p = 0; p < 0.51; p = p + 0.1)arr_pr_gr.push({name: p.toFixed(1) + " %", value: p});
ractiveComponent['wtc-GuaranteeApp'].set('rate_list', arr_pr_gr);
ractiveComponent['wtc-GuaranteeApp'].on('create_guarant', function (e) {
    var form = $('#guarantee_form').serializeObject();
    console.log(form);
    secure(_chat_e('Выдать гарантию'), function (secure_res) {


        API('create_guarant', {
            percent: form.percent,
            source: form.source,
            summ: form.summ,
            time: form.time,
            code: secure_res.code,
            purpose: secure_res.type,
            to_user_id: form.user_id
        }, function (result) {
            if (result.error) {
                swal({
                    customClass: 'swal-telegraf-modal select-form text-center',
                    buttonsStyling: false,
                    confirmButtonClass: 'button-n',
                    cancelButtonClass: 'cansel-btns',
                    title: _chat_e('Ошибка создания гарантии'),
                    type: 'error',
                    confirmButtonText: _chat_e('Ок'),
                    showCancelButton: false,
                    text: _chat_e(result.error)
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
                    html: _chat_e('Вы успешно выдали гарантию.') + '<br>' + _chat_e('Cумма:') + ' ' + form.summ + ', ' + _chat_e('Срок(дней):') + form.time + ', ' + _chat_e('Процент(%):') + form.percent + '<br>' + _chat_e('Сумма возврата:') + '<strong>' + (+(+(form.summ * (form.percent / 100) * form.time) + (+form.summ))).toFixed(2) + '</strong>'
                });


            }
            setTimeout(Messenger.finance.update,1000);
        }, true)
    }, function () {
        return noty({
            text: _chat_e('Ошибка безопасности')+' <br>' + _chat_e('Вы не прошли проверку двух-факторной авторизации! (err_type_secure)'),
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

});
ractiveComponent['wtc-GuaranteeApp'].on('openGuarantee', function (e, id) {
    $('body .guarantee-wrapper .credit-main-area .toggle .body-' + id).toggle('');
});
ractiveComponent['wtc-GuaranteeApp'].on('accept', function (e, id) {
    secure(_chat_e('Принять гарантию #')+id, function (secure_res) {
        Messenger.guarantee.update();
    });
});
ractiveComponent['wtc-GuaranteeApp'].on('cancel', function (e, id) {
    swal({
        title: _chat_e('Подтверждение'),
        type: 'question',
        customClass: 'swal-telegraf-modal select-form text-center',
        buttonsStyling: false,
        confirmButtonClass: 'button-n',
        cancelButtonClass: 'cansel-btns',
        confirmButtonText: _chat_e('Подтвердить'),
        cancelButtonText: _chat_e('Отменить'),
        showCancelButton: true,
        text: _chat_e('Вы действительно хотите отклонить гарантию #')+id
    }).then(function () {
        API('cancel_guarant', {id: id}, false, function (res) {
            Messenger.guarantee.update();
            if(res.status =='success'){
                return noty({
                    text: _chat_e('Гарантия успешно удаленна'),
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
            }else{
                return noty({
                    text: _chat_e('Ошибка:')+' <br>' + res.error,
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

        })
    });
});