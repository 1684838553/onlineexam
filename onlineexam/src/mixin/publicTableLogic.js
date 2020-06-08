import { isExist } from '../services/commonService.js';
export default {
    name: 'publicTableLogic',
    data() {
        return {
            listData: [], // 列表数据
            // 分页参数
            page: {
                currentPage: 1,
                pageSize: 10,
                totalItems: 0,
                totalPages: 0
            },
            selectedList: [], // 选中的列表数据
            isAllChecked: false, // 是否全选
            isHalfChecked: false, // 是否半选
            loader: null,
            comParams: {} // 请求参数
        };
    },
    methods: {
        /**
         * [singleChecked 全选]
         */
        allChecked() {
            if (this.listData.length === 0) {
                this.isAllChecked = false;
                this.isHalfChecked = false;
                return;
            }
            if (this.isAllChecked) {
                this.listData.map(item => {
                    let index = isExist(this.selectedList, item, 'id');
                    if (index > -1) {
                        this.selectedList.splice(index, 1);
                    }
                });
                this.isAllChecked = false;
                this.isHalfChecked = false;
            } else {
                this.listData.map(item => {
                    let index = isExist(this.selectedList, item, 'id');
                    if (index === -1) {
                        this.selectedList.push(item);
                    }
                });
                this.isAllChecked = true;
                this.isHalfChecked = false;
            }
        },
        /**
         * [singleChecked 单项选中]
         * @param {Object} item [选择的对象]
         */
        singleChecked(item) {
            let index = isExist(this.selectedList, item, 'id');
            if (index === -1) {
                this.selectedList.push(item);
            } else {
                this.selectedList.splice(index, 1);
            }
            this.checkAllCheckedStatus();
        },
        /**
         * [isChecked 判断对象是否选中]
         * @param {Object} item [需要判断的对象]
         */
        isChecked(item) {
            return isExist(this.selectedList, item, 'id') > -1;
        },
        /**
         * 检查全选框的状态是全选还是半选
         */
        checkAllCheckedStatus() {
            // 检查全选框的状态
            let isAllChecked = true;
            let isHalfChecked = false;
            if (this.listData.length === 0) {
                isAllChecked = false;
            }
            this.listData.map(item => {
                let index = isExist(this.selectedList, item, 'id');
                if (index === -1) {
                    // 如果有一个不存在就不为全选
                    isAllChecked = false;
                } else {
                    // 如果有一个存在就为半选
                    isHalfChecked = true;
                }
            });
            if (isAllChecked) {
                // 如果全选就不为半选
                isHalfChecked = false;
            }
            this.isAllChecked = isAllChecked;
            this.isHalfChecked = isHalfChecked;
        }
    }
};
