<template>
    <div class="loaders" v-if="showLoader">
        <div class="inner">
            <div class="loader-inner ball-grid-beat">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="text" v-text="tip"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: "loaders",
    data() {
        return {
            showLoader: false,
            promise: ""
        }
    },
    props: {
        loader: {},
        tip: {
            type: String,
            default: "数据加载中，请稍候..."
        },
        smallRange: {
            type: Boolean,
            default: false
        }
    },
    beforeMount() {
        let self = this;
        if (this.smallRange) {
            setTimeout(() => {
                $(self.$el).css("position", "absolute");
                let $parent = $(self.$el).parent().eq(0);
                $parent.css("position", "relative");
            }, 200);
        }
        window.addEventListener("keydown", this.keyboardEvent);
    },
    methods: {
        /**
         * [keyboardEvent description] 键盘支持，退出蒙层
         * @return {[type]} [description]
         */
        keyboardEvent(event) {
            if (event.keyCode === 27 && this.showLoader === true) {
                this.showLoader = false;
            }
        }
    },
    destroyed() {
        window.removeEventListener("keydown", this.keyboardEvent);
    },
    watch: {
        loader(newV, oldV) {
            let self = this;
            if (this.promise) {
                clearTimeout(this.promise);
                this.promise = null;
            }
            // this.promise = setTimeout(() => {
            //     self.showLoader = true;
            //     newV.then((data) => {
            //         self.showLoader = false;
            //     });
            // }, 100);
            if (!!newV) {
                this.showLoader = true;
                this.promise = newV.then((success) => {
                    this.showLoader = false;
                }, (error) => {
                    this.showLoader = false;
                });
            }
            return this.promise;
        }
    }
}
</script>
<style lang="less" scoped>
.loaders {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    // cursor: wait;
    z-index: 999;
    .inner {
        transform: scale(0.8, 0.8);
        left: 50%;
        margin-left: -145px;
        position: absolute;
        top: 50%;
        margin-top: -28px;
        display: inline-block;
        padding: 10px;
        border-radius: 5px;
        background: rgba(0, 0, 0, 0.2);
        .loader-inner {
            margin-right: 10px;
            float: left;
            display: inline-block;
            width: 57px;
            height: 57px;
            &>div {
                background: white;
            }
        }
        .text {
            color: white;
            float: left;
            display: inline-block;
            height: 57px;
            line-height: 57px;
            font-size: 24px;
        }
    }
}
</style>