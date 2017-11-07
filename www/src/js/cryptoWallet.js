var abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [{"name": "", "type": "string"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_spender", "type": "address"}, {"name": "_value", "type": "uint256"}],
        "name": "approve",
        "outputs": [{"name": "success", "type": "bool"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_disable", "type": "bool"}],
        "name": "disableTransfers",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "MiningRewardPerETHBlock",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_from", "type": "address"}, {"name": "_to", "type": "address"}, {
            "name": "_value",
            "type": "uint256"
        }],
        "name": "transferFrom",
        "outputs": [{"name": "success", "type": "bool"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{"name": "", "type": "uint8"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_amount", "type": "uint256"}],
        "name": "ChangeMiningReward",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "version",
        "outputs": [{"name": "", "type": "string"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "standard",
        "outputs": [{"name": "", "type": "string"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_token", "type": "address"}, {"name": "_to", "type": "address"}, {
            "name": "_amount",
            "type": "uint256"
        }],
        "name": "withdrawTokens",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "acceptOwnership",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_to", "type": "address"}, {"name": "_amount", "type": "uint256"}],
        "name": "issue",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [{"name": "", "type": "string"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_from", "type": "address"}, {"name": "_amount", "type": "uint256"}],
        "name": "destroy",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}],
        "name": "transfer",
        "outputs": [{"name": "success", "type": "bool"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "transfersEnabled",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "TransferMinersReward",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "newOwner",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "", "type": "address"}, {"name": "", "type": "address"}],
        "name": "allowance",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "lastBlockRewarded",
        "outputs": [{"name": "", "type": "uint256"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_newOwner", "type": "address"}],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "inputs": [{"name": "_name", "type": "string"}, {"name": "_symbol", "type": "string"}, {
            "name": "_decimals",
            "type": "uint8"
        }], "payable": false, "type": "constructor"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": false, "name": "_token", "type": "address"}],
        "name": "DebitCoinTokenGenesis",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": false, "name": "_amount", "type": "uint256"}],
        "name": "Issuance",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": false, "name": "_amount", "type": "uint256"}],
        "name": "Destruction",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": false, "name": "_amount", "type": "uint256"}],
        "name": "MiningRewardChanged",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "name": "_from", "type": "address"}, {
            "indexed": true,
            "name": "_to",
            "type": "address"
        }, {"indexed": false, "name": "_value", "type": "uint256"}],
        "name": "MiningRewardSent",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": false, "name": "_prevOwner", "type": "address"}, {
            "indexed": false,
            "name": "_newOwner",
            "type": "address"
        }],
        "name": "OwnerUpdate",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "name": "_from", "type": "address"}, {
            "indexed": true,
            "name": "_to",
            "type": "address"
        }, {"indexed": false, "name": "_value", "type": "uint256"}],
        "name": "Transfer",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "name": "_owner", "type": "address"}, {
            "indexed": true,
            "name": "_spender",
            "type": "address"
        }, {"indexed": false, "name": "_value", "type": "uint256"}],
        "name": "Approval",
        "type": "event"
    }
]; // ABI Contract
var _contract_fixed = 100000000;
var _address = '0x95408930d6323ac7aa69e6c2cbfe58774d565fa8'; // smart contract address
function str2ab(str) {
    var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

function etherscan(name, address, get, post, callback) {
    var data_get = '';
    for (var i in get) {
        if (get.hasOwnProperty(i))
            data_get += i + '=' + get[i] + '&';
    }

    $.ajax({
        url: 'https://api.etherscan.io' + '/' + name + '/' + address + '?' + data_get,
        method: 'POST',
        data: post,
        success: function (res) {
            callback && callback(res);
        }, error: function (err) {
            noty({
                text: _chat_e('Не удалось загрузить список транзакций'),
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
        }
    //module=account&action=txlist&address=0x6ccf22254ae5ced5bc9fed7ce7724b8b2039df50&page=1&offset=10&sort=desc&apikey=freekey
    });
}

function ethplorer(name, address, get, post, callback) {
    var data_get = ''; // user_id=500150&
    var data_post = ''; // user_id=500150&
    for (var i in get) {
        if (get.hasOwnProperty(i))
            data_get += i + '=' + get[i] + '&';
    }
    for (var i1 in post) {
        if (post.hasOwnProperty(i1))
            data_post += i1 + '=' + post[i1] + '&';
    }
    $.ajax({
        url: 'https://api.ethplorer.io' + '/' + name + '/' + address + '?' + data_get,
        method: 'POST',
        data: post,
        success: function (res) {
            if(res)
            res= JSON.parse(res);
            callback && callback(res);
        }, error: function (err) {
            noty({
                text: _chat_e('Не удалось загрузить список транзакций'),
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
            callback && callback({});

        }
        //module=account&action=txlist&address=0x6ccf22254ae5ced5bc9fed7ce7724b8b2039df50&page=1&offset=10&sort=desc&apikey=freekey
    });
}
function createWalletETH(callback) {


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
        _e('Этот пароль шифрует ваш закрытый ключ. Он не является способом для генерации ваших ключей. Вам понадобится этот пароль + ваш секретный ключ, чтобы разблокировать ваш кошелек.') +
        '</div></div>' +
        '<form action="#" onsubmit="return false;" style="margin-top: 20px;">' +
        '<div class="select-form" style="padding-bottom: 15px;">' +
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

                var a = window.document.createElement('a');
                a.href = window.URL.createObjectURL(new Blob([dataKeyStoreFile], {type: 'text'}));
                a.download = FileNameKeyStoreFile;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                keythereum.recover(pass_wallet, keyObject, function (privateKey) {
                    callback && callback(keythereum.privateKeyToAddress(privateKey.toString('hex')), privateKey.toString('hex'), 'ETH');
                });
                try {
                    if (window.cordova && window.cordova.file) {
                        var fileTransfer = new FileTransfer();
                        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) {
                            fileTransfer.download(
                                window.URL.createObjectURL(new Blob([dataKeyStoreFile], {type: 'text'})),
                                dirEntry,
                                function (entry) {
                                    console.log("download complete: " + entry.toURL());
                                },
                                function (error) {
                                    console.log("download error source " + error.source);
                                    console.log("download error target " + error.target);
                                    console.log("download error code" + error.code);
                                },
                                false,
                                {
                                    headers: {
                                        "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                                    }
                                }
                            );
                        });
                    }
                } catch (e) {
                    console.error('ERR DOWNL FILE 4214: ', e)
                }
            });
            swal.showLoading();
        }, 2500)
    }, function () {
        swal.close();
    });


}
function importFromPrivateKeyETH(callback) {
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
        '<h3 style="font-size: 28px;">' + _chat_e('Импорт крипто кошелька...') + '</h3>' +
        '<form action="#" onsubmit="return false;" style="margin-top: 20px;">' +
        '<div class="select-form" style="padding-bottom: 15px;">' +
        '<label>' + _chat_e('Private Key:') + '</label>' +
        '<input class="form-control" placeholder="0x..................." id="code_sms12" autocomplete="off" type="text"></div>' +
        '</form>' +
        // '<p class="spls-p">' + text + '</p>' +
        '<br>' +
        '</div>'
    }).then(function (result) {
        var privateKey = $('#code_sms12').val();
        callback && callback(keythereum.privateKeyToAddress(privateKey), privateKey, 'ETH');
    });
}
function importFromKeyStoreETH(e, callback) {
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
                    swal.close();

                    callback && callback(keythereum.privateKeyToAddress(privateKey.toString('hex')), privateKey.toString('hex'), 'ETH');
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
var contract = false;
var Crypto = {
    getBalance: function (addr, type, cb) {
        if (type === 'ETH') {

            cb && cb(addr, type, (+web3.eth.getBalance(addr) / 1000000000000000000).toFixed(4));
        }
        if (type === 'DBC') {
            if(! contract) contract = web3.eth.contract(abi).at(_address);
            cb && cb(addr, type, (+contract.balanceOf(addr) / _contract_fixed).toFixed(2));
        }
        if (type === 'BTC') {
            cb && cb(addr, type, 0.00.toFixed(6));
        }

    },

    find: function (address, type) {
        for (var key in  Messenger.crypto.wallets) {
            if (Messenger.crypto.wallets[key].address === address && Messenger.crypto.wallets[key].type === type)
                return Messenger.crypto.wallets[key];

        }
        return false;
    },
    transferETH: function (param, cb) {

        var wallet = this.find(param.from, "ETH");
        if (!wallet) {
            return swal({
                customClass: 'swal-telegraf-modal select-form text-center',
                title: _chat_e('Уппс...'),
                type: 'error',
                confirmButtonText: _chat_e('Ок'),
                showCancelButton: false,
                text: _chat_e('Не удалось аутентифицировать ваш кошелек')
            });
        }


        var tx = new ethereumjs.Tx({
            nonce: ethUtil.intToHex(web3.eth.getTransactionCount(wallet.address, "pending")),
            gasPrice: ethUtil.intToHex(param.gasPrice * 1000000000),
            gasLimit: ethUtil.intToHex(80000),
            to: param.to,
            from: wallet.address,
            value: web3.toHex(web3.toWei(+param.amount, 'ether')),
            "chainId": 1
        });
        tx.sign(ethereumjs.Buffer.Buffer(wallet.privateKey, 'hex'));

        var serializedTx = tx.serialize();

        web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
            if (err) {
                console.error('Error (web3.eth.sendRawTransaction):', err, hash);
                return swal({
                    customClass: 'swal-telegraf-modal select-form text-center',
                    title: _chat_e('Уппс...'),
                    type: 'error',
                    confirmButtonText: _chat_e('Ок'),
                    showCancelButton: false,
                    text: _chat_e('Ошибка отправки транзакции')
                });
            }
            console.log(hash);
            cb && cb(hash);
        });
    },
    transferDBC: function (param, cb) {

        var wallet = this.find(param.from, "DBC");
        if (!wallet) {
            return swal({
                customClass: 'swal-telegraf-modal select-form text-center',
                title: _chat_e('Уппс...'),
                type: 'error',
                confirmButtonText: _chat_e('Ок'),
                showCancelButton: false,
                text: _chat_e('Не удалось аутентифицировать ваш кошелек')
            });
        }


        var tx = new ethereumjs.Tx({
            nonce: ethUtil.intToHex(web3.eth.getTransactionCount(wallet.address, "pending")),
            gasPrice: ethUtil.intToHex(param.gasPrice * 1000000000),
            gasLimit: ethUtil.intToHex(80000),
            to: _address,
            from: wallet.address,
            value: '0x00',
            data:contract.transfer.getData(param.to,+param.amount*_contract_fixed),
            "chainId": 1
        });
        tx.sign(ethereumjs.Buffer.Buffer(wallet.privateKey, 'hex'));

        var serializedTx = tx.serialize();

        web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
            if (err) {
                console.error('Error (web3.eth.sendRawTransaction):', err, hash);
                return swal({
                    customClass: 'swal-telegraf-modal select-form text-center',
                    title: _chat_e('Уппс...'),
                    type: 'error',
                    confirmButtonText: _chat_e('Ок'),
                    showCancelButton: false,
                    text: _chat_e('Ошибка отправки транзакции')
                });
            }
            console.log(hash);
            cb && cb(hash);
        });
    },
    transferERC20: function (param, cb) {

        var wallet = this.find(param.from, find);
        if (!wallet) {
            return swal({
                customClass: 'swal-telegraf-modal select-form text-center',
                title: _chat_e('Уппс...'),
                type: 'error',
                confirmButtonText: _chat_e('Ок'),
                showCancelButton: false,
                text: _chat_e('Не удалось аутентифицировать ваш кошелек')
            });
        }


        var tx = new ethereumjs.Tx({
            nonce: ethUtil.bufferToHex(web3.eth.getTransactionCount(wallet.address, "pending")),
            gasPrice: ethUtil.bufferToHex(param.gasPrice * 1000000000),
            gasLimit: ethUtil.bufferToHex(80000),
            to: param.to,
            from: wallet.address,
            value: web3.toHex(web3.toWei(+param.amount, 'ether')),
            "chainId": 1
        });
        tx.sign(ethereumjs.Buffer.Buffer(wallet.privateKey));

        var serializedTx = tx.serialize();

        web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
            if (err) {
                console.error('Error (web3.eth.sendRawTransaction):', err, hash);
                return swal({
                    customClass: 'swal-telegraf-modal select-form text-center',
                    title: _chat_e('Уппс...'),
                    type: 'error',
                    confirmButtonText: _chat_e('Ок'),
                    showCancelButton: false,
                    text: _chat_e('Ошибка отправки транзакции')
                });
            }
            cb && cb(hash);
        });
    }
};
