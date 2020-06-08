<template>
    <div class="indexPage">
        <div class="cards" >
            <div class="card" v-for="(item,index) in cards" :key="index">
                <span class='tubiao'>
                    <span class="biankuang" v-html="item.icon"></span>
                </span>
                <span class="info">
                    <span class="describe" v-text="item.title"></span>
                    <span class="num" v-text="item.total"></span>
                </span>
            </div>
        </div> 
        <div class="echarts">
            <div class="graphics Weekend-user">
                <span class="title">每周用户</span>
                <span class="map">
                 <barLine :id="'user'" :xData='userxData' :dataList='userDataList'  :seriesType="'bar'" :max="10000" :min="1500"></barLine>
                <!-- <barEcharts :barData="userDataList" :xData="userxData" :forceRefresh="0" id="user"></barEcharts> -->
                </span>
            </div>
            <div class="graphics test-records">
                <span class="title">考试历史记录</span>
                <span class="map">
                 <barLine :id="'exam'" :xData='examxData' :dataList='examDataList'  :seriesType="'line'" :max='60000' :min="5000"></barLine>
                </span>
            </div>
        </div> 
        <div class="test-information">
            <span class="title">考试项目</span>
            <span class="table">
                <table>
                    <tr>
                        <th>#</th>
                        <th>考试名称</th>
                        <th>科目</th>
                        <th>时间</th>
                        <th>学校</th>
                    </tr>
                    <tbody>
                        <tr v-for="(item , index) in paperList" :key="index">
                            <td v-text="index +1"></td>
                            <td v-text="item.paperName"></td>
                            <td v-text="item.subjects"></td>
                            <td v-text="item.ctime.split(' ')[0]"></td>
                            <td v-text="item.schools"></td>
                        </tr>
                    </tbody>                  
                </table>               
            </span>
        </div>
        <viewFooter></viewFooter>
    </div>
</template>
<script>


export default {
    data(){
        // let id = this.getCookie(id);
        return{
            cards:[],
            userxData:[],
            userDataList:[],
            examxData:[],
            examDataList:[],                                
            testItem:[],
            paperList:[]
        }
    },
    mounted(){
        this.getData();
        this.getPaper();
        // console.log(this.$router.query.id)
    },
    methods:{
        getData(){
            let that=this;
            $.getScript("http://localhost:8080/onlineexam/index.php?optype=index&_output=jsonp",function(){
                that.cards = res.cards;
                that.userxData = res.userData.xData;
                that.userDataList = res.userData.dataList; 
                that.examxData = res.examData.xData;
                that.examDataList = res.examData.dataList;
                that.testItem = res.testItem; 
            });
        },
        getPaper(){
            let that=this;
            $.getScript("http://localhost:8080/onlineexam/index.php?optype=paper&_output=jsonp",function(){
                that.paperList = res.info;
            });
        }     
    }
}
</script>
<style lang="less" scoped>
.indexPage{
    .cards{
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        height: 150px;

        .card:first-child{
            background: #33CABB;

            .biankuang{
                background: #57D3C7;
            }
        }

        .card:nth-child(2){
            background: #F96868;

            .biankuang{
                background: #FA8383;
            }
        }

        .card:nth-child(3){
            background: #15C377;

            .biankuang{
                background: #3ECE8F;
            }
        }

        .card:last-child{
            background: #926DDE;

            .biankuang{
                background: #A587E4;
            }
        }

        .card{
            flex-basis: 23%;
            height: 100%;
            margin-right: 2%;

            .tubiao{
                display: inline-block;
                vertical-align: middle;
                width: 40%;
                height: 100%;
                text-align: center;
                line-height: 150px;
                font-size: 40px;
                color: #fff;              

                .biankuang{
                    display: inline-block;
                    vertical-align: middle;
                    width:70px;
                    height: 70px;
                    border-radius: 50%;
                    position: relative;                                    
                }               
            }

            .info{
                display: inline-block;
                vertical-align: middle;
                width: 60%;
                height: 100%;

                .describe{
                    display: inline-block;
                    vertical-align: middle;
                    height: 50%;
                    width: 100%;
                    line-height: 75px;
                    text-align: center;
                    font-size: 17px;
                    color: #fff;
                }

                .num{
                    display: inline-block;
                    vertical-align: middle;
                    height: 50%;
                    width: 100%;
                    // line-height: 75px;
                    text-align: center;
                    font-size: 23px;
                    color: #fff;
                }
            }
        }
    }
    .echarts{
        margin-top: 0.2rem;
        display: flex;
        flex-direction: row;

        .test-records{
            margin-left: 2%;
        }

        .graphics{
            flex-basis: 48%;
            // margin-left: 2%;
            height: 500px;
            background: #fff;

            .title{
                display: inline-block;
                vertical-align: middle;
                height: 0.6rem;
                border-bottom: 1px solid #ededed;
                width: 100%;
                padding-left: 30px;
                line-height: 0.6rem;
                font-size: 20px; 
                box-sizing: border-box;
            }

            .map{
                display: inline-block;
                vertical-align: middle;
                // background: #15C377;
                width: 100%;
                height: calc(500px - 0.6rem);
            }
        }
    }
    .test-information{
        width: 96%;
        height: 500px;
        background: #fff;
        margin-top: 0.2rem;
        // margin-left: 2%;

        .title{
            display: inline-block;
            vertical-align: middle;
            height: 0.6rem;
            border-bottom: 1px solid #ededed;
            width: 100%;
            padding-left: 30px;
            line-height: 0.6rem;
            font-size: 20px; 
            box-sizing: border-box;
        }

        .table{
            display: inline-block;
            vertical-align: middle;
            width: 100%;
            height: calc(500px - 0.6rem);

           table{
                width: 100%;

               tr{                  
                    height: 45px;
                    line-height: 45px;
                    margin-left: 20px;
                    border-bottom: 1px solid #ededed;                                         
                }

                th{
                    font-size: 22px;
                    width: 300px;                       
                }

                td{
                    font-size: 18px;
                    text-align: center;
                }
            }
        }
    } 
}
</style>
<style lang="less">
.biankuang{
    i{      
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
                    
    }
}
</style>



