var NwBuilder = require('nw-builder');
var nw = new NwBuilder({
    buildDir:'../_build_desktop_app',
    cacheDir:'../cache_nwjs',
    version: '0.21.6',
    files: './**/**', // use the glob format
    platforms: ['osx64','win32', 'win64'],//
    appName:'Telegraf Money',
    appVersion:'2.11.50',
    macIcns: './src/img/logo.icns',
    zip:true
    // winIco: './src/img/winlogo.ico',

});

//Log stuff you want
nw.on('log',  console.log);

// Build returns a promise
nw.build().then(function () {
    console.log('all done!');
}).catch(function (error) {
    console.error(error);
});