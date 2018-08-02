import 'swiper/dist/css/swiper.css';
import './index.scss';
import "@babel/polyfill";
import common from '../../../../public/js/common';
import swp from 'swiper';
import b_1 from '../../../../public/img/b_1.png';
import b_2 from '../../../../public/img/b_2.png';
import b_3 from '../../../../public/img/b_3.png';

import t_1 from '../../../../public/img/test4.jpg';
import t_2 from '../../../../public/img/test5.jpg';
import t_3 from '../../../../public/img/test6.jpg';

import a_1 from '../../../../public/img/auc1.png';
import a_2 from '../../../../public/img/auc2.png';

let mySwiper = new swp('.swiper-container', {
    autoplay: false,
    loop : true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
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
    on:{
        slideChange: function(){
            console.log(this.activeIndex + ':' + this.realIndex)
        },
    },
});

let mySwiper2 = new swp('.presale-container', {
    autoplay: false,
    loop : true,
    pagination: {
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
    on:{
        slideChange: function(){
            console.log(this.activeIndex + ':' + this.realIndex)
        },
    },
});

let mySwiper3 = new swp('.opt-container', {
    navigation: {
        nextEl: '.opt-swiper-button-next',
        prevEl: '.opt-swiper-button-prev',
    },
    on:{
        slideChange: function(){
            console.log(this.activeIndex + ':' + this.realIndex)
        },
    },
    slidesPerView : 4,
    // slidesOffsetBefore : 78,
    // slidesOffsetAfter : 78,
});

let mySwiper4 = new swp('.act-container', {
    navigation: {
        nextEl: '.act-swiper-button-next',
        prevEl: '.act-swiper-button-prev',
    },
    on:{
        slideChange: function(){
            console.log(this.activeIndex + ':' + this.realIndex)
        },
    },
    slidesPerView : 4,
    // slidesOffsetBefore : 78,
    // slidesOffsetAfter : 78,
});
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