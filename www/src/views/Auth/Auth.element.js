var WtcAuth = Ractive.extend({
    oninit: function () {
        console.log('Auth.oninit !');
        if (param_url_this().login === 'social')
            ractiveComponent["wtc-AuthApp"].set('old_login', 1);

        procent = 0.30;
    },
    onrender: function () {
        console.log('Auth.onrender !');

    },
    oncomplete: function () {
        console.log('Auth.oncomplete !');
    }

});
var web3 = new Web3();

function rand() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 15; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
function recover_wallet(e) {
    swal({
        customClass: 'swal-telegraf-modal select-form text-center',
        title: 'Upload you file...',
        closeOnConfirm: false,
        allowOutsideClick: false,
        allowEscapeKey: true,
        showConfirmButton: true,
        showCancelButton: false,
        showLoaderOnConfirm: true,
        text: _chat_e('Может занять несколько секунд'),
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                // here should be AJAX request
                setTimeout(function () {
                    resolve();
                }, 15000);
            });
        },
    });
    swal.showLoading();
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
        var contents = e.target.result;
        try {
            var keyObject = JSON.parse(contents);
            swal({
                // title: 'Подтверждение',
                // type: 'question',
                customClass: 'swal-telegraf-modal select-form text-center',
                buttonsStyling: false,
                confirmButtonClass: 'button-n',
                cancelButtonClass: 'cansel-btns',
                confirmButtonText: _chat_e('Войти'),
                cancelButtonText: _chat_e('Отменить'),
                showCancelButton: true,
                text: '<div class="mv-area code-area-sec">' +
                // '<img class="img-main-section mx-wth-area" src="./src/img/user-s.png" onerror="this.src=\'../../.\'+this.src;this.onerror = null;">' +
                '<h2>' + _chat_e('Восстановление аккаунта:') + '</h2>' +
                '<form action="#" onsubmit="return false;" style="margin-top: 20px;">' +
                '<div class="select-form">' +
                '<label>' + _chat_e('Адрес:') + '</label>' +
                '<input class="form-control" style="font-size: 11px;font-weight: 300;" value="0x' + keyObject.address + '" id="phone_f_fff" disabled="disabled"></div>' +
                '<label>' + _chat_e('Пароль') + '</label>' +
                '<input class="form-control" placeholder="' + _chat_e('Пароль от KeyStore File:') + '" id="code_sms12" autocomplete="off" type="password"></div>' +
                '</form>' +
                // '<p class="spls-p">' + text + '</p>' +
                '<br>' +
                '</div>'
            }).then(function () {
                var pass_wallet = $('#code_sms12').val();
                swal({
                    customClass: 'swal-telegraf-modal select-form text-center',
                    title: 'Open you Account...',
                    closeOnConfirm: false,
                    allowOutsideClick: false,
                    allowEscapeKey: true,
                    showConfirmButton: true,
                    showCancelButton: false,
                    showLoaderOnConfirm: true,
                    text: _chat_e('Может занять несколько секунд'),
                    preConfirm: function () {
                        return new Promise(function (resolve, reject) {
                            // here should be AJAX request
                            setTimeout(function () {
                                resolve();
                            }, 15000);
                        });
                    },
                });
                swal.showLoading();
                var err_modal = setTimeout(function () {
                    return swal({
                        customClass: 'swal-telegraf-modal select-form text-center',
                        title: _chat_e('Уппс...'),
                        type: 'error',
                        confirmButtonText: _chat_e('Ок'),
                        showCancelButton: false,
                        text: _chat_e('Неверный файл или пароль!')
                    });
                }, 3000);
                console.log(keythereum.recover(pass_wallet, keyObject, function (privateKey) {
                    clearTimeout(err_modal);

                    console.log('privateKey', privateKey.toString('hex'));
                    localStorage.setItem('walletPrivateKey', privateKey.toString('hex'));
                    localStorage.setItem('uuid', web3.sha3(privateKey.toString('hex')));
                    localStorage.setItem('installTime', 'crypto.wallet.eth.auth');
                    var address_my = keythereum.privateKeyToAddress(privateKey.toString('hex'));
                    localStorage.setItem('auth', 'ok');
                    localStorage.setItem('user_id', 'not');


                    $.ajax({
                        url: "https://telegraf.money/api/v1/",
                        type: "get", //send it through get method
                        data: {
                            method: 'public_auth_cryptowallet',
                            surname: address_my,
                            invite: getCookie('invite'),
                            uuid: localStorage.getItem("uuid"),
                            installTime: localStorage.getItem("installTime")
                        },
                        success: function (response) {

                            try {
                                response = JSON.parse(response);
                                if (response && response.resultAuth && response.resultAuth.user_id) {
                                    localStorage.setItem('user_id', response.resultAuth.user_id);
                                }
                                location.reload();
                            } catch (e) {
                                console.error('error auth req00113', e);
                                location.reload();

                            }

                        },
                        error: function () {
                            location.reload();
                        }
                    });
                }));
            }, function () {
                swal.close();
            });
        } catch (e) {
            return swal({
                customClass: 'swal-telegraf-modal select-form text-center',
                title: _chat_e('Уппс...'),
                type: 'error',
                confirmButtonText: _chat_e('Ок'),
                showCancelButton: false,
                text: _chat_e('Файл не является KeyStore File - выберите другой файл.')
            });
        }

    };
    reader.readAsText(file);


}
document.getElementById('file-input-keystore')
    .addEventListener('change', recover_wallet, false);
