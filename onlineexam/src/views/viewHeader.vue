<template>
    <div class="public-header noselect">
        <img class="logo" src="../../public/img/logo.jpg" height="30" width="32" />
        <span class="title">
            在线考试
        </span>
        <span class="exit" @click="signout">
            退出
        </span>
        <span class="userName">{{userInfo.trueName}}</span>
        <span class="userImg">
            <img src="../../public/img/cat.jpg" alt="">
        </span>
    </div>
</template>
<script>
export default {
    name: 'viewHead',
    data() {
        return {
            // userInfo: this.$store.state.userInfo
        };
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        }
    },
    mounted() {
        // 监听通过localStorage进行的通知
        window.addEventListener('storage', this.storageListener);
    },
    beforeDestroy() {
        window.removeEventListener('storage', this.storageListener);
    },
    methods: {
        // 退出
        signout() {
            let that =this;
            // let params = {};
            // this.loader = this.http('/admin/exit', params, 'post').then(res => {
            //     if (res.code === 100) {
            //         this.$msg({
            //             content: res.msg,
            //             type: 'success',
            //             callback: () => {
            //                 // 清空用户信息
            //                 this.$store.state.userInfo = {};
            //                 let router = this.$router.resolve({
            //                     name: 'sys'
            //                 });
            //                 this.$router.push(router.location);
            //             }
            //         });
            //     }
            // });
            document.cookie = "id="+"";
            document.cookie ="password=" + "";
            document.cookie ="type=" + "";
            document.cookie ="name=" + "";
            document.cookie ="school=" + "";
            that.$router.push("/");
        },
        // localStorage监听事件
        storageListener(e) {
            if (e.key === 'editAnswer' || e.key === 'editQuestion') {
                this.$store.state[e.key] = !this.$store.state[e.key];
            }
        }
    }
};
</script>




