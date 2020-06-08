<template>
    <div class="search_input">
        <div class="input" :class="{'hasDropdown': hasDropdown}">
            <dropDownMenu :items="items" :name="'name'" :value="'value'" :placeholder="'全部'" :selectedItem.sync="mySelectedItem" v-if="hasDropdown" :inputWidth="100" @change="callback" />
            <input type="text" :style="inputStyle" class="form-control" :value="value" @input="$emit('input', $event.target.value)" :placeholder="placeholder" @keydown.13="search">
            <span class="iconfont icon-sousuo" @click="search"></span>   
        </div>
        <button v-if="showButton" @click="search">搜索</button>
    </div>
</template>
<script>
export default {
    name: "searchInput",
    // model: {
    //     prop: "keyWord",
    //     event: "change"
    // },
    props: {
        value: {
            type: String
        },
        // keyWord: {
        //     type: String
        // },
        inputWidth: {
            type: Number,
            default: 264
        },
        placeholder: {
            type: String,
            default: '请输入检索关键词'
        },
        showButton: {
            type: Boolean,
            default: false
        },
        fontSize: {
            type: Number,
            default: 12,
        },
        items: {
            type: Array,
            required: false,
            default: () => [],
        },
        selectedItem: {
            type: Object,
            required: false,
            default: function() {
                return {};
            },
        },
        hasDropdown: {
            type: Boolean,
            default: false,
            required: false,
        }
    },
    data() {
        return {
            mySelectedItem: this.selectedItem
        }
    },
    computed: {
        inputStyle() {
            return {
                width: (this.inputWidth + "px"),
                fontSize: (this.fontSize + "px")
            }
        },
    },
    methods: {
        search() {
            this.$emit("change", this.value);
        },
        callback() {
            // this.$emit("update:selectedItem", item);
            this.$emit("update:selectedItem", this.mySelectedItem)
        }
    },
}
</script>
<style lang="less" scoped>
.search_input {
    display: inline-block;
    box-sizing: border-box;
    // height: 36px;
    // line-height: 36px;

    /deep/.drop_down_menu {
        // border-right: none;
        vertical-align: middle;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        border: none;
        // top: -1px;
        height: 100%;
    }

    .input {
        display: inline-block;
        position: relative;

        .form-control {
            width: 264px;
            position: relative;
            // top: -1px;
            padding-right: 30px;
            padding-left: 10px;
        }

        &.hasDropdown {
            border: 1px solid #d4dfe5;
            border-radius: 3px;
            height: 30px;
            box-sizing: border-box;

            &:hover {
                border-color: #4786FF;
            }

            .form-control {
                border: none;
                border-top-left-radius: 0px;
                border-bottom-left-radius: 0px;
                height: 100%;
                width: 218px !important;
                vertical-align: middle;

                &:hover {
                    border: none;
                }
            }

            .iconfont {
                top: -1px;
                right: -1px;
            }
        }



        span {
            position: absolute;
            width: 30px;
            height: 30px;
            right: 0px;
            // top: -1px;
            cursor: pointer;
            font-size: 20px;
            color: #FFFFFF;
            background-color: #4786FF;
            border-bottom-right-radius: 3px;
            border-top-right-radius: 3px;

            &::before {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }

    button {
        background: #55A8FD;
        color: white;
        width: 74px;
        height: 36px;

        &:active {
            background-color: #1d8bfb
        }
    }
}
</style>