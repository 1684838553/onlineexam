<template>
    <div class="buttonPlus" :class="{disabled:disabled, tip: tip}">
        <button :disabled="disabled" @click="clickButton">
            <slot></slot>
        </button>
        <span class="tips" v-text="tip || disabledTip">
        </span>
    </div>
</template>
<script>
export default {
    name: 'buttonPlus',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        disabledTip: {
            type: String,
            default: "条件不满足，无法点击"
        },
        tip: {
            type: String
        }
    },
    methods: {
        /**
         * [clickButton description] 点击按钮
         * @return {[type]} [description]
         */
        clickButton($event) {
            this.$emit("click", $event);
        }
    }
}
</script>
<style scoped lang="less">
.buttonPlus {
    display: inline-block;
    position: relative;

    .tips {
        display: none;
        position: absolute;
        width: auto;
        white-space: nowrap;
        z-index: 999;
        left: 50%;
        transform: translateX(-50%);
        top: -28px;
        color: white;
        // background: rgba(0, 0, 0, 0.8);
        background: rgba(41, 47, 58, 0.8);
        line-height: 30px;
        height: 30px;
        padding: 0 10px;
        border-radius: 5px;

        &::after {
            position: absolute;
            display: inline-block;
            bottom: -5px;
            right: 50%;
            width: 0;
            height: 0px;
            content: '';
            border-style: solid;
            border-width: 5px;
            // border-color: rgba(0, 0, 0, 0.8) rgba(0, 0, 0, 0.8) transparent transparent;
            border-color: rgba(41, 47, 58, 0.8) rgba(41, 47, 58, 0.8) transparent transparent;
            transform: rotate(135deg) translateY(-25%) translateX(-25%);
            // box-shadow: 2px -2px 2px rgba(0, 0, 0, 0.22);
        }
    }

    &.tip,
    &.disabled {
        &:hover {
            .tips {
                display: inline-block;
            }
        }
    }
}
</style>