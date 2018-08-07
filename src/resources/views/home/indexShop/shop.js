import 'swiper/dist/css/swiper.css';
import './shop.scss';
import "@babel/polyfill";
import common from '../../../../public/js/common';
/*import ajax from '../../../../public/js/ajax';
ajax.ajaxGet({});*/
let pics = config.pics;
common.swip(
    'photo-container', false, true, 1, 'fade',
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
