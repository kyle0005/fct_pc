import 'swiper/dist/css/swiper.css';
import './shop.scss';
import "@babel/polyfill";
import {tips, showPop, hidePop, countdown, swip, common} from '../../../../public/js/common';
import {ajaxGet, ajaxPost, formData} from '../../../../public/js/ajax';
tips();
let shop = {
    post_url: config.addcart_url,
    fav_url: config.fav_url,
    pics: config.pics,
    before: function(){
        console.log('before')
    },
    success: function(data, paras){
        console.log('success')
    },
    favSuc: function(data){
        console.log(data.data.favoriteState);
    },
    error: function(){
        console.log('error')
    },
    alert: function(data){
        showPop(data.message);
        setTimeout(function () {
            hidePop();
        }, 1500);
    }
};
swip(
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
            return '<span class="en-pagination ' + className + '"><img src="' + shop.pics[index] + '" class="bu-img"/></span>';
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
document.querySelector('.js-fav').addEventListener('click', (e) => {
    ajaxPost(
        shop.fav_url,
        {},
        shop.favSuc(),
        shop.before(),
        shop.error(),
        {},
        shop.alert()
    );
});
document.querySelector('.js-cart').addEventListener('click', (e) => {
    ajaxPost(
        shop.post_url,
        formData.serializeForm('addcart'),
        shop.success(),
        shop.before(),
        shop.error(),
        {},
        shop.alert()
    );
});

document.querySelector('.js-spec').setAttribute('value', document.querySelector('.js-specs').getAttribute('data-spec'));
Array.prototype.forEach.call(document.querySelectorAll('.js-specs'), (el, index) => {
    el.addEventListener('click', (ev) => {
        Array.prototype.forEach.call(document.querySelectorAll('.js-specs'), (e, index) => {
            e.classList.remove('chosen');
        });
        el.classList.add('chosen');
        document.querySelector('.js-spec').setAttribute('value', el.getAttribute('data-spec'));
    });
});

document.querySelector('.js-add').addEventListener('click', (e) => {
    let _tm = document.querySelector('.js-inp').value;
    document.querySelector('.js-inp').setAttribute('value', parseInt(_tm) + 1);
});

document.querySelector('.js-minus').addEventListener('click', (e) => {
    let _tm = document.querySelector('.js-inp').value;
    if(_tm > 1){
        document.querySelector('.js-inp').setAttribute('value', parseInt(_tm) - 1)
    }

});

Array.prototype.forEach.call(document.querySelectorAll('.js-tab'), (el, index) => {
    el.addEventListener('click', (e) => {
        Array.prototype.forEach.call(document.querySelectorAll('.js-tab'), (e, index) => {
            e.classList.remove('chosen');
        });
        el.classList.add('chosen');

        Array.prototype.forEach.call(document.querySelectorAll('.js-con'), (e, index) => {
            e.classList.remove('chosen');
        });
        document.querySelectorAll('.js-con')[index].classList.add('chosen');
    });
});

Array.prototype.forEach.call(document.querySelectorAll('.js-counttime'), (el) => {
    countdown(el.getAttribute('data-timenum'), (time_obj) => {
        common.countSuc(time_obj, el);
    }, (time_obj) => {
        common.countEnd(time_obj, el);
    }, !!el.querySelector('.js-d'));
});

document.querySelector('.js-get-link').addEventListener('click', (e) => {
    document.querySelector('.js-pop-coupon').classList.add('show');
});

document.querySelector('.js-close').addEventListener('click', (e) => {
    document.querySelector('.js-pop-coupon').classList.remove('show');
});