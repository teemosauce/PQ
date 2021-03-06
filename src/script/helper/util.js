define(function (require, factory) {
    'use strict';
    return {

        /**
         * 获取窗口宽度
         */
        getWindowWidth: function () {
            return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        },

        /**
         * 图片预加载
         * @param {图片地址} src 
         * @param {配置} options 
         */
        loadImage: function (src, options) {
            var opts = Object.assign({
                loader: "pureImage"
            }, options)
            if (opts.loader === "pureImage") {
                var image = new Image();
                image.src = src;
            } else if (opts.loader === "bgImage") {
                $("<div>").css({
                    width: 0,
                    height: 0,
                    overflow: "hidden",
                    "background-image": "url(" + src + ")"
                }).appendTo("body")
            }
        },

        /**
         * 判断是否移动设备
         */
        isPhone: function () {
            var userAgent = navigator.userAgent;
            return !(!/AppleWebKit.*Mobile/i.test(userAgent) && !/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(
                userAgent) || /iPad/i.test(userAgent))
        },
        /**
         * 判断是否支持触摸事件
         */
        isSupportTouchEvent: function () {
            var userAgent = navigator.userAgent.toLowerCase();
            return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
        },

        /**
         * 获取浏览器类型
         */
        getBrowserType: function () {
            var userAgent = navigator.userAgent;
            if (userAgent.indexOf("Opera") > -1) {
                return "opera";
            }

            if (userAgent.indexOf("Firefox") > -1) {
                return "firefox";
            }

            if (userAgent.indexOf("Chrome") > -1) {
                return "chrome";
            }

            if (userAgent.indexOf("Safari") > -1) {
                return "safari";
            }

            if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1) {
                return "ie";
            }
            return "unknown"
        },

        /**
         * 固定底部栏永远在最下面
         */
        fixFooter: function () {
            var header = document.getElementsByClassName("site-header")[0]
            var footer = document.getElementsByClassName("site-footer")[0];
            var content = document.getElementsByClassName("site-content")[0];

            if (footer) {
                var headerHeight = header && header.clientHeight || 0;

                if (content) {
                    content.style.minHeight = document.documentElement.clientHeight - headerHeight - footer.offsetHeight + "px";
                }

                footer.style.visibility = "visible";
            }
        },

        /**
         * 节流函数
         * @param {要控制的方法} f 
         * @param {最低多长时间执行一次} milliseconds 
         */
        throttle: function (f, milliseconds) {
            f.startTime = Date.now()
            return function () {
                var context = this,
                    arg = arguments,
                    now = Date.now()

                if (f.id) {
                    window.clearTimeout(f.id);
                    f.id = 0;
                }
                if (now - f.startTime > milliseconds) {
                    f.apply(context, arg);
                    f.startTime = now;
                } else {
                    f.id = window.setTimeout(function () {
                        f.apply(context, arg);
                    }, milliseconds)
                }
            }
        },

        /**
         * 随机生成一个符合uuid格式的字符串
         */
        uuid: function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16)
            });
        }
    }
});