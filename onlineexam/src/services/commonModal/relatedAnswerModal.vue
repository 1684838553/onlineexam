<template>
    <div class="relatedAnswerModal">
        <div class="header">
            <span>相关回答</span>
            <span @click="cancel"></span>
        </div>
        <div class="body">
            <div class="auditModal-main">
                <div class="auditModal-main-btn">
                    <buttonPlus :disabled="false" disabledTip="请先选择" @click="operate('print')">打印</buttonPlus>
                    <buttonPlus :disabled="selectedList.length < 1" disabledTip="请先选择" @click="operate('delete')">删除</buttonPlus>
                </div>
                <div class="auditModal-main-filter">
                    <div class="dropmenu-bar">
                        <dateTimeRangePicker :currSelectDate.sync="currSelectDate" @change="requestData" datePickerType="datetimerange" />
                    </div>
                    <div class="dropmenu-bar">
                        <label>状态</label>
                        <dropDownMenu placeholder="状态" :items="status" :selectedItem.sync="selectedStatus" @change="requestData" />
                    </div>
                    <div class="dropmenu-bar">
                        <label>分类</label>
                        <dropDownMenu placeholder="分类" :items="category" :selectedItem.sync="selectedCategory" @change="requestData" />
                    </div>
                    <searchInput class="fr" :placeholder="'请输入关键词'" v-model="keyword" @change="requestData" />
                </div>
                <div class="publ-main-table">
                    <table>
                        <thead>
                            <tr>
                                <th class="th-checkbox">
                                    <checkBox :checked="isAllChecked || isHalfChecked" :halfChecked="isHalfChecked" @change="allChecked" />
                                </th>
                                <th class="th-number">序号</th>
                                <th class="th-title">回答标题</th>
                                <th>回答人</th>
                                <th class="th-mobile">手机</th>
                                <th class="th-time">发布时间</th>
                                <th>状态</th>
                                <th>审核人</th>
                                <th class="th-operation">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in listData" :key="index">
                                <td>
                                    <checkBox :checked="isChecked(item)" @change="singleChecked(item)" />
                                </td>
                                <td v-text="(page.currentPage - 1) * page.pageSize + index + 1">序号</td>
                                <td class="text_left">
                                    <span v-text="item.title">回答标题</span>
                                </td>
                                <td>
                                    <span v-text="item.name">回答人</span>
                                </td>
                                <td>
                                    <span v-text="item.tel">手机</span>
                                </td>
                                <td>
                                    <span v-text="item.crtime">发布时间</span>
                                </td>
                                <td>
                                    <span>{{ item.status | filterStatus }}</span>
                                </td>
                                <td>
                                    <span v-text="item.reviewer">审核人</span>
                                </td>
                                <td class="td-operation">
                                    <buttonPlus tip="查看" @click="operate('read', item)"><i class="iconfont icon-chakan operation_btn"></i></buttonPlus>
                                    <buttonPlus tip="审核" @click="operate('audit', item)" v-if="item.status === 0"><i class="iconfont icon-xingzhuang operation_btn"></i></buttonPlus>
                                    <buttonPlus tip="删除" @click="operate('delete', item)"><i class="iconfont icon-shanchu operation_btn"></i></buttonPlus>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="pager">
                        <pagination
                            :showPagesNum="5"
                            @change="requestData"
                            :pageSize.sync="page.pageSize"
                            :currentPage.sync="page.currentPage"
                            :totalPages.sync="page.totalPages"
                            :totalItems.sync="page.totalItems"
                            :homePage="1"
                            :hasPageNum="true"
                            :hasSelectPageSize="true"
                            :hasJumpPage="true"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { isExist, deepCopy, getStatus, getCategory, filterFieldToString } from '../commonService.js';
