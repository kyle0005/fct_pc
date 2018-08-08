import 'swiper/dist/css/swiper.css';
import './index.scss';
import "@babel/polyfill";
import common from '../../../../public/js/common';
import b_1 from '../../../../public/img/b_1.png';
import b_2 from '../../../../public/img/b_2.png';
import b_3 from '../../../../public/img/b_3.png';

import t_1 from '../../../../public/img/test4.jpg';
import t_2 from '../../../../public/img/test5.png';
import t_3 from '../../../../public/img/test6.png';

import a_1 from '../../../../public/img/auc1.png';
import a_2 from '../../../../public/img/auc2.png';

common.swip(
    'swiper-container', true, true, 1, 'slide',
    {
        crossFade: false,
    },
    {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    {
        el: '.swiper-pagination',
        clickable :true,
        type: 'bullets',
        renderBullet: function (index, className) {
            return '<span class="en-pagination ' + className + '"></span>';
        },
        lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 1   //提前1个slide加载图片
        },
    },
    {
        slideChange: function(){
            // console.log(this.activeIndex + ':' + this.realIndex)
        },
    }
);

common.swip(
    'presale-container', false, true, 1, 'slide',
    {
        crossFade: false,
    },
    {},
    {
        el: '.swiper-pagination',
        clickable :true,
        type: 'bullets',
        renderBullet: function (index, className) {
            return '<span class="en-pagination ' + className + '"></span>';
        },
        lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 1   //提前1个slide加载图片
        },
    },
    {
        slideChange: function(){
            // console.log(this.activeIndex + ':' + this.realIndex)
        },
    }
);

common.swip(
    'opt-container', false, false, 4, 'slide',
    {
        crossFade: false,
    },
    {
        nextEl: '.opt-swiper-button-next',
        prevEl: '.opt-swiper-button-prev',
    },
    {},
    {
        slideChange: function(){
            // console.log(this.activeIndex + ':' + this.realIndex)
        },
    }
);

common.swip(
    'act-container', false, false, 4, 'slide',
    {
        crossFade: false,
    },
    {
        nextEl: '.act-swiper-button-next',
        prevEl: '.act-swiper-button-prev',
    },
    {},
    {
        slideChange: function(){
            // console.log(this.activeIndex + ':' + this.realIndex)
        },
    }
);

Array.prototype.forEach.call(document.querySelectorAll('.js-counttime'), (el) => {
    common.countdowm(el.getAttribute('data-timenum'), (time_obj) => {
        if(el.querySelector('.js-d')){
            el.querySelector('.js-d').innerHTML = time_obj.day;
        }
        el.querySelector('.js-h').innerHTML = time_obj.hour;
        el.querySelector('.js-m').innerHTML = time_obj.min;
        el.querySelector('.js-s').innerHTML = time_obj.sec;
    }, (time_obj) => {
        console.log('end')
    }, !!el.querySelector('.js-d'));
});

// common.arr(5)
const promise = new Promise(function(resolve, reject) {

    if (true){
        resolve(value);
    } else {
        reject(error);
    }
});
promise.then(function(value) {
    // console.log('success')
}, function(error) {
    // console.log('failure')
});