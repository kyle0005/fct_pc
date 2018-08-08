import swp from 'swiper';
exports.swip = (name, autoplay, loop, slidesPerView, effect, fadeEffect, navigation, pagination, on) => {
    new swp('.' + name, {
        autoplay: autoplay,
        loop : loop,
        slidesPerView: slidesPerView,
        effect: effect,
        fadeEffect: fadeEffect,
        navigation: navigation,
        pagination: pagination,
        on:on
    });
};
exports.countdowm = (timestamp, succ, end, hasDay) => {
    let time_obj = {}, _initTime = new Date().getTime();
    let timer = setInterval(() => {
        let nowTime = new Date();
        let endTime = new Date(timestamp * 1000 + _initTime);
        let t = endTime.getTime() - nowTime.getTime();
        if(t > 0){
            let day = Math.floor(t/86400000);
            let hour=Math.floor((t/3600000)%24);
            let min=Math.floor((t/60000)%60);
            let sec=Math.floor((t/1000)%60);
            if(hasDay){
                day = day < 10 ? '0' + day : day;
            }else {
                hour = hour + day * 24;
            }
            hour = hour < 10 ? '0' + hour : hour;
            min = min < 10 ? '0' + min : min;
            sec = sec < 10 ? '0' + sec : sec;
            // format =  `${day}天${hour}小时${min}分${sec}秒`;
            time_obj.day = day;
            time_obj.hour = hour;
            time_obj.min = min;
            time_obj.sec = sec;
            if(succ){
                succ(time_obj);
            }
        }else{
            clearInterval(timer);
            if(end){
                end(time_obj);
            }
        }
    },1000);
};
exports.arr = (n) => {
    console.log([1,2,3].map(n => n + 1))
};
