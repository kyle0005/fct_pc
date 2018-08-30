import {ajaxGet, ajaxPost, formData} from './ajax';
/* 登录&注册 弹窗 */
const user_pop_module = {
    user_pop_data: {
        code_url: config.code_url,
        login_url: config.login_url,
        gt_url: config.gt_url,
        validate_flag: false,
        prev_click: false,
        before: function(){
            console.log('before')
        },
        success: function(data, paras){
            console.log('success')
            window.location.reload();
        },
        val_suc: function(data){
            console.log('val success')
        },
        error: function(){
            console.log('error')
        },
        alert: function(data){
            setTimeout(function () {
                /* 隐藏提示 */

            }, 1500);
        },
        tips: function(data){
            if(document.querySelector('.js-t-tips').classList.contains('hidden')){
                document.querySelector('.js-t-tips').classList.remove('hidden');
                document.querySelector('.js-t-tips').innerHTML = data.message;
                setTimeout(function () {
                    /* 隐藏提示 */
                    document.querySelector('.js-t-tips').classList.add('hidden');
                }, 5000);
            }
        },
        gt_validate_succ: function (data) {
            initGeetest({
                gt: data.gt,
                challenge: data.challenge,
                offline: !data.success,
                new_captcha: true,
                product: config.gt_product,
                lang: config.gt_lang,
                http: config.gt_http,
                width: '100%'
            }, user_pop_module.user_pop_data.gt_handler)
        },
        gt_handler: function (captchaObj) {
            document.querySelector('#captchaReg').innerHTML = '';
            captchaObj.appendTo(document.querySelector('#captchaReg'));
            captchaObj.onReady(function(){

            }).onSuccess(function(){
                user_pop_module.user_pop_data.validate_flag = captchaObj.getValidate();
            }).onError(function(){

            })
        }
    },
    init: () => {
        /* 弹窗初始化事件 */
        document.querySelector('.js-close').addEventListener('click', (e) => {
            user_pop_module.pop_close();
        });
        document.querySelector('.js-r').addEventListener('click', (e) => {
            if(!document.querySelector('.js-r').classList.contains('cur')){
                document.querySelector('.js-r').classList.add('cur');
                document.querySelector('.js-l').classList.remove('cur');
                document.querySelector('.js-sub-p').innerHTML = '注册';
            }
        });
        document.querySelector('.js-l').addEventListener('click', (e) => {
            if(!document.querySelector('.js-l').classList.contains('cur')){
                document.querySelector('.js-l').classList.add('cur');
                document.querySelector('.js-r').classList.remove('cur');
                document.querySelector('.js-sub-p').innerHTML = '登录';
            }
        });
        document.querySelector('.js-get-code-p').addEventListener('click', (e) => {
            if(user_pop_module.user_pop_data.prev_click){
                return;
            }
            let _el = document.querySelector('.js-get-code-p');
            let _phone = document.querySelector('.js-phone-num-p').value;
            if(!/^1\d{10}$/gi.test(_phone)){
                user_pop_module.user_pop_data.tips({
                    'message': '手机号码格式不正确'
                })
            }
            else if(!_phone){
                user_pop_module.user_pop_data.tips({
                    'message': '请输入手机号码'
                })
            }
            else if(!user_pop_module.user_pop_data.validate_flag){
                user_pop_module.user_pop_data.tips({
                    'message': '请滑动验证码'
                })
            }
            else {
                let computedTime = 60;
                user_pop_module.user_pop_data.prev_click = true;
                let timer = setInterval(() => {
                    computedTime --;
                    _el.innerHTML = '已发送(' + computedTime + 's)';
                    if (computedTime === 0) {
                        user_pop_module.user_pop_data.prev_click = false;
                        clearInterval(timer);
                        _el.innerHTML = '获取验证码';
                    }
                }, 1000);
                ajaxPost(
                    user_pop_module.user_pop_data.code_url,
                    {
                        'cellphone': _phone,
                        'action': 'login',
                        'geetest_challenge': user_pop_module.user_pop_data.validate_flag.geetest_challenge,
                        'geetest_validate': user_pop_module.user_pop_data.validate_flag.geetest_validate,
                        'geetest_seccode': user_pop_module.user_pop_data.validate_flag.geetest_seccode
                    },
                    user_pop_module.user_pop_data.val_suc,
                    user_pop_module.user_pop_data.before,
                    user_pop_module.user_pop_data.error,
                    {},
                    user_pop_module.user_pop_data.alert
                );
            }
        });
        document.querySelector('.js-clear-fork-p').addEventListener('click', (e) => {
            document.querySelector('.js-phone-num-p').value = '';
        });
        document.querySelector('.js-phone-num-p').addEventListener('keyup', (e) => {
            if(document.querySelector('.js-phone-num-p').value){
                document.querySelector('.js-clear-fork-p').classList.remove('hidden');
            }else {
                document.querySelector('.js-clear-fork-p').classList.add('hidden');
            }
        });
        document.querySelector('.js-sub-p').addEventListener('click', (e) => {
            let _phone = document.querySelector('.js-phone-num-p').value;
            let _msg = document.querySelector('.js-msg-num-p').value;
            if(!/^1\d{10}$/gi.test(_phone)){
                user_pop_module.user_pop_data.tips({
                    'message': '手机号码格式不正确'
                })
            }
            else if(!_phone){
                user_pop_module.user_pop_data.tips({
                    'message': '请输入手机号码'
                })
            }
            else if(!_msg){
                user_pop_module.user_pop_data.tips({
                    'message': '请输入短信验证码'
                })
            }
            else {
                ajaxPost(
                    user_pop_module.user_pop_data.login_url,
                    formData.serializeForm('user'),
                    user_pop_module.user_pop_data.success,
                    user_pop_module.user_pop_data.before,
                    user_pop_module.user_pop_data.error,
                    {},
                    user_pop_module.user_pop_data.alert
                );
            }
        });
        ajaxGet(
            user_pop_module.user_pop_data.gt_url + "?t=" + (new Date()).getTime(),
            user_pop_module.user_pop_data.gt_validate_succ,
            user_pop_module.user_pop_data.before,
            user_pop_module.user_pop_data.error,
            'json'
        );
    },
    pop_open: (flag) => {
        /* 打开弹窗 */
        if(document.querySelector('.js-user-pop').classList.contains('hidden')){
            document.querySelector('.js-user-pop').classList.remove('hidden');
        }
        if(parseInt(flag) === 0){
            /* 注册 */
            if(!document.querySelector('.js-r').classList.contains('cur')){
                document.querySelector('.js-r').classList.add('cur');
                document.querySelector('.js-l').classList.remove('cur');
                document.querySelector('.js-sub-p').innerHTML = '注册';
            }
        }else if(parseInt(flag) === 1){
            /* 登录 */
            if(!document.querySelector('.js-l').classList.contains('cur')){
                document.querySelector('.js-l').classList.add('cur');
                document.querySelector('.js-r').classList.remove('cur');
                document.querySelector('.js-sub-p').innerHTML = '登录';
            }
        }
        user_pop_module.init();

    },
    pop_close: () => {
        /* 关闭弹窗 */
        if(!document.querySelector('.js-user-pop').classList.contains('hidden')){
            document.querySelector('.js-user-pop').classList.add('hidden');
        }
    },
    loadHtml: () => {
        /* 加载弹窗html */
        /* 废弃 */
    }

};

export {user_pop_module};
