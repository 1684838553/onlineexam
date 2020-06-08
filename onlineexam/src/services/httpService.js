import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from "../router.js"
Vue.use(VueAxios, axios);
/**
 * [httpGet description] get请求
 * @param {string} [requestRootPath] [description] 请求根路径  mlf/bigdata
 * @param {object} [params] [description] 请求参数
 * @param {string} [method] [description] 请求方式 get/post
 * @return {[type]} [description]
 */
{
    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    function toFormData(obj) {
        let query = '';
        let name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name; //name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += toFormData(innerObj) + '&';
                }
            } else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += toFormData(innerObj) + '&';
                }
            } else if (value !== undefined && value !== null) {
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }
        }
        return query.length ? query.substr(0, query.length - 1) : query;
    }
    Vue.prototype.http = function(requestRootPath, params, method, forbidden) {
        return new Promise((resolve, reject) => {
            // let temp = requestRootPath.split('/');
            // 如果不是mock数据就加上根路径
            // if (temp[1] !== 'mock') {
            //     // requestRootPath = this.$apiRootUrl + requestRootPath;
            // }
            let url = requestRootPath;
            let info = this;
            method = typeof method === 'string' ? method : 'get';
            method = method.toLowerCase();
            if (method != 'post' && method != 'get' && method != 'delete') {
                deffer.reject('参数【' + method + '】错误！');
                return deffer.promise();
            }
            axios({
                method: method,
                url: url,
                data: method == 'post' ? params : '',
                params: method == 'get' ? params : '',
                headers: {
                    formdata: '1',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    post: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    put: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                },
                transformRequest: [
                    function(data) {
                        return data instanceof Object && String(data) !== '[object File]' && String(data) !== '[object FormData]' ? toFormData(data) : data;
                    }
                ]
            }).then(
                function(response) {
                    let data = response.data;
                    if (data == null) {
                        reject(data);
                    } else if (data.code == 400) {
                        // 未登录
                        // window.location.href = data.content;
                        info.$msg({
                            type: 'error',
                            content: data.msg,
                            callback() {
                                if(window.location.href.indexOf('dujiaManage') !== -1) {
                                    router.push('/dujiaManage')
                                } else {
                                    router.push('/sys')
                                }
                                reject(data);
                            }
                        });
                    } else if (data.code == 1) {
                        info.$msg({
                            type: 'error',
                            content: data.msg,
                            callback() {
                                reject(data);
                            }
                        });
                    } else {
                        resolve(data);
                    }
                },
                function(data) {
                    if (data.response.status === 502) {
                        info.$msg({
                            type: 'error',
                            content: '网络连接错误',
                            time: 2000,
                            callback() {
                                reject(data);
                            }
                        });
                    } else if (data.response.status === 404) {
                        info.$msg({
                            type: 'error',
                            content: '服务器错误',
                            time: 2000,
                            callback() {
                                reject(data);
                            }
                        });
                    } else {
                        info.$msg({
                            type: 'error',
                            content: data.response.data.message,
                            time: 2000,
                            callback() {
                                reject(data);
                            }
                        });
                    }
                }
            );
        });
    };
    /**
     * 直接提交form表单形式的接口请求
     * @param {Object} url
     * @param {Object} params
     */
    Vue.prototype.redirectPost = function(url, params) {
        let config = {
            method: 'post',
            url: url,
            data: params
        };
        let $iframe = $('<iframe id="down-file-iframe" />');
        let $form = $('<form target="down-file-iframe" method="' + config.method + '" />');
        $form.attr('action', config.url);
        for (var key in config.data) {
            $form.append('<input type="hidden" name="' + key + '" value="' + config.data[key] + '" />');
        }
        $iframe.append($form);
        $(document.body).append($iframe);
        $form[0].submit();
        $iframe.remove();
    };
}
