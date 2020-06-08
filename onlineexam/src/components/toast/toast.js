import Vue from 'vue';
import Toast from './toast.vue';

var getSingleton = function(fn) {
	var result;
	return function() {
		return result || (result = fn.apply(this, arguments));
	}
}

var toastSingleton = getSingleton(function() {
	const Instance = new Vue({
		render(h) {
			var vnode = h(Toast, {});
			return vnode;
		}
	})
	const component = Instance.$mount();
	document.body.appendChild(component.$el);
	const toast = Instance.$children[0];
	return toast;
});

Toast._init = function(option) {
	var info = this;
	var toast = toastSingleton();
	toast.msg = option.content;
	toast.type = option.type;
	toast.callback = option.callback;
	if(option.time){
		toast.time = option.time;
	}
	if(option.callback){
		setTimeout(function(){
			option.callback.call(info);
		},toast.time);
	}
	toast.isShow = true;
	toast.hide();
}

Vue.prototype.$msg = function(options) {
	var toast = toastSingleton();
	this.$Toast._init(options);
}

export default Toast;