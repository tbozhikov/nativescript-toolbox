import Application = require("application");
import Toolbox = require('nativescript-toolbox');
import Timer = require('timer');

interface IObject {
    a: any;
    b: any;
}

var a = Toolbox.toYaml({ a: 100, b: 100 });
var b = Toolbox.fromYaml<IObject>(a, 'b');

Application.android.onActivityCreated = () => {
    Toolbox.invokeForOrientation({
        portrait: () => {
            console.log('Device is in portrait mode.');
        },

        landscape: () => {
            console.log('Device is in landscape mode.');
        },

        unknown: () => {
            console.log('Device is in UNKNOWN mode.');
        },
    });
};

console.log('a: ' + typeof a);
console.log('b: ' + typeof b);

Timer.setTimeout(() => {
    Toolbox.setStatusBarVisibility(false,
        (result) => {
            Timer.setTimeout(() => {
                console.log('setStatusBarVisibility.tag: ' + result.tag);

                Toolbox.setStatusBarVisibility(true);
            }, 5000);
        }, 'TM');
}, 5000);

console.log('UUID 1: ' + Toolbox.uuid());
console.log('UUID 2: ' + Toolbox.uuid('_'));

var hashAlgorithms = ['', null, undefined, 'md5', 'md-5', 'sha1', 'sha-1', 'sha3', 'sha-3', 'sha256', 'sha-256', 'sha384', 'sha-384', 'sha512', 'sha-512'];
for (var i = 0; i < hashAlgorithms.length; i++) {
    var ha = hashAlgorithms[i];

    console.log("hash('" + ha + "'): " + Toolbox.hash('MK+TM', ha));
}

Application.start({ moduleName: "main-page" });
