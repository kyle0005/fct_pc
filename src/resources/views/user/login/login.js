import './login.scss';
import {tips, showPop, hidePop, countdown, swip, common} from '../../../../public/js/common';
import {ajaxGet, ajaxPost, formData} from '../../../../public/js/ajax';
tips();
let login = {
    code_url: config.code_url,
    login_url: config.login_url,
    before: function(){
        console.log('before')
    },
    success: function(data, paras){
        console.log('success')
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
document.querySelector('.js-get-code').addEventListener('click', (e) => {
    let _el = document.querySelector('.js-get-code');
    let _phone = document.querySelector('.js-phone-num').value;
    if(!/^1\d{10}$/gi.test(_phone)){
        login.alert({
            'message': '手机号码格式不正确'
        })
    }
    else if(!_phone){
        login.alert({
            'message': '请输入手机号码'
        })
    }
    else {
        let computedTime = 60;
        let timer = setInterval(() => {
            computedTime --;
            _el.innerHTML = '已发送(' + computedTime + 's)';
            if (computedTime === 0) {
                clearInterval(timer);
                _el.innerHTML = '获取验证码';
            }
        }, 1000);
        ajaxPost(
            login.code_url,
            {
                'cellphone': _phone,
                'action': 'login'
            },
            login.success,
            login.before,
            login.error,
            {},
            login.alert
        );
    }

});
document.querySelector('.js-clear-fork').addEventListener('click', (e) => {
    document.querySelector('.js-phone-num').value = '';
});
document.querySelector('.js-phone-num').addEventListener('keyup', (e) => {
    if(document.querySelector('.js-phone-num').value){
        document.querySelector('.js-clear-fork').classList.remove('hidden');
    }else {
        document.querySelector('.js-clear-fork').classList.add('hidden');
    }
});
document.querySelector('.js-login').addEventListener('click', (e) => {
    let _phone = document.querySelector('.js-phone-num').value;
    let _msg = document.querySelector('.js-msg-num').value;
    if(!/^1\d{10}$/gi.test(_phone)){
        login.alert({
            'message': '手机号码格式不正确'
        })
    }
    else if(!_phone){
        login.alert({
            'message': '请输入手机号码'
        })
    }
    else if(!_msg){
        login.alert({
            'message': '请输入短信验证码'
        })
    }
    else {
        ajaxPost(
            login.login_url,
            formData.serializeForm('quickLogin'),
            login.success,
            login.before,
            login.error,
            {},
            login.alert
        );
    }
});
