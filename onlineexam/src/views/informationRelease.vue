<template>
    <div class="informationRelease">
        <div class="top">
            <span class="title">消息</span>
            <span class="empty btn" @click="empty">刷新</span>
            <span class="release btn" @click="centerDialogVisible = true" v-if="this.type == 'teacher'">发布</span>
        </div>
        <div class="news" v-for="(item,index) in notice" :key="index">
            <div class="new">
                <p class="cont"><span class="togzhi">通知</span><span class="message" v-text="item.content"></span></p>
                <span class="detele" @click="del(item)"><i class="el-icon-delete"></i></span>
            </div>
            <div class="caozuo">
                <p class="publisher" v-text="item.publisher"></p>
                <span class="time" v-text="item.ctime"></span>
            </div>
        </div>
        <!-- 模态框 -->
        <el-dialog title="信息发布" :visible.sync="centerDialogVisible"  width="30%" center>
            <el-form :label-position="labelPosition" label-width="80px" :model="form">
                <el-form-item label="通知">
                    <el-input v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item label="发布人">
                    <el-input v-model="form.publisher"></el-input>
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
    data(){
        return{
            notice:[],
            centerDialogVisible: false,
            form: {
                content: '',
                publisher: document.cookie.split(';')[3].split('=')[1],
                ctime: ''
            },
            labelPosition:'right',
            type:document.cookie.split(';')[2].split('=')[1],
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
        getData(){
            let that = this;
            $.getScript("http://localhost:8080/onlineexam/index.php?optype=information&_output=jsonp",function(){
                that.notice = res.info;
            });
        },
        empty(){
            this.getData();
        },
        del(item){
            let that = this;
            let params={
                optype:"deleteNotice",
                id:item.messageId,
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
        submit(){
            let that = this;
            let params={
                optype:"insertNotice",
                _output : 'jsonp',
                content:this.form.content,
                publisher:this.form.publisher,
            }
            $.getScript("http://localhost:8080/onlineexam/index.php?"+$.param(params),function(){
                if(res.status == 0){
                    that.centerDialogVisible = false;
                    // alert("发布成功！");
                    that.getData();
                    that.form ={};
                }else{
                    alert("删除失败，请重新操作！");
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.informationRelease{
    width: 100%;
    height: 800px;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
    overflow: auto;

    .top{
        width: 100%;
        height: 70px;
        position: relative;
        border-bottom: 1px solid #ededed;

        .title{
            font-size:20px;
            position: absolute;
            top: 20px;
            font-weight: 600;
        }

        .btn{
            font-size:16px;
            color: #4A90E2;
            cursor: pointer;
            padding: 9px 13px;
            border: 1px solid #4A90E2;
            border-radius: 3px;

            &:hover{
                background: rgb(146, 187, 233);
                color: #333;
            }
        }
        .empty{           
            position: absolute;
            right: 25px;
            top:20px;
        }
        .release{           
            position: absolute;
            right: 100px;
            top:20px;
        }
    }

    .news{
        width: 100%;
        height: 130px;
        // background: #ededed;
        border-bottom: 1px solid #ededed;

        .new{
            font-size: 20px;
            padding: 5px 15px;
            box-sizing: border-box;
            height: 100px;
            line-height: 100px;
            width: 100%;
            position: relative;

            .cont{
                width: 90%;
                height: 100px;
                margin: 0;

                .togzhi{
                    padding: 5px 7px;
                    border: 1px solid #ededed;
                    margin-right: 10px;
                    font-size: 16px;
                    position: relative;
                    bottom: 40px;

                }

                .message{
                    display: inline-block;
                    width: 92%;
                    text-overflow: ellipsis; 
                    white-space: nowrap;   
                    overflow: hidden;  
                }
            }

            .detele{
                width: 10%;
                display: inline-block;
                font-size: 25px;
                position: absolute;
                right:30px;
                top: 0px;
                cursor: pointer;
                text-align: center;
                line-height: 100px;

                &:hover{
                    color:#4A90E2;
                }
            }           
        }

        .caozuo{
            width: 100%;
            font-size:14px;
            color: #666;
            position: relative;
            .publisher{
                width:90%;
                height: 30px;
                margin: 0;
                padding: 0 15px;
                box-sizing: border-box;
            }

            .time{
                display: inline-block;
                // float: right;
                width: 17%;
                height: 30px;
                position: absolute;
                right: 0;
                top: 0;
                text-align: center;
                line-height: 30px;
            }
        }
       
    }
}
</style>

