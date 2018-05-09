var express = require('express');

var app = express();

var Web3 = require('web3');
var Account = require('ethereumjs-account');
var util = require('ethjs-util');

var value = util.intToBuffer(38272);
var tx = require('ethereumjs-tx');
var lightwallet = require('eth-lightwallet');
const { txutils, signing } = lightwallet;
// Cambiar por del usuario
var address = '0x8D68583e625CAaE969fA9249502E105a21435EbF';
var clave = '1ce642301e680f60227b9d8ffecad474f15155b6d8f8a2cb6bde8e85c8a4809a';

if (typeof web3 !== 'undefined') {
    console.log('if');
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/"));
}



app.get('/', (req, res, next) => {

    web3.eth.getBlock(48, function(error, result) {
        if (!error) {
            console.log('api if');
            console.log(JSON.stringify(result));

            res.status(200).json({
                ok: true,
                mensaje: 'Peticion realizada correctamente eth',
                result: result
            });

        } else {
            console.log('api else');
            console.error(error);
            res.status(500).json({
                ok: false,
                mensaje: 'Internal Error Server',
                result: result
            });
        }
    });
});

app.get('/register', (req, res) => {
    console.log('register');
    var password = 'testPassword';

    keyStore.createVault({
        password: password,
        // seedPhrase: seedPhrase, // Optionally provide a 12-word seed phrase
        // salt: fixture.salt,     // Optionally provide a salt.
        // A unique salt will be generated otherwise.
        // hdPathString: hdPath    // Optional custom HD Path String
    }, function(err, ks) {

        // Some methods will require providing the `pwDerivedKey`,
        // Allowing you to only decrypt private keys on an as-needed basis.
        // You can generate that value with this convenient method:
        ks.keyFromPassword(password, function(err, pwDerivedKey) {
            if (err) throw err;

            // generate five new address/private key pairs
            // the corresponding private keys are also encrypted
            ks.generateNewAddress(pwDerivedKey, 5);
            var addr = ks.getAddresses();

            ks.passwordProvider = function(callback) {
                var pw = prompt("Please enter password", "Password");
                callback(null, pw);
            };

            // Now set ks as transaction_signer in the hooked web3 provider
            // and you can start using web3 using the keys/addresses in ks!
        });
    });

    var account = new Account(raw)
        // var trie = new SecureTrie()
    console.log('account', account);
    if (account) {
        res.status(200).json({
            ok: true,
            mensaje: 'Peticion realizada correctamente eth',
            result: account
        });
    } else {
        res.status(500).json({
            ok: false,
            mensaje: 'Internal Error Server'
        });
    }

});

app.get('/addChange', (req, res) => {

});


function sendRaw(rawTx) {
    var privateKey = new Buffer(clave, 'hex');
    var transaction = new tx(rawTx);
    transaction.sign(privateKey);
    var serializedTx = transaction.serialize().toString('hex');
    web3.eth.sendRawTransaction(
        '0x' + serializedTx,
        function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
}

module.exports = app;