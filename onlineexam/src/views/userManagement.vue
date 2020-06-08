<template>
    <div class="userManagement">
        <div class="title" >
            <span class="pic"> 
                <!-- <img :src="detail.pictrue" alt=""> -->
                <img :src="url" alt="">
            </span>
            <span>个人资料</span>   
        </div>
        <div class="detail">
            <el-tabs type="border-card">
            <el-tab-pane label="个人中心">
                <ul class="det">
                    <li>
                        <span class="nickname">昵称：</span>
                        <span v-text="detail.nickname" v-if="Boolean(detail.nickname)"></span>
                        <span class="updata" @click="centerDialogVisible = true">修改资料</span>
                    </li>
                    <li ><span>姓名：</span><span v-text="detail.name" v-if="Boolean(detail.name)"></span></li>
                    <li>
                        <span>性别：</span>
                        <span v-text="detail.gender" v-if="Boolean(detail.gender)"></span>
                    </li>
                    <li>
                        <span>学历：</span>
                        <span v-text="detail.educationBackground" v-if="Boolean(detail.educationBackground)"></span>
                    </li>
                    <li>
                        <span>学校：</span>
                        <span v-text="detail.school" v-if="Boolean(detail.school)"></span>
                    </li>
                    <li>
                        <span>学院：</span>
                        <span v-text="detail.collage" v-if="Boolean(detail.collage)"></span>
                    </li>
                    <li>
                        <span>专业：</span>
                        <span v-text="detail.major" v-if="Boolean(detail.major)"></span>
                    </li>                  
                    <li>
                        <span>介绍：</span>
                        <span v-text="detail.introduction" v-if="Boolean(detail.introduction)"></span>
                    </li>                    
                </ul>
            </el-tab-pane>
            <el-tab-pane label="考试成绩">
                   <ul class="papers" v-if="this.type == 'student'">
                        <li class="paper"  v-for="(item,index) in paperLists" :key="index">
                            <span class="name"  v-text="item.paperName" @click="toPaper(item)"></span>
                            <span class="school" v-text="item.ctime.split(' ')[0]"></span>
                        </li>
                    </ul>
                    <ul class="papers" v-if="this.type == 'teacher'">
                        <li class="paper" v-for="(item,index) in paperLists" :key="index">
                            <span class="name" v-text="item.paperName" @click="toPaperList(item,index)"></span>
                            <span class="school" v-text="item.ctime.split(' ')[0]"></span>
                            <span class="studentname" v-text="studentName[index]"></span>
                        </li>
                    </ul>
            </el-tab-pane>           
            </el-tabs>            
        </div>
        <!-- 模态框 -->
        <el-dialog title="修改资料" :visible.sync="centerDialogVisible"  width="40%" center>
            <el-form :label-position="labelPosition" label-width="80px" :model="form">
                <el-form-item label="昵称">
                    <el-input v-model="form.nickname">{{form.nickname}}</el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name">{{form.name}}</el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="form.gender">{{form.gender}}</el-input>
                </el-form-item>
                <el-form-item label="学历">
                    <el-input v-model="form.educationBackground">{{form.educationBackground}}</el-input>
                </el-form-item>
                <el-form-item label="学校">
                    <el-input v-model="form.school">{{form.school}}</el-input>
                </el-form-item>
                <el-form-item label="学院">
                    <el-input v-model="form.collage">{{form.collage}}</el-input>
                </el-form-item>
                <el-form-item label="专业">
                    <el-input v-model="form.major">{{form.major}}</el-input>
                </el-form-item>
                <el-form-item label="介绍">
                    <el-input v-model="form.introduction">{{form.introduction}}</el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 模态框结束 -->
    </div>
</template>
<script>

