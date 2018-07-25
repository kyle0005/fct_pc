import './index.scss';
import "@babel/polyfill";
import common from '../../../../public/js/common';

common.arr(5)

const promise = new Promise(function(resolve, reject) {

    if (true){
        resolve(value);
    } else {
        reject(error);
    }
});
promise.then(function(value) {
    console.log('success')
}, function(error) {
    console.log('failure')
});