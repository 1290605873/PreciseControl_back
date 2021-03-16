/*
* 不通过路由直接获取url中参数的方法示例
* @example  let channel=this.$utils.getUrlKey("channel")
*/
export default {
    isHttpsProtal: function () {
        return window.location.protocol.startsWith('https');
    }
    ,
    getUrlKey: function (name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
    }
    ,
    /**
     *打印对象信息
     * 用法 vue对象中拓展 this.$utils.consoleObj(obj);
     * @param obj 需要打印的对象
     */
    consoleObj: function (obj) {
        try {
            if(process){
                if (process.env.NODE_ENV =='development') {
                    window.console.log('%c' + this.prettyPrint(obj), 'color:green');
                }
            }
        } catch (e) {

        }

    },
    dealHttpSrc: function (src) {
        if (src == null || src == undefined || src.length == 0) {
            return '';
        }
        if (this.isHttpsProtal()) {
            if (src.startsWith('https') || src.startsWith("HTTPS")) {
                return src
            } else {
                return src.replace("http", 'https');
            }
        } else {
            if (src.startsWith('https')) {
                return src.replace("https", 'http');
            } else if (src.startsWith('HTTPS')) {
                return src.replace("HTTPS", 'http');
            } else {
                return src;
            }
        }
    }
    ,
    prettyPrint: function (obj) {
        var ENDLINE = "\n";
        var COMMA_ENDLINE = ",\n";
        var OBJ_BEGIN = "{";
        var OBJ_END = "}";
        var ARR_BEGIN = "[";
        var ARR_END = "]";
        var INDNET_SPACES = 4;

        return (function innerPrettyPrint(obj, spaces) {
            var type = typeof obj;

            if (type == "number" || type == "boolean") {
                return obj.toString();
            } else if (type == "string") {
                return '"' + obj + '"';
            } else {
                var entries = [];
                var thisIndent = ' '.repeat(spaces);
                var subIndent = thisIndent + ' '.repeat(INDNET_SPACES);
                var subSpaces = spaces + INDNET_SPACES;

                if (Object.prototype.toString.call(obj) == '[object Object]') {
                    for (var k in obj) {
                        entries.push(k + ': ' + innerPrettyPrint(obj[k], subSpaces));
                    }

                    return OBJ_BEGIN + ENDLINE + subIndent + entries.join(COMMA_ENDLINE + subIndent) + ENDLINE + thisIndent + OBJ_END;
                } else if (Object.prototype.toString.call(obj) == '[object Array]') {
                    obj.forEach(function (a) {
                        entries.push(innerPrettyPrint(a, subSpaces));
                    });

                    return ARR_BEGIN + ENDLINE + subIndent + entries.join(COMMA_ENDLINE + subIndent) + ENDLINE + thisIndent + ARR_END;
                } else if (obj === null) {
                    return "null";
                } else {
                    try {
                        return obj.toString();
                    } catch (r) {
                        return '';
                    }

                }
            }
        })(obj, 0);
    }
    , dealDoNetTime(donetTime) {
        // let date = eval('new ' + eval(donetTime).source);
        donetTime = donetTime.replace("/Date(", "").replace(")/", "");
        return new Date(parseInt(donetTime));
    },
    //判断是正式环境还是测试环境
    isTestEvn() {
        let locationHref = window.location.href.toLocaleLowerCase();
        if (locationHref.indexOf('http://test') >= 0 || locationHref.indexOf('https://test') >= 0) {
            return true
        } else {
            return false
        }
    },
    //获取guid 调用方式this.$utils.guid()
    guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    },
    // 深度复制
    deepCopy(o){
      return typeof(o) == 'Object' ? console.log('不是对象') : JSON.parse(JSON.stringify(o))
    },
    setCookie: (name, value, expires, days, hours) => {
        days = days == "" || days == undefined ? 30 : days;
        hours = hours == "" || hours == undefined ? 24 : hours;
        var exp = new Date();
        var domain = window.document.domain.indexOf("iuoooo") >= 0 ? ".iuoooo.com" : window.document.domain;
        exp.setTime(exp.getTime() + days * hours * 60 * 60 * 1000);
        console.log(name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/;domain=" + domain)
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/;domain=" + domain;
    },
    getCookie: (name) => {
        let arr;
        let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2]);
        }
        else {
            return null;
        }
    },
    /**
     * 删除cookie
     * @param name cookie的名称
     */
    delCookie: (name) => {
        setCookie(name, ' ', -1);
    },
}
