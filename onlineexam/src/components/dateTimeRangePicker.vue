<template>
    <div class="dateTimeRangePicker">
        <!-- <span class="iconfont iconshijian pointer" @click="simulationClick"></span> -->
        <el-date-picker class="pickerBox" v-model="value" :type="datePickerType" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" align="center" :size="'small'" :default-time="defaultTime" @change="changeTime" :clearable="clearable" :editable="false">
        </el-date-picker>
    </div>
</template>
<script>
import Vue from "vue";
import "element-ui/lib/theme-chalk/date-picker.css"
import "element-ui/lib/theme-chalk/icon.css"
import {
    DatePicker
} from 'element-ui';
Vue.use(DatePicker)
export default {
    name: 'dateTimeRangePicker',
    props: {
        clearable: {
            type: Boolean,
            default: true,
        },
        currSelectDate: {
            type: Object,
            required: true,
        },
        datePickerType: {
            type: String,
            required: false,
            default: 'daterange' // datetimerange-日期时间范围选择;daterange-日期范围选择
        },
        isCurTimeAsEndTime: { // 是否使用当前时间最为结束时间
            type: Boolean,
            required: false,
            default: false
        },
        dateSelectRange: {
            type: String, // 日期范围格式(2019-3-1-2019-3-3)
            required: false,
            default: ''
        },
        disabledDate: {
            type: Boolean,
            default: true,
        }
    },
    data() {
        return {
            defaultTime: ['00:00:00', '23:59:59'],
            value: [],
            // value: (this.currSelectDate.beginday != '' && this.currSelectDate.endday != '') ? [this.currSelectDate.beginday, this.currSelectDate.endday] : [new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), new Date()],
        };
    },
    computed: {
        pickerOptions: function() {   //1表示到今天为止，0表示不限制
            let _this = this;
            if (this.disabledDate) {
                return {
                    disabledDate(time) { //禁用当天23:59:59之后的日期
                        if (_this.dateSelectRange) {
                            let timeRange = _this.dateSelectRange.split('-')
                            let starTime = new Date(timeRange[0]).toLocaleDateString()
                            starTime = new Date(starTime).getTime();
                            let endTime = new Date(timeRange[1]).toLocaleDateString() + ' 23:59:59';
                            endTime = new Date(endTime).getTime();
                            return time.getTime() > endTime || time.getTime() < starTime;
                        }
                        let timeDifference;
                        let now = new Date().toLocaleDateString() + ' 23:59:59';
                        now = new Date(now).getTime();
                        timeDifference = now - (new Date().getTime());
                        return time.getTime() > Date.now() + timeDifference;
                    },
                   
                }
            }
        }
    },
    mounted() {
        let beginDay, endDay;
        if (this.currSelectDate.beginDay != '' && this.currSelectDate.endDay != '') {
            // beginDay = this.dateFormatTo_date(this.currSelectDate.beginDay, '/');
            // endDay = this.dateFormatTo_date(this.currSelectDate.endDay, '/');
            beginDay = new Date(this.currSelectDate.beginDay);
            endDay = new Date(this.currSelectDate.endDay);
        } else {
            beginDay = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
            endDay = new Date();
            if (!this.isCurTimeAsEndTime) {
                endDay = new Date(endDay.getFullYear(), endDay.getMonth(), endDay.getDate(), 23, 59, 59);
            }
        }
        // this.value = [beginDay, endDay];
    },
    methods: {
        simulationClick(e) {
            let target = $(e.target);
            target.next().click();
        },
        /**
         * [changeTime 时间选择后回调]
         * @return {[type]} [description]
         */
        changeTime() {
            if (this.value == null) {
                this.$emit("update:currSelectDate", {
                    beginDay: '',
                    endDay: '',
                });
                this.$emit('change', this.currSelectDate);
            } else {
                let beginday = this.value[0];
                let endday = this.value[1];
                beginday = this.formatToStringTime(beginday, '-');
                endday = this.formatToStringTime(endday, '-');
                if (this.datePickerType === 'daterange') {
                    beginday = beginday.split(' ')[0] + ' 00:00:00'
                    endday = endday.split(' ')[0] + ' 23:59:59'
                }
                this.$emit("update:currSelectDate", {
                    beginDay: beginday,
                    endDay: endday,
                });
                this.$emit('change', this.currSelectDate);
            }
        },
        /**
         * [formatToStringTime 时间戳转换成 YYYY-MM-dd HH:mm:ss]
         * @param  {[type]} timestamp [description]
         * @return {[type]}           [description]
         */
        formatToStringTime(timestamp, symbol) {
            if (!symbol) symbol = '-';
            let year, month, days, hours, minutes, seconds, time, result;
            year = timestamp.getFullYear();
            month = (timestamp.getMonth() + 1) < 10 ? '0' + (timestamp.getMonth() + 1) : timestamp.getMonth() + 1;
            days = timestamp.getDate() < 10 ? '0' + timestamp.getDate() : timestamp.getDate();
            hours = timestamp.getHours() < 10 ? '0' + timestamp.getHours() : timestamp.getHours();
            minutes = timestamp.getMinutes() < 10 ? '0' + timestamp.getMinutes() : timestamp.getMinutes();
            seconds = timestamp.getSeconds() < 10 ? '0' + timestamp.getSeconds() : timestamp.getSeconds();
            result = year + symbol + month + symbol + days + ' ' + hours + ':' + minutes + ':' + seconds;
            return result;
        }
    },
    watch: {
        currSelectDate: {
            handler(newV, oldV) {
                this.value = [newV.beginDay == "" ? "" : new Date(newV.beginDay), newV.endDay == "" ? "" : new Date(newV.endDay)];
            },
            deep: true
        }
    }
}
</script>
<style lang="less" scoped>
.dateTimeRangePicker {
    display: inline-block;
    vertical-align: middle;
    
    /deep/.el-range-editor--small.el-input__inner {
        height: 30px;
    }
    // /deep/.el-input__icon {
    //     display: none;
    // }

    /deep/.el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 340px;
    }

    // /deep/.el-date-editor .el-range-input {
    //     width: 45%;
    // }

    // .pickerBox {
    //     opacity
    // }
}
</style>