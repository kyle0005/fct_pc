import swp from 'swiper';
exports.common = {
    countSuc: (time_obj, el) => {
        if(el.querySelector('.js-d')){
            el.querySelector('.js-d').innerHTML = time_obj.day;
        }
        el.querySelector('.js-h').innerHTML = time_obj.hour;
        el.querySelector('.js-m').innerHTML = time_obj.min;
        el.querySelector('.js-s').innerHTML = time_obj.sec;
    },
    countEnd: (time_obj, el) => {
        console.log('end')
    }
};
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

const chainAsync = fns => { let curr = 0; const next = () => fns[curr++](next); next(); };
/*
chainAsync([
  next => { console.log('0 seconds'); setTimeout(next, 1000); },
  next => { console.log('1 second');  setTimeout(next, 1000); },
  next => { console.log('2 seconds'); }
])
*/

const curry = (fn, arity = fn.length, ...args) =>
    arity <= args.length
        ? fn(...args)
        : curry.bind(null, fn, arity, ...args);
// curry(Math.pow)(2)(10) -> 1024
// curry(Math.min, 3)(10)(50)(2) -> 2

const pipe = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));

const promisify = func =>
    (...args) =>
        new Promise((resolve, reject) =>
            func(...args, (err, result) =>
                err ? reject(err) : resolve(result))
        );
// const delay = promisify((d, cb) => setTimeout(cb, d))
// delay(2000).then(() => console.log('Hi!')) -> Promise resolves after 2s

const series = ps => ps.reduce((p, next) => p.then(next), Promise.resolve());
// const delay = (d) => new Promise(r => setTimeout(r, d))
// series([() => delay(1000), () => delay(2000)]) -> executes each promise sequentially, taking a total of 3 seconds to complete

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
/*
async function sleepyWork() {
  console.log('I\'m going to sleep for 1 second.');
  await sleep(1000);
  console.log('I woke up after 1 second.');
}
*/