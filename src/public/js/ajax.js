let jAjax = function (options) {
    //编码数据
    function setData() {
        //设置对象的遍码
        function setObjData(data, parentName) {
            function encodeData(name, value, parentName) {
                var items = [];
                name = parentName === undefined ? name : parentName + '[' + name + ']';
                if (typeof value === 'object' && value !== null) {
                    items = items.concat(setObjData(value, name));
                } else {
                    // name = encodeURIComponent(name);
                    // value = encodeURIComponent(value);
                    items.push(name + '=' + value);
                }
                return items;
            }
            var arr = [],value;
            if (Object.prototype.toString.call(data) == '[object Array]') {
                for (var i = 0, len = data.length; i < len; i++) {
                    value = data[i];
                    arr = arr.concat(encodeData( typeof value == 'object'?i:'', value, parentName));
                }
            } else if (Object.prototype.toString.call(data) == '[object Object]') {
                for (var key in data) {
                    value = data[key];
                    arr = arr.concat(encodeData(key, value, parentName));
                }
            }
            return arr;
        };
        //设置字符串的遍码，字符串的格式为：a=1&b=2;
        function setStrData(data) {
            var arr = data.toString().split('&');
            for (var i = 0, len = arr.length; i < len; i++) {
                /*var name = encodeURIComponent(arr[i].split('=')[0]);
                var value = encodeURIComponent(arr[i].split('=')[1]);*/
                var name = arr[i].split('=')[0];
                var value = arr[i].split('=')[1];
                arr[i] = name + '=' + value;
            }
            return arr;
        }
        if(data instanceof FormData){

        }
        else {
            if (data) {
                if (typeof data === 'string' || typeof data === 'number' ) {
                    data = setStrData(data);
                } else if (typeof data === 'object') {
                    data = setObjData(data);
                }
                data = data.join('&').replace('/%20/g', '+');
                //若是使用get方法或JSONP，则手动添加到URL中
                if (type === 'get' || dataType === 'jsonp') {
                    url += url.indexOf('?') > -1 ? (url.indexOf('=') > -1 ? '&' + data : data) : '?' + data;
                }
            }
        }

    }
    // JSONP
    function createJsonp() {
        var script = document.createElement('script'),
            timeName = new Date().getTime() + Math.round(Math.random() * 1000),
            callback = 'JSONP_' + timeName;

        window[callback] = function(data) {
            clearTimeout(timeout_flag);
            document.body.removeChild(script);
            success(data);
        };
        script.src = url + (url.indexOf('?') > -1 ? '&' : '?') + 'callback=' + callback;
        script.type = 'text/javascript';
        document.body.appendChild(script);
        setTime(callback, script);
    }
    //设置请求超时
    function setTime(callback, script) {
        if (timeOut !== undefined) {
            timeout_flag = setTimeout(function() {
                if (dataType === 'jsonp') {
                    delete window[callback];
                    document.body.removeChild(script);

                } else {
                    timeout_bool = true;
                    xhr && xhr.abort();
                }
                console.log('timeout');

            }, timeOut);
        }
    }

    // XHR
    function createXHR() {
        //由于IE6的XMLHttpRequest对象是通过MSXML库中的一个ActiveX对象实现的。
        //所以创建XHR对象，需要在这里做兼容处理。
        function getXHR() {
            if (window.XMLHttpRequest) {
                return new XMLHttpRequest();
            } else {
                //遍历IE中不同版本的ActiveX对象
                var versions = ['Microsoft', 'msxm3', 'msxml2', 'msxml1'];
                for (var i = 0; i < versions.length; i++) {
                    try {
                        var version = versions[i] + '.XMLHTTP';
                        return new ActiveXObject(version);
                    } catch (e) {}
                }
            }
        }
        //创建对象。
        xhr = getXHR();
        xhr.open(type, url, async);
        //设置请求头
        xhr.setRequestHeader('x-requested-with', 'XMLHttpRequest');
        if(type === 'post'){
            if(contentType == false){
                /* formdata上传文件 */
                // xhr.setRequestHeader('Content-Type', '');
            }
            else if(contentType == undefined){
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
            }else {
                xhr.setRequestHeader('Content-Type', contentType);
            }
        }
        // xhr.setRequestHeader('Content-Type', contentType);
        // if (type === 'post') {
        //   //若是post提交，则设置content-Type 为application/x-www-four-urlencoded
        //   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        // } else if (contentType) {
        //   xhr.setRequestHeader('Content-Type', contentType);
        // }else if(!contentType){
        //
        // }
        //添加监听
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (timeOut !== undefined) {
                    //由于执行abort()方法后，有可能触发onreadystatechange事件，
                    //所以设置一个timeout_bool标识，来忽略中止触发的事件。
                    if (timeout_bool) {
                        return;
                    }
                    clearTimeout(timeout_flag);
                }
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {

                    success(xhr.responseText);
                } else {
                    error(xhr.status, xhr.statusText);
                }
            }
        };
        //发送请求
        xhr.send(type === 'get' ? null : data);
        setTime(); //请求超时
    }


    var url = options.url || '', //请求的链接
        type = (options.type || 'get').toLowerCase(), //请求的方法,默认为get
        data = options.data || null, //请求的数据
        contentType = options.contentType, //请求头
        dataType = options.dataType || '', //请求的类型
        async = options.async === undefined ? true : options.async, //是否异步，默认为true.
        timeOut = options.timeOut, //超时时间。
        before = options.before || function() {}, //发送之前执行的函数
        error = options.error || function() {}, //错误执行的函数
        success = options.success || function() {}; //请求成功的回调函数
    var timeout_bool = false, //是否请求超时
        timeout_flag = null, //超时标识
        xhr = null; //xhr对角
    setData();
    before();
    if (dataType === 'jsonp') {
        createJsonp();
    } else {
        createXHR();
    }
};
const ajaxGet = (url, callback, before, error, dataType) => {
    jAjax({
        type:'get',
        url:url,
        timeOut:5000,
        dataType: dataType || '',
        before:function(){
            if(before){
                before();
            }
        },
        success:function(data){
            if(data){
                data = JSON.parse(data);
                if((parseInt(data.code) == 200 && callback) || (parseInt(data.success) == 1 && callback)){ /* 后者为gt验证条件 */
                    callback(data);
                }else {
                    console.log('false')
                }
            }

        },
        error:function(){
            if(error){
                error();
            }
        }
    });
};
const ajaxPost = (url, data, callback, before, error, paras, alert, upload) => {
    let _timeout = 5000;
    if(!upload){
        _timeout = 60000;
    }
    jAjax({
        type:'post',
        url:url,
        data: data || {},
        timeOut:_timeout,
        contentType: upload,    /* 如果是上传文件，为false，否则, 为undefined */
        before:function(){
            if(before){
                before();
            }
        },
        success:function(data){
            /*
             *
             *  {
             *    "code":200,
             *    "message":null,
             *    "url":"",
             *    "data":
             *           {
             *             "entries": [],
             *             "pager":{"prev":1,"current":"2","next":0,"page_size":10,"total_page":2,"total":15}
             *            }
             *  }
             *
             *  {
             *      "code":404,
             *      "message":"",
             *      "url":null,
             *      "data":{}
             *   }
             *
             *   {
             *      "code":401,
             *      "message":"",
             *      "url":null,
             *      "data":[]
             *   }
             *
             * */
            if(data){
                data = JSON.parse(data);
                if(parseInt(data.code) == 200 && callback){
                    callback(data, paras);
                }
                if(data.message && data.message !== null && data.message !== '' && alert){
                    alert(data);
                }
                if(data.url){
                    location.href = data.url;
                }

            }
        },
        error:function(status, statusText){
            if(error){
                error();
            }
        }
    });
};
const formData = {
    //获取指定form中的所有的<input>对象
    getElements: function(formId) {
        var form = document.getElementById(formId);
        var elements = new Array();
        var tagElements = form.getElementsByTagName('input');
        for (var j = 0; j < tagElements.length; j++){
            elements.push(tagElements[j]);

        }
        return elements;
    },
//获取单个input中的【name,value】数组
    inputSelector: function(element) {
        if (element.checked)
            return [element.name, element.value];
    },
    input: function(element) {
        switch (element.type.toLowerCase()) {
            case 'submit':
            case 'hidden':
            case 'date': return [element.name, element.value];
            case 'password':
            case 'text':
                return [element.name, element.value];
            case 'tel':
                return [element.name, element.value];
            case 'checkbox':
            case 'radio':
                return this.inputSelector(element);
        }
        return false;
    },
//组合URL
    serializeElement: function(element) {
        var method = element.tagName.toLowerCase();
        var parameter = this.input(element);

        if (parameter) {
            var key = encodeURIComponent(parameter[0]);
            if (key.length == 0) return;

            if (parameter[1].constructor != Array)
                parameter[1] = [parameter[1]];

            var values = parameter[1];
            var results = [];
            for (var i=0; i<values.length; i++) {
                // results.push(key + '=' + encodeURIComponent(values[i]));
                results.push(key + '=' + values[i]);
            }
            return results.join('&');
        }
    },
//调用方法
    serializeForm: function(formId) {
        var elements = this.getElements(formId);
        var queryComponents = new Array();

        for (var i = 0; i < elements.length; i++) {
            var queryComponent = this.serializeElement(elements[i]);
            if (queryComponent)
                queryComponents.push(queryComponent);
        }

        return queryComponents.join('&');
    }
};
export {ajaxGet, ajaxPost, formData};