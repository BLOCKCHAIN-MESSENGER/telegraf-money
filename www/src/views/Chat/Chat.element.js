var WtcChat = Ractive.extend({
    data: function () {
        return {
            messages_load: false
            // WaveSurfer:WaveSurfer
        }
    },
    oninit: function () {
        console.log('Chat.oninit !');
        ractiveComponent['wtc-ChatApp'].set('MyProfile', MyProfile);

        ractiveComponent['wtc-ChatApp'].set('messages_more', false);
        Messenger.chat.callback_save(function () {
            ractiveComponent['wtc-ChatApp'].set('MyProfile', MyProfile);
            ractiveComponent['wtc-ChatApp'].set('messages', Messenger.chat.data);
            ractiveComponent['wtc-ChatApp'].set('threads', Messenger.chat.threads);
            ractiveComponent['wtc-ChatApp'].set('messages_load', true);
            if (Messenger.chat.data.length != 0)
                ractiveComponent['wtc-ChatApp'].set('messages_more', 'more');
            $("#contentMessageScroll").nanoScroller();


        });

        var ctx = document.createElement('canvas').getContext('2d');
        var linGrad = ctx.createLinearGradient(0, 35, 0, 100);
        linGrad.addColorStop(0.5, 'rgba(255, 255, 255, 1.000)');
        linGrad.addColorStop(0.5, 'rgba(255, 255, 255, 1.000)');
        //
        // var wavesurfer = WaveSurfer.create({
        //     // Use the id or class-name of the element you created, as a selector
        //     container: '#song',
        //     // The color can be either a simple CSS color or a Canvas gradient
        //     waveColor: '#fff',
        //     progressColor: 'rgba(58, 220, 76, 1)',
        //     cursorColor: 'rgba(0, 0, 0, 0)',
        //     height: '70',
        //     // This parameter makes the waveform look like SoundCloud's player
        //     barWidth: 2
        // });
        //
        // wavesurfer.on('loading', function (percents) {
        //     console.log('wavesurfer'+percents);
        //     // document.getElementById('progress').value = percents;
        // });
        //
        // wavesurfer.on('ready', function (percents) {
        //     console.log('wavesurfer'+'ready');
        //     // document.getElementById('progress').style.display = 'none';
        // });
        //
        // wavesurfer.load('https://wavesurfer-js.org//example/media/demo.wav');

        // wavesurfer.load('https://telegraf.money/telegraf.money/www/src/song/newMessage.mp3');
        // wavesurfer.playPause();

        // baron({
        //     root: '#chat-content_message',
        //     scroller: '.baron__scroller',
        //     bar: '.baron__bar',
        //     scrollingCls: '_scrolling',
        //     draggingCls: '_dragging',
        //     rtl: true
        // }).fix({
        //     elements: '.header__title',
        //     radius:-10,
        //     before: 'header__title_position_top',
        //     // after: 'header__title_position_bottom',
        //     clickable: true
        // }).controls({
        //     // Element to be used as interactive track. Note: it could be different from 'track' param of baron.
        //     track: '.baron__track',
        //     forward: '.baron__down',
        //     backward: '.baron__up'
        // });
    },
    onrender: function () {
        console.log('Chat.onrender !');

    },
    oncomplete: function () {
        console.log('Chat.oncomplete !');
    }
});
$('.arrow-st').click(function () {
    $('.chat-panel-bottom').toggleClass("arrows-no");
    $('.arrow-st').toggleClass('arrows-position');
});


$('.obms').click(function () {
    $('.stz').css('display', 'block');
});
$('.avst').click(function () {
    $('.stz').css('display', 'none');
});
$(document).mouseup(function (e) {
    var container = $(".stz");
    if (container.has(e.target).length === 0) {
        container.hide();
    }
});

var timeoutUpdate_threads = setTimeout(function () {
}, 0);

