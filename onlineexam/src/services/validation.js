import Vue from 'vue'
import VeeValidate from 'vee-validate'
import { Validator } from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import VueI18n from 'vue-i18n';

/**
 * [before 表单校验]
 * @param  {[type]} addfn [description]
 * @return {[type]}       [description]
 */
Function.prototype.before = function(addfn) {
    var info = this;
    return function() {
        var ret = addfn.apply(this, arguments);
        if (ret === true || ret === 'true') {
            return info.apply(this, arguments);
        }
        if (ret.then) {
            ret.then(function(res) {
                if (res === true) {
                    return info.apply(this, arguments);
                }
            });
        }
    };
};

Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: 'zh_CN',
})

Vue.use(VeeValidate, {
    i18n,
    i18nRootKey: 'validation',
    dictionary: {
        zh_CN
    }
});

//现在已有的规则有：email required url include min max max_value ip between ....

/**
 * 自定义的规则
 */
const cutomsRules = {
    "posInt": { //只能填写正整数
        getMessage(field, args) {
            //这边返回的时错误信息
            return "只能填写正整数"
        },
        validate(value, args) {
            //这边需要返回布尔值
            if (!value) return true;
            var posInt_REGEXP = /^[1-9][0-9]*$/;
            return posInt_REGEXP.test(value);
        }
    },
    "isInt": { //只能填写整数
        getMessage(field, args) {
            //这边返回的时错误信息
            return "只能填写整数"
        },
        validate(value, args) {
            //这边需要返回布尔值
            if (!value) return true;
            var posInt_REGEXP = /^[0-9][0-9]*$/;
            return posInt_REGEXP.test($.trim(value));
        }
    },
    'twoTecimal': {
        getMessage(field, args) {
            return "只能输入0和正数且只保留小数点后两位";
        },
        validate(value, args) {
            if (!value) return true;
            var posInt_REGEXP = /^\d+(\.\d{1,2})?$/;
            return posInt_REGEXP.test(value);
        }
    },
    'maxNumLength': {
        getMessage(field, args) {
            return "数字长度不能超过12位";
        },
        validate(value, args, data) {
            if (!value) return true;
            var numberLimit = 12;
            if (args.length > 0) {
                numberLimit = parseInt(args[0]);
            }
            var num = value.toString().split(".");
            return num[0].length < numberLimit + 1;
        },
    },
    "Http": {
        getMessage(field, args) {
            return "请输入正确的URL格式，如http://www.baidu.com";
        },
        validate(value, args) {
            if (!value) return true;
            var posInt_REGEXP = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
            return posInt_REGEXP.test(value);
        }
    },
    'noLonger40Chracter': {
        getMessage(field, args) {
            return "备注名输入不能超过40个汉字";
        },
        validate(value, args) {
            if (!value) return true;
            var regCh = /[\u4e00-\u9fa5]/; //中文匹配
            var count = 0;
            for (var i = 0; i < value.length; i++) {
                if (regCh.test(value[i]))
                    count += 2;
                else
                    count += 1;
            }
            if (count > 80) {
                return false;
            }
            return true
        }
    },
    'mobile': {
        getMessage(field, args) {
            return "手机号码格式不正确";
        },
        validate(value, args) {
            debugger
            if (!value) return true;
            var regCh = /^1[34578]\d{9}$/; //匹配
            return regCh.test(value);
        }
    },
    'charAndNum': {
        getMessage(field, args) {
            return "至少8个字符,需同时包含字母和数字";
        },
        validate(value, args) {
            if (!value) return true;
            var NUMB_RETEXP = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{4,})$/;
            return NUMB_RETEXP.test(value);
        }
    },
    'spechar': {
        getMessage(field, args) {
            return "不能包含特殊字符！"
        },
        validate(value, args) {
            if (!value) return true;
            var SPECIALCHAR_REGEXP = /[<>\/]/;
            return !SPECIALCHAR_REGEXP.test(value);
        }
    },
    'englishandnum': {
        getMessage(field, args) {
            return "请输入只含有英文字母、数字的名称";
        },
        validate(value, args) {
            if (!value) return true;
            var ENGLISHANDNUM_RETEXP = /^[a-zA-Z0-9]+$/;
            return ENGLISHANDNUM_RETEXP.test(value);
        }
    },
    'areacode': {
        getMessage(field, args) {
            return "电话区号格式错误";
        },
        validate(value, args) {
            var reg = /^0\d{2,3}$/;
            return reg.test(value);
        }
    },
    'telephone': {
        getMessage(field, args) {
            return "固定电话格式错误！"
        },
        validate(value, args) {
            if (!value) return true;
            var TELPHONE_RETEXP = /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7}/;
            return TELPHONE_RETEXP.test(value);
        }
    },
    'mobilephone': {
        getMessage(field, args) {
            return "手机号码格式错误！"
        },
        validate(value, args) {
            if (!value) return true;
            /*var NUMBER_REGEXP = /^\d+$/;
            if (!NUMBER_REGEXP.test(value)) {
                scope.model = isNaN(parseInt(scope.model)) ? "" : parseInt(scope.model);
            }*/
            var MOBILEPHONE_REGEXP = /^1[0-9]{10}$/; // /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/;
            return MOBILEPHONE_REGEXP.test(value);
        }
    },
    'Email': {
        getMessage(field, args) {
            return 'Email格式不正确！'
        },
        validate(value, args) {
            if (!value) return true;
            var EMAIL_REGEXP = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            return EMAIL_REGEXP.test(value);
        }
    }
}

/**
 * 配置某规则不正确时的提示（仅用在已有的校验规则上）
 */
const dictionary = {
    zh_CN: {
        messages: {
            email: () => '邮箱格式不正确',
            required: (name) => `${name}不能为空`,
            maxNumLength(number, params, data) {
                return `${number}长度不能超过${params[0]?12:params[0]}位`;
            },
        }
    },
};

/**
 * 配置某规则必需时的提示
 */
const dict = {
    custom: {
        email: {
            required: '邮箱是必须填像'
        },
        module: {
            required: '你必须先攻击那个具有嘲讽技能的随从'
        }
    }
};

const install = function() {
    Object.keys(cutomsRules).forEach(key => {
        Validator.extend(key, cutomsRules[key]);
    });
}

install();
Validator.localize(dictionary);
Validator.localize('zh_CN', dict);