<template>
    <div class="mtyas-commbac" v-show="showAskDelay">
        <transition name="slide-fade">
            <div class="mtyas-ask" v-if="showAsk">
                <div class="mtyas-ask-body">
                    <div class="mtyas-ask-head">
                        <span v-text="title ? title : '提示'"></span>
                        <i class="iconfont icon-guanbi-youshang fr pointer" @click="cancel"></i>
                    </div>
                    <div class="mtyas-ask-content">
                        <div class="mtyas-ask-icon">
                            <i class="iconfont" :class="type.curType"></i>
                        </div>
                        <span v-text="content"></span>
                        <span v-if="showDetail" class="mtyas-ask-detail" v-text="detail"></span>
                    </div>
                    <div class="mtyas-ask-footer" v-if="showAllButton">
                        <span class="mtyas-ask-confirm mtyas-ask-button" v-show="showConfirmButton" @click="confirm()">
                        确定
                        </span>
                        <span class="mtyas-ask-cancel mtyas-ask-button" v-show="showCancelButton" @click="cancel()">
                        取消
                        </span>
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
            showAsk: false,
            showCancelButton: true,
            showConfirmButton: true,
            showAllButton: true,
            content: "",
            detail: "",
            showDetail: Boolean,
            showAskDelay: false,
            type: {
                info: 'icon-iconnotice',
                error: "icon-cuowutishi",
                question: "icon-wenhao",
                curType: "icon-iconnotice",
            },
        }
    },
    mounted() {},
    methods: {
        confirm() {
            this.showAsk = false;
        },
        cancel() {
            this.showAsk = false;
        },
    },
    watch: {
        showAsk(newval) {
            if (newval) {
                this.showAskDelay = this.showAsk;
            } else {
                setTimeout(() => {
                    this.showAskDelay = this.showAsk;
                }, 400);
            }
        }
    }
}
</script>
<style lang="less" scoped>
.mtyas-commbac {
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .5);
}

.mtyas-ask {
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    .pointer {
        cursor: pointer;
    }

    .mtyas-ask-body {
        width: 506px;
        height: 312px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #FFFFFF;
        padding: 0 30px;
        box-sizing: border-box;
    }

    .mtyas-ask-head {
        height: 60px;
        line-height: 60px;
        border-bottom: 1px dashed #D8D8D8;

        span {
            font-size: 18px;
        }

        .iconfont {
            font-size: 15px;
            color: #C2C5CD;
        }
    }

    .mtyas-ask-content {
        font-size: 18px;
        text-align: center;

        .mtyas-ask-detail {
            display: block;
            color: #808080;
            font-size: 14px;
            margin-top: 20px;
        }
    }

    .mtyas-ask-footer {
        position: absolute;
        width: 100%;
        bottom: 20px;
        height: 40px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
    }

    .mtyas-ask-icon {
        margin-top: 12px;
        margin-bottom: 20px;
        color: #FFBE5C;
    }

    .iconfont {
        font-size: 90px;
        // position: absolute;
        // top: 50%;
        // left: 50%;
        // transform: translate(-50%, -50%);
        // color: #55A8FD;
    }

    .mtyas-ask-button {
        width: 100px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        border-radius: 2px;
        display: inline-block;
        box-sizing: border-box;
        vertical-align: middle;
        cursor: pointer;
        color: #FFFFFF;
    }

    .mtyas-ask-cancel {
        background-color: #c2c5cd;
        margin-left: 30px;
        &:hover {
            background-color: #999;
        }
    }

    .mtyas-ask-confirm {
        background-color: #4786ff;
        &:hover {
            background-color: #1b66f6;
        }
    }
}
</style>