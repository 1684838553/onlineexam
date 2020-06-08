<template>
<div class="zhuce">
    <div class="form">
        <p>欢迎来到在线考试系统！</p>
        <el-form ref="form" :model="form" label-width="80px" >           
            <el-form-item label="学号" v-if="this.form.checked == 'student'" >
                <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="工号" v-if="this.form.checked == 'teacher'">
                <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="form.name" ></el-input>
            </el-form-item> 
            <el-form-item label="手机号 *">
                <el-input v-model="form.telephone" ></el-input>
            </el-form-item> 
            <el-form-item label="密码 *">
                <el-input v-model="form.password"></el-input>
            </el-form-item> 
            <el-form-item label="用户类型" class="form-groups">
               <label>学生<input type="radio" name="type" value="student" v-model="form.checked"></label>
                <label>老师<input type="radio" name="type" value="teacher" v-model="form.checked"></label>
            </el-form-item>
            <el-form-item><el-button type="primary" @click="onSubmit" class="btn">立即注册</el-button></el-form-item>     
        </el-form>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
             form: {
                telephone: '',
                id:'',
                password:'',
                checked:"student",
                name:''
            }
        
        }
    },
    mounted(){
    },
    methods:{
        onSubmit(){
            let that = this;
            let params={
                optype:"zhuce",
                _output : 'jsonp',
                id:this.form.id,
                telephone:this.form.telephone,
                password:this.form.password,
                type:this.form.checked,
                name:this.form.name
            }
            $.getScript("http://localhost:8080/onlineexam/index.php?"+$.param(params),function(){
                if(res.info == true){
                    let router = that.$router.resolve({
                        name:"login"
                    })
                    that.$router.push(router.location);
                    that.form={};
                }else{
                    alert("用户id可能已存在，请稍后重新操作！");
                }
            })
        }
    }

}
</script>
<style lang="less" scoped>
.zhuce{
    background: #fff;
    width: 100%;
    height: 100%;
    position: relative;

  
    .form{
        margin: auto;
        width:350px;
        height: 450px;
        // background: #ededed;
        padding-right: 20px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 1px #ededed solid;

        p{
            font-size: 20px;
            color:#22A0FF;
            margin-top:28px;
            text-align: center;
        }
        .form-groups{
            width: 100%;
            height: 40px;
            margin-bottom: 5px;
            line-height: 40px;
            color:#606266;

            label{
                font-size:16px;
                margin-right: 20px;
            }
            input{
                width: 20px;
                height: 20px;
                position: relative;
                top: 5px;
                left: 5px;
            }
        }
    }
    .btn{
        width:100%;
    }
}

</style>
