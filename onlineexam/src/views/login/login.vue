<template>
    <div class="login">
        <div class="login-center">
           <form class="forms">
               <div class="title">在线考试管理系统</div>
               <div class="form-group">
                   <input type="text" placeholder="请输入您的学号或工号" name='id' v-model="id">                   
               </div>
               <div class="form-group">
                   <input type="password" placeholder="请输入您的密码" name='password'  class="pass" v-model="password">                   
               </div>
               <div class="form-groups">
                   <label>学生<input type="radio" name="type" value="student" v-model="checked"></label>
                    <label>老师<input type="radio" name="type" value="teacher" v-model="checked"></label>
                    <span class="zhuce" @click="zhuce">注册</span>
               </div>
               <div class="form-group">
                  <button class="btn btn-block btn-primary" type="button" @click.stop="submit">立即登录</button>
               </div>
           </form>
            <div class="look_password" @click="centerDialogVisible = true">找回密码？</div>
        </div>
        <!-- 模态框 -->
        <el-dialog title="新建试卷" :visible.sync="centerDialogVisible"  width="30%" center>
            <el-form :label-position="labelPosition" label-width="100px" :model="form"> 
                <div v-if="look">
                   <el-form-item label="id">
                        <el-input v-model="form.id"></el-input>
                    </el-form-item> 
                    <el-form-item label="手机号">
                        <el-input v-model="form.telephone"></el-input>
                    </el-form-item> 
                    <div class="form-groups" style="margin-left:40px">
                        <label>学生<input type="radio" name="type" value="student" v-model="form.checked"></label>
                        <label>老师<input type="radio" name="type" value="teacher" v-model="form.checked"></label>
                    </div> 
                </div>                                                
                <div v-if="!look">
                    <el-form-item label="密码">
                        <el-input v-model="form.password"></el-input>
                    </el-form-item>    
                </div>                                 
            </el-form>
            <span slot="footer" class="dialog-footer" v-if="look">
                <el-button type="primary" @click="add">确 定</el-button>
            </span>
            <span slot="footer" class="dialog-footer" v-if="!look">
                <el-button type="primary" @click="changed">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 模态框结束 -->
    </div>
</template>
<script>
export default {
    name:'login',
    data(){
        return{
           checked:"student",
           id:'',
           password:'',
           centerDialogVisible:false,
           labelPosition:'right',
           form:{
               password:'',
               telephone:'',
               id:'',
               checked:'student'
           },
           look:true
        }
    },
    mounted(){
    },
    methods:{
        changed(){
            let that =this;
            let params={
                optype:"change",
                _output : 'jsonp',
                type:this.form.checked,
                id:this.form.id,
                telephone:this.form.telephone,
                password:this.form.password
            }
            $.getScript("http://localhost:8080/onlineexam/index.php?"+$.param(params),function(){
                if(res.info == true){
                    that.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    that.centerDialogVisible= false;
                    that.form = {}; 
                }else{
                     that.$message({
                        type: 'info',
                        message: '操作失败，请稍后再试！'
                    });
                } 
            });
        },
        add(){
            this.look = !this.look;
        },
        submit(){
            let that = this;
            // 将id和password存放在cookie中
            document.cookie = "id="+this.id;
            document.cookie ="password=" + this.password;
            document.cookie = "type=" + this.checked;
            let params={
                optype:"checkLogin",
                id:this.id,
                type:this.checked,
                _output : 'jsonp'
            }
            $.getScript('http://localhost:8080/onlineexam/index.php?'+$.param(params),function(){
                if(res.status == 0){
                    let router = that.$router.resolve({
                        name:"indexPage",
                        query:{   //在URL中添加id作为参数
                           id:that.id,
                           type:that.checked 
                        }
                    })
                    that.$router.push(router.location);
                    that.getData();
                }else{
                    alert(res.error)
                }
            });
        },
        //将用户名和学校存到cookie里面
        getData(){
            let that = this;
            let params={
                optype:"management",
                id:this.id,
                type:this.checked,
                _output : 'jsonp'
            }
            $.getScript('http://localhost:8080/onlineexam/index.php?'+$.param(params),function(){           
                document.cookie = "name=" + res.info[0].name;
                document.cookie = "school=" +  res.info[0].school;
            });
        },
        zhuce(){
            let router = this.$router.resolve({
                name:"zhuce",
            })
            this.$router.push(router.location);
        }
    }
}
</script>
<style lang="less" scoped>
.login{
    width: 100%;
    height: 100%;
    background: #ededed;

    .look_password{
        font-size: 16px;
        color:#00A5C8;
        cursor: pointer;
        position: relative;
        left: 25px;
        bottom: 35px;
    }
    .login-center{
        width: 400px;
        height: 330px;
        background: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -200px;
        margin-top: -250px;

        .forms{
            padding: 30px;
            // margin-top: 20px;

            .title{
                margin-bottom: 15px;
                font-size: 16px;
                text-align: center;
            }
            .form-groups{
                width: 100%;
                height: 40px;
                margin-bottom: 5px;
                line-height: 40px;

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
                .zhuce{
                    float: right;
                    font-size: 20px;
                    color:#00A5C8;
                    cursor: pointer;
                }
          }
            .form-group{
                width: 100%;
                height: 40px;
                margin-bottom: 20px;
                // border-style:none;

                input{
                    width: 100%;
                    height:40px;
                    // border-style:none;
                }

                .pass{
                    // height: 34px;
                    padding: 1px 0 1px 15px;
                    box-sizing: border-box;
                    // border-style:none;
                }

                .btn{
                    width: 100%;
                    height:100%;
                    background: #33cabb;
                    color: #fff;
                }
            }
        }
    }
}
</style>
