<template>
    <div class="auditModal">
        <div class="header">
            <span>审核</span>
            <span @click="cancel"></span>
        </div>
        <div class="body">
            <div class="auditModal-main">
                <label class="lable">审核备注</label>
                <textarea v-model="auditNote" placeholder="输入备注"></textarea>
            </div>
        </div>
        <div class="footer">
            <button class="confirm" @click="confirm('1')">通过</button>
            <button class="cancel" @click="confirm('2')">不通过</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'auditModal',
    props: {},
    data() {
        return {
            auditNote: ''
        };
    },
    mounted() {},
    methods: {
        confirm(status) {
            this.$options.confirm({
                status: status,
                content: this.auditNote
            });
        },
        cancel() {
            this.$options.cancel();
        }
    }
};
</script>
<style scoped lang='less'>
.auditModal {
    width: 512px;
    height: 330px;

    .auditModal-main {
        padding-top: 20px;
        display: flex;

        .lable {
            padding-top: 10px;
            width: 66px;
        }

        textarea {
            box-sizing: border-box;
            outline: none;
            resize: none;
            flex: 1;
            height: 150px;
            background: #f4f5f7;
            border-color: #f4f5f7;
            border-radius: 1px;
            line-height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: #2a2a2a;
            padding: 12px;
        }
    }
}
</style>