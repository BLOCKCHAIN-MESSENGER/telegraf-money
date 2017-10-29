var WtcProfileEdit = Ractive.extend({
    oninit: function () {
        console.log('ProfileEdit .oninit !');
        ractiveComponent['wtc-ProfileEditApp'].set('MyProfile', MyProfile);
        ractiveComponent['wtc-ProfileEditApp'].set('dd', ['01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
        ractiveComponent['wtc-ProfileEditApp'].set('mm', ['01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 11, 12]);
        ractiveComponent['wtc-ProfileEditApp'].set('yyyy', [1917, 1918, 1919, 1920, 1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001]);

        Messenger.auth_action.call_wait_auth(function () {
            Messenger.threads.callback_save('ProfileEditApp', function (threads) {
                ractiveComponent['wtc-ProfileEditApp'].set('threads', threads);
                ractiveComponent['wtc-ProfileEditApp'].set('threads_finish', Messenger.threads.finish);
                $(".__nano").nanoScroller();
            });
        });
        $(".__nano").nanoScroller();
        $('.phone-inp').val(MyProfile.phone);

        $('#sex_filed').val(MyProfile.sex);
        $('#place_filed').val(MyProfile.place);
        var tmp_born = MyProfile.born.split('-');
        $('#born0').val(tmp_born[0]);
        $('#born1').val(tmp_born[1]);
        $('#born2').val(tmp_born[2]);

        this.on('errorAvatarMy', function (e, v1, v2, v3) {
            if (window.Messenger) Messenger.event['errorAvatarMy'] && Messenger.event['errorAvatarMy']();
        });
        $('input, select[data-styler!="off"]').styler({
            // selectSearch: true
        });


        $('.acc-nts').on('change', 'input:file', function (e) {
            console.log('change1');
            var self = this;
            // var $this = $(this);
            // var $form = $(e.delegateTarget);

            // if there's a file or files
            if (self.files && self.files[0]) {

                // clear out the container

                // for each of the files add the container and progress visual
                for (var i = 0; i < self.files.length; i++) {

                    (function (file) {

                        var options = {
                            maxWidth: 70
                        };

                        loadImage.parseMetaData(file, function (data) {

                            if (data.exif) {
                                options.orientation = data.exif.get('Orientation');
                            }

                            displayThumbnail(file, options);
                        });

                    })(self.files[i]);

                }

            }

        });
        $('form.ava-form').on('submit', function (e) {
            e.preventDefault();

            var file = $('form.ava-form').find('input[type=file]')[0].files[0];
            var reader = new FileReader();

            reader.addEventListener("load", function () {
                API('profileAvatarEdit', {base64: reader.result}, false, function (response) {
                    console.warn(response);
                    if (response.error) {
                        if ('type' == response.code) {
                            swal({
                                title: _chat_e('Ошибка формата файла'),
                                type: 'error',
                                customClass: 'swal-telegraf-modal',
                                buttonsStyling: false,
                                confirmButtonClass: 'button-n',
                                cancelButtonClass: 'cansel-btns',
                                showCancelButton: false,
                                html: _chat_e('Вы пытаетесь загрузить изображение с неподерживаем типом .Загрузите фото формата png,jpg,jpeg')
                            });
                        } else if ('resize' == response.code) {
                            swal({
                                title: _chat_e('Ошибка разрешения'),
                                type: 'error',
                                customClass: 'swal-telegraf-modal',
                                buttonsStyling: false,
                                confirmButtonClass: 'button-n',
                                cancelButtonClass: 'cansel-btns',
                                showCancelButton: false,
                                html: _chat_e('Невозможно обработать изображение. Загрузите другой файл.')
                            });
                        } else if ('errupload' == response.code) {
                            swal({
                                title: _chat_e('Ошибка слишком большой файл.'),
                                type: 'error',
                                customClass: 'swal-telegraf-modal',
                                buttonsStyling: false,
                                confirmButtonClass: 'button-n',
                                cancelButtonClass: 'cansel-btns',
                                showCancelButton: false,
                                html: _chat_e('Вы пытаетесь загрузить слишком большой файл. Загрузите файл меньще 2 Мб.')
                            });
                        } else {
                            swal({
                                title: _chat_e('Ошибка сервера ::') + response.code,
                                type: 'error',
                                customClass: 'swal-telegraf-modal',
                                buttonsStyling: false,
                                confirmButtonClass: 'button-n',
                                cancelButtonClass: 'cansel-btns',
                                showCancelButton: false,
                                html: _chat_e('Ответ сервера:') + response.error
                            });
                        }
                    } else {
                        MyProfile.avatar_path = response.url + '?versionUpdate=' + Math.random();
                        Messenger.MyProfileUpdate();
                        swal({
                            title: _chat_e('Успешно'),
                            type: 'success',
                            customClass: 'swal-telegraf-modal',
                            buttonsStyling: false,
                            confirmButtonClass: 'button-n',
                            cancelButtonClass: 'cansel-btns',
                            showCancelButton: false,
                            html: _chat_e('Ваше изображение загружено.')
                        });
                    }
                });
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }
            // var jqxhr = $.ajax({
            //     url: 'https://telegraf.money/api/v1/?method=upload_avatar',
            //     type: 'post',
            //     data: new FormData(this),
            //     processData: false,
            //     contentType: false
            // })
            //     .done(function(){
            //         swal({
            //             title: 'Успешно',
            //             type: 'success',
            //             customClass: 'swal-telegraf-modal',
            //             buttonsStyling: false,
            //             confirmButtonClass: 'button-n',
            //             cancelButtonClass: 'cansel-btns',
            //             showCancelButton: false,
            //             html: 'Ваша фотография обновлена успешно.'
            //         });
            //     })
            //     .fail(function(){
            //         swal({
            //             title: 'Ошибка сервера',
            //             type: 'error',
            //             customClass: 'swal-telegraf-modal',
            //             buttonsStyling: false,
            //             confirmButtonClass: 'button-n',
            //             cancelButtonClass: 'cansel-btns',
            //             showCancelButton: false,
            //             html: 'Сервер не может обработать ваш файл! code:500'
            //         });
            //     });

        });
    },
    onrender: function () {
        console.log('ProfileEdit .onrender !');

    },
    oncomplete: function () {
        console.log('ProfileEdit .oncomplete !');
    }
});
/*
 By Osvaldas Valutis, www.osvaldas.info
 Available for use under the MIT License
 */

'use strict';

;( function (document, window, index) {
    var inputs = document.querySelectorAll('.inputfile');
    Array.prototype.forEach.call(inputs, function (input) {
        var label = input.nextElementSibling,
            labelVal = label.innerHTML;

        input.addEventListener('change', function (e) {
            var fileName = '';
            if (this.files && this.files.length > 1)
                fileName = ( this.getAttribute('data-multiple-caption') || '' ).replace('{count}', this.files.length);
            else
                fileName = e.target.value.split('\\').pop();

            if (fileName) {
            }
            // label.querySelector('span').innerHTML = fileName;
            else
                label.innerHTML = labelVal;
        });


        // Firefox bug fix
        input.addEventListener('focus', function () {
            input.classList.add('has-focus');
        });
        input.addEventListener('blur', function () {
            input.classList.remove('has-focus');
        });
    });
}(document, window, 0));
var displayThumbnail = function (file, options) {
    console.log('displayThumbnail');
    loadImage(file, function (img) {
        var $html = $('<div class="acc-nts" style="height: 70px"> <div class="account-img-area mCS_img_loaded test-ava" style="position: absolute" ></div> <div style="top: 3px;left: 102px;position: absolute"><div class="stars-area" title="Количество отзывов: ' + MyProfile.count_reviews + '"><span class="p-title">' + MyProfile.first_name + ' ' + MyProfile.last_name + '</span> <div class="no-star"></div> <div class="no-star"></div> <div class="no-star"></div> <div class="no-star"></div> <div class="no-star"></div> </div></div></div>');
        if (img.type !== 'error') $html.find('.account-img-area ').html(img);

        swal({
            customClass: 'swal-telegraf-modal select-form',
            buttonsStyling: false,
            confirmButtonClass: 'button-n',
            cancelButtonClass: 'cansel-btns',
            cancelButtonText: _chat_e('Оставить старую'),
            title: _chat_e('Обновить фотографию?'),
            html: $html,
            confirmButtonColor: '#3085d6',
            showCancelButton: true,
            confirmButtonText: _chat_e('Обновить')
        }).then(function () {
            $('form.ava-form').submit();
        })
    }, options);

};
ractiveComponent['wtc-ProfileEditApp'].on('set_phone', function () {
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
ractiveComponent['wtc-ProfileEditApp'].on('save', function () {
    var form = $('#profile_edit').serializeObject();
    form.born = form.born_2 + '-' + form.born_1 + '-' + form.born_0;
    for (var key in form) {
        if (form[key] == '') delete form[key];
    }
    API('profileEdit', form, false, function (res) {
        API('userInfo_auth', {}, function (res) {
            MyProfile = res;
            setTimeout(function () {
                Messenger.MyProfileUpdate();
            }, 100);

            if (ractiveComponent['wtc-ProfileEditApp'].get('tab') == 'orderCard') {
                if (!MyProfile || !MyProfile.first_name || !MyProfile.name_short || !MyProfile.phone || !MyProfile.place || !MyProfile.adr_index || !MyProfile.first_name || !MyProfile.adr_town || !MyProfile.adr_street || !MyProfile.born ||
                    MyProfile.first_name == '' ||
                    MyProfile.name_short == '' ||
                    MyProfile.phone == '' ||
                    MyProfile.place == '' ||
                    MyProfile.adr_index == '' ||
                    MyProfile.first_name == '' ||
                    MyProfile.adr_town == '' ||
                    MyProfile.adr_street == '' ||
                    MyProfile.born_1 == '' ||
                    MyProfile.born_0 == '' ||
                    MyProfile.born_2 == '' || !MyProfile.born_1 || !MyProfile.born_0 || !MyProfile.born_2 ||
                    MyProfile.born == ''
                ) {
                    swal({
                        customClass: 'swal-telegraf-modal select-form',
                        buttonsStyling: false,
                        confirmButtonClass: 'button-n',
                        type: 'error',
                        title: _chat_e('Ошибка'),
                        html: _chat_e('Вы заполнили не все поля'),
                        confirmButtonColor: '#3085d6',
                        showCancelButton: false,
                        confirmButtonText: _chat_e('Ок')
                    });
                } else {

                    swal({
                        customClass: 'swal-telegraf-modal select-form text-center',
                        title: _chat_e('Активация карты...'),
                        closeOnConfirm: false,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: true,
                        showCancelButton: false,
                        showLoaderOnConfirm: true,
                        text: _chat_e('Активация карты может занять несколько минут'),
                        preConfirm: function () {
                            return new Promise(function (resolve, reject) {
                                // here should be AJAX request
                                setTimeout(function () {
                                    resolve();
                                }, 30000);
                            });
                        },
                    });
                    Messenger.setPage('cards');
                    swal.showLoading();
                    API('orderCard', {currency: 'usd', card_type: 'virtual', agree: true}, function (result) {
                        if (result.error) {
                            swal({
                                customClass: 'swal-telegraf-modal select-form text-center',
                                buttonsStyling: false,
                                confirmButtonClass: 'button-n',
                                cancelButtonClass: 'cansel-btns',
                                title: _chat_e('Ошибка активации карты'),
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
                                title: _chat_e('Успех'),
                                type: 'success',
                                confirmButtonText: _chat_e('Ок'),
                                showCancelButton: false,
                                text: _chat_e('Вы успешно активировали карту!')
                            })
                        }
                    }, true)
                }
            }
        }, true);

        if (res.status == 'success') {
            if (ractiveComponent['wtc-ProfileEditApp'].get('tab') != 'orderCard') swal({
                customClass: 'swal-telegraf-modal select-form',
                buttonsStyling: false,
                confirmButtonClass: 'button-n',
                type: 'success',
                title: _chat_e('Успех'),
                html: _chat_e('Ваш профиль был обновлён'),
                confirmButtonColor: '#3085d6',
                showCancelButton: false,
                confirmButtonText: _chat_e('Ок')
            });
        }
        else  swal({
            customClass: 'swal-telegraf-modal select-form',
            buttonsStyling: false,
            confirmButtonClass: 'button-n',
            type: 'error',
            title: _chat_e('Упс...'),
            html: _chat_e('Вы допустили ошибки при заполнении профиля'),
            confirmButtonColor: '#3085d6',
            showCancelButton: false,
            confirmButtonText: _chat_e('Ок')
        });
    }, true);

});