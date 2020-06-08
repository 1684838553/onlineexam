import Vue from "vue"
import Ask from "./ask.vue"

var getSingleton = function(fn) {
	var result;
	return function() {
		return result || (result = fn.apply(this, arguments));
	}
}

var before = function(fn, addfn) {
	return function() {
		addfn.apply(this, arguments);
		return fn.apply(this, arguments);
	}
}

var askSingleton = getSingleton(function() {
	const Instance = new Vue({
		data() {
			return {
				cancelText: undefined,
				showCancel: false,
			}
		},
		render(h) {
			var vnode = h(Ask, {});
			return vnode;
		}
	})	
	const component = Instance.$mount();
	document.body.appendChild(component.$el);
	const ask = Instance.$children[0];
	return ask;
});

Ask._init = function(option) {

	var ask = askSingleton();
	ask.content = option.content;
	ask.title = option.title;
	if(option.detail) {
		ask.detail = option.detail;
		ask.showDetail = true;
	} else {
		ask.showDetail = false;
	}
	if(!ask._cancel) {
		ask._cancel = ask.cancel;
	} else {
		ask.cancel = ask._cancel;
	}
	if(!ask._confirm) {
		ask._confirm = ask.confirm;
	} else {
		ask.confirm = ask._confirm;
	}
	if(option.cancel) {
		ask.cancel = before(ask.cancel, option.cancel);
	}
	if(option.callback) {
		ask.confirm = before(ask.confirm, option.callback);
	}
	if(option.type) {
		ask.type.curType = ask.type[option.type];
	}
	if(typeof option.showCancel === "boolean") {
		if(option.showCancel === true) {
			ask.showCancelButton = true;
		} else {
			ask.showCancelButton = false;
		}
	}
	ask.showAsk = true;
}

Ask.hide = function() {
	var ask = askSingleton();
	ask.showAsk = false;
}

Ask.cancel = function() {
	var ask = askSingleton();
}

Vue.prototype.$ask = function(options) {
	var info = this;
	info.$Ask._init(options);
}

export default Ask;