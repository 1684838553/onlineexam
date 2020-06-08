import router from "../router.js"
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { getCurUserInfo } from './commonService.js'
import Vue from 'vue'

nprogress.inc(1)
nprogress.configure({
    easing: 'ease',
    speed: 2000,
    showSpinner: false
})
router.beforeEach((to, from, next) => {
    if (to.name === "sys" || to.name === 'dujiaManage') {
        next();
    } else {
        getCurUserInfo().then((res) => {
            // 非管理员无法进入
            if (!res.boo && !res.boo1) {
                Vue.prototype.$msg({
                    type: 'error',
                    content: '您不是管理员',
                    callback() {
                        if (window.location.href.indexOf('dujiaManage') !== -1) {
                            router.push('/dujiaManage')
                        } else {
                            router.push('/sys')
                        }
                    }
                });
            } else {
                nprogress.start()
                next();
            }
        })
    }
})

router.afterEach(() => {
    nprogress.done()
})