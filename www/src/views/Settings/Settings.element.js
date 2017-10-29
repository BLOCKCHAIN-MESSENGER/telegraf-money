var WtcSettings = Ractive.extend({
    oninit: function () {

        ractiveComponent['wtc-SettingsApp'].set('MyProfile', MyProfile);
        ractiveComponent['wtc-SettingsApp'].set('paramSocket', paramSocket);

        Messenger.body['settings'].callback = function () {
            ractiveComponent['wtc-SettingsApp'].set('tabPage', Messenger.body['settings'].tabPage);
            $('input[type!="checkbox"], select').styler();
            $(".__nano").nanoScroller();
            if( Messenger.body['settings'].tabPage == 'notification'){
                API('get_notif', {}, function (res) {
                    if (res.error)
                        return swal({
                            customClass: 'swal-telegraf-modal select-form text-center',
                            buttonsStyling: false,
                            confirmButtonClass: 'button-n',
                            cancelButtonClass: 'cansel-btns',
                            confirmButtonText: _chat_e('Ок'),
                            cancelButtonText: _chat_e('Отменить'),
                            showCancelButton: false,
                            type: 'info',
                            title: _chat_e('Вы не можете настроить уведомления'),
                            text: _chat_e('Ваше устройство не поддерживает Push уведомлении')
                        });
                    ractiveComponent['wtc-SettingsApp'].set('notif', res.push);
                }, true);
            }

        };

        Messenger.body['settings'].callback();

        if (MyProfile.secure.otp_status)
            ractiveComponent['wtc-SettingsApp'].set('otp_status', MyProfile.secure.otp_status);


        if (window.touchid)
            touchid.checkSupport(function () {
                ractiveComponent['wtc-SettingsApp'].set('fingerprint', true);
            }, function () {
                FingerprintAuth.isAvailable(function (result) {
                    if (result.isAvailable)
                        ractiveComponent['wtc-SettingsApp'].set('fingerprint', true);
                }, function () {
                });
            });

// var qrcode = new QRCode("qr-code");
        ractiveComponent['wtc-SettingsApp'].on('theme_set', function (e, index) {
            localStorage.setItem("font_theme", $('#font_selected').val());
            localStorage.setItem("theme", $('#theme_selected').val());
            swal({
                customClass: 'swal-telegraf-modal select-form text-center',
                buttonsStyling: false,
                confirmButtonClass: 'button-n',
                cancelButtonClass: 'cansel-btns',
                confirmButtonText: _chat_e('Ок'),
                cancelButtonText: _chat_e('Отменить'),
                showCancelButton: false,
                type: 'success',
                title: _chat_e('Успех!'),
                text: _chat_e('Настройки темы  сохранены...')
            });
            location.reload();
        });
        ractiveComponent['wtc-SettingsApp'].on('gauth', function (e, index) {

            // qrcode.makeCode('otpauth://totp/Telegraf%20Money:500150?secret=926BF7B036D4E83BDF7F48D0E2808E92&issuer=Telegraf%20Money&algorithm=SHA1&digits=4&period=90');

            secure(_chat_e('Настройка приложения для генерации кодов'), function (res) {
                // res {code: $('#code_user_secure').val(), type: 'loan_api_check', success: true}
                API('secure_2fa', {
                    code: res.code,
                    purpose: res.type,
                    action: 'get',
                    type: 'otpauth'
                }, false, function (res) {
                    if (res && res.success) {
                        ractiveComponent['wtc-SettingsApp'].set('qrcode_secret', res.secret);

                        ractiveComponent['wtc-SettingsApp'].set('otp_status', res.otp_status);

                        swal({
                            // title: 'Подтверждение',
                            // type: 'question',
                            customClass: 'swal-telegraf-modal select-form text-center',
                            buttonsStyling: false,
                            confirmButtonClass: 'button-n',
                            cancelButtonClass: 'cansel-btns',
                            confirmButtonText: _chat_e('Подтвердить'),
                            cancelButtonText: _chat_e('Отменить'),
                            showCancelButton: true,
                            text: $('.secure_gauth').html().replace(/_maskInput/g, '')
                        }).then(function (result) {
                            if ($('#token_secure_2fa')) {
                                API('secure_2fa', {
                                    token: $('#token_secure_2fa').val(),
                                    action: 'set',
                                    type: 'otpauth'
                                }, false, function (res) {
                                    if (res && res.success) {
                                        swal({
                                            customClass: 'swal-telegraf-modal select-form text-center',
                                            buttonsStyling: false,
                                            confirmButtonClass: 'button-n',
                                            cancelButtonClass: 'cansel-btns',
                                            confirmButtonText: _chat_e('Ок'),
                                            cancelButtonText: _chat_e('Отменить'),
                                            showCancelButton: false,
                                            type: 'success',
                                            title: _chat_e('Успех!'),
                                            text: _chat_e('Вы успешно настроили приложение Authenticator для подтверждение транзакций!')
                                        });
                                        MyProfile.secure = {};
                                        MyProfile.secure.otp_status = true;
                                        if (MyProfile.secure)
                                            ractiveComponent['wtc-SettingsApp'].set('otp_status', MyProfile.secure.otp_status);
                                    } else {
                                        alert(_chat_e('Ошибка вы ввели неверно код из приложения попробуйте снова'));
                                    }
                                }, true);
                            }
                        }, function () {
                            // e_cb && e_cb();
                        });
                        setTimeout(function () {
                            new QRCode(document.getElementById("qr-code"), {
                                text: res.otp_url,
                                width: 200,
                                height: 200,
                                colorDark: "#000000",
                                colorLight: "#fff",
                                correctLevel: QRCode.CorrectLevel.L
                            });
                        }, 10);
                    }
                    else {
                        swal({
                            customClass: 'swal-telegraf-modal select-form text-center',
                            buttonsStyling: false,
                            confirmButtonClass: 'button-n',
                            cancelButtonClass: 'cansel-btns',
                            confirmButtonText: _chat_e('Ок'),
                            cancelButtonText: _chat_e('Отменить'),
                            showCancelButton: false,
                            type: 'error',
                            title: _chat_e('Ошибка безопасности'),
                            text: _chat_e('Вы не прошли проверку безопасности.Повторите попытку!')
                        })
                    }

                }, true);

            }, function () {
                swal({
                    customClass: 'swal-telegraf-modal select-form text-center',
                    buttonsStyling: false,
                    confirmButtonClass: 'button-n',
                    cancelButtonClass: 'cansel-btns',
                    confirmButtonText: _chat_e('Ок'),
                    cancelButtonText: _chat_e('Отменить'),
                    showCancelButton: false,
                    type: 'error',
                    title: _chat_e('Ошибка безопасности'),
                    text: _chat_e('Вы не прошли проверку безопасности.Повторите попытку!')
                })
            });

        });

        ractiveComponent['wtc-SettingsApp'].on('touch_set', function (e, index) {
            secure(_chat_e('Включение подтверждение транзакций по отпечатку пальца'), function (res) {
                // res {code: $('#code_user_secure').val(), type: 'loan_api_check', success: true}
                noty({text: _chat_e('Подтверждение по отпечатку будет включенно по  истечению  48 часов  (в целях безопасности ваших средств)')})

            }, function () {
                swal({
                    customClass: 'swal-telegraf-modal select-form text-center',
                    buttonsStyling: false,
                    confirmButtonClass: 'button-n',
                    cancelButtonClass: 'cansel-btns',
                    confirmButtonText: _chat_e('Ок'),
                    cancelButtonText: _chat_e('Отменить'),
                    showCancelButton: false,
                    type: 'error',
                    title: _chat_e('Ошибка безопасности'),
                    text: _chat_e('Вы не прошли проверку безопасности.Повторите попытку!')
                })
            });

        });
        ractiveComponent['wtc-SettingsApp'].on('api_sett', function (e, index) {
            secure(_chat_e('Получение доступа  к настройке API'), function (res) {
                // res {code: $('#code_user_secure').val(), type: 'loan_api_check', success: true}
                noty({text: _chat_e('Вы можете использовать Public методы')})

            }, function () {
                swal({
                    customClass: 'swal-telegraf-modal select-form text-center',
                    buttonsStyling: false,
                    confirmButtonClass: 'button-n',
                    cancelButtonClass: 'cansel-btns',
                    confirmButtonText: _chat_e('Ок'),
                    cancelButtonText: _chat_e('Отменить'),
                    showCancelButton: false,
                    type: 'error',
                    title: _chat_e('Ошибка безопасности'),
                    text: _chat_e('Вы не прошли проверку безопасности.Повторите попытку!')
                })
            });

        });
    },
    onrender: function () {
        console.log('WebtransferChatSettings.onrender !');

    },
    oncomplete: function () {
        console.log('WebtransferChatSettings.oncomplete !');
    }
});
ractiveComponent['wtc-SettingsApp'].on('save_push', function (e, index) {
    var form = $('#push_sett input[type="checkbox"]').map(function () {
        return {name: this.name, value: this.checked ? true : false};
    }).get();

    var data = JSON.stringify(form);
    API('notif_setting', {form: JSON.parse(data)}, function (res) {
        console.log(res);
        if (res.success) {
            swal({
                customClass: 'swal-telegraf-modal select-form text-center',
                buttonsStyling: false,
                confirmButtonClass: 'button-n',
                cancelButtonClass: 'cansel-btns',
                confirmButtonText: _chat_e('Ок'),
                cancelButtonText: _chat_e('Отменить'),
                showCancelButton: false,
                type: 'success',
                title: _chat_e('Успех!'),
                text: _chat_e('Настройки уведомлений сохраненны')
            });
            ractiveComponent['wtc-SettingsApp'].set('notif', res.push);
        } else {
            swal({
                customClass: 'swal-telegraf-modal select-form text-center',
                buttonsStyling: false,
                confirmButtonClass: 'button-n',
                cancelButtonClass: 'cansel-btns',
                confirmButtonText: _chat_e('Ок'),
                cancelButtonText: _chat_e('Отменить'),
                showCancelButton: false,
                type: 'error',
                title: _chat_e('Ошибка!'),
                text: _chat_e('Повторите попытку позже')
            });
        }
    }, true);

});
