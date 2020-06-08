<template>
    <div class="mtyas-toast" v-show="isShowDelay">
        <transition name="slide-fade">
            <div class="mtyas-toast-main" v-if="isShow">
                <div class="mtyas-toast-body" :class="[type]">
                    <div class="mtyas-toast-header">
                        <span>提示</span>
                    </div>
                    <span class="iconfont" :class="{'icon-success': type == 'success', 'icon-iconfail': type == 'error', 'icon-iconnotice': type == 'info'}"></span>
                    <div class="mtyas-toast-msg" v-text="msg">
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    data() {
        return {
            msg: "修改成功",
            time: 2000, //延时
            isShow: false,
            type: '',
            big: false,
            isShowDelay: false,
        }
    },
    methods: {
        hide() {
            // this.isShow = true;
            setTimeout(() => {
                this.isShow = false;
            }, this.time);
        }
    },
    watch: {
        isShow(newval) {
            if (newval) {
                this.isShowDelay = this.isShow;
            } else {
                setTimeout(() => {
                    this.isShowDelay = this.isShow;
                }, 400);
            }
        }
    }
}
</script>
<style scoped lang="less">
.mtyas-toast {
    z-index: 999999;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .5);
}

.mtyas-toast-main {
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

.mtyas-toast-body {
    z-index: 999999;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    min-width: 250px;
    max-width: 900px;
    min-height: 20px;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 0px 30px;
    text-align: center;
    border-radius: 2px;

    .mtyas-toast-header {
        height: 60px;
        border-bottom: 1px dashed #D8D8D8;
        line-height: 60px;
        text-align: left;

        span {
            font-size: 18px;
            color: #3E3E3E;
        }
    }

    .mtyas-toast-msg {
        font-size: 18px;
        position: relative;
        color: #fff;
        width: 100%;
        height: 100%;
    }

    &.success,
    &.error,
    &.info {
        width: 506px;
        height: 312px;
        background: #FFFFFF;
        border: 0 solid #D5D5D5;
        // box-shadow: 0 1px 8px 0 #E4E4E4;
        // border-radius: 10px;
        box-sizing: border-box;

        .mtyas-toast-msg {
            font-size: 18px;
            color: #4A4A4A;
            width: auto;
            height: auto;
        }

        .iconfont {
            font-size: 90px;
            margin-top: 57px;
            margin-bottom: 20px;
            display: inline-block;
            position: relative;
        }
    }

    &.success {
        .iconfont {
            color: #A7D265;
        }
    }

    &.error {
        .iconfont {
            color: #F27070;
        }
    }

    &.info {
        .iconfont {
            color: #FFBE5C;
        }
    }
}
</style>