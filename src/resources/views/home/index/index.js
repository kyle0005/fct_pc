import 'swiper/dist/css/swiper.css';
import './index.scss';
import "@babel/polyfill";
// import imgs from '../../../../public/js/loadImg';
import {countdown, swip, common} from '../../../../public/js/common';
import {user_pop_module} from '../../../../public/js/user';
let _loginSel = document.querySelectorAll('.js-pop-login');
if(_loginSel&&_loginSel.length>0){
    Array.prototype.forEach.call(_loginSel, (el, index) => {
        el.addEventListener('click', (e) => {
            user_pop_module.pop_open(1);
        });
    });
}
if(document.querySelector('.js-pop-reg')){
    document.querySelector('.js-pop-reg').addEventListener('click', (e) => {
        user_pop_module.pop_open(0);
    });
}
swip(
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

swip(
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

swip(
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

swip(
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
    countdown(el.getAttribute('data-timenum'), (time_obj) => {
        common.countSuc(time_obj, el);
    }, (time_obj) => {
        common.countEnd(time_obj, el);
    }, !!el.querySelector('.js-d'));
});
