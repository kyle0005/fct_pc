import 'swiper/dist/css/swiper.css';
import './list.scss';
// import "@babel/polyfill";
import {swip} from '../../../../public/js/common';
import {user_pop_module} from '../../../../public/js/user';
document.querySelector('.js-pop-login').addEventListener('click', (e) => {
    user_pop_module.pop_open(1);
});
document.querySelector('.js-pop-reg').addEventListener('click', (e) => {
    user_pop_module.pop_open(0);
});
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