function edit_message() {
    console.log('edit_message');
    swal.close();
}
function block_user(idUser,unBlock) {
    console.log('block_user');
    API('edit_threads', {
        threads_id: Messenger.chat.openChat,
        user_action: idUser,
        action: 'block_user',
        action_data: !unBlock
    }, false, function (res) {
        if (res.err) {
            noty({
                text: _chat_e('Ошибка блокировки пользователя'),
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

        } else {
            noty({
                text: _chat_e('Заблокирован ')+'userId:' + idUser,
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
        }

    }, true);
    swal.close();
}
function remove_message(idMessage) {
    console.log('remove_message');
    API('edit_threads', {
        threads_id: Messenger.chat.openChat,
        user_action: 1,
        action: 'remove_message',
        action_data: idMessage
    }, false, function (res) {
        if (res.error) {
            noty({
                text: _chat_e('Упс..: ')+res.error,
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
        if (res.res) {
            return noty({
                text: _chat_e('Сообщение')+' ('+res.res.message+') '+_chat_e('Удаленно!'),
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

        }
            noty({
                text: _chat_e('Собщение не найденно! (Обновите чат)'),
                type: 'info',
                theme: 'metroui',
                layout: 'topCenter',
                timeout: 4000,
                progressBar: true,
                animation: {
                    open: 'animated fadeInDown',
                    close: 'animated fadeOutUp'
                }
            });


    }, true);
    swal.close();
}
function set_moder(idUser) {
    swal({
        title: _chat_e('Подтверждение'),
        type: 'question',
        customClass: 'swal-telegraf-modal select-form',

        buttonsStyling: false,
        confirmButtonClass: 'button-n',
        cancelButtonClass: 'cansel-btns',
        confirmButtonText: _chat_e('Выдать права'),
        cancelButtonText: _chat_e('Отменить'),
        showCancelButton: true,
        text: _chat_e('Вы действительно хотите хотите назначить администратором чата:')+' ['+Messenger.chat.openChat+']  UserID(<strong>' + idUser+ '</strong>)',
        showLoaderOnConfirm: true,
        preConfirm: function () {
            swal.close();
            API('edit_threads', {
                threads_id: Messenger.chat.openChat,
                user_action: idUser,
                action: 'moderator_add',
                action_data: true
            }, false, function (res) {

                if (res.err) {
                    console.error(res);
                    noty({
                        text: _chat_e('Упс...'),
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

                } else {
                    noty({
                        text: _chat_e('Выданы права создателя чата')+' UserId:' + idUser,
                        type: 'success',
                        theme: 'metroui',
                        layout: 'topCenter',
                        timeout: 3000,
                        progressBar: true,
                        animation: {
                            open: 'animated fadeInDown',
                            close: 'animated fadeOutUp'
                        }
                    });
                }

            }, true);
        }
    });
}
Messenger.on('avatar_message_err', function ( index) {
    console.log('avatar_message_err', index);
    clearTimeout(timeoutUpdate_threads);
    Messenger.chat.data[index].sender.avatar_path = false;
    timeoutUpdate_threads = setTimeout(function () {
        ractiveComponent['wtc-ChatApp'].set('messages', Messenger.chat.data);
    }, 100)
});
var event_message;
ractiveComponent['wtc-ChatApp'].on('more_message', function () {
    ractiveComponent['wtc-ChatApp'].set('messages_more', 'load');
    Messenger.chat.getHistory(function () {
        ractiveComponent['wtc-ChatApp'].set('messages_more', 'more');
    })
});

Messenger.on('event_message', function (mess) {
    event_message = mess;
    swal({
        customClass: 'swal-telegraf-modal select-form',
        buttonsStyling: false,
        // confirmButtonClass: 'button-n',
        // // cancelButtonClass: 'cansel-btns',
        // cancelButtonText: _chat_e('Отмена'),
        // title: _chat_e('Добавить карту'),
        html: '<div class="modal-chat-area">' +
        '<img src="' + mess.sender.avatar_path + '" class="flsg-krgs" style="cursor:pointer" onerror="">' +
        '<span class="namels">' + mess.sender.name_first + ' ' + mess.sender.name_last + '<strong>ID: ' + mess.sender.webtransfer_id + '</strong></span>' +
        '<div class="close-area"></div>' +
        '<div class="">' +
        '<div class="bg-my-chat-modal">' + mess.message + '</div>' +
        '<div class="chat-in-check-time-area"></div></div><div class="btm-m-area"><hr><a class="chat-btn-modal ct-btn-m2 pointer" onclick="remove_message(\''+mess._id+'\');return false;"> <i class="fa fa-trash-o" aria-hidden="true"></i>'+_chat_e('Удалить сообшение')+'</a><a class="chat-btn-modal ct-btn-m3 pointer" onclick="block_user(' + mess.sender.webtransfer_id + ');return false;"> <i class="fa fa-lock" aria-hidden="true"></i>'+_chat_e('Заблокировать')+'</a><a class="chat-btn-modal ct-btn-m3 pointer" onclick="set_moder(' + mess.sender.webtransfer_id + ');return false;"><i class="fa fa-gavel" aria-hidden="true"></i>'+_chat_e('Назначить модератором')+'</a><a class="chat-btn-modal ct-btn-m4 pointer" onclick="swal.closeModal();return false;"><i class="fa fa-times" aria-hidden="true"></i>'+_chat_e('Отмена')+'</a></div></div>',
        // type: 'info',
        showConfirmButton: false,
        showCancelButton: false
    })
});
