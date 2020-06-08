import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer);
Viewer.setDefaults({
  Options: { "inline": true, "button": true, "navbar": true, "title": true, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source" }
});

import "loaders.css"
import "./components/remAutoAdjust.js"
import "./services/validation.js"
import "./services/httpService.js" // http服务
import "./services/commonFilter.js" // 过滤器
import "./services/nprogress.js"
import "./services/config.js"
import $ from 'jquery'
import './services/modifyTitle.js';
window.$ = window.jQuery = $;
import "./mixin/publicModal/publicModal.js" //弹窗容器
import askSingleton from "./components/ask/ask.js" // 询问弹窗
Vue.prototype.$Ask = askSingleton;
import toastSingleton from "./components/toast/toast.js" // 提示弹窗
Vue.prototype.$Toast = toastSingleton;
import searchInput from "./components/searchInput.vue" // 搜索框控件
Vue.component("searchInput", searchInput);
import dropDownMenu from "./components/dropDownMenu.vue" // 单选下拉菜单控件
Vue.component("dropDownMenu", dropDownMenu);
import buttonPlus from "./components/buttonPlus.vue" // 带tip的按钮控件
Vue.component("buttonPlus", buttonPlus);
import dateTimeRangePicker from "./components/dateTimeRangePicker.vue" // 日期范围控件
Vue.component("dateTimeRangePicker", dateTimeRangePicker);
import checkBox from "./components/checkBox.vue" // 复选框
Vue.component("checkBox", checkBox);
import pagination from "./components/pagination.vue" // 分页
Vue.component("pagination", pagination);
import loaders from "./components/loaders.vue" // 加载logo
Vue.component("loaders", loaders);
import barLine from "./components/barLine.vue"
Vue.component("barLine", barLine);
import viewFooter from "./views/viewFooter.vue"
import './plugins/element.js'
Vue.component("viewFooter", viewFooter);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
