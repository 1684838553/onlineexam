<template>
    <div class="paperDetail">
        <div class="paperContent">
            <p class="title" v-text="info.paperName"></p>
            <div class="people"><span v-text="'出题人：'+ info.peopleDraw"></span></div>
            <!-- <p class="time"><span>剩下时间</span><span id="timer"></span></p> -->
            <el-form ref="form" :model="form">
                <div v-if="this.type == 'student'">
                    <span>请输入老师工号：</span><input type="text" v-model="form.teacherId">
                </div>
                <div class="danxuan bian" v-if="this.danxuan.length != 0">
                    <p class="biaoti" v-text="'单选题（'+ info.scoreOne + '分每个）'"></p>
                    <ul >
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
                    <p class="tip" >请将单选题答案依次填入,答案之间不需要符号连接！</p>
                    <span>单选题答案： </span><input type="text" v-model="form.answerOfDanxuan"> 
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
                     <p class="tip" >请将多选题答案依次填入,答案之间用逗号连接！</p>
                    <span>多选题答案： </span><input type="text" v-model="form.answerOfDuoxuan">                  
            </div>
            <div class="tiankong bian" v-if="this.tiankong.length != 0">
                <p class="biaoti" v-text="'填空题（'+ info.scoreThree + '分每个）'"></p>
                    <ul >
                        <li  v-for="(item,index) in tiankong" :key="index">
                            <p class="timu" v-text="(index+1) +'、'+ item.question"></p>
                            <span class="daan">答：</span><input type="text" autofocus v-model="form.answerOfTiankong[index]">                                        
                        </li>                       
                    </ul>                   
            </div>
            <div class="yingyong bian" v-if="this.yingyong.length != 0">
                <p class="biaoti" v-text="'应用题（'+ info.scoreFour + '分每个）'"></p>
                    <ul>
                        <li v-for="(item,index) in yingyong" :key="index">
                            <p class="timu" v-text="(index+1) +'、'+ item.question"></p>
                           <span class="daan">答：</span>
                           <textarea name="yingyong" id="" cols="120" rows="5" v-model="form.answerOfYingyong[index]"></textarea>
                        </li>                       
                    </ul> 
                    <!-- {{form}}  -->
            </div>
            </el-form>
            <div class="btn" v-if="this.type == 'student'">
                <el-popover placement="top" width="160" v-model="visible">
                    <p>是否交卷，交卷后将无法修改？</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="submit">确定</el-button>
                    </div>
                    <el-button slot="reference" class="jiaojuan">交卷</el-button>
                </el-popover>
            </div>           
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
            paperId:this.$route.query.paperId,
            type:document.cookie.split(';')[2].split('=')[1],
            visible: false,
            danxuan:[],
            duoxuan:[],
            tiankong:[],
            yingyong:[],
            info:{}
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
        submit(){
            let that = this;
            let params={
                optype:'answerAdd',
                _output:'jsonp',
                paperId:this.paperId,
                studentId:document.cookie.split(';')[0].split('=')[1],
                answerOfDanxuan:this.form.answerOfDanxuan,
                answerOfDuoxuan:this.form.answerOfDuoxuan,
                answerOfTiankong:this.form.answerOfTiankong.join(),
                answerOfYingyong:this.form.answerOfYingyong.join(),
                teacherId:this.form.teacherId
            }
            $.getScript("http://localhost:8080/onlineexam/index.php?"+$.param(params),function(){
                 that.visible = false;
                if(res.info == true){
                    that.$message({
                        type: 'success',
                        message: '提交成功！'
                    });
                }else{
                    that.$message({
                        type: 'info',
                        message: '未成功保存，请重新操作！'
                    });
                }
            });
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
                console.log(res.info[0])
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
                        }
                    })
                });
            });
        }
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

        .people{
            display: inline-block;
            width: 200px;
            height: 20px;
            position: relative;
            left: 85%;
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