import auditModal from './auditModal.vue'; // 审核弹窗
import publicTableLogic from '../../mixin/publicTableLogic.js';
export default {
    name: 'relatedAnswerModal',
    mixins: [publicTableLogic],
    props: {
        id: {
            type: [String, Number],
            required: true
        }
    },
    data() {
        return {
            keyword: '', // 搜索关键词
            // 当前日期
            currSelectDate: {
                beginDay: '',
                endDay: ''
            },
            // 状态
            status: getStatus(),
            // 选中状态
            selectedStatus: {
                name: '全部',
                value: ''
            },
            // 分类
            category: [
                {
                    name: '全部',
                    value: ''
                }
            ],
            // 选中分类
            selectedCategory: {
                name: '全部',
                value: ''
            }
        };
    },
    mounted() {
        this.requestData();
    },
    methods: {
        cancel() {
            this.$options.cancel();
        },
        /**
         * [operate 操作]
         * @param {String} type [操作类型]
         * @param {Object} item [需要操作的对象]
         */
        operate(type, item) {
            let router;
            let ids = '';
            if (typeof item != 'undefined') {
                ids = item.id;
            } else {
                ids = filterFieldToString(this.selectedList, 'id');
            }
            switch (type) {
                case 'print':
                    console.log('打印');
                    window.open('/jxwenba/admin/answer/downloadModelR?' + $.param({
                        questionid: this.id,
                        ...this.comParams
                    }));
                    break;
                case 'delete':
                    // console.log('删除');
                    this.$ask({
                        title: '删除',
                        content: '确定删除该回答？',
                        callback: () => {
                            this.delAnswerByIds(ids).then(() => {
                                this.selectedList = [];
                                this.requestData();
                            });
                        }
                    });
                    break;
                case 'read':
                    // console.log('查看');
                    router = this.$router.resolve({
                        name: 'answerReadEdit',
                        query: {
                            id: item.id,
                            life: item.life
                        }
                    });
                    window.open(router.href);
                    break;
                case 'audit':
                    // console.log('审核');
                    this.publicModal(auditModal, {}).then(
                        data => {
                            let params = {
                                id: item.id,
                                status: data.status,
                                name: this.$store.state.userInfo.trueName,
                                message: data.content
                            };
                            this.aduitAnswer(params).then(() => {
                                this.selectedList = [];
                                this.requestData();
                            });
                        },
                        data => {}
                    );
                    break;
                default:
                    console.log('无此操作');
            }
        },
        requestData() {
            // 初始化全选框状态
            this.isAllChecked = false;
            this.isHalfChecked = false;
            this.getCategoryList().then(() => {
                this.getRelatedAnswerList();
            });
        },
        /**
         * 接口--获取相关回答列表
         */
        getRelatedAnswerList() {
            let defer = $.Deferred();
            let classificationids = [];
            if (this.selectedCategory.value === '') {
                this.category.map((item, index) => {
                    if (index !== 0) {
                        classificationids.push(item.value);
                    }
                });
            } else {
                classificationids.push(this.selectedCategory.value);
            }
            this.comParams = {
                startTime: this.currSelectDate.beginDay, // 起始时间
                endTime: this.currSelectDate.endDay, // 起始时间
                status: this.selectedStatus.value, // 0：未审核；1：已通过；2：未通过
                classificationids: classificationids.join(), // 分类id
                content: this.keyword // 搜索框里面的内容
            };
            let params = {
                page: this.page.currentPage,
                rows: this.page.pageSize,
                id: this.id, // 问题id
                ...this.comParams
            };
            this.loader = this.http('/admin/answer/relatedAnswer', params, 'post').then(res => {
                // this.loader = this.http('/mock/relatedAnswer.json', params, 'get').then(res => {
                this.listData = res.items;
                this.page.totalItems = res.total;
                this.page.totalPages = res.totalPage;
                this.checkAllCheckedStatus();
                defer.resolve();
            });
            return defer.promise();
        },
        /**
         * 接口--获取分类列表
         */
        getCategoryList() {
            let defer = $.Deferred();
            this.loader = getCategory().then(res => {
                this.category = res;
                defer.resolve();
            });
            return defer.promise();
        },
        /**
         * 接口--通过id删除回答
         */
        delAnswerByIds(ids) {
            let defer = $.Deferred();
            let params = {
                ids: ids
            };
            this.loader = this.http('/admin/answer/deleteByIds', params, 'post').then(res => {
                // this.loader = this.http('/mock/delAnswerByIds.json', params, 'get').then(res => {
                if (res.code === 0) {
                    this.$msg({
                        content: res.msg,
                        type: 'success'
                    });
                }
                defer.resolve();
            });
            return defer.promise();
        },
        /**
         * 接口--审核回答
         */
        aduitAnswer(params) {
            let defer = $.Deferred();
            this.loader = this.http('/admin/audit/answerAudit', params, 'post').then(res => {
                // this.loader = this.http('/mock/aduitAnswer.json', params, 'get').then(res => {
                if (res.code === 0) {
                    this.$msg({
                        content: res.msg,
                        type: 'success'
                    });
                }
                defer.resolve();
            });
            return defer.promise();
        }
    }
};
</script>
<style lang="less" scoped>
.relatedAnswerModal {
    width: 1108px;
    // height: 759px;
    height: 650px;

    .body {
        height: calc(100% - 80px);

        .auditModal-main {
            padding-top: 20px;

            .auditModal-main-btn {
                height: 50px;
                line-height: 50px;

                /deep/ .buttonPlus {
                    margin-right: 16px;
                    line-height: 32px;

                    .tips {
                        line-height: 24px;
                        height: 24px;
                    }
                }
            }

            .auditModal-main-filter {
                padding: 10px 0;

                .dropmenu-bar {
                    display: inline-block;
                    margin-right: 16px;

                    label {
                        vertical-align: middle;
                        margin-right: 6px;
                    }

                    .drop_down_menu {
                        vertical-align: middle;
                    }
                }
            }
        }
    }
}
</style>

