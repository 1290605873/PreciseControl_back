// import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'


import './registerServiceWorker'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets


// import './plugins/element.js' //Element ui
import '@/styles/index.scss' // global css

import api from './api/smartSupervision/index'//引入接口调用api

import utils from './utils' //公共js方法


Vue.prototype.$utils = utils;   //注册全局方法
/**
 *
 * @param msg 消息体
 * @param type 0 默认，1success 2warning -1error
 * @param fun
 */

Vue.prototype.message = function (msg, type, fun) {
    let type_ = '';
    switch (type) {
        case 0:
            type_ = '';
            break;
        case 1:
            type_ = 'success';
            break;
        case 2:
            type_ = 'warning';
            break;
        case -1:
            type_ = 'error';
            break;
    }
    this.$message(
        {
            showClose: true,
            message: msg,
            type: type_,
            duration: 1200,
            center: true,
            onClose() {
                if (fun) {
                    fun();
                }
            }
        }
    )
};
Vue.config.productionTip = false;

Vue.use(api);

//时间日期格式处理
/*
*拓展Date方法。得到格式化的日期形式 基本是什么格式都支持
*date.format('yyyy-MM-dd')，date.format('yyyy/MM/dd'),date.format('yyyy.MM.dd')
*date.format('dd.MM.yy'), date.format('yyyy.dd.MM'), date.format('yyyy-MM-dd HH:mm')   等等都可以
*使用方法 如下：
*                       var date = new Date();
*                       var todayFormat = date.format('yyyy-MM-dd'); //结果为2015-2-3
*Parameters:
*format - {string} 目标格式 类似('yyyy-MM-dd')
*Returns - {string} 格式化后的日期 2015-2-3
*
*/
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
