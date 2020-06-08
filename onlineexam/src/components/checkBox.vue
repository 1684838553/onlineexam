<template>
    <div @click="check" :class="{checked:checked, disabled: disabled}" class="check_box">
        <!-- <span class="iconfont" :class="{'icon-xuankuangduigou': checked, 'icon-hanggao': halfChecked}"></span> -->
        <!-- <span class="iconfont" :class="{halfChecked ? 'icon-xuankuangduigou' : 'icon-hanggao'}"></span> -->
        <span class="iconfont icon-halfChecked" v-if="halfChecked"></span>
        <span class="iconfont icon-xuankuangduigou" v-else></span>
    </div>
</template>
<script>
export default {
    name: "checkBox",
    props: {
        halfChecked: { // 半选样式
            type: Boolean,
            required: false
        },
        checked: {
            type: Boolean,
            required: true
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        }
    },
    data() {
        return {};
    },
    methods: {
        check() {
            if (this.disabled) return;
            // let checked = this.checked ? false : true;
            // this.$emit("update:checked", checked);
            this.$emit('change');
        }
    },
}
</script>
<style scoped lang="less">
.check_box {
    width: 15px;
    height: 15px;
    line-height: 15px;
    display: inline-block;
    border-radius: 2px;
    box-sizing: border-box;
    border: 1px solid rgba(130, 146, 176, 0.3);
    cursor: pointer;
    position: relative;
    text-align: center;
    vertical-align: middle;
    background-color: #FFFFFF;

    &.disabled {
        cursor: not-allowed;
    }

    .icon-halfChecked::before{
        content: "-";
        transform: scale(3, 1.5);
        top: -5px!important;
    }

    &.checked {
        border: none;

        span {
            transform: scale(1, 1);
            display: block;
            border: 1px solid #4786FF;
            border-radius: 2px;
            background-color: #4786FF;
            font-size: 10px;

            &:before {
                width: 100%;
                height: 100%;
                position: absolute;
                top: -1px;
                left: -1px;
                display: inline-block;
                color: #FFFFFF;
            }
        }
    }

    span {
        transition: transform .1s;
        -webkit-transition: transform .1s;
        -o-transition: transform .1s;
        -moz-transition: transform .1s;
        transform: scale(0.1, 0.1);
        position: absolute;
        width: 100%;
        height: 100%;
        font-size: 10px;
        left: 0px;
        top: 0px;
        color: #fff;
        font-size: 15px;
        box-sizing: border-box;
    }
}
</style>