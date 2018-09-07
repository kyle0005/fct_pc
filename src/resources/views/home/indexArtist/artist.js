import 'swiper/dist/css/swiper.css';
import './artist.scss';
import {swip, lazy} from '../../../../public/js/common';
import {user_pop_module} from "../../../../public/js/user";
user_pop_module.init();
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
lazy();
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