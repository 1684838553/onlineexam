<template>
    <div class="modal_demo">
        <div class="header">
            <span v-text="title"></span>
            <span @click="cancel"></span>
        </div>
        <div class="body">
            <div class="input">
                点击确认传出的数据:
                <input type="text" v-model="confirmData" name="">
            </div>
            <div>
                点击取消传出的数据:
                <input type="text" v-model="cancelData" name="">
            </div>
        </div>
        <div class="footer">
            <button class="confirm" @click="confirm">确认</button>
            <button class="cancel" @click="cancel">关闭</button>
        </div>
    </div>
</template>
<script>
import modalDemo from "./modalDemo.vue"
export default {
    name: 'modalDemo',
    props: {
        title: {
            type: String,
            default: '我是弹窗的默认标题'
        }
    },
    data() {
        return {
            confirmData: '确认的数据',
            cancelData: '取消的数据'
        };
    },
    mounted() {},
    methods: {
        confirm() {
            this.$options.confirm(this.confirmData);
            // this.publicModal(modalDemo, { title: '我是自定义的一个弹窗标题' }).then((data) => {
            //     alert(data);
            // }, (data) => {
            //     alert(data);
            // });
        },
        cancel() {
            this.$options.cancel(this.cancelData);
        }
    }
}
</script>
<style scoped lang='less'>
.modal_demo {
    width: 600px;
    height: 300px;
}
</style>