/**
 * Created by bogdanmedvedev on 09.01.17.
 */
"use strict";
var fs = require('fs'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser();
var xml_string = fs.readFileSync("./config.xml");

var nw_update_conf = {
    "name": "Telegraf Money",
    "version": "0.0.2",
    "author": "Telegraf Money LLC <development@telegraf.money>",
    "manifestUrl": "https://telegraf.money/telegraf.money/www/appUpdate.json",
    "packages": {
        "mac": {
            "url": "https://telegraf.money/telegraf.money/www/macos.zip"
        },
        "win": {
            "url": "https://telegraf.money/telegraf.money/www/updapp.zip"
        }
    }
};
parser.parseString(xml_string, function (err, result) {
    fs.writeFile("./config-xml-backup/config-version-" + result.widget['$'].version + ".xml", xml_string);
    var ver = result.widget['$'].version.split('.');
    if (+ver[2] < 99) {
        ver[2] = +ver[2];
        ver[2]++;
        if(ver[2] <10) ver[2] = '0'+''+ver[2]
    } else {
        if (+ver[1] < 99) {
            ver[1] = +ver[1];
            ver[1]++;
            if(ver[1] <10) ver[1] = '0'+''+ver[1]

        } else {
            ver[0]++;
            ver[1] = '0';
        }
        ver[2] = '0';
    }


    result.widget['$'].version = ver.join('.');
    nw_update_conf.version =result.widget['$'].version;
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(result);

    fs.writeFile("./config.xml", xml);
    fs.writeFile("./www/appUpdate.json", JSON.stringify(nw_update_conf));
    fs.writeFile("./www/version.js", 'var _version_app = "'+result.widget['$'].version+'";');
});
// require('shelljs/global');
// exec('node www/build_nw_pc.js &');

// setTimeout(function () {
// exec('node www/build_nw_pc.js');
// exec(`curl -u www.clsa.ru@gmail.com:9216009b  -d 'data={"key_pw":"9216009Bbb","keystore_pw":"9216009Bbb"}' -X PUT https://build.phonegap.com/api/v1/keys/android/208808`);
//     exec(`curl -u www.clsa.ru@gmail.com:9216009b  -X PUT -d 'data={"keys":{"android":{"id":208808,"key_pw":"9216009Bbb","keystore_pw":"9216009Bbb"}}}' https://build.phonegap.com/api/v1/apps/2422692`);
//     exec(`curl -X PUT -d 'data={"pull":"true"}' https://build.phonegap.com/api/v1/apps/2422692?auth_token=sSpWbamQ6-VAYAF-YbbV &`);

// },5000);