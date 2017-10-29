
var gui = require('nw.gui');
var pkg = require('../appUpdate.json'); // Insert your app's manifest here
var updater = require('node-webkit-updater');
var upd = new updater(pkg);
var copyPath, execPath;

// Args passed when new app is launched from temp dir during update
if(gui.App.argv.length) {
    // ------------- Step 5 -------------
    copyPath = gui.App.argv[0];
    execPath = gui.App.argv[1];

    // Replace old app, Run updated app from original location and close temp instance
    upd.install(copyPath, function(err) {
        if(!err) {

            // ------------- Step 6 -------------
            upd.run(execPath, null);
            gui.App.quit();
        }
    });
}
else { // if no arguments were passed to the app

    // ------------- Step 1 -------------
    upd.checkNewVersion(function(error, newVersionExists, manifest) {
        console.warn('checkNewVersion',arguments);
        if (!error && newVersionExists) {

            // ------------- Step 2 -------------
            upd.download(function(error, filename) {
                console.warn('download',arguments);

                if (!error) {

                    // ------------- Step 3 -------------
                    upd.unpack(filename, function(error, newAppPath) {
                        console.warn('unpack',arguments);

                        if (!error) {

                            // ------------- Step 4 -------------
                            upd.runInstaller(newAppPath, [upd.getAppPath(), upd.getAppExec()],{});
                            // gui.App.quit();
                            swal('Update','Приложение  обновилось но новой версии','success');
                            console.warn('upd.runInstaller(newAppPath, [upd.getAppPath(), upd.getAppExec()],{});');
                            console.warn('gui.App.quit();');

                        }
                    }, manifest);
                }
            }, manifest);
        }
    });
}
//
//     var notifier = require('./node-notifier');
// // String
// // notifier.notify('Message');
//
// // Object
//     function notif_nw() {
//
//         notifier.notify({
//             title: 'Telegraf Money',
//             message: 'Hi user in telegraf money!',
//             appIcon: './logo500.png',
//             sound: true,
//             reply: 'Введите сообщение...'
//         }, function (err, response, metadata) {
//             if (err) throw err;
//             console.log(response, metadata);
//
//         });
//
//         notifier.on('replied', function (obj, options, metadata) {
//             console.log('User replied', metadata);
//         });
//
//     }
// // notif_nw();