function create_new_acc() {


    var dk = keythereum.create({keyBytes: 32, ivBytes: 16});
    swal({
        // title: 'Подтверждение',
        // type: 'question',
        customClass: 'swal-telegraf-modal select-form text-center',
        buttonsStyling: false,
        confirmButtonClass: 'button-n',
        cancelButtonClass: 'cansel-btns',
        confirmButtonText: _chat_e('Дальше'),
        cancelButtonText: _chat_e('Отменить'),
        showCancelButton: true,
        text: '<div class="mv-area code-area-sec">' +
        // '<img class="img-main-section mx-wth-area" src="./src/img/user-s.png" onerror="this.src=\'../../.\'+this.src;this.onerror = null;">' +
        '<h3 style="font-size: 28px;">' + _chat_e('Создание аккаунта...') + '</h3>' +
        '<div class="alert alert-warning" style="width:300px;font-size: 14px;margin:0 auto;padding:6px 24px;margin-top:20px;text-align: left;margin-left: -10px;"><div style="width:10%;display:inline-block;    position: relative;top: -55px;"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 78.561 78.561" style="enable-background:new 0 0 78.561 78.561" xml:space="preserve"><g><g><circle cx="39.28" cy="57.772" r="3.632" style="fill:#8f6d3b"></circle><path d="M38.792,48.347c1.104,0,2-0.896,2-2v-19c0-1.104-0.896-2-2-2s-2,0.896-2,2v19C36.792,47.451,37.688,48.347,38.792,48.347z " style="fill:#8f6d3b"></path><path d="M46.57,11.542l-0.091-0.141c-1.852-2.854-3.766-5.806-7.199-5.806c-3.578,0-5.45,2.994-7.26,5.891 c-0.009,0.014-0.065,0.104-0.074,0.119L0.278,65.266C0.096,65.574,0,65.735,0,66.092c0,3.896,3.135,6.874,6.988,6.874h64.585 c3.854,0,6.988-2.979,6.988-6.874c0-0.357-0.096-0.614-0.277-0.921L46.57,11.542z M71.573,68.966H6.988 c-1.461,0-2.717-0.951-2.95-2.394l31.374-53.061c1.554-2.487,2.572-3.963,3.868-3.963c1.261,0,2.457,1.87,3.843,4.006 l31.399,53.007C74.29,68.003,73.034,68.966,71.573,68.966z" style="fill:#8f6d3b"></path></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></div><div style="width:88%;display:inline-block;margin-left:2%">' +
        '<strong style="font-weight:600!important">' + _e('Внимание') + '!</strong> ' +
        'This password encrypts your private key. This does not act as a seed to generate your keys. You will need this password + your private key to unlock your wallet.' +
        '</div></div>' +
        '<form action="#" onsubmit="return false;" style="margin-top: 20px;">' +
        '<div class="select-form">' +
        '<label>' + _chat_e('Адрес:') + '</label>' +
        '<input class="form-control" style="font-size: 11px;font-weight: 300;" value="' + keythereum.privateKeyToAddress(dk.privateKey) + '" id="phone_f_fff" disabled="disabled"></div>' +
        '<label>' + _chat_e('Пароль для KeyStore File:') + '</label>' +
        '<input class="form-control" placeholder="' + _chat_e('(Пароль: 8-15 символов)') + '" id="code_sms12" autocomplete="off" type="password"></div>' +
        '</form>' +
        // '<p class="spls-p">' + text + '</p>' +
        '<br>' +
        '</div>'
    }).then(function (result) {
        var pass_wallet = $('#code_sms12').val();
        swal({
            customClass: 'swal-telegraf-modal select-form text-center',
            title: 'Generate you Account...',
            closeOnConfirm: false,
            allowOutsideClick: false,
            allowEscapeKey: true,
            showConfirmButton: true,
            showCancelButton: false,
            showLoaderOnConfirm: true,
            text: _chat_e('Может занять несколько секунд'),
            preConfirm: function () {
                return new Promise(function (resolve, reject) {
                    // here should be AJAX request
                    setTimeout(function () {
                        resolve();
                    }, 15000);
                });
            },
        });
        swal.showLoading();
        var keyObject = keythereum.dump(pass_wallet, dk.privateKey, dk.salt, dk.iv, {
            kdf: "pbkdf2",
            cipher: "aes-128-ctr",
            kdfparams: {
                c: 1024,
                dklen: 32,
                prf: "hmac-sha256"
            }
        });

        var dataKeyStoreFile = keythereum.exportToFile(keyObject);
        var walletAddres = keythereum.privateKeyToAddress(dk.privateKey);
        var FileNameKeyStoreFile = keythereum.generateKeystoreFilename(keyObject.address);
        setTimeout(function () {


            swal({
                customClass: 'swal-telegraf-modal select-form text-center',
                buttonsStyling: false,
                confirmButtonClass: 'button-n',
                cancelButtonClass: 'cansel-btns',
                confirmButtonText: _chat_e('Скачать файл'),
                cancelButtonText: _chat_e('Отменить'),
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: true,
                showCancelButton: true,
                text: '<div class="mv-area code-area-sec">' +
                // '<img class="img-main-section mx-wth-area" src="./src/img/user-s.png" onerror="this.src=\'../../.\'+this.src;this.onerror = null;">' +
                '<div class="alert alert-warning" style="width:300px;font-size: 14px;margin:0 auto;padding:6px 24px;margin-top:20px;text-align: left;margin-left: -10px;"><div style="width:10%;display:inline-block;    position: relative;top: -55px;"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 78.561 78.561" style="enable-background:new 0 0 78.561 78.561" xml:space="preserve"><g><g><circle cx="39.28" cy="57.772" r="3.632" style="fill:#8f6d3b"></circle><path d="M38.792,48.347c1.104,0,2-0.896,2-2v-19c0-1.104-0.896-2-2-2s-2,0.896-2,2v19C36.792,47.451,37.688,48.347,38.792,48.347z " style="fill:#8f6d3b"></path><path d="M46.57,11.542l-0.091-0.141c-1.852-2.854-3.766-5.806-7.199-5.806c-3.578,0-5.45,2.994-7.26,5.891 c-0.009,0.014-0.065,0.104-0.074,0.119L0.278,65.266C0.096,65.574,0,65.735,0,66.092c0,3.896,3.135,6.874,6.988,6.874h64.585 c3.854,0,6.988-2.979,6.988-6.874c0-0.357-0.096-0.614-0.277-0.921L46.57,11.542z M71.573,68.966H6.988 c-1.461,0-2.717-0.951-2.95-2.394l31.374-53.061c1.554-2.487,2.572-3.963,3.868-3.963c1.261,0,2.457,1.87,3.843,4.006 l31.399,53.007C74.29,68.003,73.034,68.966,71.573,68.966z" style="fill:#8f6d3b"></path></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></div><div style="width:88%;display:inline-block;margin-left:2%">' +
                '' +
                '<strong style="font-weight:600!important">Do not lose it!</strong> It cannot be recovered if you lose it.' +
                '<br><strong style="font-weight:600!important">Do not share it!</strong> Your funds will be stolen if you use this file on a malicious/phishing site.' +
                '<br><strong style="font-weight:600!important">Make a backup!</strong> Secure it like the millions of dollars it may one day be worth.' +
                '</div></div>' +
                '<form action="#" onsubmit="return false;" style="margin-top: 20px;">' +
                '<div class="select-form">' +
                '<label>' + _chat_e('Адрес:') + '</label>' +
                '<input class="form-control" style="font-size: 12px;font-weight: 600;" value="' + walletAddres + '" id="phone_f_fff" disabled="disabled"></div>' +
                '<label>' + _chat_e('Пароль для KeyStore File:') + '</label>' +
                '<input class="form-control" value="' + pass_wallet + '" id="code_sms12" autocomplete="off" disabled="disabled"></div>' +
                '<label>' + ('PrivateKey:') + '</label>' +
                '<textarea class="form-control" value="" id="code_sms12" autocomplete="off" disabled="disabled">' + dk.privateKey.toString('hex') + '</textarea></div>' +
                '</form>' +
                // '<p class="spls-p">' + text + '</p>' +
                '<br>' +
                '</div>'
            }).then(function (result) {
                var pass_wallet = $('#code_sms12').val();

                swal({
                    customClass: 'swal-telegraf-modal select-form text-center',
                    title: 'Open you Account...',
                    closeOnConfirm: false,
                    allowOutsideClick: false,
                    allowEscapeKey: true,
                    showConfirmButton: true,
                    showCancelButton: false,
                    showLoaderOnConfirm: true,
                    text: _chat_e('Может занять несколько секунд'),
                    preConfirm: function () {
                        return new Promise(function (resolve, reject) {
                            // here should be AJAX request
                            setTimeout(function () {
                                resolve();
                            }, 15000);
                        });
                    },
                });
                swal.showLoading();

                var a = window.document.createElement('a');
                a.href = window.URL.createObjectURL(new Blob([dataKeyStoreFile], {type: 'text'}));
                a.download = FileNameKeyStoreFile;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);


                keythereum.recover(pass_wallet, keyObject, function (privateKey) {

                    console.log('privateKey', privateKey.toString('hex'));
                    localStorage.setItem('walletPrivateKey', privateKey.toString('hex'));
                    localStorage.setItem('uuid', web3.sha3(privateKey.toString('hex')));
                    localStorage.setItem('installTime', 'crypto.wallet.eth.auth');
                    var address_my = keythereum.privateKeyToAddress(privateKey.toString('hex'));
                    localStorage.setItem('auth', 'ok');
                    localStorage.setItem('user_id', 'not');

                    $.ajax({
                        url: "https://telegraf.money/api/v1/",
                        type: "get", //send it through get method
                        data: {
                            method: 'public_auth_cryptowallet',
                            surname: address_my,
                            invite: getCookie('invite'),
                            uuid: localStorage.getItem("uuid"),
                            installTime: localStorage.getItem("installTime")
                        },
                        success: function (response) {

                            try {
                                response = JSON.parse(response);
                                if (response && response.resultAuth && response.resultAuth.user_id) {
                                    localStorage.setItem('user_id', response.resultAuth.user_id);
                                }
                                location.reload();
                            } catch (e) {
                                console.error('error auth req00113', e);
                                location.reload();

                            }

                        },
                        error: function () {
                            location.reload();
                        }
                    });
                })
            });
            swal.showLoading();
        }, 2500)
    }, function () {
        swal.close();
    });


}

