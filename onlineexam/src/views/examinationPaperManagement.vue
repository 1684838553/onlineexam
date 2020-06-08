<template>
    <div class="examinationPaperManagement">
        <div class="select">
            <div class="dropmenu-bar">
                <label>科目</label>
                <dropDownMenu placeholder="科目" :items="subjects" :selectedItem.sync="selectedSubjects" @change="requestData" />
            </div>
             <span class="updata"  @click="updata" v-if="this.type == 'teacher'">新建试卷</span>              
        </div>
        <ul class="papers">
            <li class="paper"  v-for="(item,index) in info" :key="index" >
                <span class="name" v-text="item.paperName" @click="toPaper(item)"></span>
                <span class="del" @click="del(item)"><i class="el-icon-delete"></i></span>
                <span class="school" v-text="item.schools"></span>
            </li>
        </ul>
        <!-- 模态框 -->
        <el-dialog title="新建试卷" :visible.sync="centerDialogVisible"  width="30%" center>
            <el-form :label-position="labelPosition" label-width="100px" :model="form">               
                <div>
                    <div class="dropmenu-bar">
                        <label style="font-size:14px">科目</label>
                        <dropDownMenu placeholder="科目" :items="subjects" :selectedItem.sync="selectSubjects" @change="request" />
                    </div>
                    <el-form-item label="试卷名">
                        <el-input v-model="form.paperName"></el-input>
                    </el-form-item>
                    <el-form-item label="出卷人">
                        <el-input v-model="form.peopleDraw"></el-input>
                    </el-form-item>
                    <el-form-item label="单选题分值">
                        <el-input v-model="form.scoreOne"></el-input>
                    </el-form-item>
                    <el-form-item label="多选题分值">
                        <el-input v-model="form.scoreTwo"></el-input>
                    </el-form-item>
                    <el-form-item label="填空题分值">
                        <el-input v-model="form.scoreThree"></el-input>
                    </el-form-item>
                    <el-form-item label="应用题分值">
                        <el-input v-model="form.scoreFour"></el-input>
                    </el-form-item>                   
                    <el-form-item label="学校">
                        <el-input v-model="form.schools"></el-input>
                    </el-form-item>
                </div>
                <div class="list">
                    <p>请选择题目！</p>
                    <div  v-for="item in infos" :key="item.questionId">
                        <label><input type="checkbox"  :value="item.questionId" v-model="form.questionSet">{{item.question}}</label><br>                        
                    </div>
                </div>
                    <!-- {{form.questionSet.join()}} -->

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="add">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 模态框结束 -->
        
    </div>
</template>
<script>
export default {
    data(){ 
        return{
            type:document.cookie.split(';')[2].split('=')[1],
            info:[],
            questionId:'',
            question:'',
            centerDialogVisible:false,
            labelPosition:'right',
            subjects:[],
            selectedSubjects:{
                value:4,
                name:"数学"
            },
            selectSubjects:{
                value:4,
                name:"数学"
            },
            // info:[],
            form:{
                questionSet:[],
                subjects:'',
                paperName:'',
                schools:document.cookie.split(';')[4].split('=')[1],
                peopleDraw:document.cookie.split(';')[3].split('=')[1]
            },
            schools:[],
            selectedSchools:{
                value:1,
                name:"江西理工大学"
            },
            infos:[]
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
         del(item){
            let that = this;
            let params={
                optype:"deletePaper",
                paperId:item.paperId,
                _output : 'jsonp'
            }
            $.getScript("http://localhost:8080/onlineexam/index.php?"+$.param(params),function(){
                if(res.status == 0){
                    // alert("删除成功！");
                that.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                    that.getData();
                }else{
                    that.$message({
                        type: 'info',
                        message: '删除失败！'
                    });
                }
            })
        },
        updata(){
            this.centerDialogVisible = true;
            this.request();
        },
        toPaper(item){
            let router = this.$router.resolve({
                name:'paperDetail',
                query:{
                    paperId:item.paperId
                }
            })
            this.$router.push(router.location);
        },
        // 模态框中下拉框
        request(){
            let that = this;
            let params={
                optype:'paperSubjects',
                _output:'jsonp',
                subjects:this.selectSubjects.name,
            }
            $.getScript("http://localhost:8080/onlineexam/index.php?"+$.param(params),function(){ 
                that.infos = res.info;
            });
        },
        // 页面中下拉框
        requestData(){
            let that = this;
            let params={
                optype:'subject',
                _output:'jsonp',
                subjects:this.selectedSubjects.name,
            }
            $.getScript("http://localhost:8080/onlineexam/index.php?"+$.param(params),function(){ 
                that.info = res.info;
                // console.log(res.info);

            });
        },
        getData(){
            let that = this;
            $.getScript("http://localhost:8080/onlineexam/index.php?optype=paper&_output=jsonp",function(){  
                that.subjects = res.subject;
            }); 
            that.requestData();
        },
        // 模态框中根据科目查询题库中题目
        getBankData(){
            let that =this;
            let params={
                optype:'paperSubjects',
                _output:'jsonp',
                subjects:this.form.subjects
            }
            $.getScript("http://localhost:8080/onlineexam/index.php?"+$.param(params),function(){                
                that.info = res.info;
            });
        },
        add(){
            let that =this;
            let params={
                optype:"papers",
                _output : 'jsonp',
                subjects:this.selectSubjects.name,
                paperName:this.form.paperName,
                schools:this.form.schools,
                questionSet:this.form.questionSet.join(),
                peopleDraw:this.form.peopleDraw,
                scoreFour:this.form.scoreFour,
                scoreOne:this.form.scoreOne,
                scoreThree:this.form.scoreThree,
                scoreTwo:this.form.scoreTwo
            }
            $.getScript("http://localhost:8080/onlineexam/index.php?"+$.param(params),function(){
                if(res.info == true){
                    that.$message({
                        type: 'success',
                        message: '新建成功!'
                    });
                    that.centerDialogVisible= false;
                    that.form = {}; 
                    that.getData();
                }else{
                     that.$message({
                        type: 'info',
                        message: '操作失败，请稍后再试！'
                    });
                } 
            });
        }
    }
}
</script>
<style lang="less" scoped>
.examinationPaperManagement{
    width: 100%;
    height: 800px;
    background: #fff;
    padding:20px;
    box-sizing: border-box;
    overflow: auto;

    .dropmenu-bar{
            display: inline-block;
            vertical-align: middle;
            margin-right: 20px;
            margin-left: 30px;

            label{
                margin-right: 10px;
                position: relative;
                bottom: 7px;
                font-size: 18px;
            }        
    }

    .select{
        margin-bottom: 20px;
        border-bottom: 1px solid #ededed;
        padding: 20px 0;
        
        
        .updata{
            float: right;
            color: #4A90E2;
            margin-right: 15px;
            cursor: pointer;
            font-size: 16px;            
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
        .name{
            font-size: 20px;
            color:#333;
        }

        .del{
            float: right;
            // color: #333;
            font-size: 25px;
            cursor: pointer;

            &:hover{
                color:#4A90E2;
            }
        }

        .school{
            float: right;
            margin-right: 20px;
        }
    }
    .list{
        width: 100%;
        height: 200px;
        overflow: auto;
        padding:0 20px;
        box-sizing: border-box;
    }
}
</style>


