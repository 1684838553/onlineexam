import Vue from 'vue';
import { getStatus, getIsQuestionClosely, getCategoryStatus } from './commonService.js'


/**
 * [状态类型转中文]
 * @return {[type]}      [description]
 */
Vue.filter('filterStatus', function(value) {
    if(value === '' || typeof value === 'undefined') {
        return ''
    }
    let status = getStatus();
    for(let i = 0; i < status.length; i++) {
        if(value.toString() === status[i].value) {
            return status[i].name;
        }
    }
});

/**
 * [是否追问转中文]
 * @return {[type]}      [description]
 */
Vue.filter('filterIsQuestionClosely', function(value) {
    if(value === '' || typeof value === 'undefined') {
        return ''
    }
    let isQuestionClosely = getIsQuestionClosely();
    for(let i = 0; i < isQuestionClosely.length; i++) {
        if(value.toString() === isQuestionClosely[i].value) {
            return isQuestionClosely[i].name;
        }
    }
});

/**
 * [分类状态类型转中文]
 * @return {[type]}      [description]
 */
Vue.filter('filterCategoryStatus', function(value) {
    if(value === '' || typeof value === 'undefined') {
        return ''
    }
    let status = getCategoryStatus();
    for(let i = 0; i < status.length; i++) {
        if(value.toString() === status[i].value) {
            return status[i].name;
        }
    }
});