function login_phone(phone) {
    swal({
        customClass: 'swal-telegraf-modal select-form text-center',
        title: _chat_e('Авторизация...'),
        closeOnConfirm: false,
        allowOutsideClick: false,
        allowEscapeKey: true,
        showConfirmButton: true,
        showCancelButton: false,
        showLoaderOnConfirm: true,
        text: _chat_e('Может занять несколько секунд'),
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                // here should be AJAX request
                setTimeout(function () {
                    resolve();
                }, 15000);
            });
        },
    });
    swal.showLoading();
    if (!localStorage.getItem("installTime"))
        localStorage.setItem('installTime', new Date().getTime());
    var uuid = rand(); // if browser rand id
    var installTime = localStorage.getItem("installTime");
    var redir;
    var redir_count = 0;
    var parent = '';
    if (localStorage.getItem('ref')) {
        parent = "&parent=" + localStorage.getItem('ref');
    }
    if (!localStorage.getItem("uuid"))
        localStorage.setItem('uuid', uuid);
    else {
        uuid = localStorage.getItem("uuid");
    }
    $.ajax({
        url: "https://telegraf.money/api/v1/",
        type: "get", //send it through get method
        data: {method: 'public_check_phone',invite: getCookie('invite'), phone: phone},
        success: function (response) {
            response = JSON.parse(response);
            if (response.data.error) {
                swal({
                    customClass: 'swal-telegraf-modal select-form text-center',
                    title: _chat_e('Уппс...'),
                    type: 'error',
                    confirmButtonText: _chat_e('Ок'),
                    showCancelButton: false,
                    text: response.data.error
                });
            } else {
                if (response.data.data === 'USER_FOUND') {
                    auth_start(phone, '', '');

                }
                else if (response.data.data === 'USER_NOT_FOUND') {

                    auth_start(phone, $('#name_fff').val(), $('#surname_fff').val())

                    // swal({
                    //     // title: 'Подтверждение',
                    //     // type: 'question',
                    //     customClass: 'swal-telegraf-modal select-form text-center',
                    //     buttonsStyling: false,
                    //     confirmButtonClass: 'button-n',
                    //     cancelButtonClass: 'cansel-btns',
                    //     confirmButtonText: _chat_e('Продолжить'),
                    //     cancelButtonText: _chat_e('Отменить'),
                    //     showCancelButton: true,
                    //     text: '<div class="mv-area code-area-sec">' +
                    //     // '<img class="img-main-section mx-wth-area" src="./src/img/user-s.png" onerror="this.src=\'../../.\'+this.src;this.onerror = null;">' +
                    //     '<h2>' + _chat_e('Регистрация нового аккаунта:') + '</h2>' +
                    //     '<form action="#" onsubmit="return false;" style="height: 165px;    margin-top: 15px;">' +
                    //     '<div class="select-form">' +
                    //     '<label>' + _chat_e('Ваше Имя:') + '</label>' +
                    //     '<input class="form-control" placeholder="' + _chat_e('Обязательный') + '" id="name_fff" autocomplete="off"></div>' +
                    //     '<label>' + _chat_e('Ваша Фамилия:') + '</label>' +
                    //     '<input class="form-control" placeholder="' + _chat_e('Обязательный') + '" id="surname_fff" autocomplete="off"></div>' +
                    //     '</form>' +
                    //     // '<p class="spls-p">' + text + '</p>' +
                    //     '<br>' +
                    //     '</div>'
                    // }).then(function (result) {
                    //     // API('check_user_code', {code: $('#code_user_secure').val(), purpose: 'loan_api_check'});
                    //     // console.log && console.log({name: $('#name_fff').val(), surname: $('#surname_fff').val()})
                    //     auth_start(phone, $('#name_fff').val(), $('#surname_fff').val())
                    // }, function () {
                    //     swal.close();
                    // });
                }

                // $('#btn_auth').show(800);
                // $('#loader_auth').hide(800);
            }
        },
        error: function (xhr) {
            swal.close();
            // $('#btn_auth').show(800);
            // $('#loader_auth').hide(800);
            console.error('ERRor req', xhr)
        }
    });


}
function auth_start(phone, name, surname) {
    swal({
        customClass: 'swal-telegraf-modal select-form text-center',
        title: 'Sending SMS code...',
        closeOnConfirm: false,
        allowOutsideClick: false,
        allowEscapeKey: true,
        showConfirmButton: true,
        showCancelButton: false,
        showLoaderOnConfirm: true,
        text: _chat_e('Может занять несколько секунд'),
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                // here should be AJAX request
                setTimeout(function () {
                    resolve();
                }, 15000);
            });
        },
    });
    swal.showLoading();

    $.ajax({
        url: "https://telegraf.money/api/v1/",
        type: "get", //send it through get method
        data: {method: 'public_send_code', phone: phone},
        success: function (response) {
            response = JSON.parse(response);
            if (response.error) {
                return swal({
                    customClass: 'swal-telegraf-modal select-form text-center',
                    title: _chat_e('Уппс...'),
                    type: 'error',
                    confirmButtonText: _chat_e('Ок'),
                    showCancelButton: false,
                    text: response.error
                });
            }


            var authId = response.authId;

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
                text: '<div class="mv-area code-area-sec">' +
                // '<img class="img-main-section mx-wth-area" src="./src/img/user-s.png" onerror="this.src=\'../../.\'+this.src;this.onerror = null;">' +
                '<h2>' + _chat_e('Авторизация:') + '</h2>' +
                '<form action="#" onsubmit="return false;" style="margin-top: 20px;">' +
                '<div class="select-form">' +
                '<label>' + _chat_e('Номер телефона:') + '</label>' +
                '<input class="form-control" value="' + response.to + '" id="phone_f_fff" disabled="disabled"></div>' +
                '<label>' + _chat_e('Код из SMS:') + '</label>' +
                '<input class="form-control" placeholder="' + 12345 + '" id="code_sms12" autocomplete="off"></div>' +
                '</form>' +
                // '<p class="spls-p">' + text + '</p>' +
                '<br>' +
                '</div>'
            }).then(function (result) {
                var code__ = $('#code_sms12').val();
                swal({
                    customClass: 'swal-telegraf-modal select-form text-center',
                    title: _chat_e('Авторизация...'),
                    closeOnConfirm: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: true,
                    showCancelButton: false,
                    showLoaderOnConfirm: true,
                    text: _chat_e('Запуск приложения...'),
                    preConfirm: function () {
                        return new Promise(function (resolve, reject) {
                            // here should be AJAX request
                            setTimeout(function () {
                                resolve();
                            }, 15000);
                        });
                    },
                });
                swal.showLoading();

                console.log({
                    method: 'public_auth_phone',
                    authId: authId,
                    code_sms: code__,
                    phone: response.to,
                    name: name,
                    surname: surname
                });
                // API('check_user_code', {code: $('#code_user_secure').val(), purpose: 'loan_api_check'});
                $.ajax({
                    url: "https://telegraf.money/api/v1/",
                    type: "get", //send it through get method
                    data: {
                        method: 'public_auth_phone',
                        authId: authId,
                        code_sms: code__,
                        phone: response.to,
                        name: name,
                        invite: getCookie('invite'),
                        surname: surname,
                        uuid: localStorage.getItem("uuid"),
                        installTime: localStorage.getItem("installTime")
                    },
                    success: function (response) {
                        response = JSON.parse(response);
                        if (response.error) {
                            return swal({
                                customClass: 'swal-telegraf-modal select-form text-center',
                                title: _chat_e('Уппс...'),
                                type: 'error',
                                confirmButtonText: _chat_e('Ок'),
                                showCancelButton: false,
                                text: response.error
                            });
                        }
                        console.log(response);
                        localStorage.setItem('user_id', response.resultAuth.user_id);
                        localStorage.setItem('auth', 'ok');
                        location.reload();
                    }
                });

            }, function () {
                swal.close();
            });
        }
    });

}
function _link(url, blank) {
    swal({
        customClass: 'swal-telegraf-modal select-form text-center',
        title: _chat_e('Авторизация...'),
        closeOnConfirm: false,
        allowOutsideClick: false,
        allowEscapeKey: true,
        showConfirmButton: true,
        showCancelButton: false,
        showLoaderOnConfirm: true,
        text: _chat_e('Загрузка страницы авторизации'),
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                // here should be AJAX request
                setTimeout(function () {
                    resolve();
                }, 15000);
            });
        },
    });
    swal.showLoading();

    if (!localStorage.getItem("installTime"))
        localStorage.setItem('installTime', new Date().getTime());
    var uuid = rand(); // if browser rand id
    var installTime = localStorage.getItem("installTime");
    var redir;
    var redir_count = 0;
    var parent = '';
    if (localStorage.getItem('ref')) {
        parent = "&parent=" + localStorage.getItem('ref');
    }
    if (window.device && device.uuid && window.SafariViewController) {
        uuid = device.uuid;
        if (!localStorage.getItem("uuid"))
            localStorage.setItem('uuid', uuid);
        // $('#btn_auth').hide(300);
        // $('#loader_auth').show(500);
        SafariViewController.isAvailable(function (available) {
            if (available) {
                SafariViewController.show({
                        url: url + encodeURIComponent('https://telegraf.money/oauth/callback?uuid=' + uuid + '&installTime=' + installTime) + parent,
                        hidden: false, // default false. You can use this to load cookies etc in the background (see issue #1 for details).
                        animated: true, // default true, note that 'hide' will reuse this preference (the 'Done' button will always animate though)
                        transition: 'curl', // (this only works in iOS 9.1/9.2 and lower) unless animated is false you can choose from: curl, flip, fade, slide (default)
                        enterReaderModeIfAvailable: false, // default false
                        tintColor: "#0a4fa2", // default is ios blue
                        barColor: "#0a4fa2", // on iOS 10+ you can change the background color as well
                        controlTintColor: "#ffffff" // on iOS 10+ you can override the default tintColor
                    },
                    // this success handler will be invoked for the lifecycle events 'opened', 'loaded' and 'closed'
                    function (result) {
                        console.log(arguments);
                        console.log(SafariViewController);
                        if (result.event === 'opened') {
                            console.log('opened');
                        }
                        else if (result.event === 'loaded') {
                            console.log('loaded');
                            // if(result.url.match("mobile/close")) {
                            //     SafariViewController.hide();
                            // }


                        } else if (result.event === 'closed') {
                            swal({
                                customClass: 'swal-telegraf-modal select-form text-center',
                                title: _chat_e('Авторизация...'),
                                closeOnConfirm: false,
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                showConfirmButton: true,
                                showCancelButton: false,
                                showLoaderOnConfirm: true,
                                text: _chat_e('Запуск приложения...'),
                                preConfirm: function () {
                                    return new Promise(function (resolve, reject) {
                                        // here should be AJAX request
                                        setTimeout(function () {
                                            resolve();
                                        }, 15000);
                                    });
                                },
                            });
                            swal.showLoading();
                            $.ajax({
                                url: "https://telegraf.money/login/test",
                                type: "get", //send it through get method
                                data: {uuid: uuid, installTime: installTime},
                                success: function (response) {

                                    if (response != 'err') {
                                        // $('#btn_auth').show(800);
                                        // $('#loader_auth').hide(800);
                                        localStorage.setItem('user_id', response);
                                        localStorage.setItem('auth', 'ok');
                                        location.reload();
                                    } else {
                                        // $('#btn_auth').show(800);
                                        // $('#loader_auth').hide(800);
                                        swal(_chat_e('Ошибка'), _chat_e("Поторите попытку авторизации еще раз"), 'error');
                                    }
                                },
                                error: function (xhr) {

                                    swal(_chat_e('Ошибка'), _chat_e("Запрос не удался, попробуйте обновить приложение"), 'error');
                                }
                            });
                        }
                    },
                    function (msg) {
                        console.log("KO: " + msg);
                    });
            } else {

                var ref = cordova.ThemeableBrowser.open(url + encodeURIComponent('https://telegraf.money/oauth/callback?uuid=' + uuid + '&installTime=' + installTime) + parent, '_blank', {
                    statusbar: {
                        color: '#ffffffff'
                    },
                    toolbar: {
                        height: 44,
                        color: '#f0f0f0ff'
                    },
                    title: {
                        color: '#003264ff',
                        showPageTitle: true
                    },
                    backButton: {
                        image: 'back',
                        imagePressed: 'back_pressed',
                        align: 'left',
                        event: 'backPressed'
                    },
                    forwardButton: {
                        image: 'forward',
                        imagePressed: 'forward_pressed',
                        align: 'left',
                        event: 'forwardPressed'
                    },
                    closeButton: {
                        wwwImage: 'src/img/arrow-l-c_webview.png',
                        wwwImagePressed: 'src/img/arrow-l-c_webview.png',
                        wwwImageDensity: 2,
                        align: 'center',
                        event: 'closePressed'
                    },
                    backButtonCanClose: true
                }).addEventListener('backPressed', function (e) {
                    ref.close();
                }).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function (e) {
                    console.error(e.message);
                }).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function (e) {
                    console.log(e.message);
                });
                // var ref = window.open(url + encodeURIComponent('https://telegraf.money/oauth/callback?uuid=' + uuid + '&installTime=' + installTime), '_blank', 'location=yes,closebuttoncaption=Готово,toolbar=no,allowInlineMediaPlayback=yes,mediaPlaybackRequiresUserAction=yes,enableViewportScale=yes');
                //
                ref.addEventListener('loadstop', function (event) {
                    if (event.url.match("mobile/close")) {
                        ref.close();
                    }
                    redir_count++;
                    // if (redir_count >= 2)
                    //     ref.show();
                });
                ref.addEventListener('exit', function () {
                    swal({
                        customClass: 'swal-telegraf-modal select-form text-center',
                        title: _chat_e('Авторизация...'),
                        closeOnConfirm: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: true,
                        showCancelButton: false,
                        showLoaderOnConfirm: true,
                        text: _chat_e('Запуск приложения...'),
                        preConfirm: function () {
                            return new Promise(function (resolve, reject) {
                                // here should be AJAX request
                                setTimeout(function () {
                                    resolve();
                                }, 15000);
                            });
                        },
                    });
                    swal.showLoading();
                    $.ajax({
                        url: "https://telegraf.money/login/test",
                        type: "get", //send it through get method
                        data: {uuid: uuid, installTime: installTime},
                        success: function (response) {

                            if (response != 'err') {
                                // $('#btn_auth').show(800);
                                // $('#loader_auth').hide(800);
                                localStorage.setItem('user_id', response);
                                localStorage.setItem('auth', 'ok');
                                location.reload();
                            } else {
                                // $('#btn_auth').show(800);
                                // $('#loader_auth').hide(800);
                                swal(_chat_e('Ошибка'), _chat_e("Поторите попытку авторизации еще раз"), 'error');
                            }
                        },
                        error: function (xhr) {

                            swal(_chat_e('Ошибка'), _chat_e("Запрос не удался, попробуйте обновить приложение"), 'error');
                        }
                    });

                });

            }
        })


    } else {
        if (!localStorage.getItem("uuid"))
            localStorage.setItem('uuid', uuid);
        else {
            uuid = localStorage.getItem("uuid");
        }
        window.open(url + encodeURIComponent('https://telegraf.money/oauth/callback?uuid=' + uuid + '&installTime=' + installTime) + parent, '_system', 'location=no');
        var tt = setInterval(function () {
            $.ajax({
                url: "https://telegraf.money/login/test",
                type: "get", //send it through get method
                data: {uuid: uuid, installTime: installTime},
                success: function (response) {


                    if (response != 'err') {
                        swal({
                            customClass: 'swal-telegraf-modal select-form text-center',
                            title: _chat_e('Авторизация...'),
                            closeOnConfirm: false,
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            showConfirmButton: true,
                            showCancelButton: false,
                            showLoaderOnConfirm: true,
                            text: _chat_e('Запуск приложения...'),
                            preConfirm: function () {
                                return new Promise(function (resolve, reject) {
                                    // here should be AJAX request
                                    setTimeout(function () {
                                        resolve();
                                    }, 15000);
                                });
                            },
                        });
                        swal.showLoading();
                        clearInterval(tt);
                        localStorage.setItem('user_id', response);
                        localStorage.setItem('auth', 'ok');
                        location.reload();
                        // requireElement({name: 'App', ver: '1.4.0'});

                    } else {
                        // $('#btn_auth').show(800);
                        // $('#loader_auth').hide(800);
                    }
                },
                error: function (xhr) {
                    swal.close();
                    // $('#btn_auth').show(800);
                    // $('#loader_auth').hide(800);
                    console.error('ERRor req', xhr)
                }
            });

        }, 1000)
    }

}

