import 'swiper/dist/css/swiper.css';
import './shop.scss';
import "@babel/polyfill";
import common from '../../../../public/js/common';
/*import ajax from '../../../../public/js/ajax';
ajax.ajaxGet({});*/
let pics = config.pics;
common.swip(
    'photo-container', false, true, 1, 'fade',
    {
        crossFade: true,
    },
    {},
    {
        el: '.swiper-pagination',
        clickable :true,
        type: 'bullets',
        renderBullet: function (index, className) {
            return '<span class="en-pagination ' + className + '"><img src="' + pics[index] + '" class="bu-img"/></span>';
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

document.querySelector('.js-inp').value = 1;
document.querySelector('.js-add').addEventListener('click', (e) => {
    let _tm = document.querySelector('.js-inp').value;
    document.querySelector('.js-inp').value = parseInt(_tm) + 1;
});

document.querySelector('.js-minus').addEventListener('click', (e) => {
    let _tm = document.querySelector('.js-inp').value;
    if(_tm > 1){
        document.querySelector('.js-inp').value = _tm - 1;
    }

});

Array.prototype.forEach.call(document.querySelectorAll('.js-tab'), (el, index) => {
    el.addEventListener('click', (e) => {
        Array.prototype.forEach.call(document.querySelectorAll('.js-tab'), (e, index) => {
            e.classList.remove('chosen');
        });
        if(!el.classList.contains('chosen')){
            el.classList.add('chosen');
        }
    });
});