<template>
    <div class="paperDetail">
        <div class="paperContent">
            <p class="title" v-text="info.paperName"></p>
            <div class="people"><span v-text="'出题人：'+ info.peopleDraw"></span></div>
            <!-- <p class="time"><span>剩下时间</span><span id="timer"></span></p> -->
            <div class="chengji" v-if="this.type == 'teacher'">
                <table>
                    <tr>
                        <th v-if="this.danxuan.length != 0">单选题</th>
                        <th v-if="this.duoxuan.length != 0">多选题</th>
                        <th v-if="this.tiankong.length != 0">填空题</th>
                        <th v-if="this.yingyong.length != 0">应用题</th>
                        <th>总分</th>
                        <th>操作</th>
                    </tr>
                    <tr>
                        <td v-if="this.danxuan.length != 0"><input type="text" v-model="scoreOfDanxuan"></td>
                        <td v-if="this.duoxuan.length != 0"><input type="text" v-model="scoreOfDuoxuan"></td>
                        <td v-if="this.tiankong.length != 0"><input type="text" v-model="scoreOfTiankong"></td>
                        <td v-if="this.yingyong.length != 0"><input type="text" v-model="scoreOfYingyong"></td>
                        <td><span>{{Number(this.scoreOfDanxuan) + Number(this.scoreOfDuoxuan) + Number(this.scoreOfTiankong) + Number(this.scoreOfYingyong)}}</span></td>
                        <td class="sub" @click="submit">提交</td>
                    </tr>
                </table>
            </div>
            <el-form ref="form" :model="form">
                <div v-if="this.type == 'student'">
                    <span class="userid" v-text="'老师工号：' + teacherId"></span>
                    <span>分数：</span><span v-if="Boolean(score)" v-text="score"></span>
                    <span class="time" v-text="'考试时间：'+ ctime"></span>
                </div>
                <div class="danxuan bian" v-if="this.danxuan.length != 0">
                    <p class="biaoti" v-text="'单选题（'+ info.scoreOne + '分每个）'"></p>
                    <ul >
                        <!-- {{danxuan}} -->
                        <li  v-for="(item,index) in danxuan" :key="index">
                            <p class="timu">
                                <span v-text="(index+1) +'、'+ item.question"></span>
                            </p>
                            <!-- <div class="options">
                                <label><input type="radio" :name="index" :value="item.questionA">{{item.optionA}}</label><br>
                                <label><input type="radio" :name="index" :value="item.questionB">{{item.optionB}}</label><br>
                                <label><input type="radio" :name="index" :value="item.questionC">{{item.optionC}}</label><br>
                                <label><input type="radio" :name="index" :value="item.questionD">{{item.optionD}}</label><br>
                            </div> -->
                            <p><span>A、</span><span v-text="item.optionA"></span></p>
                            <p><span>B、</span><span v-text="item.optionB"></span></p>
                            <p><span>C、</span><span v-text="item.optionC"></span></p>
                            <p><span>D、</span><span v-text="item.optionD"></span></p>
                        </li> 
                    </ul> 
                    <div  class="answer"><span>学生答案： </span><span  v-text="answerOfDanxuan.join('、')"> </span></div>
                    <!-- <div  class="answer"><span>标准答案： </span><span  v-text="biaodaOfDanxuan"> </span></div>  -->
                </div>
            <div class="duoxuan bian" v-if="this.duoxuan.length != 0">
                    <p class="biaoti" v-text="'多选题（'+ info.scoreTwo + '分每个）'"></p>
                    <ul >
                        <li v-for="(item,index) in duoxuan" :key="index">
                            <p class="timu"  v-text="(index+1) +'、'+ item.question"></p>
                            <div class="options">
                                <!-- <label><input type="checkbox" :value="item.questionA" >{{item.optionA}}</label><br>
                                <label><input type="checkbox" :value="item.questionB" >{{item.optionB}}</label><br>
                                <label><input type="checkbox" :value="item.questionC">{{item.optionC}}</label><br>
                                <label><input type="checkbox" :value="item.questionD" >{{item.optionD}}</label><br> -->
                                <p><span>A、</span><span v-text="item.optionA"></span></p>
                                <p><span>B、</span><span v-text="item.optionB"></span></p>
                                <p><span>C、</span><span v-text="item.optionC"></span></p>
                                <p><span>D、</span><span v-text="item.optionD"></span></p>
                            </div>
                        </li>                       
                    </ul> 
                    <div  class="answer"><span>学生答案： </span><span  v-text="answerOfDuoxuan"> </span> </div>                
            </div>
            <div class="tiankong bian" v-if="this.tiankong.length != 0">
                <p class="biaoti" v-text="'填空题（'+ info.scoreThree + '分每个）'"></p>
                    <ul >
                        <li  v-for="(item,index) in tiankong" :key="index">
                            <p class="timu" v-text="(index+1) +'、'+ item.question"></p>
                            <!-- <span class="daan">答：</span><input type="text" autofocus v-model="form.answerOfTiankong[index]">                                         -->
                        </li> 
                         <div  class="answer"><span>学生答案： </span><span  v-text="answerOfTiankong"> </span> </div>                
                    </ul>                   
            </div>
            <div class="yingyong bian" v-if="this.yingyong.length != 0">
                <p class="biaoti" v-text="'应用题（'+ info.scoreFour + '分每个）'"></p>
                    <ul>
                        <li v-for="(item,index) in yingyong" :key="index">
                            <p class="timu" v-text="(index+1) +'、'+ item.question"></p>
                           <!-- <span class="daan">答：</span>
                           <textarea name="yingyong" id="" cols="120" rows="5" v-model="form.answerOfYingyong[index]"></textarea> -->
                        </li>
                        <div  class="answer"> <span>学生答案： </span><span  v-text="answerOfYingyong"> </span></div>                 
                    </ul> 
                    <!-- {{form}}  -->
            </div>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            baocun:true,
            form:{
                answerOfDanxuan:'',
                answerOfYingyong:[],
                answerOfTiankong:[],
                answerOfDuoxuan:'',
                teacherId:''
            },
            answerOfDuoxuan:[],
            answerOfDanxuan:[],
            paperId:this.$route.query.paperId,
            studentId:this.$route.query.studentId,
            teacherId:'',
            score:'',
            ctime:'',
            answerOfTiankong:[],
            answerOfYingyong:[],
            type:document.cookie.split(';')[2].split('=')[1],
            visible: false,
            danxuan:[],
            duoxuan:[],
            tiankong:[],
            yingyong:[],
            info:{},
            biaodaDanxuan:[],
            scoreOfDanxuan:'',
            scoreOfDuoxuan:'',
            scoreOfTiankong:'',
            scoreOfYingyong:'',
            total:'',
            biaodaOfDanxuan:[]
        }
    },
    mounted(){
        this.getRequest();
    },
    methods:{
        getRequest(){
            this.getData();
            this.getRecord();
        },
        getRecord(){
            let that = this;
            let params={
                optype:'paperRecord',
                _output:'jsonp',
                paperId:this.paperId,
                studentId:this.studentId
            }
            $.getScript("http://localhost:8080/onlineexam/index.php?"+$.param(params),function(){
                that.answerOfDuoxuan = res.info[0].answerOfDuoxuan;
                that.answerOfDanxuan = res.info[0].answerOfDanxuan.split("");
                that.teacherId = res.info[0].teacherId;
                that.score = res.info[0].score;
                that.ctime = res.info[0].ctime;
                that.answerOfYingyong = res.info[0].answerOfYingyong;
                that.answerOfTiankong = res.info[0].answerOfTiankong;

            })
        },
        submit(){
            let that = this;
            let params={
                optype:'give',
                _output:'jsonp',
                paperId:this.paperId,
                studentId:this.studentId,
                teacherId:this.$route.query.teacherId,
                score:Number(this.scoreOfDanxuan) + Number(this.scoreOfDuoxuan) + Number(this.scoreOfTiankong) + Number(this.scoreOfYingyong)
            }
            $.getScript("http://localhost:8080/onlineexam/index.php?"+$.param(params),function(){ 
                if(res.info == true){
                    that.$message({
                        type: 'success',
                        message: '成绩提交成功!'
                    });
                }else{
                   that.$message({
                        type: 'info',
                        message: '提交失败，请重新操作！'
                    });
                }
            })
        },
        getData(){
            let that = this;
            let params={
                optype:'paperAndId',
                _output:'jsonp',
                paperId:this.paperId
            }
            $.getScript("http://localhost:8080/onlineexam/index.php?"+$.param(params),function(){ 
                that.info = res.info[0];
                let questionIds = res.info[0].questionSet.split(',');
                // console.log(res.info[0])
                questionIds.forEach((item) => {
                    let params={
                        optype:'questionBankAndId',
                        _output:'jsonp',
                        questionId:Number(item)
                    }
                    $.getScript("http://localhost:8080/onlineexam/index.php?"+$.param(params),function(){
                        if(res.info[0].topic == 0){
                            that.danxuan.push(res.info[0])
                        }else if(res.info[0].topic == 1){
                            that.duoxuan.push(res.info[0])
                        }else if(res.info[0].topic == 2){
                            that.tiankong.push(res.info[0])
                        }else{
                            that.yingyong.push(res.info[0])
                        };
                    })
                });
            });
            // that.getAnswer();
        },
        // getAnswer(){
        //     console.log('1',this.danxuan)
        //     this.danxuan.forEach((item)=>{
        //         this.biaodaOfDanxuan.push(item.answer)
        //     console.log(item.answer)

        //     })
        //     // console.log(this.biaodaOfDanxuan)
        // },
    }
}
</script>
<style lang="less" scoped>
.paperDetail{
    width: 100%;
    min-height: 800px;
    background: #fff;
    padding:20px;
    box-sizing: border-box;
    overflow: auto;

    .paperContent{
        margin:40px 40px;
        width:93%;
        height: 100%;
        border: 1px solid #555;
        box-sizing: border-box;
        border-radius: 5px;
        padding: 35px;

        .answer{
            font-size: 16px;
            margin-top:10px;
            font-weight: 500;
            color: #4A90E2; 
        }
        .people{
            display: inline-block;
            width: 200px;
            height: 20px;
            position: relative;
            left: 85%;
        }
        .chengji{
            table{
                border-collapse: collapse;
                margin-top: 15px;
            }
            th,td{
                width: 180px;
                height: 30px;
                color: #333;
                border: 1px solid #333;
                text-align: center;

                input{
                    width: 100%;
                    height: 100%;
                    border: #fff;
                    text-align: center;
                }                              
            }
            .sub{
                font-size: 16px;

                &:hover{
                    color: #4A90E2;
                    cursor: pointer;
                }
            }
        }
        .userid{
            margin-right: 100px;
        }
        .time{
            margin-left: 100px;
        }
        .title{
            font-size: 20px;
            text-align: center;
        }

        .biaoti{
            font-size: 16px;
            font-weight: 600;
        }

        ul{
          .timu{
            font-size: 16px;
          }  
        }
        .tip{
            font-size: 10px;
        }
        .baocun{
            color: #4A90E2;
            float: right;
            margin-right:30px;
            font-size: 18px; 
            cursor: pointer;
        }
        .btn{
            position: relative;
            left: 80%;
            top: 10px;

            .jiaojuan{
                font-weight: 600;
                border-color:teal; 
            }
        }
        .submit{
            float: right;
            font-size: 18px;
            cursor: pointer;

            &:hover{
                color:#4A90E2;
            }
        }
    }
}
</style>

