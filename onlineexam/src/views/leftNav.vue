<template>
    <div class="publicLeft noselect">
        <ul class="nav" @click="change">
            <li>
                <span @click="selectModule('indexPage')"  :class="{active:selectedModule=='indexPage'}">
                    <i class="iconfont icon-shouye"></i>
                    首页 
                </span>
            </li>
             <li>
                <span @click="selectModule('userManagement')" :class="{active:selectedModule=='userManagement'}">
                    <i class="iconfont icon-yonghu"></i>
                    用户管理
                </span>
            </li>
             <li>
                <span  @click="selectModule('examinationPaperManagement')" :class="{active:selectedModule=='examinationPaperManagement'}">
                    <i class="iconfont icon-shijuan"></i>
                    试卷管理 
                </span>
            </li>
             <li>
                <span @click="selectModule('questionBankManagement')" :class="{active:selectedModule=='questionBankManagement'}">
                    <i class="iconfont icon-tiku"></i>
                    题库管理
                </span>
            </li>
             <li>
                <span @click="selectModule('informationRelease')" :class="{active:selectedModule=='informationRelease'}">
                    <i class="iconfont icon-xinxifabu"></i>
                    信息发布管理 
                </span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'leftNav',
    data() {
        this.$router.push({name:"indexPage"});
        return {
            selectedModule: "indexPage"
        }
    },
    computed: {
       
    },
    mounted() {
    },
    methods: {
        /**
         * [selectModule description] 点击选中模块
         * @param {string} [moduleName] [description] 模块名称
         * @return {[type]} [description]
         */
        selectModule(moduleName){             
            let self = this;
            // if (this.isadmin == true) {
            //     this.showdrop = true;
            // } else {
            //     this.showdrop = false;
            // }
            self.selectedModule = moduleName;
            // let loca = location.hash;
            // console.log('loca',loca)
            // let path = self.$router.resolve({
            //     name: moduleName,               
            // });
            // console.log('path',path)
            let aa = {
                 name: moduleName,
            };
            // self.$router.push(path.location);
            self.$router.push(aa);
            // console.log(this.$route)
            // if (loca.indexOf(moduleName) > -1) {  //防止多次点击头部的tab时，页面展示空白。
                // this.$emit('changeTenant')
                // $('.left_nav li')[0].click();
                // return;
            // }

        },
        change(){
            //debugger;
            let routeArray = this.$route.path.split('/');
            // console.log(this.$route);

        }
    }
};
</script>
<style lang="less" scoped>
.nav{

    .active{
        // background: red;
    }

    .choose{
        background: #00A8CA;

        &:hover{
            background: #00A8CA;
        }
        span{
            color: #fff;
        }
    }

    li{
        width: 100%;
        height: 80px;
        text-align: left;
        line-height: 80px;
        border-bottom: 1px solid #ededed;
        padding-left: 40px;
        box-sizing: border-box;

        &:hover{
            background: #ededed;
        }

        span{
            color: #333;
            font-size: 20px;
            text-align: center;

            i{
                font-size: 23px;
                margin-right: 5px;
                // color: #00A8CA;
            }
        }
    }
}

.user-question-trash {
    background-color: red;
}
</style>