export default {
    name: 'userManagement',
    data() {
        return {
            detail:{},
            url:require('../assets/cat.jpg'),
            tableData:[{
                name:"思思",
                paperName:'期中考试',
                grade:89
            }],
             centerDialogVisible: false,
            form: {
                introduction: '',
                major: '',
                collage: '',
                school:'',
                educationBackground:'',
                gender:'',
                nickname:'',
                name:''
            },
            labelPosition:'right',
            paperIds:[],
            paperLists:[],
            score:[],
            type:document.cookie.split(';')[2].split('=')[1],
            studentId:[],
            studentName:[],
            paperId:[]
        }
    },
    mounted(){
        this.getRequest();
    },
   methods:{
       getRequest(){
           this.getPaper();
           this.getData();
           this.getPaperOfTeacher();
       },
       toPaper(item){
            let router = this.$router.resolve({
                name:'paperList',
                query:{
                    paperId:item.paperId,
                    studentId:document.cookie.split(';')[0].split('=')[1]
                }
            })
            this.$router.push(router.location);
        },
        toPaperList(item,index){
            let router = this.$router.resolve({
                name:'paperList',
                query:{
                    paperId:item.paperId,
                    teacherId:document.cookie.split(';')[0].split('=')[1],
                    studentId:this.studentId[index]
                }
            })
            this.$router.push(router.location);
        },
        //根据学号查询试卷
        getPaper(){
            let that = this;
            let params={
                optype:"paperList",
                studentId:document.cookie.split(';')[0].split('=')[1],
                _output : 'jsonp'
            }
            $.getScript('http://localhost:8080/onlineexam/index.php?'+$.param(params),function(){ 
                res.info.forEach((item) => {
                    that.paperIds.push(item.paperId);
                });
                that.paperIds.forEach((item)=>{
                    let params={
                        optype:"paperOfId",
                        paperId:Number(item),
                        _output : 'jsonp'
                    }
                    $.getScript('http://localhost:8080/onlineexam/index.php?'+$.param(params),function(){
                        that.paperLists.push(res.info[0])
                    })
                }) 
            });
        }, 
        // 根据老师id查询试卷
        getPaperOfTeacher(){
            let that = this;
            let params={
                optype:"paperOfTeacher",
                teacherId:document.cookie.split(';')[0].split('=')[1],
                _output : 'jsonp'
            }
            $.getScript('http://localhost:8080/onlineexam/index.php?'+$.param(params),function(){
                if(res.info){
                    that.paperId = [];
                    res.info.forEach((item) => {
                        that.paperId.push(item.paperId);
                        that.studentId.push(item.studentId);
                    });
                }  
                // console.log(that.paperId)
                that.paperId.forEach((item)=>{
                    let params={
                        optype:"paperOfId",
                        paperId:Number(item),
                        _output : 'jsonp'
                    }
                    $.getScript('http://localhost:8080/onlineexam/index.php?'+$.param(params),function(){
                        that.paperLists.push(res.info[0])
                    })
                }) 
                that.studentId.forEach((item)=>{
                    let params={
                        optype:"management",
                        id:Number(item),
                        type:'student',
                        _output : 'jsonp'
                    }
                    $.getScript('http://localhost:8080/onlineexam/index.php?'+$.param(params),function(){
                        that.studentName.push(res.info[0].name)
                    })
                })
                // console.log(that.studentName)
            });
        },   
        getData(){
            let that = this;
            let params={
                optype:"management",
                id:document.cookie.split(';')[0].split('=')[1],
                type:document.cookie.split(';')[2].split('=')[1],
                _output : 'jsonp'
            }
            $.getScript('http://localhost:8080/onlineexam/index.php?'+$.param(params),function(){           
                that.detail = res.info[0];
                // console.log(res.info[0])
                that.form.name = res.info[0].name
                that.form.introduction = res.info[0].introduction
                that.form.nickname = res.info[0].nickname
                that.form.gender = res.info[0].gender
                that.form.educationBackground = res.info[0].educationBackground
                that.form.school = res.info[0].school
                that.form.collage = res.info[0].collage
                that.form.major = res.info[0].major

            });
        },
        submit(){
           let that = this;
            let params={
                optype:"userupd",
                id:document.cookie.split(';')[0].split('=')[1],
                type:document.cookie.split(';')[2].split('=')[1],
                _output : 'jsonp',
                name:this.form.name,
                introduction:this.form.introduction,
                major:this.form.major,
                collage:this.form.collage,
                school:this.form.school,
                educationBackground:this.form.educationBackground,
                gender:this.form.gender,
                nickname:this.form.nickname
            }
            $.getScript('http://localhost:8080/onlineexam/index.php?'+$.param(params),function(){           
                if(res.info == true){
                    that.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    that.centerDialogVisible=false;
                    that.getData();
                }else{
                   that.$message({
                        type: 'info',
                        message: '修改失败，请重新操作！'
                    });
                }
            }); 
        }
   }     
}
</script>
<style lang="less" scoped>
.title{
    width: 100%;
    height: 100px;
    background: #fff;
    padding-left:20px;
    box-sizing: border-box;
    font-size: 20px;
    line-height: 80px;
    margin-bottom: 20px;
    padding-top: 10px;
    box-sizing: border-box;

    .pic{
        float: left;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: #fff;
        padding: 30px 15px;
        box-sizing: border-box;
        position: relative;
        margin-right:30px;

        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
        }
    }
}
.papers{
        .paper{
            width: 100%;
            height: 100px;
            line-height: 100px;           
            padding: 0px 20px;
            box-sizing: border-box;
            border-bottom: 1px solid #ededed;
            cursor: pointer;
        }
        .studentname{
            float: right;
            margin-right: 15px;
        }
        .name{
            font-size: 20px;
            color:#333;
        }
        .school{
            float: right;
            margin-right: 20px;
        }
    }
.detail{
    .det{
        width:100%;
        height: 500px;
        background: #fff;
        padding: 15px;
        box-sizing: border-box;
        float: right;

        li{
            height: 36px;
            line-height: 36px;
            font-size: 14px;
            color:#4D4D4D;

            .updata{
                float: right;
                color: #157DD8;
                cursor: pointer;
            }
        }
    }
}
</style>