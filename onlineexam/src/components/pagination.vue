<template>
    <div class="pagination" v-if="totalPages > 1 && totalItems > pageSize">
        <div class="location noselect" v-if="hasPageNum">
            <span>共{{totalItems}}条
				<!-- <span>第{{currentPage + ShomePage}}/{{copyTotalPages}}页</span> -->
            </span>
        </div>
        <dropDownMenu :items="pageSizes" @change="changePageSize" :value="'name'" :unit="'条/页'" :selectedItem.sync="selectedPageSize" v-if="hasSelectPageSize" :inputWidth="80"></dropDownMenu>
        <ul class="paging noselect">
            <li class="first" @click="selectPage('1')" v-if="hasFirst">首页</li>
            <li :class="{disabled:(currentPage + ShomePage)==1}" @click="prevNext(-1)" class="prev">上一页</li>
            <li @click="selectPage(value)" v-for="value in showItems" :class="{active:(currentPage + ShomePage)==value}" v-text="value"></li>
            <li :class="{disabled:(currentPage+ShomePage)==copyTotalPages}" @click="prevNext(1)" class="next">下一页</li>
            <li class="last" @click="selectPage(copyTotalPages)" v-if="hasLast">尾页</li>
        </ul>
        <div class="go_to" v-if="hasJumpPage">
            <span class="one">跳至</span>
            <input v-model="willPage" @keypress="goToWillPage" class="form-control" type="" name="">
            <span class="two">页</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'pagination',
    props: {
        showPagesNum: {
            type: Number,
            default: 8
        },
        pageSize: {
            type: [String, Number],
            default: '20'
        },
        currentPage: {
            type: [String, Number],
            default: '1'
        },
        totalPages: {
            type: [String, Number]
        },
        totalItems: {
            type: [String, Number]
        },
        maxTotalItems: {
            type: Number,
        },
        hasPageNum: {
            type: Boolean,
            default: true,
        },
        hasSelectPageSize: {
            type: Boolean,
            default: true,
        },
        hasJumpPage: {
            type: Boolean,
            default: true,
        },
        //起始页，默认为0
        homePage: {
            type: [String, Number],
            default: 0
        },
        hasFirst: {
            type: Boolean,
            default: true,
        },
        hasLast: {
            type: Boolean,
            default: true
        },
        customPageSizes: {
            type: Array,
            require: false,
            // default: false,
        }
    },
    data() {
        return {
            // pageSizes: [{
            // 	name: '10'
            // }, {
            // 	name: '20'
            // }, {
            // 	name: '50'
            // }],
            selectedPageSize: {
                name: this.pageSize.toString()
            },
            copyTotalPages: this.totalPages,
            willPage: 1
        }
    },
    watch: {
        totalPages: function(val) {
            this.copyTotalPages = val
            if (this.maxTotalItems) {
                if (this.totalItems > this.maxTotalItems) {
                    let tempTotalPages = Number(this.maxTotalItems) / Number(this.pageSize)
                    tempTotalPages = tempTotalPages + ''
                    let arrTotalPages = tempTotalPages.split('.')
                    if (arrTotalPages.length == 2) {
                        this.copyTotalPages = Number(arrTotalPages[0]) + 1
                    } else {
                        this.copyTotalPages = Number(arrTotalPages[0])
                    }
                }
            }
        }
    },
    methods: {
        /**
         * [selectPage description] 选择指定页
         * @param  {[type]} item [description]
         * @return {[type]}      [description]
         */
        selectPage(item) {
            this.$emit("update:currentPage", (item - this.ShomePage));
            this.$emit("change");
        },
        /**
         * [prevNext description] 上一页或下一页
         * @param  {[type]} value [description] 值
         * @return {[type]}       [description]
         */
        prevNext(value) {
            let willPage = Number(this.currentPage) + value + this.ShomePage;
            if (willPage == 0 || willPage > this.copyTotalPages) {
                return;
            }
            this.selectPage(willPage);
        },
        /**
         * [changePageSize description] 改变单页大小
         * @return {[type]} [description]
         */
        changePageSize() {
            this.$emit("update:currentPage", 1 - this.ShomePage);
            this.$emit("update:pageSize", this.selectedPageSize.name.toString());
            this.$emit("change");
        },
        /**
         * [goToWillPage description] 跳转到指定页
         * @return {[type]} [description]
         */
        goToWillPage($event) {
            if ($event.keyCode !== 13) return;
            if (isNaN(this.willPage)) {
                alert("请输入数字");
                return;
            }
            let willPage = Number(this.willPage);
            if (willPage <= 0) {
                willPage = 1;
            } else if (willPage > this.copyTotalPages) {
                willPage = Number(this.copyTotalPages);
            }
            this.willPage = willPage;
            this.selectPage(willPage);
        },
    },
    computed: {
        showItems() {
            let different = (this.currentPage + this.ShomePage) % this.showPagesNum
            let start = different === 0 ? (this.currentPage + this.ShomePage) - this.showPagesNum + 1 : (this.currentPage + this.ShomePage) - different + 1;
            let array = [];
            let end = (start + this.showPagesNum) > (this.copyTotalPages + 1) ? (this.copyTotalPages + 1) : (start + this.showPagesNum);
            for (let i = start; i < end; i++) {
                array.push(i);
            }
            return array;
        },
        ShomePage() {
            return this.homePage === 0 ? 1 : 0;
        },
        pageSizes() {
            if (!!this.customPageSizes && this.customPageSizes.length > 0) {
                return this.customPageSizes;
            } else {
                return [{
                    name: '10'
                }, {
                    name: '20'
                }, {
                    name: '50'
                }, {
                    name: '500'
                }];
            }
        },
    }
}
</script>
<style lang="less" scoped>
.pagination {
    font-size: 12px;
    display: inline-block;
    line-height: initial;

    .location {
        display: inline-block;
        font-size: 14px;
        color: #35415E;
        margin-right: 10px;
    }

    .paging {
        display: inline-block;
        position: relative;
        top: 8px;

        li {

            &.prev,
            &.next {
                min-width: 50px;
                // transform: rotate(90deg);
                // &:after {
                //     content: "V";
                // }
            }

            // &.next {
            //     transform: rotate(-90deg);
            //     &:after {
            //         content: "V";
            //     }
            // }
            &.disabled {
                opacity: 0.6;
                cursor: not-allowed;

                &:hover {
                    color: #304150;
                    background-color: white;
                    border: 1px solid rgba(190, 190, 190, 1);
                }
            }

            font-size:12px;
            color:#304150;
            margin-right:12px;
            cursor: pointer;
            line-height: 25px;
            min-width: 25px;
            box-sizing:border-box;
            height: 25px;
            text-align: center;
            float: left;
            border: 1px solid rgba(190, 190, 190, 1);
            border-radius: 3px;

            &:hover,
            &.active {
                color: white;
                background: #4786FF;
                border-color: #4786FF;
            }
			&.last {
				width: 40px;
			}
            &.first {
                width: 40px;
                margin-right: 10px;
            }
        }
    }

    .drop_down_menu {
        text-align: initial;
        margin-right: 14px;
        width: 70px;
        border-radius: 3px;
        border: 1px solid rgba(190, 190, 190, 1);
        height: 25px;
        position: relative;
        line-height: 25px;
        font-size: 12px;
        padding-left: 5px;
        top: 9px;

        /deep/ .select_item {
            width: 70px;
        }

        /deep/ .menu .common_li {
            font-size: 12px;
        }

        /deep/.triangle {
            top: -1px;
        }
    }

    .go_to {
        margin-left: 20px;
        display: inline-block;

        .one {
            margin-right: 12px;
        }

        .two {
            margin-left: 12px;
        }

        input {
            width: 25px;
            height: 25px;
            padding-left: 0px;
            box-sizing: border-box;
            text-align: center;
        }
    }
}
</style>