import 'swiper/dist/css/swiper.css';
import './index.scss';
import "@babel/polyfill";
import common from '../../../../public/js/common';
import swp from 'swiper';
import b_1 from '../../../../public/img/b_1.png';
import b_2 from '../../../../public/img/b_2.png';
import b_3 from '../../../../public/img/b_3.png';

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