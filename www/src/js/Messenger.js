window.__cards_storage = false;
window.__wallet_storage = false;
window.__crypto_wallet_dbc = false;
window.__crypto_wallets = [];
try {
    window.__cards_storage = JSON.parse(localStorage.getItem('cards'));
    window.__wallet_storage = JSON.parse(localStorage.getItem('wallet'));
    window.__crypto_wallet_dbc = JSON.parse(localStorage.getItem('crypto_wallet_dbc'));
    window.__crypto_wallets = JSON.parse(localStorage.getItem('crypto_wallets_db'));
} catch (e) {
    console.warn("JSON warn localStorage:", e);
}
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.lsbridge = factory();
    }
}(this, function () {

    /*
     - Storing messages in localStorage.
     - Clients subscribe to the changes and
     they get notified if a new message arrives.
     */

    var api = {};

    api.isLSAvailable = (function () {
        var mod = '_';
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch (e) {
            return false;
        }
    })();

    if (api.isLSAvailable) {

        var interval = 100
            , intervalForRemoval = 200
            , ls = localStorage
            , listeners = {}
            , isLoopStarted = false
            , buffer = {};

        var loop = function () {
            for (var namespace in listeners) {
                var data = ls.getItem(namespace);
                if (data && buffer[namespace] && buffer[namespace].indexOf(data) === -1) {
                    buffer[namespace].push(data);
                    try {
                        var parsed = JSON.parse(data);
                        if (parsed) data = parsed;
                    } catch (e) {
                    }
                    for (var i = 0; i < listeners[namespace].length; i++) {
                        listeners[namespace][i](data);
                    }
                    if (!ls.getItem(namespace + '-removeit')) {
                        ls.setItem(namespace + '-removeit', '1');
                        (function (n) {
                            setTimeout(function () {
                                ls.removeItem(n);
                                ls.removeItem(n + '-removeit');
                                buffer[namespace] = [];
                            }, intervalForRemoval);
                        })(namespace);
                    }
                } else if (!data) {
                    buffer[namespace] = [];
                }
            }
            setTimeout(loop, interval);
            return true;
        };

        api.send = function (namespace, data) {
            var raw = '';
            if (typeof data === 'function') {
                data = data();
            }
            if (typeof data === 'object') {
                raw = JSON.stringify(data);
            } else {
                raw = data;
            }
            ls.setItem(namespace, raw);
        };


        api.subscribe = function (namespace, cb) {
            if (!listeners[namespace]) {
                listeners[namespace] = [];
                buffer[namespace] = [];
            }
            listeners[namespace].push(cb);
            if (!isLoopStarted) {
                isLoopStarted = loop();
            }
        };

        api.unsubscribe = function (namespace) {
            if (listeners[namespace]) {
                listeners[namespace] = [];
            }
            if (buffer[namespace]) {
                buffer[namespace] = [];
            }
        };

        api.getBuffer = function () {
            return buffer;
        }

    } else {
        api.send = api.subscribe = function () {
            throw new Error('localStorage not supported.');
        }
    }

    return api;
}));
var Messenger = {
    event: {},
    page: null,
    on: function (event, fn) {
        Messenger.event[event] = fn;
    },

    setNotificationsCount: function (number, notification) {
        if (number == '+') {
            notification = true;
            number = ractiveComponent['rootApp'].get('notificationCount') + 1;

        }

        if (number == false || number == null) {
            if (notification) {
                // var audio = new Audio();
                // audio.src = _path_src + 'song/song_notification.mp3';
                // audio.autoplay = true;
            }
            return false;
        }
        if (0 < number) {
            ractiveComponent['rootApp'].set('notificationCount', number);
        } else {
            ractiveComponent['rootApp'].set('notificationCount', number);
        }
        if (0 == number) number = ''; else number = (+number).toString();
        if (gui && win) {
            //nwjs.io
            win_gui.setBadgeLabel(number);
        }
        if (notification) {
            // var audio1 = new Audio();
            // audio1.src = _path_src + 'song/song_notification.mp3';
            // audio1.autoplay = true;
        }
    },
    setPage: function (page, tabPage, historyAdd) {
        var card_dostup_country = [
            "AT",
            "BE",
            "BG",
            "HR",
            "CY",
            "CZ",
            "DK",
            "EE",
            "FI",
            "FR",
            "DE",
            "GR",
            "HU",
            "IS",
            "IE",
            "IT",
            "LV",
            "LI",
            "LU",
            "MT",
            "NL",
            "PL",
            "NO",
            "PT",
            "RO",
            "SK",
            "SI",
            "ES",
            "SE",
            "UK",
            "AD",
            "MC",
            "SM",
            "VA",
            "GI",
            "GL",
            "IM",
            "ES-CN",
            "PT",
            "JE",
            "GG",
            "CH",
            "IL",
            "TR"
        ];
        if ('order' === page && card_dostup_country.indexOf(getCookie('country') || 'NULL') === -1) {
            swal({
                customClass: 'swal-telegraf-modal select-form',
                buttonsStyling: false,
                confirmButtonClass: 'button-n',
                type: 'error',
                title: _chat_e('Ошибка'),
                html: _chat_e('Приносим извинения, в данный момент банк-эмитент не выпускает карты в вашем регионе.<br>В ближайшее время ожидается решение вопроса.'),
                confirmButtonColor: '#3085d6',
                showCancelButton: false,
                confirmButtonText: _chat_e('Ок')
            });
            return false;
        }
        if (ractiveComponent && Messenger.page && ractiveComponent[Messenger.page] && ractiveComponent[Messenger.page].fragment.rendered) {
            ractiveComponent[Messenger.page].unrender();
        }


        var page_param = page.split(':');
        page = page_param[0];
        console.log('setPage:', page, page_param[1]
            , tabPage);
        if (page_param[1]) tabPage = page_param[1];
        if (page_param[2]) tabPage = page_param[1];
        Messenger.chat.openChat = null;
        $('nav#menu').data("mmenu").close();
        ractiveComponent.rootApp.set('pageActive', 'contentApplication');

        if ('chats' == page) {

            requireElement({name: 'Dialogs', ver: '1.1.0', element: '#contentApplication'}, {
                cnt: 0,
                afterlast: function (name) {

                    if (name) name = name + 'App';
                    Messenger.page = name;
                    if (ractiveComponent && Messenger.page && ractiveComponent[Messenger.page] && !ractiveComponent[Messenger.page].fragment.rendered) {
                        ractiveComponent[Messenger.page].render();

                    }
                }
            });
        }
        if ('exchanges' == page) {

            requireElement({name: 'Exchanges', ver: '1.1.0', element: '#contentApplication'}, {
                cnt: 0,
                afterlast: function (name) {

                    if (name) name = name + 'App';
                    Messenger.page = name;
                    if (ractiveComponent && Messenger.page && ractiveComponent[Messenger.page] && !ractiveComponent[Messenger.page].fragment.rendered) {
                        ractiveComponent[Messenger.page].render();

                    }
                }
            });
        }
        if ('localbitcoin' == page) {

            requireElement({name: 'Localbitcoin', ver: '1.1.0', element: '#contentApplication'}, {
                cnt: 0,
                afterlast: function (name) {

                    if (name) name = name + 'App';
                    Messenger.page = name;
                    if (ractiveComponent && Messenger.page && ractiveComponent[Messenger.page] && !ractiveComponent[Messenger.page].fragment.rendered) {
                        ractiveComponent[Messenger.page].render();

                    }
                }
            });
        }
        if ('contacts' == page) {
            requireElement({name: 'Contacts', ver: '1.1.0', element: '#contentApplication'}, {
                cnt: 0,
                afterlast: function (name) {

                    if (name) name = name + 'App';
                    Messenger.page = name;
                    if (ractiveComponent && Messenger.page && ractiveComponent[Messenger.page] && !ractiveComponent[Messenger.page].fragment.rendered) {
                        ractiveComponent[Messenger.page].render();

                        ractiveComponent['wtc-ContactsApp'].set('tab', tabPage);
                    }
                }
            });
        }
        if ('debitcoin' == page) {
            page = 'CryptoWallet';
        }
        if ('CryptoWallet' == page) {
            requireElement({name: 'Cryptowallet', ver: '1.1.0', element: '#contentApplication'}, {
                cnt: 0,
                afterlast: function (name) {

                    if (!tabPage) tabPage = 'all';
                    if (name) name = name + 'App';
                    Messenger.page = name;
                    if (ractiveComponent && Messenger.page && ractiveComponent[Messenger.page] && !ractiveComponent[Messenger.page].fragment.rendered) {
                        ractiveComponent[Messenger.page].render();
                        if (tabPage)
                            ractiveComponent['wtc-CryptowalletApp'].set('tab', tabPage);
                    }
                }
            });
        }
        if ('deposits' == page) {
            requireElement({name: 'Deposits', ver: '1.1.0', element: '#contentApplication'}, {
                cnt: 0,
                afterlast: function (name) {
                    // if (!tabPage) tabPage = 'create';
                    if (name) name = name + 'App';
                    Messenger.page = name;
                    if (ractiveComponent && Messenger.page && ractiveComponent[Messenger.page] && !ractiveComponent[Messenger.page].fragment.rendered) {
                        ractiveComponent[Messenger.page].render();
                        if (tabPage)
                            ractiveComponent['wtc-DepositsApp'].set('tab', tabPage);
                    }
                }
            });
        }
        if ('bonus' == page) {
            requireElement({name: 'Bonus', ver: '1.1.0', element: '#contentApplication'}, {
                cnt: 0,
                afterlast: function (name) {

                    if (name) name = name + 'App';
                    Messenger.page = name;
                    if (ractiveComponent && Messenger.page && ractiveComponent[Messenger.page] && !ractiveComponent[Messenger.page].fragment.rendered) {
                        ractiveComponent[Messenger.page].render();


                        if (tabPage) {
                            bonus_tab = tabPage;
                            ractiveComponent['wtc-BonusApp'].set('tab', tabPage);
                        }
                    }
                }
            });
        }
        if ('legal' == page) {
            requireElement({name: 'Legal', ver: '1.1.0', element: '#contentApplication'}, {
                cnt: 0,
                afterlast: function (name) {

                    if (name) name = name + 'App';
                    Messenger.page = name;
                    if (ractiveComponent && Messenger.page && ractiveComponent[Messenger.page] && !ractiveComponent[Messenger.page].fragment.rendered) {
                        ractiveComponent[Messenger.page].render();
                        if (tabPage)
                            ractiveComponent['wtc-LegalApp'].set('tab', tabPage);
                    }
                }
            });
        }
        if ('profile' == page) {
            requireElement({name: 'Profile', ver: '1.1.0', element: '#contentApplication'}, {
                cnt: 0,
                afterlast: function (name) {

                    if (name) name = name + 'App';
                    Messenger.page = name;
                    if (ractiveComponent && Messenger.page && ractiveComponent[Messenger.page] && !ractiveComponent[Messenger.page].fragment.rendered) {
                        ractiveComponent[Messenger.page].render();


                    }
                }
            });
        }
        if ('dialog' == page) {
            // requireElement({name: 'Chat', ver: '1.1.0', element: Messenger.body['Chat'].dom_content.id});
            requireElement({name: 'Chat', ver: '1.1.0', element: '#chat-content_message'});
        }
        if ('cards' == page) {
            requireElement({name: 'Cards', ver: '1.1.0', element: '#contentApplication'}, {
                cnt: 0,
                afterlast: function (name) {

                    if (name) name = name + 'App';
                    Messenger.page = name;
                    if (ractiveComponent && Messenger.page && ractiveComponent[Messenger.page] && !ractiveComponent[Messenger.page].fragment.rendered) {
                        ractiveComponent[Messenger.page].render();


                    }
                }
            });
        }
        if ('topup' == page) {
            requireElement({name: 'Topup', ver: '1.1.0', element: '#contentApplication'}, {
                cnt: 0,
                afterlast: function (name) {

                    if (name) name = name + 'App';
                    Messenger.page = name;
                    if (ractiveComponent && Messenger.page && ractiveComponent[Messenger.page] && !ractiveComponent[Messenger.page].fragment.rendered) {
                        ractiveComponent[Messenger.page].render();


                    }
                    ractiveComponent[Messenger.page].set('select_card', tabPage);

                }
            });
        }
        if ('order' == page) {
            if (page_param[1]) {
                Messenger.body['order_card'].tabPage = page_param[1];
            }
            if (!Messenger.body['order_card'].tabPage) {
                Messenger.body['order_card'].tabPage = 'virtual'
            }
            Messenger.body['order_card'].callback && Messenger.body['order_card'].callback();
            requireElement({name: 'Order', ver: '1.1.0', element: '#contentApplication'}, {
                cnt: 0,
                afterlast: function (name) {

                    if (name) name = name + 'App';
                    Messenger.page = name;
                    if (ractiveComponent && Messenger.page && ractiveComponent[Messenger.page] && !ractiveComponent[Messenger.page].fragment.rendered) {
                        ractiveComponent[Messenger.page].render();
                        //order_card


                    }
                }
            });
        }
        if ('guarantee' == page) {
            if (page_param[1]) {
                Messenger.body['guarantee'].tabPage = page_param[1];
            }
            if (!Messenger.body['guarantee'].tabPage) {
                Messenger.body['guarantee'].tabPage = 'create'
            }
            Messenger.body['guarantee'].callback && Messenger.body['guarantee'].callback();
            requireElement({name: 'Guarantee', ver: '1.1.0', element: '#contentApplication'}, {
                cnt: 0,
                afterlast: function (name) {

                    if (name) name = name + 'App';
                    Messenger.page = name;
                    if (ractiveComponent && Messenger.page && ractiveComponent[Messenger.page] && !ractiveComponent[Messenger.page].fragment.rendered) {
                        ractiveComponent[Messenger.page].render();

                    }
                }
            });
        }
        if ('affiliates' == page) {
            if (page_param[1]) {
                Messenger.body['Affiliates'].tabPage = page_param[1];
            }
            if (!Messenger.body['Affiliates'].tabPage) {
                Messenger.body['Affiliates'].tabPage = 'about'
            }
            Messenger.body['Affiliates'].callback && Messenger.body['Affiliates'].callback();

            requireElement({name: 'Affiliates', ver: '1.1.0', element: '#contentApplication'}, {
                cnt: 0,
                afterlast: function (name) {
                    if (name) name = name + 'App';
                    Messenger.page = name;
                    if (ractiveComponent && Messenger.page && ractiveComponent[Messenger.page] && !ractiveComponent[Messenger.page].fragment.rendered) {

                        ractiveComponent[Messenger.page].render();
                    }
                }
            });


        }
        if ('sendmoney' == page) {
            requireElement({name: 'Sendmoney', ver: '1.1.0', element: '#contentApplication'}, {
                cnt: 0,
                afterlast: function (name) {

                    if (name) name = name + 'App';
                    Messenger.page = name;
                    if (ractiveComponent && Messenger.page && ractiveComponent[Messenger.page] && !ractiveComponent[Messenger.page].fragment.rendered) {
                        ractiveComponent[Messenger.page].render();

                    }
                }
            });
        }
        if ('Chatinfo' == page) {
            ractiveComponent.rootApp.set('pageActive', 'contentApplication_more');
            requireElement({name: 'Chat_info', ver: '1.1.0', element: '#contentApplication_more'}, {
                cnt: 0,
                afterlast: function (name) {

                    if (name) name = name + 'App';
                    Messenger.page = name;
                    if (ractiveComponent && Messenger.page && ractiveComponent[Messenger.page] && !ractiveComponent[Messenger.page].fragment.rendered) {
                        ractiveComponent[Messenger.page].render();

                    }
                }
            });
            $('#contentApplication_more').animateCss('slideInDown');
        }
        if ('settings' == page) {
            Messenger.body['settings'].tabPage = page_param[1];
            Messenger.body['settings'].callback && Messenger.body['settings'].callback();

            requireElement({name: 'Settings', ver: '1.1.0', element: '#contentApplication'}, {
                cnt: 0,
                afterlast: function (name) {

                    if (name) name = name + 'App';
                    Messenger.page = name;
                    if (ractiveComponent && Messenger.page && ractiveComponent[Messenger.page] && !ractiveComponent[Messenger.page].fragment.rendered) {
                        ractiveComponent[Messenger.page].render();

                    }
                    ractiveComponent['wtc-SettingsApp'].set('tabPage', Messenger.body['settings'].tabPage);

                }
            });
            if (ractiveComponent['wtc-SettingsApp']) {
            }

            ractiveComponent['rootApp'].set('tabPage', Messenger.body['settings'].tabPage);

        }
        if ('ProfileEdit' == page) {
            requireElement({name: 'ProfileEdit', ver: '1.1.0', element: '#contentApplication'}, {
                cnt: 0,
                afterlast: function (name) {

                    if (name) name = name + 'App';
                    Messenger.page = name;
                    if (ractiveComponent && Messenger.page && ractiveComponent[Messenger.page] && !ractiveComponent[Messenger.page].fragment.rendered) {
                        ractiveComponent[Messenger.page].render();


                    }
                    // if (!tabPage) tabPage = 'default';
                    ractiveComponent['wtc-ProfileEditApp'].set('tab', tabPage);
                    console.error('err', tabPage);

                }
            });
        }
        if ('credit' == page) {
            if (page_param[1]) {
                Messenger.body['credit'].tabPage = page_param[1];
            }
            if (!Messenger.body['credit'].tabPage) {
                Messenger.body['credit'].tabPage = 'loans'
            }
            Messenger.body['credit'].callback && Messenger.body['credit'].callback();
            requireElement({name: 'Credit', ver: '1.1.0', element: '#contentApplication'}, {
                cnt: 0,
                afterlast: function (name) {

                    if (name) name = name + 'App';
                    Messenger.page = name;
                    if (ractiveComponent && Messenger.page && ractiveComponent[Messenger.page] && !ractiveComponent[Messenger.page].fragment.rendered) {
                        ractiveComponent[Messenger.page].render();

                    }
                }
            });
        }
        if ('info_card' == page) {

            requireElement({name: 'Info_card', ver: '1.1.0', element: '#contentApplication'}, {
                cnt: 0,
                afterlast: function (name) {

                    if (name) name = name + 'App';
                    Messenger.page = name;
                    if (ractiveComponent && Messenger.page && ractiveComponent[Messenger.page] && !ractiveComponent[Messenger.page].fragment.rendered) {
                        ractiveComponent[Messenger.page].render();

                    }
                }
            });

        }
        if (!historyAdd)
            history.pushState({}, "Telegraf Money", "#" + page + '-' + tabPage);
        ractiveComponent['rootApp'].set('page', page);
    },
    MyProfileUpdate: function () {
        for (var key in ractiveComponent) {
            ractiveComponent[key].set('MyProfile', MyProfile);
        }
        localStorage.setItem('MyProfile', JSON.stringify(MyProfile));
    },
    body: {
        order_card: {},
        settings: {},
        credit: {},
        guarantee: {}, Affiliates: {}
    },
    finance: {
        cards: window.__cards_storage,
        cards_all: [],
        crypto_wallet_dbc: window.__crypto_wallet_dbc,
        callback_cnt: 0,
        microinvests: [],
        data: {wallet: window.__wallet_storage},

        update_wait: false,

        update: function () {
            if (MyProfile) {

                API('get_finance_data_this_user', {}, false, function (response) {
                    var microinvests = [];

                    for (var i in  response.cards) {
                        if (response.cards.hasOwnProperty(i)) {

                            for (var k in response.cards[i].demand) {
                                if (response.cards[i].demand.hasOwnProperty(k)) {
                                    response.cards[i].demand[k].card = {
                                        card_currency: response.cards[i].card_currency,
                                        card_id: response.cards[i].card_id,
                                        card_name: response.cards[i].card_name,
                                        card_name_short: response.cards[i].card_name_short,
                                        card_type: response.cards[i].card_type,
                                        id: response.cards[i].id,
                                        last_balance: response.cards[i].last_balance,
                                        name_on_card: response.cards[i].name_on_card,
                                        send_money_limit: response.cards[i].send_money_limit,
                                    };

                                }
                            }
                        }
                        microinvests = microinvests.concat(response.cards[i].demand);
                        var invest_summ = 0;
                        var profit_summ = 0;
                        var demand_summ = 0;
                        for (var d in  response.cards[i].demand) {
                            invest_summ += +response.cards[i].demand[d].summa;
                            profit_summ += +response.cards[i].demand[d].current_income;
                            demand_summ = demand_summ + (+response.cards[i].demand[d].summa + response.cards[i].demand[d].current_income);
                        }
                        response.cards[i].invest_ammount = +invest_summ.toFixed(2);
                        if (response.card_start_balanses[response.cards[i].card_id])
                            response.cards[i].card_start_balanses = +response.card_start_balanses[response.cards[i].card_id];
                        else
                            response.cards[i].card_start_balanses = 0;
                        response.cards[i].profit_ammount = +profit_summ.toFixed(2);
                        response.cards[i].demand_ammount = +demand_summ.toFixed(2);
                        response.cards[i].total_balance = +(response.cards[i].demand_ammount + response.cards[i].last_balance).toFixed(2);
                    }
                    for (var k in microinvests)

                        Messenger.finance.microinvests = microinvests;

                    Messenger.finance.data = response;
                    Messenger.finance.cards = response.cards;
                    for (var k in  Messenger.finance.cb_function_arr) {
                        Messenger.finance.cb_function_arr[k](Messenger.finance.cards, Messenger.finance.microinvests, false, Messenger.finance.data);
                    }
                    localStorage.setItem('cards', JSON.stringify(Messenger.finance.cards));
                    localStorage.setItem('wallet', JSON.stringify(Messenger.finance.data.wallet));
                    API('get_cards_info', {}, function (result) {
                        Messenger.finance.cards_all = result.cards.wtcards_list;
                        for (var k in  Messenger.finance.cb_function_arr) {
                            Messenger.finance.cb_function_arr[k](Messenger.finance.cards, Messenger.finance.microinvests, Messenger.finance.cards_all, Messenger.finance.data);
                        }
                    });
                    Messenger.finance.update_at = new Date();
                }, true);
            } else {
                Messenger.finance.update_wait = true;
            }
        },
        cb_function_arr: [],
        callback_save: function (fn) {
            Messenger.auth_action.call_wait_auth(function () {

                Messenger.finance.cb_function_arr.push(fn);
                if (Messenger.finance.cb_function_arr.length <= 1) {
                    try {
                        // var tmp_cards= localStorage.getItem('cards');
                        fn(JSON.parse(localStorage.getItem('cards')));

                    } catch (e) {
                        console.error(e);
                    }
                    Messenger.finance.update();
                } else {
                    if (!Messenger.finance.update_at) Messenger.finance.update();

                    fn(Messenger.finance.cards, Messenger.finance.microinvests, Messenger.finance.cards_all, Messenger.finance.data)
                }

            });
        },
        update_at: null
    },
    guarantee: {
        data: [],
        update_wait: false,
        update: function () {
            if (MyProfile) {
                API('getOrdersData', {mode: 'all', bonus: 9}, function (result) {
                    Messenger.guarantee.data = result.orders;
                    for (var k in  Messenger.guarantee.cb_function_arr) {
                        Messenger.guarantee.cb_function_arr[k](Messenger.guarantee.data);
                    }
                    Messenger.guarantee.update_at = new Date();
                });


            } else {
                Messenger.guarantee.update_wait = true;
            }
        },
        cb_function_arr: [],
        callback_save: function (fn) {

            Messenger.guarantee.cb_function_arr.push(fn);
            if (Messenger.guarantee.cb_function_arr.length <= 1) {
                Messenger.guarantee.update();
            } else {
                fn(Messenger.guarantee.data)
            }
        },
        update_at: null
    },
    chat: {
        data: [],
        threads: {},
        scrollLoad: true,
        openChat: null,
        read: true,
        openChat_param_type: null,
        page: 0,
        callback: false,
        callback_save: function (cb) {
            this.callback = cb;
            this.callback && this.callback();
        },
        message: function (data) {
            var threads_index = _find(Messenger.threads.data, 'id', data.threads_id._id);
            var notif = true;
            var el = {
                group_name: data.threads_id.group_name,
                id: data.threads_id._id,
                last_message: data.threads_id.last_message.message,
                last_message_messageId: data.threads_id.last_message.messageId,
                last_message_read: data.threads_id.last_message.read,
                last_message_sender_id: data.threads_id.last_message.sender,
                unread_count_this_thread: data.threads_id.unread_count_this_thread,
                last_online_text: "Invalid date",
                online: 0,
                spam: false,
                type_threads: data.threads_id.type,
                updated_at: data.threads_id.update_at
            };

            el.my_id = MyProfile.webtransfer_id;
            if (data.sender.webtransfer_id != MyProfile.webtransfer_id) {
                el.avatar_path = data.sender.avatar_path;
                el.webtransfer_id = data.sender.webtransfer_id;
                el.name_short = data.sender.name_short;
                el.last_online_at = data.sender.last_online_at;
                el.full_name = data.sender.name_first + ' ' + data.sender.name_last;
            }

            if (el.updated_at != null) {
                var date = el.updated_at.split('T')[0];
                var update_time = moment(el.updated_at, moment.ISO_8601);
                var date_now = moment().format('YYYY-MM-DD');
                if (date_now == date) el.updated_at_text = update_time.format('HH:mm');
                else if (moment().subtract(update_time.day(), 'day').hours(0).minutes(0).second(0) <= update_time && update_time.day() != 6) {
                    el.updated_at_text = update_time.format('ddd');
                }
                else el.updated_at_text = update_time.format('DD.MM.YY');
                if (el.last_message && el.last_message != '')
                    el.last_message = (el.last_message).replace(/<\/?[^>]+>/g, '');
                else
                    el.last_message = '...';
                if ('https://webtransfer.com/assets/missing_avatar_thumb.jpeg' == el.avatar_path) {
                    el.avatar_path = false;
                }

            }

            if (threads_index !== false) {
                for (var key in el) {
                    if (el.hasOwnProperty(key))
                        Messenger.threads.data[threads_index][key] = el[key];
                }
            } else {
                if (!el.webtransfer_id) {
                    for (var ii in data.threads_id.users) {
                        if (data.threads_id.users[ii].webtransfer_id != MyProfile.webtransfer_id) {
                            API('userInfo', {webtransfer_id: data.threads_id.users[ii].webtransfer_id}, function (res) {

                                el.avatar_path = res.user.avatar_path;
                                el.webtransfer_id = res.user.webtransfer_id;
                                el.name_short = res.user.name_short;
                                el.last_online_at = res.user.last_online_at;
                                el.full_name = res.user.name_first + ' ' + res.user.name_last;
                                Messenger.threads.data.unshift(el);
                            }, true);
                        }
                    }


                } else {
                    Messenger.threads.data.push(el);
                }

            }

            Messenger.threads.update();
            var openT = false;
            (data.threads_id.users).forEach(function (el) {
                if (el.webtransfer_id == Messenger.chat.openChat) {
                    openT = true;
                    Messenger.chat.open(data.threads_id._id, 'threads_id')
                }
            });

            if (!openT && Messenger.chat.openChat_param_type == 'threads_id') {
                if (data.threads_id._id == Messenger.chat.openChat) {
                    if (data.message) {
                        var m = data.message.split('###');
                        console.log(m);
                        for (var _k in m) {
                            if (m.hasOwnProperty(_k)) {
                                if (m[_k] === _chat_e('lang_name')) {
                                    data.message = m[_k + 1];
                                }
                            }
                        }
                    }
                    var update_time_ = moment(data.update_at, moment.ISO_8601);
                    data.updated_at_time = update_time_.format('HH:mm');
                    data.updated_at_date = update_time_.format('DD.MM.YYYY');
                    if (data.sender.webtransfer_id != MyProfile.webtransfer_id) {
                        Messenger.setNotificationsCount(null, true);
                        notif = false;
                        Messenger.chat.data.push(data);
                    } else {
                        notif = false;
                        var find = false;
                        for (var i = 0, length = Messenger.chat.data.length; i < length; i++) {
                            if (Messenger.chat.data[i].message_hesh == data.message_hesh) {
                                Messenger.chat.data[i] = data;
                                find = true;
                            }
                        }
                        if (!find) {
                            Messenger.chat.data.push(data);
                        }
                    }

                    //скроллить к низу если нужно

                    $("#contentMessageScroll").nanoScroller();
                    // if ($(Messenger.body.Chat.selector + ' .mCSB_container').css('top') == '0px')
                    //     $(Messenger.body.Chat.selector).mCustomScrollbar('update');

                    Messenger.chat.callback && Messenger.chat.callback();
                    if (Messenger.chat.prcScroll > 95) {
                        var thread_read_param = {};
                        thread_read_param[Messenger.chat.openChat_param_type] = Messenger.chat.openChat;
                        API('thread_read', thread_read_param);
                        Messenger.threads.data.forEach(function (el, i) {
                            if (el.id == Messenger.chat.openChat)
                                Messenger.threads.data[i].unread_count_this_thread = 0;
                        });
                        Messenger.threads.update();
                        $("#contentMessageScroll").nanoScroller().nanoScroller({scroll: 'bottom'});
                        // setTimeout(function () {
                        // $("#contentMessageScroll"));
                        // },1)
                    } else {
                        Messenger.chat.read = false

                    }
                }
            }
            if (notif === true)
                Messenger.setNotificationsCount('+', true);


        },
        send: function (text, attach) {
            if (text == "console_help") {
                noty({
                    text: 'console1531 (showDevTools),consoleMyProfile (show var MyProfile)',
                    type: 'information',
                    theme: 'metroui',
                    layout: 'topCenter',
                    timeout: 10000,
                    progressBar: true,
                    animation: {
                        open: 'animated fadeInDown',
                        close: 'animated fadeOutUp'
                    }
                });
                if (window.nw) {
                    //developer
                    var win = nw.Window.get();
                    win.showDevTools();
                    //nwjs.io
                }
                ractiveComponent['rootApp'].set('send_wait', false);
                send_wait = false;
                return false;
            }
            if (text == "console1531") {
                noty({
                    text: _chat_e('Developer cmd init...'),
                    type: 'information',
                    theme: 'metroui',
                    layout: 'topCenter',
                    timeout: 2000,
                    progressBar: true,
                    animation: {
                        open: 'animated fadeInDown',
                        close: 'animated fadeOutUp'
                    }
                });
                if (window.nw) {
                    //developer
                    var win = nw.Window.get();
                    win.showDevTools();
                    //nwjs.io
                }
                ractiveComponent['rootApp'].set('send_wait', false);
                send_wait = false;
                return false;
            }
            if (text == "consoleMyProfile") {
                Messenger.chat.data.push({
                    message: JSON.stringify(MyProfile),
                    wait: true,
                    error: true,
                    message_hesh: 'dev',
                    sender: MyProfile
                });

                $("#contentMessageScroll").nanoScroller().nanoScroller({scroll: 'bottom'});
                ractiveComponent['rootApp'].set('send_wait', false);
                send_wait = false;

                return false;
            }
            if (text == "console_connect_param") {
                Messenger.chat.data.push({
                    message: JSON.stringify(paramSocket),
                    wait: true,
                    error: true,
                    message_hesh: 'dev',
                    sender: MyProfile
                });

                $("#contentMessageScroll").nanoScroller().nanoScroller({scroll: 'bottom'});
                ractiveComponent['rootApp'].set('send_wait', false);
                send_wait = false;

                return false;
            }
            var param = {message: text, message_hesh: guid()};
            param[Messenger.chat.openChat_param_type] = this.openChat;
            if (attach) {
                param.message_attach = attach; //{type,data}
            }
            Messenger.chat.data.push({message: text, wait: true, message_hesh: param.message_hesh, sender: MyProfile});
            Messenger.chat.callback && Messenger.chat.callback();
            var thread_read_param = {};
            thread_read_param[Messenger.chat.openChat_param_type] = Messenger.chat.openChat;
            API('thread_read', thread_read_param);
            // Скроллить к низу
            Messenger.threads.data.forEach(function (el, i) {
                if (el.id == Messenger.chat.openChat)
                    Messenger.threads.data[i].unread_count_this_thread = 0;
            });
            Messenger.threads.update();
            $("#contentMessageScroll").nanoScroller().nanoScroller({scroll: 'bottom'});
            setTimeout(function () {

                ractiveComponent['rootApp'].set('send_wait', false);
                send_wait = false;
            }, 10);
            API('create_message', param, function (res) {
                ractiveComponent['rootApp'].set('send_wait', false);
                send_wait = false;
                if (res.error) {
                    if (res.error == 'access') {
                        noty({
                            text: _chat_e('Вам ограничен доступ в данном чате!'),
                            type: 'error',
                            theme: 'metroui',
                            layout: 'topCenter',
                            timeout: 3000,
                            progressBar: true,
                            animation: {
                                open: 'animated fadeInDown',
                                close: 'animated fadeOutUp'
                            }
                        });
                    } else {
                        noty({
                            text: _chat_e('Ошибка сообшение не отправленно причина:') + res.error,
                            type: 'error',
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
                    for (var i = 0, length = Messenger.chat.data.length; i < length; i++) {
                        if (Messenger.chat.data[i].message_hesh == res.message_hesh) {
                            Messenger.chat.data[i].error = true;
                            Messenger.chat.callback && Messenger.chat.callback();
                        }
                    }
                }
                Messenger.chat.prcScroll = 100;

            });
        },
        getHistory: function (cb) {
            Messenger.chat.page++;
            var param = {page: Messenger.chat.page};
            param[Messenger.chat.openChat_param_type] = Messenger.chat.openChat;
            API('get_messages', param, false, function (res) {
                if (!res || !res.threads) Messenger.chat.data = [];
                if (res.threads && res.threads.type == 'group') {
                    var response_threads_this = {
                        avatar_path: res.threads.avatar_path | false,
                        count_reviews: res.threads.count_reviews | 0,
                        full_name: res.threads.full_name,
                        group_name: res.threads.group_name,
                        group_photo: res.threads.group_photo,
                        group_verefy: res.threads.group_verefy,
                        id: res.threads._id,
                        last_message: res.threads.last_message.message,
                        last_message_messageId: res.threads.last_message.messageId,
                        last_message_read: res.threads.last_message.read,
                        last_message_sender_id: res.threads.last_message.sender,
                        last_online: "Invalid date",
                        last_online_at: false,
                        my_id: MyProfile.webtransfer_id,
                        name_short: "SL",
                        rating: 0,
                        spam: false,
                        type_threads: res.threads.type,
                        unread_count_this_thread: 0,
                        updated_at: res.threads.update_at,
                        updated_at_text: null,
                        user_count: res.threads.user_count,
                        users: res.threads.users,
                        webtransfer_id: null
                    };
                    ractiveComponent['rootApp'].set('open_threads', response_threads_this);
                    Messenger.threads.open = response_threads_this;

                }
                Messenger.chat.threads = res.threads;
                for (var i in res.messages) {
                    res.messages[i].updated_at_time = moment(res.messages[i].update_at, moment.ISO_8601).format('HH:mm');
                    res.messages[i].updated_at_date = moment(res.messages[i].update_at, moment.ISO_8601).format('DD.MM.YYYY');
                    if (res.messages[i].message) {
                        console.log(res.messages[i].message);
                        var m = res.messages[i].message.split('###' + _chat_e('lang_name') + '###');
                        for (var _k in m) {
                            if (m.hasOwnProperty(_k)) {
                                if (m[1])
                                    res.messages[i].message = m[1];
                                else
                                    res.messages[i].message = m[0];


                            }
                        }
                    }
                    Messenger.chat.data.unshift(res.messages[i]);
                }
                if (Messenger.chat.page == 1) {
                    Messenger.chat.prcScroll = 100;
                } else {
                    // $(Messenger.body.Chat.selector).mCustomScrollbar('scrollTo', Messenger.chat.lastElement, {
                    //     scrollInertia: 0
                    // });
                }


                Messenger.chat.callback && Messenger.chat.callback();
                // $(Messenger.body.Chat.selector).mCustomScrollbar('update');
                $("#contentMessageScroll").nanoScroller();
                if (Messenger.chat.prcScroll > 95) {
                    var thread_read_param = {};
                    thread_read_param[Messenger.chat.openChat_param_type] = Messenger.chat.openChat;
                    API('thread_read', thread_read_param);
                    Messenger.threads.data.forEach(function (el, i) {
                        if (el.id == Messenger.chat.openChat)
                            Messenger.threads.data[i].unread_count_this_thread = 0;
                    });
                    Messenger.threads.update();
                    setTimeout(function () {
                        $("#contentMessageScroll").nanoScroller().nanoScroller({scroll: 'bottom'});
                    }, 100);
                }
                if (res.messages.length == 0) {
                    ractiveComponent['wtc-ChatApp'].set('messages_more', false);
                }

                cb && cb();
            });
        },
        read_this_chat: function (data) {
            if (data._id == Messenger.chat.openChat || data.webtransfer_id == Messenger.chat.openChat) {
                for (var i in Messenger.chat.data) {
                    if (Messenger.chat.data.hasOwnProperty(i)) {
                        Messenger.chat.data[i].read_at = new Date().toString()
                    }
                }
            }
            setTimeout(function () {
                Messenger.chat.callback && Messenger.chat.callback();
            }, 10);

        },
        open: function (id, type) {
            Messenger.chat.openChat = id;
            Messenger.chat.openChat_param_type = type;
            Messenger.chat.scrollLoad = true;
            Messenger.chat.data = [];

            Messenger.chat.callback && Messenger.chat.callback();
            if (ractiveComponent['wtc-ChatApp']) ractiveComponent['wtc-ChatApp'].set('messages_load', false);
            Messenger.chat.page = 0;
            Messenger.chat.getHistory();
            var input = document.getElementById('send_text');
            input.focus();
            window.pos_caret = save_pos_caret();
            // input.select();

        },
        prcScroll: 100,
        lastElement: null,
        onscroll: function (values) {
            // console.log(values.maximum - values.position, values.position);
            Messenger.chat.pos = values.maximum - values.position;
            if (values.maximum - values.position < 50)
                Messenger.chat.prcScroll = 100;

            else
                Messenger.chat.prcScroll = 50;

            if (Messenger.chat.prcScroll == 100 && !Messenger.chat.read) {

                var thread_read_param = {};
                thread_read_param[Messenger.chat.openChat_param_type] = Messenger.chat.openChat;
                API('thread_read', thread_read_param);
                // Messenger.threads.data.forEach(function (el, i) {
                //     if (el.id == Messenger.chat.openChat)
                //         Messenger.threads.data[i].unread_count_this_thread = 0;
                // });
                Messenger.threads.update();

            }
        }
    },
    partners: {
        data: [],
        update: function () {
            API('contacts', {page: 'all'}, false, function (res) {
                res.contacts.forEach(function (el) {
                    el.last_online = moment(el.online_date, moment.ISO_8601).fromNow();
                });
                Messenger.partners.data = res.contacts;
                for (var k in  Messenger.partners.cb_function_arr) {
                    Messenger.partners.cb_function_arr[k](Messenger.partners.data);
                }
            });
        },
        cb_function_arr: [],
        callback_save: function (fn) {

            Messenger.partners.cb_function_arr.push(fn);
            if (Messenger.partners.data.length == 0) {
                Messenger.partners.update();
            } else {
                fn(Messenger.partners.data)
            }
        }
    },
    friends: {
        data: [],
        update: function () {
            API('getFriends', {page: 'all'}, false, function (res) {
                Messenger.friends.data = res.friends.map(function (el) {
                    el.friend.info.last_online = moment(el.friend.info.last_online_at, moment.ISO_8601).fromNow();
                    el.friend.info.full_name = el.friend.info.name_first + ' ' + el.friend.info.name_last;
                    return el.friend.info;
                });

                for (var k in  Messenger.friends.cb_function_arr) {
                    Messenger.friends.cb_function_arr[k](Messenger.friends.data);
                }
            });
        },
        cb_function_arr: [],
        callback_save: function (fn) {

            Messenger.friends.cb_function_arr.push(fn);
            if (Messenger.friends.data.length == 0) {
                Messenger.friends.update();
            } else {
                fn(Messenger.friends.data)
            }
        }
    },
    threads: {
        scrollLoad: true,
        data: [],
        page: 1,
        finish: false,
        update: function (next, no_sort) {

            if (Messenger.threads.data.length == 0) {
                Messenger.threads.data = [];
                Messenger.threads.page = 1;
                next = true;
            }

            if (next && !Messenger.threads.finish) {
                API('get_threads', {page: Messenger.threads.page}, false, function (res) {
                    if ((res.threads).length >= 30)
                        Messenger.threads.finish = false;
                    else
                        Messenger.threads.finish = true;

                    res.threads.forEach(function (el) {
                        var threads_index = _find(Messenger.threads.data, 'id', el.id);

                        if (el.updated_at != null) {
                            var date = el.updated_at.split('T')[0];
                            var update_time = moment(el.updated_at, moment.ISO_8601);
                            var date_now = moment().format('YYYY-MM-DD');
                            if (date_now == date) el.updated_at_text = update_time.format('HH:mm');
                            else if (moment().subtract(update_time.day(), 'day').hours(0).minutes(0).second(0) <= update_time && update_time.day() != 6) {
                                el.updated_at_text = update_time.format('ddd');
                            }
                            else el.updated_at_text = update_time.format('DD.MM.YY');
                            if (el.last_message) el.last_message = (el.last_message).replace(/<\/?[^>]+>/g, '');
                            if (el.avatar_path) el.avatar_path = el.avatar_path.replace('http://', 'https://');
                            if ('https://webtransfer.com/assets/missing_avatar_thumb.jpeg' == el.avatar_path) {
                                el.avatar_path = false;
                            }
                            if (el.last_message) {
                                var m = el.last_message.split('###' + _chat_e('lang_name') + '###');
                                for (var _k in m) {
                                    if (m.hasOwnProperty(_k)) {
                                        if (m[1])
                                            el.last_message = m[1];
                                        else
                                            el.last_message = m[0];
                                    }
                                }
                            }

                            el.my_id = MyProfile.webtransfer_id;
                            if (threads_index !== false)
                                Messenger.threads.data[threads_index] = el;
                            else
                                Messenger.threads.data.push(el);
                        }
                    });
                    Messenger.threads.update();
                    Messenger.threads.page++;
                    Messenger.threads.scrollLoad = true;
                });
                return false;
            }
            function sort_for_data(a, b) {
                if (moment(a.updated_at, moment.ISO_8601) < moment(b.updated_at, moment.ISO_8601)) return 1;
                if (moment(a.updated_at, moment.ISO_8601) > moment(b.updated_at, moment.ISO_8601)) return -1;
                return 0;
            }

            if (!no_sort)
                Messenger.threads.data.sort(sort_for_data);
            for (var k in  Messenger.threads.cb_function_arr) {
                Messenger.threads.cb_function_arr[k](Messenger.threads.data);
            }

        },
        cb_function_arr: {},
        callback_save: function (name, fn) {

            Messenger.threads.cb_function_arr[name] = fn;
            if (Messenger.threads.data.length == 0) {
                Messenger.threads.update();
            } else {
                fn(Messenger.threads.data)
            }
        }
    },
    auth_action: {
        status: false,
        cb_function_arr: [],
        call_wait_auth: function (fn) {
            if (!Messenger.auth_action.status) {
                Messenger.auth_action.cb_function_arr.push(fn);
            } else {
                fn();
            }
        },
        auth_emit: function () {
            if (!Messenger.auth_action.status) {
                Messenger.auth_action.status = true;
                for (var k in  Messenger.auth_action.cb_function_arr) {
                    Messenger.auth_action.cb_function_arr[k]();
                }
                Messenger.auth_action.cb_function_arr = [];
            }
        },
        FingerprintAuth: function (text, success_cb, error_cb) {
            console.log(" FingerprintAuth testing...");
            if (!window.touchid) {
                error_cb && error_cb({
                    error: 'Auth error',
                    code: 404,
                    ios: false,
                    android: false
                })
            }
            if (!MyProfile.secure_touch_id) {
                error_cb && error_cb({
                    error: 'Auth error',
                    code: 429,
                    ios: false,
                    android: false
                })
            }

            touchid.checkSupport(function () {
                console.log("touchid available: " + text);

                touchid.authenticate(function () {
                    success_cb && success_cb({ios: true});
                }, function () {
                    error_cb && error_cb({
                        error: 'Auth error',
                        code: 403,
                        ios: 'touch id authenticate error',
                        android: false
                    })
                }, text);

            }, function () {
                FingerprintAuth.isAvailable(function (result) {
                    console.log("FingerprintAuth available: " + text);
                    if (result.isAvailable) {
                        var encryptConfig = {
                            clientId: "com.telegraf.money",
                            username: "currentUser",
                            password: "currentUserPassword",
                            dialogTitle: _chat_e('Подтверждения действия'),
                            dialogMessage: text
                        };

                        FingerprintAuth.encrypt(encryptConfig, function (result) {
                            if (result.withFingerprint) {
                                success_cb && success_cb(result);
                            } else if (result.withBackup) {
                                error_cb && error_cb({
                                    error: 'Auth error',
                                    code: 403,
                                    ios: false,
                                    android: 'FingerprintAuth password error'
                                });
                            }
                        }, function (error) {
                            if (error === "Cancelled") {
                                error_cb && error_cb({
                                    error: 'Auth error',
                                    code: 403,
                                    ios: false,
                                    android: 'FingerprintAuth Cancelled'
                                });
                            } else {
                                error_cb && error_cb({
                                    error: 'Auth error',
                                    code: 403,
                                    ios: false,
                                    android: 'FingerprintAuth error: ' + error
                                })
                            }
                        });
                    } else {
                        error_cb && error_cb({
                            error: 'Auth error',
                            code: 403,
                            ios: false,
                            android: 'FingerprintAuth error'
                        })

                    }
                }, function (message) {
                    error_cb && error_cb({
                        error: 'Not found fingerprint',
                        code: 404,
                        ios: 'checkSupport: false',
                        android: message
                    })
                });
            });
        }
    },
    auth: function (data) {

        if (data.status && data.status == 'success') {
            clearTimeout(auth_timeout);
            MyProfile = data.user;
            Messenger.MyProfileUpdate();
            Messenger.auth_action.auth_emit();
            if (param_url_this().openDialog) {
                Messenger.setPage('chats');
                Messenger.openChat(false, param_url_this().openDialog);
                setTimeout(function () {
                    Messenger.setPage('chats')
                }, 1000);
            }

            else if (param_url_this().default_page) {
                var arr_d_page = param_url_this().default_page.split(':');
                if ('chat' == arr_d_page[0]) {
                    if ('threads_id' == arr_d_page[1]) {
                        Messenger.openChat(false, false, arr_d_page[2]);
                    }
                    if ('recipient_id' == arr_d_page[1]) {
                        Messenger.openChat(false, arr_d_page[2]);
                    }
                }
            }
            API('countUnreadMessage', {}, false, function (data) {
                Messenger.setNotificationsCount(data.count);
                // setTimeout(MessengerPanel.showPanel, 1000)
            });

            Messenger.finance.callback_save(function (cards) {
                ractiveComponent['rootApp'].set('finance_cards', cards);
                if (cards && cards.length == 0 && Messenger.finance.callback_cnt >= 1 && Messenger.finance.callback_cnt < 100) {
                    Messenger.finance.callback_cnt = 101;
                    // Messenger.setPage('debitcoin');
                }
                Messenger.finance.callback_cnt++;
                ractiveComponent['rootApp'].set('finance_cards_load', true);
            });
            if (Messenger.finance.update_wait)
                Messenger.finance.update();

            if (localStorage.getItem("post1") != 'see') {

                if (new Date('2017-04-25 23:44:17').getTime() > new Date().getTime()) {
                    swal({
                        customClass: 'swal-telegraf-modal select-form text-rg',
                        buttonsStyling: false,
                        confirmButtonClass: 'button-n',
                        cancelButtonClass: 'cansel-btns',
                        title: '',
                        type: '',
                        confirmButtonText: _chat_e('Ок'),
                        showCancelButton: false,
                        html: '<img src="https://s3-us-west-2.amazonaws.com//telegraf-ava/avatar/10989451.png" style="     position: relative;     width: 21px; "><span class="fcg" style=" ">   <span class="fwb"><a class="pointer">Telegraf Money</a></span>   ' + _chat_e('поделился(-ась)') + ' <a class="pointer">' + _chat_e('публикацией') + '</a> .</span><hr style="margin: 10px;">  ' + _chat_e('Репостни и получи $25 на ЭПС или карту WT VISA') + '<br>' + _chat_e('Всё просто: нужно сделать репост записи, указанной ниже!') + '<br>' + _chat_e('Конкурс считается действительным, если его поддержали 100 участников!') + '<br>' + _chat_e('Победитель будет выбран случайным образом из числа репостнувших 25.04.2017') + '<br> ❗️' + _chat_e('Если конкурсы будут пользоваться популярностью, то они будут проходить на постоянной основе при поддержке партнеров!') + '<br><iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FTelegrafMoney%2Fphotos%2Fa.1327454147273051.1073741828.1318448904840242%2F1549842071700923%2F%3Ftype%3D3%26theater&width=500&show_text=true&appId=316202461909215&height=426" width="100%" style="    border: none;overflow: hidden;height: 400px;margin-top: 10px;background: #fff;" scrolling="no" frameborder="0" allowTransparency="true"></iframe>'
                    })

                }
                localStorage.setItem("post1", 'see');
            }


        } else {
            if (localStorage.getItem('installTime') !== 'crypto.wallet.eth.auth')
                swal({
                    title: _chat_e('Уппс...'),
                    text: _chat_e("Попробуйте авторизоавтся повторно или перегрузить приложение."),
                    customClass: 'swal-telegraf-modal',
                    buttonsStyling: false,
                    confirmButtonClass: 'button-n',
                    cancelButtonClass: 'cansel-btns',
                    showCancelButton: true,
                    type: 'error',
                    cancelButtonText: _chat_e('Перегрузить'),
                    confirmButtonText: _chat_e('Выйти'),
                    showLoaderOnConfirm: true,
                    preConfirm: function () {


                        return new Promise(function (resolve, reject) {
                            var t = setTimeout(function () {
                                reject(_chat_e('Ошибка сервер недоступен.'));
                            }, 10000);
                            API('logout_this_user', {
                                code: localStorage.getItem("installTime"),
                                uuid: localStorage.getItem("uuid")
                            }, true, function (response) {
                                clearTimeout(t);
                                localStorage.clear();
                                resolve()
                            });
                            setTimeout(function () {
                                localStorage.clear();
                                location.reload();
                            }, 4999);


                        })
                    },
                    allowOutsideClick: false
                }).then(function () {
                    location.reload();
                    swal.closeModal()
                }, function () {
                    location.reload();
                    swal.closeModal()
                });
            else {
                var priv = localStorage.getItem('walletPrivateKey');
                var address_my = keythereum.privateKeyToAddress(priv);
                MyProfile = {
                    first_name: address_my,
                    last_name: "",
                    name_short: address_my[2] + address_my[3],
                    status: "success",
                    webtransfer_id: address_my
                };
                localStorage.setItem('MyProfile', JSON.stringify(MyProfile));
                Messenger.MyProfileUpdate();
                noty({
                    text: _chat_e('Не удается установить соединение с серверами Telegraf.Money'),
                    type: 'error',
                    theme: 'metroui',
                    layout: 'top',
                    timeout: 3000,
                    progressBar: true
                });
            }

        }
    },
    serverDisconnect: function () {
        console.warn('server:serverDisconnect');
    },
    openChat: function (user, recipient_id, threads_id) {
        Messenger.setPage('dialog');
        if (user) {
            user.last_online = moment(user.last_online_at, moment.ISO_8601).fromNow();
            console.log(user);
            console.log(user.last_online_at);
            ractiveComponent['rootApp'].set('open_threads', user);
            Messenger.threads.open = user;

            if (user.id)
                Messenger.chat.open(user.id, 'threads_id');
            else
                Messenger.chat.open(user.webtransfer_id, 'recipient_id');
        }
        if (recipient_id) {
            API('userInfo', {webtransfer_id: recipient_id}, false, function (response) {
                response = {
                    full_name: response.user.name_first + ' ' + response.user.name_last,
                    last_online_at: response.user.last_online_at,
                    name_short: response.user.name_short,
                    webtransfer_id: response.user.webtransfer_id,
                    avatar_path: response.user.avatar_path
                };
                ractiveComponent['rootApp'].set('open_threads', response);
                Messenger.threads.open = response;
                Messenger.chat.open(recipient_id, 'recipient_id');

            }, true);
        }
        if (threads_id)
            API('create_thread', {threads_id: threads_id}, false, function (response) {
                response = {
                    avatar_path: response.threads.avatar_path | false,
                    count_reviews: response.threads.count_reviews | 0,
                    full_name: response.threads.full_name,
                    group_name: response.threads.group_name,
                    group_photo: response.threads.group_photo,
                    group_verefy: response.threads.group_verefy,
                    id: response.threads._id,
                    last_message: response.threads.last_message.message,
                    last_message_messageId: response.threads.last_message.messageId,
                    last_message_read: response.threads.last_message.read,
                    last_message_sender_id: response.threads.last_message.sender,
                    last_online: "Invalid date",
                    last_online_at: false,
                    my_id: MyProfile.webtransfer_id,
                    name_short: "SL",
                    rating: 0,
                    spam: false,
                    type_threads: response.threads.type,
                    unread_count_this_thread: 0,
                    updated_at: response.threads.update_at,
                    updated_at_text: "11:28",
                    user_count: response.threads.user_count,
                    users: response.threads.users,
                    webtransfer_id: "5873d832343077901c725cf1"
                };
                var u = response;
                if (u && u.last_online_at) {
                    u.last_online = moment(u.last_online_at, moment.ISO_8601).fromNow();
                    ractiveComponent['rootApp'].set('open_threads', u);
                }
                ractiveComponent['rootApp'].set('open_threads', response);
                Messenger.threads.open = response;
                Messenger.chat.open(response.id, 'threads_id');

            }, true);

    },

    push: {
        registrationId: null,
        push: null,
        setup: function (senderID) {
            Messenger.push.push = PushNotification.init({
                android: {
                    senderID: senderID || "290044042540"
                },
                browser: {
                    pushServiceURL: 'http://push.api.phonegap.com/v1/push'
                },
                "ios": {
                    "alert": "true",
                    "badge": "true",
                    "sound": "true"
                },
                windows: {}
            });
            Messenger.push.push.on('registration', function (data) {
                console.log('registration event: ' + data.registrationId);

                var oldRegId = localStorage.getItem('registrationId');
                if (oldRegId !== data.registrationId) {
                    // Save new registration ID
                    localStorage.setItem('registrationId', data.registrationId);
                    // Post registrationId to your app server as the value has changed
                }
                Messenger.push.registrationId = data.registrationId;
                ractiveComponent['rootApp'].set('registrationId', data.registrationId);


            });

            Messenger.push.push.on('error', function (e) {
                // alert(e.message);
                console.log("push error = " + e.message);
            });

            Messenger.push.push.on('notification', function (data) {
                if (data.additionalData.foreground == false && data.additionalData.coldstart == false) {
                    if (data.additionalData.key_action) {
                        var param_ = data.additionalData.key_action.split(':');
                        switch (param_[0]) {
                            case 'chat':
                                if (!isNaN(+param_[1]))
                                    Messenger.openChat(false, +param_[1]);

                                break;
                            case 'thread':
                                if (!isNaN(+param_[1]))
                                    Messenger.openChat(false, false, +param_[1]);

                                break;
                        }
                    }
                }
                console.log('notification event', arguments);
                // navigator.notification.alert(
                //     data.message,         // message
                //     null,                 // callback
                //     data.title,           // title
                //     'Ok'                  // buttonName
                // );
            });

        }
    },
    share: function () {
        var options = {
            message: _chat_e('Скачай Telegraf.Money Messenger со встроенной бесплатной картой VISA/MC и получи бонус $50'), // not supported on some apps (Facebook, Instagram)
            subject: _chat_e('Скачай Telegraf.Money Messenger со встроенной бесплатной картой VISA/MC и получи бонус $50'), // fi. for email
            url: 'https://telegraf.money/?ref=' + MyProfile.webtransfer_id,
            chooserTitle: 'Invite friends to Telegraf' // Android only, you can override the default share sheet title
        };
        if (window && window.plugins && window.plugins.socialsharing)
            window.plugins.socialsharing.shareWithOptions(options, function (result) {

            }, function (msg) {
                swal({
                    customClass: 'swal-telegraf-modal select-form text-center',
                    buttonsStyling: false,
                    confirmButtonClass: 'button-n',
                    cancelButtonClass: 'cansel-btns',
                    title: _chat_e('Ошибка'),
                    type: 'error',
                    confirmButtonText: _chat_e('Ok'),
                    cancelButtonText: _chat_e('Отменить'),
                    showCancelButton: false,
                    text: _chat_e('Не удалось отправить партнерскую ссылку')
                });
            });
        else swal.close();
    },
    crypto: {

        wallets: window.__crypto_wallets || [],
        add: function (address, type, privateKey, client) {
            for (var key in  Messenger.crypto.wallets) {
                if (Messenger.crypto.wallets[key].address === address && Messenger.crypto.wallets[key].type === type) {
                    return false;
                }
            }
            Messenger.crypto.wallets.push({address: address, type: type, privateKey: privateKey, client: client});
            Messenger.crypto.update(address);
            lsbridge.send('crypto_wallets', Messenger.crypto.wallets);
            localStorage.setItem('crypto_wallets_db', JSON.stringify(Messenger.crypto.wallets));
            return true;
        },
        update: function (address) {
            for (var key in  Messenger.crypto.wallets) {
                if (address) {
                    if (Messenger.crypto.wallets[key].address === address) {
                        Crypto.getBalance(Messenger.crypto.wallets[key].address, Messenger.crypto.wallets[key].type, function (_address, type, balance) {
                            for (var key1 in  Messenger.crypto.wallets) {
                                if (Messenger.crypto.wallets[key1].address === _address && Messenger.crypto.wallets[key1].type === type) Messenger.crypto.wallets[key].balance = balance;
                            }
                            lsbridge.send('crypto_wallets', Messenger.crypto.wallets);
                            localStorage.setItem('crypto_wallets_db', JSON.stringify(Messenger.crypto.wallets));
                        });
                    }
                } else {
                    Crypto.getBalance(Messenger.crypto.wallets[key].address, Messenger.crypto.wallets[key].type, function (_address, type, balance) {
                        for (var key1 in  Messenger.crypto.wallets) {
                            if (Messenger.crypto.wallets[key1].address === _address && Messenger.crypto.wallets[key1].type === type) Messenger.crypto.wallets[key].balance = balance;
                        }
                        lsbridge.send('crypto_wallets', Messenger.crypto.wallets);
                        localStorage.setItem('crypto_wallets_db', JSON.stringify(Messenger.crypto.wallets));
                    });
                }


            }
        },
        remove: function (address, type) {
            for (var key in  Messenger.crypto.wallets) {
                if (Messenger.crypto.wallets[key].address === address && Messenger.crypto.wallets[key].type === type) {
                    Messenger.crypto.wallets[key] = undefined;
                    lsbridge.send('crypto_wallets', Messenger.crypto.wallets);
                    localStorage.setItem('crypto_wallets_db', JSON.stringify(Messenger.crypto.wallets));
                    return true;
                }
            }
            return false;
        },
        find: function (address, type) {
            for (var key in  Messenger.crypto.wallets) {
                if (Messenger.crypto.wallets[key].address === address && Messenger.crypto.wallets[key].type === type)
                    return Messenger.crypto.wallets[key];

            }
            return false;
        }
    }
};


// animate css =>
$.fn.extend({
    animateCss: function (animationName, cb) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);
            cb && cb();
        });
    }
});
function scan_card_by_id(card_id) {
    var finance_cards = Messenger.finance.cards;
    for (var key in  finance_cards) {
        if (finance_cards[key].card_id == card_id) {
            return finance_cards[key];
        }
    }
}
function secure(text, s_cb, e_cb, target) {
    API('get_user_security_info', {target: target}, false, function (response) {
        if (response.status != 'success') return swal({
            customClass: 'swal-telegraf-modal select-form text-center',
            buttonsStyling: false,
            confirmButtonClass: 'button-n',
            cancelButtonClass: 'cansel-btns',
            title: _chat_e('Ошибка'),
            type: 'error',
            confirmButtonText: _chat_e('Ok'),
            cancelButtonText: _chat_e('Отменить'),
            showCancelButton: false,
            text: _chat_e('Не удалось получить настройки безопасности для определненния типа  поддтверждения')
        });
        var text_secure = '';
        var type_secure = 'loan_api_check';
        if ('one_pass' == response.security_type) {
            text_secure = _chat_e('Введите код номер:') + ' <strong>' + response.security_code_num + '</strong> ' + _chat_e('из таблици кодов:') + ' <strong style="font-size: 10px;">' + response.security_code_table_num + '</strong>';
        }
        if ('code' == response.security_type) {
            text_secure = _chat_e('Введите код из приложения') + ' <strong>Webtransfer Auth</strong>';
        }
        if ('otp' == response.security_type) {
            text_secure = _chat_e('Введите код из ') + ' <strong>Google Auth</strong>';
            type_secure = 'otp';
        }
        if ('email' == response.security_type) {
            text_secure = _chat_e('Ваш код отправлен вам на почту: ') + ' <strong>' + MyProfile.email + '</strong>';
        }
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
            '<img class="img-main-section mx-wth-area" src="./src/img/user-s.png" onerror="this.src=\'../../.\'+this.src;this.onerror = null;">' +
            '<form action="#" onsubmit="return false;">' +
            '<div class="select-form">' +
            '<label>' + text_secure + '</label>' +
            '<input class="form-control" placeholder="' + _chat_e('Ваш код') + '" id="code_user_secure" autocomplete="off"></div>' +
            '</form>' +
            '<p class="spls-p">' + text + '</p>' +
            '<br>' +
            '</div>'
        }).then(function (result) {
            // API('check_user_code', {code: $('#code_user_secure').val(), purpose: 'loan_api_check'});
            s_cb && s_cb({code: $('#code_user_secure').val(), type: type_secure, success: true})
        }, function () {
            e_cb && e_cb();
        });
        // Messenger.auth_action.FingerprintAuth(text, function () {
        //     s_cb && s_cb({type: 'touch_purpose', success: true})
        // }, function () {
        //     swal({
        //         // title: 'Подтверждение',
        //         // type: 'question',
        //         customClass: 'swal-telegraf-modal select-form text-center',
        //         buttonsStyling: false,
        //         confirmButtonClass: 'button-n',
        //         cancelButtonClass: 'cansel-btns',
        //         confirmButtonText: _chat_e('Подтвердить'),
        //         cancelButtonText: _chat_e('Отменить'),
        //         showCancelButton: true,
        //         text: '<div class="mv-area code-area-sec">' +
        //         '<img class="img-main-section mx-wth-area" src="./src/img/user-s.png" onerror="this.src=\'../../.\'+this.src;this.onerror = null;">' +
        //         '<form action="#" onsubmit="return false;">' +
        //         '<div class="select-form">' +
        //         '<label>' + text_secure + '</label>' +
        //         '<input class="form-control" placeholder="Ваш код" id="code_user_secure" autocomplete="off"></div>' +
        //         '</form>' +
        //         '<p class="spls-p">' + text + '</p>' +
        //         '<br>' +
        //         '</div>'
        //     }).then(function (result) {
        //         // API('check_user_code', {code: $('#code_user_secure').val(), purpose: 'loan_api_check'});
        //         s_cb && s_cb({code: $('#code_user_secure').val(), type: 'loan_api_check', success: true})
        //     }, function () {
        //         e_cb && e_cb();
        //     });
        // });

    }, true);
}
procent = 0.05;
// animate css <=
Messenger.on('ComponentsOnRender', function (name) {
    console.log('ComponentsOnRender:' + name);

});
window.onpopstate = function (event) {
    if (location.hash.replace('#', '').split('-')[0] && location.hash.replace('#', '').split('-')[0] != '')
        Messenger.setPage(location.hash.replace('#', '').split('-')[0], location.hash.replace('#', '').split('-')[1], true);

    console.log('Messenger.setPage', location.hash.replace('#', '').split('-')[0], location.hash.replace('#', '').split('-')[1]);
};
