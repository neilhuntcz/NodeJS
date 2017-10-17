const async = require('async');
const _ = require('lodash');

function promiseWrapper(cb) {
    generateNumber().then(val => {
        console.log(val);
        cb(null, val);
    }).catch(err => cb(err))
}

function promiseWrapper2(prev, cb) {
    generateNumber().then(val => {
        console.log(val);
        cb(null, val + prev);
    }).catch(err => cb(err))
}

function generateNumber() {
    return new Promise((resolve) => setTimeout(() => {
            resolve(_.random(1, 10));
        }
        , 100));
}

async function go() {
    const funcs = [];
    funcs.push(promiseWrapper);

    for (let i = 0; i < 99; i++) {
        funcs.push(promiseWrapper2)
    }

    await async.waterfall(
        funcs, 
        function (error, finalResult) {
            if (error) {
                console.log("Error occured: " + error);        
            }
            else
            {
                console.log("Final sum: " + finalResult);            
            }
    });    
}

go();