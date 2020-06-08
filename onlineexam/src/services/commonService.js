import Vue from 'vue';
import store from '../store.js'



/**
 * [isExist description] 判断数据中是否存在某对象
 * @param  {Array}   arr   [description] 数组
 * @param  {Object}  item  [description] 要比较的对象
 * @param  {String}  field [description] 要比较的字段
 * @return {Number}        [description] 返回位置参数, 不存在返回-1
 */
const isExist = function(arr, item, field) {
    var i;
    for (i = 0; i < arr.length; i++) {
        if (field) {
            if (item[field] === arr[i][field]) {
                return i;
            }
        } else {
            if (JSON.stringify(item) === JSON.stringify(arr[i])) {
                return i;
            }
        }
    }
    return -1;
};

/**
 * 深拷贝--无视深度
 * @param {any} obj 深拷贝对象(Array, Object均可)
 */
const deepCopy = function(obj) {
    let result = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
                result[key] = deepCopy(obj[key]); //递归复制
            } else {
                result[key] = obj[key];
            }
        }
    }
    return result;
};

/**
 * [filterFieldToString 筛选出数组或对象里的某个字段的值, 并生成字符串]
 * @param  {[Object, Array]} data [数据(必填)]
 * @param  {[String]} field [需要筛选的字段(必填)]
 * @param  {[String]} symbol [连接符(选填)]
 * @return {[String]}        [description]
 */
const filterFieldToString = function(data, field, symbol) {
    let result = [];
    for (let i in data) {
        if (data[i][field] !== '') result.push(data[i][field]);
    }
    return result.join(symbol);
};


/**
 * 接口--获取当前登录用户的信息
 */
const getCurUserInfo = function() {
    return new Promise((resolve, reject) => {
        if(JSON.stringify(store.state.userInfo) === '{}') {
            let params = {};
            // Vue.prototype.http('/admin/checkUser', params, 'post').then(res => {
            Vue.prototype.http('/mock/getCurUserInfo.json', params, 'get').then(res => {
                store.state.userInfo = res;
                resolve(res);
            });
        } else {
            resolve(store.state.userInfo);
        }
    })
}

/**
 * [getCookie 获取cookie里面的参数]
 * @param  {[String]} name 参数名
 * @return {[String]}  [description]
 */
const getCookie= function(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // 判断这个cookie的参数名是不是我们想要的
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// 数组去重
// Vue.prototype.arrayToHeavy = function(arr){
//     let newArr=[];
//     arr.forEach((item)=>{
//         if(newArr.indexOf((item))===-1){
//             newArr.push(item)
//         }
//     })
//     return newArr;
// }

export { 
    isExist,
    deepCopy,
    filterFieldToString,
    getCurUserInfo,
    getCookie,
    // arrayToHeavy
};
