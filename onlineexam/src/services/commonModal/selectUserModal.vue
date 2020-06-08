<template>
    <div class="selectUserModal">
        <div class="header">
            <span>选择用户</span>
            <span @click="cancel"></span>
        </div>
        <div class="body">
            <div class="selectUserModal-main">
                <searchInput class="" :placeholder="'请输入检索关键词'" v-model="keyword" :inputWidth="618" @change="searchKeyword" />
                <div class="selectUserModal-select-list">
                    <div class="select-list-item user-list">
                        <div class="select-list-header">选择用户</div>
                        <div class="select-list-body">
                            <div class="select-list-body-item" v-for="item in searchUser" :key="item.id" @click="selectLeft(item)">
                                <checkBox :checked="isChecked(leftSelected, item)" />
                                <span v-text="item.name" :title="item.name"></span>
                            </div>
                        </div>
                    </div>
                    <div class="operation-list">
                        <i class="iconfont icon-youyi" @click="toRight"></i>
                        <i class="iconfont icon-zuoyi" @click="toLeft"></i>
                    </div>
                    <div class="select-list-item selected-list">
                        <div class="select-list-header">已选择</div>
                        <div class="select-list-body">
                            <div
                                class="select-list-body-item"
                                v-for="(item, index) in selectedList"
                                :key="'selected' + item.id"
                                @click="selectRight(item)"
                                :class="{ selected: isChecked(rightSelected, item) }"
                            >
                                <span v-text="item.name" :title="item.name"></span>
                                <i class="iconfont icon-guanbi-tupian icon-close fr" @click.stop="deleteRigth(index)"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <loaders :tip="'数据加载中'" :smallRange="false" :loader="loader" />
        </div>
        <div class="footer">
            <button class="confirm" @click="confirm()">确定</button>
            <button class="cancel" @click="cancel()">取消</button>
        </div>
    </div>
</template>
<script>
import { isExist, deepCopy } from '../commonService.js';
export default {
    name: 'selectUserModal',
    props: {
        selectedUser: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
            keyword: '',
            auditNote: '',
            userList: [], // 用户列表
            searchUser: [],
            selectedList: deepCopy(this.selectedUser), // 已选择的用户列表
            leftSelected: [], // 左侧列表选中的
            rightSelected: [], // 右侧列表选中的
            loader: null,
            searchTimer: null
        };
    },
    mounted() {
        this.selectedList;
        this.leftSelected;
        this.requestData();
    },
    watch: {
        keyword() {
            this.searchTimer && clearTimeout(this.searchTimer);
            this.searchTimer = setTimeout(() => {
                this.loader = this.search().then(res => {
                    let startTime = new Date().getTime();
                    this.searchUser = res;
                    this.$nextTick(() => {
                        let endTime = new Date().getTime();
                        console.log('渲染时间', endTime - startTime + 'ms');
                    });
                });
            }, 500);
        }
    },
    methods: {
        search() {
            return new Promise(resolve => {
                let startTime = new Date().getTime();
                if (!this.keyword) {
                    resolve(this.userList);
                } else {
                    let temp = this.userList.filter(item => {
                        return item.name.indexOf(this.keyword) > -1;
                    });
                    let endTime = new Date().getTime();
                    console.log('搜索时间', endTime - startTime + 'ms');
                    resolve(temp);
                }
            });
        },
        confirm() {
            this.$options.confirm(this.selectedList);
        },
        cancel() {
            this.$options.cancel();
        },
        searchKeyword() {
            this.loader = this.search().then(res => {
                let startTime = new Date().getTime();
                this.searchUser = res;
                this.$nextTick(() => {
                    let endTime = new Date().getTime();
                    console.log('渲染时间', endTime - startTime + 'ms');
                });
            });
        },
        /**
         * [isChecked 判断对象是否选中]
         * @param {Object} item [需要判断的对象]
         */
        isChecked(arr, item) {
            return isExist(arr, item, 'id') > -1;
        },
        /**
         * [selectLeft 左侧列表选择事件]
         * @param {Object} item [选中的对象]
         */
        selectLeft(item) {
            let index = isExist(this.leftSelected, item, 'id');
            if (index === -1) {
                this.leftSelected.push(item);
            } else {
                this.leftSelected.splice(index, 1);
            }
        },
        /**
         * [selectRight 右侧列表选择事件]
         * @param {Object} item [选中的对象]
         */
        selectRight(item) {
            let index = isExist(this.rightSelected, item, 'id');
            if (index === -1) {
                this.rightSelected.push(item);
            } else {
                this.rightSelected.splice(index, 1);
            }
        },
        // 从右侧列表中移除
        deleteRigth(index) {
            let temp = this.selectedList.splice(index, 1);
            this.userList.push(temp[0]);
        },
        // 右移
        toRight() {
            this.leftSelected.map(item => {
                let index = isExist(this.selectedList, item, 'id');
                if (index === -1) {
                    this.selectedList.push(item);
                }
                let index1 = isExist(this.userList, item, 'id');
                if (index1 > -1) {
                    this.userList.splice(index1, 1);
                }
            });
            this.leftSelected = [];
        },
        // 左移
        toLeft() {
            this.rightSelected.map(item => {
                let index = isExist(this.selectedList, item, 'id');
                if (index > -1) {
                    this.deleteRigth(index);
                }
            });
            this.rightSelected = [];
        },
        // 接口请求函数
        requestData() {
            this.getUserList();
        },
        /**
         * 接口--获取用户列表
         */
        getUserList() {
            let defer = $.Deferred();
            let params = {
                name: this.keyword
            };
            this.loader = this.http('/admin/queryAllUser', params, 'post').then(res => {
                // this.loader = this.http('/mock/getUserList.json', params, 'get').then(res => {
                let userList = [];
                res.map(item => {
                    let temp = {
                        id: item.UserId.toString(),
                        name: item.TrueName
                    };
                    let index = isExist(this.selectedList, temp, 'id');
                    if (index === -1) {
                        userList.push(temp);
                    }
                });
                this.userList = userList;
                this.searchUser = deepCopy(userList);
                defer.resolve();
            });
            return defer.promise();
        }
    }
};
</script>
<style scoped lang='less'>
.selectUserModal {
    width: 685px;
    height: 650px;

    .body {
        .selectUserModal-main {
            padding-top: 20px;

            .selectUserModal-select-list {
                padding-top: 20px;
                display: flex;

                .select-list-item {
                    flex: 1;
                    height: 428px;
                    border: 1px solid #e9ecef;
                    overflow: hidden;

                    .select-list-header {
                        width: 100%;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        background-color: #f4f5f7;
                    }

                    .select-list-body {
                        padding: 20px 15px;
                        overflow: auto;
                        height: 348px;

                        .select-list-body-item {
                            cursor: pointer;
                            height: 30px;
                            line-height: 30px;

                            span {
                                margin-left: 10px;
                                display: inline-block;
                                width: 210px;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                vertical-align: middle;
                            }

                            .icon-close {
                                font-size: 17px;
                                color: #d2d6dc;
                                margin-right: 10px;
                            }

                            &.selected,
                            &:hover {
                                background-color: #f4f5f7;
                            }
                        }
                    }
                }

                .operation-list {
                    width: 43px;
                    text-align: center;
                    padding: 178px 0;

                    i {
                        display: block;
                        color: #c2c5cd;
                        font-size: 25px;
                        cursor: pointer;

                        &:last-child {
                            margin-top: 20px;
                        }
                    }
                }
            }
        }
    }
}
</style>