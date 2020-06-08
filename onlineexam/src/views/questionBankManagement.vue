<template>
    <div class="questionBankManagement">
        <div class="select">
            <div class="dropmenu-bar">
                <label>科目</label>
                <dropDownMenu placeholder="科目" :items="subjects" :selectedItem.sync="selectedSubjects" @change="request" />
            </div>
            <div class="dropmenu-bar">
                <label>题型</label>
                <dropDownMenu placeholder="题型" :items="questionType" :selectedItem.sync="selectedQuestionType" @change="request" />
            </div>
            <span class="daan"  @click="chakan">查看答案</span>
            <span class="updata" @click="centerDialogVisible = true" v-if="this.type == 'teacher'">新建题目</span>
        </div>
        <form class="question">
            <div  v-for="(item,index) in info" :key="index">
                <div class="danxuan" v-if="item.topic == 0">
               <p class="title" v-text="(index+1) +'、'+ item.question"></p>
                <div class="options">
                    <label><input type="radio" :name="index" :value="item.questionA">{{item.optionA}}</label><br>
                    <label><input type="radio" :name="index" :value="item.questionB">{{item.optionB}}</label><br>
                    <label><input type="radio" :name="index" :value="item.questionC">{{item.optionC}}</label><br>
                    <label><input type="radio" :name="index" :value="item.questionD">{{item.optionD}}</label><br>
                </div>
                <p class="answers">
                    <span class="answer" v-if="!look" v-text="'答案：'+item.answer"></span>
                </p>
            </div>
            <div class="duoxuan" v-if="item.topic == 1">
                <p class="title" v-text="(index+1) +'、'+ item.question"></p>
                <div class="options">
                    <label><input type="checkbox" :value="item.questionA">{{item.optionA}}</label><br>
                    <label><input type="checkbox" :value="item.questionB">{{item.optionB}}</label><br>
                    <label><input type="checkbox" :value="item.questionC">{{item.optionC}}</label><br>
                    <label><input type="checkbox" :value="item.questionD">{{item.optionD}}</label><br>                    
                </div>
                 <p class="answers">
                    <span class="answer" v-if="!look" v-text="'答案：'+item.answer"></span>
                </p>
            </div>
            <div class="tiankong" v-if="item.topic == 2">               
                <p class="title" v-text="(index+1) +'、'+ item.question"></p>
                <span class="daan">答：</span><input type="text" autofocus>
                 <p class="answers">
                    <span class="answer" v-if="!look" v-text="'答案：'+item.answer"></span>
                </p>               
            </div>
            <div class="yingyong" v-if="item.topic == 3">
                <p class="title" v-text="(index+1) +'、'+ item.question"></p>
                <span class="daan">答：</span><textarea :name="index" id="" cols="120" rows="5"></textarea>
                 <p class="answers">
                    <span class="answer" v-if="!look" v-text="'答案：'+item.answer"></span>
                </p>
            </div>           
            </div>          
           <!-- <button  @click="submit" class="onsub">提交</button> -->
        </form>

         <!-- 模态框 -->
        <el-dialog title="新建题目" :visible.sync="centerDialogVisible"  width="33%" center>
            <el-form :label-position="labelPosition" label-width="80px" :model="form">
                <div class="type" v-if="upd">
                    <input type="radio" name="type" v-model="typeChecked" value="0"><label>单选题</label>
                    <input type="radio" name="type"  v-model="typeChecked" value="1"><label>多选题</label>
                    <input type="radio" name="type"  v-model="typeChecked" value="2"><label>填空题</label>
                    <input type="radio" name="type" v-model="typeChecked" value="3"><label>应用题</label>                   
                </div>
                <div class="addQuestion" v-if="!upd">
                    <ul>
                        <li v-if="this.typeChecked == 0 || this.typeChecked == 1 ">
                            <el-form-item label="科目">
                                <el-input v-model="form.subjects"></el-input>
                            </el-form-item>
                            <el-form-item label="问题">
                                <el-input v-model="form.question"></el-input>
                            </el-form-item>
                            <el-form-item label="选项A">
                                <el-input v-model="form.optionA"></el-input>
                            </el-form-item>
                            <el-form-item label="选项B">
                                <el-input v-model="form.optionB"></el-input>
                            </el-form-item>
                            <el-form-item label="选项C">
                                <el-input v-model="form.optionC"></el-input>
                            </el-form-item>
                            <el-form-item label="选项D">
                                <el-input v-model="form.optionD"></el-input>
                            </el-form-item>
                            <el-form-item label="答案">
                                <el-input v-model="form.answer"></el-input>
                            </el-form-item>
                        </li>
                        <li v-if="this.typeChecked == 2 || this.typeChecked == 3">
                            <el-form-item label="科目">
                                <el-input v-model="form.subjects"></el-input>
                            </el-form-item>
                            <el-form-item label="问题">
                                <el-input v-model="form.question"></el-input>
                            </el-form-item>                           
                            <el-form-item label="答案">
                                <el-input v-model="form.answer"></el-input>
                            </el-form-item>
                        </li>
                    </ul>                  
                </div>               
            </el-form>
            <span slot="footer" class="dialog-footer" v-if="upd">
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
            <span slot="footer" class="dialog-footer" v-if="!upd">
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
            upd:true,
            typeChecked:'0',
            check:'',
            checkList: [],
            message:"aaaaa",
            daan:'',
            answer:'',            
            subjects:[],
            selectedSubjects:{
                value:'math',
                name:"数学"
            },

            questionType:[
                {
                    value:0,
                    name:'单选题'
                },
                {
                    value:1,
                    name:'多选题'
                },{
                    value:2,
                    name:'填空题'
                },{
                    value:3,
                    name:'应用题'
                },
            ],
            selectedQuestionType:{
                value:0,
                name:'单选题'
            },
            info:[],
            form:{},
            centerDialogVisible: false,
            labelPosition:'right',
            look:true,
            form:{
                subjects:'',
                answer:'',
                question:'',
                optionA:'',
                optionB:'',
                optionC:'',
                optionD:''
            }
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
        chakan(){
            this.look = !this.look;
        },
        add(){
            let that =this;
            let params={
                optype:"questions",
                _output : 'jsonp',
                topic:this.typeChecked,
                subjects:this.form.subjects,
                answer:this.form.answer,
                question:this.form.question,
                optionA:this.form.optionA,
                optionB:this.form.optionB,
                optionC:this.form.optionC,
                optionD:this.form.optionD
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
        },
        submit(){
            this.upd = !this.upd;           
        },
        request(){
            let that =this;
            let params={
                optype:"topic",
                _output : 'jsonp',
                topic:this.selectedQuestionType.value,
                subjects:this.selectedSubjects.name
            }
            $.getScript("http://localhost:8080/onlineexam/index.php?"+$.param(params),function(){
                that.info = res.info;     
            });
        },
        getData(){
            let that =this;
            $.getScript("http://localhost:8080/onlineexam/index.php?optype=questionBank&_output=jsonp",function(){                 
                that.subjects = res.subject;
            });
            that.request();
        }
    }
}
</script>
<style lang="less" scoped>
.questionBankManagement{
    width: 100%;
    height: 800px;
    background: #fff;
    padding:20px;
    box-sizing: border-box;
    overflow: auto;

    .select{
        margin-bottom: 20px;
        border-bottom: 1px solid #ededed;
        padding: 20px 0;        
     
        .dropmenu-bar{
            display: inline-block;
            vertical-align: middle;
            margin-right: 20px;

            label{
                margin-right: 10px;
                position: relative;
                bottom: 7px;
                font-size: 18px;
            }        
        }
        .updata{
            float: right;
            color: #4A90E2;
            margin-right: 15px;
            cursor: pointer;
            font-size: 16px;            
        }

        .daan{
            color: #4A90E2;
            cursor: pointer;
            font-size: 16px;
            // padding: 5px 7px;
            float: right;
        }
    }

    .question{
        // .title{
            font-size: 18px;
            font-weight: 500;
        // }
        .options{
            margin-left: 15px;
            line-height: 16px;
            font-size: 16px; 
            
            input{
                width: 17px;
                height: 17px;
                border-radius: 50%;
                background: #fff;
            }
        }
       
    }

    .onsub{
        margin-top: 20px;
        width: 250px;
        height: 40px;
        border-radius: 20px;
        margin-left: 300px;
        background: #fff;
        color: #333;
        border: 1px solid #00A8CA;
        &:hover{
            background: #00A8CA;
            color: #fff;
        }
    }

    .type{
        input{
            width: 17px;
            height: 17px;
            border-radius: 50%;

            &:first-child{
                margin-left:50px;
            }
        }
        label{
            margin-right: 25px;
            position: relative;
            bottom: 3px;
        }
    }
}
</style>