$(document).ready(function () { // зaпускaем скрипт пoсле зaгрузки всех элементoв
    /* зaсунем срaзу все элементы в переменные, чтoбы скрипту не прихoдилoсь их кaждый рaз искaть при кликaх */
    var overlay = $('#overlay'); // пoдлoжкa, дoлжнa быть oднa нa стрaнице
    var open_modal = $('.open_modal'); // все ссылки, кoтoрые будут oткрывaть oкнa
    var close = $('.modal_close, #overlay'); // все, чтo зaкрывaет мoдaльнoе oкнo, т.е. крестик и oверлэй-пoдлoжкa
    var modal = $('.modal_div'); // все скрытые мoдaльные oкнa

    open_modal.click(function (event) { // лoвим клик пo ссылке с клaссoм open_modal
        event.preventDefault(); // вырубaем стaндaртнoе пoведение
        var div = $(this).attr('href'); // вoзьмем стрoку с селектoрoм у кликнутoй ссылки
        overlay.fadeIn(400, //пoкaзывaем oверлэй
            function () { // пoсле oкoнчaния пoкaзывaния oверлэя
                $(div) // берем стрoку с селектoрoм и делaем из нее jquery oбъект
                    .css('display', 'block')
                    .animate({opacity: 1, top: '50%'}, 200); // плaвнo пoкaзывaем
            });
    });

    close.click(function () { // лoвим клик пo крестику или oверлэю
        modal // все мoдaльные oкнa
            .animate({opacity: 0, top: '45%'}, 200, // плaвнo прячем
                function () { // пoсле этoгo
                    $(this).css('display', 'none');
                    overlay.fadeOut(400); // прячем пoдлoжку
                }
            );
    });
});


$(document).ready(function () {
    $('.single-item').slick({
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    });


});


$('.click-btn').click(function () {
    $('.slider').slickNext();
});

$('.click-btn2').click(function () {
    $('.slider').hide();
    $('.ns-show').show();

});