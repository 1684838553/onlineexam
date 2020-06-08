<template>
    <div :class={opened:menuOpened} class="drop_down_menu noselect" :style="{'width': inputWidth + 'px'}">
        <span :title="showText" @click="openAndClose" class="select_item" v-text="showText"></span>
        <span @click="openAndClose" class="triangle iconfont icon-zhuangtai-xiala"></span>
        <ul class="menu" :class="{fixed:fixed, hasCheckBox:hasCheckBox, crosswise: crosswise}">
            <li v-if="hasFilterBar" class="filter_bar">
                <input v-model="filterWord" class="form-control" type="" name="">
            </li>
            <!-- <li v-if="hasCheckBox&&filterItems.length>0" @click="selectAll" class="common_li" :class="{hasCheckBox:hasCheckBox}">
                <checkBox :checked="isSelectedAll()"></checkBox>
                <span>全部</span>
            </li> -->
            <li @click="selectItem($event,item)" :class="{selected:isSelected(item).flag, hasCheckBox:hasCheckBox, crosswise: crosswise, hidden: hidden && hasCheckBox}" class="common_li" :title="item[name]" v-for="(item) in filterItems" :key="item[value]">
                <!-- <span v-if="!hasCheckBox" class="selected_icon iconfont icon-xiala-xuanzhong"></span> -->
                <checkBox :checked="isSelected(item).flag" v-if="hasCheckBox"></checkBox>
                <span v-text="item[name]"></span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "dropDownMenu",
    props: /*['fixed', 'name', 'value', 'selectedItem', 'selectedItems', 'items', 'placeholder', 'hasCheckBox']*/ {
        fixed: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            default: "name"
        },
        value: {
            type: String,
            default: "value"
        },
        selectedItem: {
            type: Object,
            required: false
        },
        selectedItems: {
            type: Array,
            required: false
        },
        items: {
            type: Array,
            required: true
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        hasCheckBox: {
            type: Boolean,
            default: false
        },
        hasFilterBar: {
            type: Boolean,
            default: false
        },
        unit: {
            type: String,
            default: ""
        },
        isButton: {
            type: Boolean,
            default: false,
        },
        crosswise: {
            type: Boolean,
            default: false,
        },
        hidden: {
            type: Boolean,
            default: false,
        },
        inputWidth: {
            type: [Number, String],
            default: 100,
        }
    },
    data() {
        return {
            menuOpened: false,
            filterWord: ""
        };
    },
    mounted() {
        this.initBlur();
        this.initScroll();
    },
    methods: {
        /**
         * [dropDown description] 点击下拉的动作
         * @return {[type]} [description]
         */
        openAndClose($event) {
            this.menuOpened = !this.menuOpened
            if (this.menuOpened) {
                this.initFix();
                this.fixPosition();
            }
        },
        /**
         * [selectItem description] 选中选项
         * @param  {[type]} $event [description] 点击事件
         * @param {object} [item] [description] 选中项
         * @return {[type]}        [description]
         */
        selectItem($event, item) {
            if (this.isButton) {
                this.menuOpened = false;
                this.$emit('change', item);
            } else {
                if (this.hasCheckBox) {
                    let selectedInfo = this.isSelected(item);
                    if (selectedInfo.flag) {
                        this.selectedItems.splice(selectedInfo.index, 1);
                    } else {
                        this.selectedItems.push(item);
                    }
                } else {
                    this.$emit("update:selectedItem", item);
                    this.menuOpened = false;
                }
                this.$emit('change', $event);
            }
        },
        /**
         * [selectAll description] 全选
         * @return {[type]} [description]
         */
        selectAll() {
            let flag = this.isSelectedAll();
            if (flag) {
                this.selectedItems.splice(0, this.selectedItems.length);
            } else {
                let selectedItems = [].concat(this.filterItems);
                this.$emit("update:selectedItems", selectedItems);
            }
            this.$emit("change");
        },
        /**
         * [isSelectedAll description] 是否选中全部
         * @return {Boolean} [description]
         */
        isSelectedAll() {
            let flag = true;
            if (this.selectedItems.length === 0) return false;
            outer: for (let i in this.filterItems) {
                let item = this.filterItems[i];
                for (let j in this.selectedItems) {
                    let item_ = this.selectedItems[j];
                    if (item[this.value] === item_[this.value]) {
                        continue outer;
                    }
                }
                flag = false;
            }
            return flag;
        },
        /**
         * [isSelected description] 选项是否选中
         * @param  {[type]}  item [description]
         * @return {Boolean}      [description]
         */
        isSelected(item) {
            if (this.hasCheckBox) {
                for (let i in this.selectedItems) {
                    let thisItem = this.selectedItems[i];
                    if (item[this.value] === thisItem[this.value]) {
                        return { flag: true, index: i };
                    }
                }
                return {
                    flag: false
                };
            } else {
                return { flag: item[this.value] === this.selectedItem[this.value] };
            }
        },
        /**
         * [initBlur description] 初始化失焦事件
         * @return {[type]} [description]
         */
        initBlur() {
            let self = this;
            this.blurEvent = function(event) {
                let $target = $(event.target);
                if (self.menuOpened && $target.parents(".drop_down_menu")[0] !== self.$el && $target[0] !== self.$el) {
                    self.menuOpened = false;
                }
            };
            window.addEventListener("click", this.blurEvent);
        },
        /**
         * [initFix description] 初始化fix定位下的下拉菜单位置
         * @return {[type]} [description]
         */
        initFix() {
            if (!this.fixed) return;
            let elHeight = this.$el.offsetHeight;
            let top = $(this.$el).offset().top;
            let left = $(this.$el).offset().left;
            let width = this.$el.offsetWidth;
            let $menu = $(this.$el).find(".menu");
            $menu.css({
                width: width,
                top: top + elHeight,
                left: left
            });
        },
        /**
         * [initScroll description] 初始化滚动关闭事件
         * @return {[type]} [description]
         */
        initScroll() {
            let self = this;
            this.scroll = function(event) {
                let $target = $(event.target);
                if (self.menuOpened && $target.parents(".drop_down_menu")[0] !== self.$el && $target[0] !== self.$el) {
                    self.menuOpened = false;
                }
            };
            window.addEventListener("mousewheel", this.scroll)
        },
        /**
         * [fixPosition description] 修复菜单位置
         * @return {[type]} [description]
         */
        fixPosition() {
            let self = this;
            setTimeout(() => {
                let $menu = $(self.$el).find(".menu");
                let elHeight = self.$el.offsetHeight;
                let menuTop = $menu.offset().top;
                let menuHeight = $menu[0].offsetHeight;
                let winHeight = document.body.offsetHeight;
                if (winHeight >= (menuTop + menuHeight)) return;
                if (!self.fixed) {
                    $menu.css("top", -menuHeight);
                } else if (self.fixed) {
                    $menu.offset({ top: menuTop - menuHeight - elHeight });
                }
            }, 100);
        }
    },
    computed: {
        showText() {
            if (this.hasCheckBox) {
                if (this.selectedItems.length === 0) return this.placeholder;
                return this.selectedItems.map((value) => {
                    return value[this.name]
                }).join("、");
            } else {
                return this.selectedItem[this.name] ? this.selectedItem[this.name] + this.unit : this.placeholder;
            }
        },
        filterItems() {
            let self = this;
            let items = this.items.filter((value) => {
                return value[self.name].indexOf(self.filterWord) >= 0;
            })
            return items;
        }
    },
    watch: {
        menuOpened(newV) {
            if (!newV) {
                $(this.$el).find(".menu").removeAttr("style");
                this.filterWord = "";
            }
        }
    },
    destroyed() {
        window.removeEventListener("click", this.blurEvent); //销毁失焦事件
        window.removeEventListener("mousewheel", this.scroll); //销毁滚动事件
    }
}
</script>
<style lang="less" scoped>
.drop_down_menu {
    width: 150px;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    border: 1px solid #00A8CA;
    box-sizing: border-box;
    background: white;
    border-radius: 3px;
    padding-left: 15px;
    cursor: pointer;
    padding-right: 26px;
    position: relative;
    // vertical-align: middle;
    // top: 16px;

    .select_item {
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        display: inline-block;
        white-space: nowrap;
    }

    .triangle {
        position: absolute;
        top: 0px;
        right: 10px;
        font-size: 10px;
        transition: transform .1s;
        -moz-transition: transform .1s;
        -webkit-transition: transform .1s;
        -o-transition: transform .1s;
    }

    box-sizing:border-box;

    &:hover {
        border: 1px solid #4786FF;
    }

    &.opened {
        .triangle {
            transform: rotate(180deg);
        }

        border:1px solid #4786FF;

        .menu {
            height: initial;
            z-index: 100
        }
    }

    .menu {
        background: white;
        position: absolute;
        left: 0px;
        top: 30px;
        width: 100%;
        max-height: 170px;
        height: 0px;
        overflow: auto;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 7px 17px 0px rgba(107, 126, 151, 0.14);
        border-radius: 2px;

        &.isScroll {
            overflow: scroll;
        }

        &.hasCheckBox.crosswise {
            width: 250px;
        }

        .filter_bar {
            width: 100%;
            height: initial;
            line-height: initial;
            background: white;
            padding: 10px 10px;
            margin: initial;
            box-sizing: border-box;

            input {
                width: 100%
            }
        }

        .common_li {
            padding-left: 10px;
            font-size: 14px;
            height: 30px;
            line-height: 30px;
            cursor: pointer;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;

            &.hasCheckBox {

                .check_box,
                span {
                    vertical-align: middle;
                }

                .check_box {
                    top: 0;
                }
            }

            &.hasCheckBox.crosswise {
                float: left;
                width: 71px;
            }

            &.hidden {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }

            &:hover:not(.hasCheckBox) {
                background: #F5F6F7;
            }

            .selected_icon {
                width: 20px;
                height: 34px;
                line-height: 34px;
                display: inline-block;
                opacity: 0;
                filter: alpha(opacity=0);
                float: left;
                text-align: center;
            }

            &.selected {
                background-color: #E2E6ED;

                .selected_icon {
                    opacity: 1;
                    filter: alpha(opacity=100);
                    font-size: 12px;
                    color: #4786FF;
                }
            }

            /deep/ .check_box {
                position: relative;
                top: 2px;
                margin-right: 4px;

                &.checked {
                    span:before {
                        top: -8px;
                    }
                }
            }
        }

        &.fixed {
            position: fixed;
        }
    }
}
</style>