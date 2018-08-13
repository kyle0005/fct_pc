import 'swiper/dist/css/swiper.css';
import './artist.scss';
import common from '../../../../public/js/common';
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