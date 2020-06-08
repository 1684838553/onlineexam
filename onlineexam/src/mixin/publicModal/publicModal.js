import Vue from "vue";
import $ from "jquery";
import "./publicModal.css";
let publicParent = {};
let _window=window;
Vue.mixin({
    data() {
        return {
            modalContainer: ""
        }
    },
    mounted() {
        // this.modalContainer = $("body").find(".public_modal_abc")[0];
        // if (!this.modalContainer) {
        //     this.modalContainer = document.createElement("div");
        //     this.modalContainer.setAttribute("class", "public_modal_abc");
        //     $("body").append(this.modalContainer);
        // }
    },
    beforeDestroy () {
        window.removeEventListener('keyup', _window.closeWindow);
        // if(publicParent.cancel){
        //     publicParent.cancel();
        // }
    },
    methods: {
        publicModal(component, props) {
            let self = this;
            this.modalContainer = $("body").find(".public_modal_abc")[0];
            if (!this.modalContainer || (this.modalContainer && $(this.modalContainer).html())) {
                this.modalContainer = document.createElement("div");
                this.modalContainer.setAttribute("class", "public_modal_abc");
                $("body").append(this.modalContainer);
            }
            return new Promise((resolve, reject) => {
                let modalDialog;
                component = Vue.extend(component);
                let node = document.createElement('div');
                $(this.modalContainer).show();
                $(this.modalContainer).append(node);
                let comfirm = function(data) {
                    $(modalDialog.$el).removeAttr("style");
                    setTimeout(() => {
                        modalDialog.$el.remove();
                        modalDialog.$destroy();
                        if ($(self.modalContainer).children().length === 0) {
                            // $(self.modalContainer).hide();
                            $(self.modalContainer).remove();
                        }
                        resolve(data);
                    }, 200);
                };
                let cancel = publicParent.cancel = function(data) {
                    $(modalDialog.$el).removeAttr("style");
                    setTimeout(() => {
                        modalDialog.$el.remove();
                        modalDialog.$destroy();
                        if ($(self.modalContainer).children().length === 0) {
                            // $(self.modalContainer).hide();
                            $(self.modalContainer).remove();
                        }
                        reject(data);
                    }, 200);
                };
                window.closeWindow = function(event) {
                    if (event.keyCode === 27) {
                        cancel();
                    }
                };
                window.addEventListener('keyup', _window.closeWindow);
                modalDialog = new component({
                    el: node,
                    propsData: props,
                    parent: this,
                    confirm: comfirm,
                    cancel: cancel
                });
                let buttons = $(modalDialog.$el).find(".footer button");
                if (buttons.length === 1) {
                    buttons.eq(0).addClass("single");
                }
                setTimeout(() => {
                    let $modal = $(this.modalContainer).find("div").eq(0).css("transform", "none");
                    $modal.bind("mousewheel", function(e) {
                        //console.log(e);
                    });
                }, 100);
            });
        }
    }
});