// components/i-text/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        text: {
            type: String,
            observer: function (newVal, oldVal) {
                let arr = newVal.split('\n');
                if (arr.length > 5) {
                    this.setData({
                        hiddenMore: false
                    })
                }else{
                    if(newVal.length/24 > 5){
                        this.setData({
                            hiddenMore: false
                        })
                    }
                }
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        more: 1,
        text: '',
        hiddenMore: true,

        ellipsis: true, // 文字是否收起，默认收起
    },

    /**
     * 组件的方法列表
     */
    methods: {
        showMore(){
            this.setData({
                ellipsis: false,
                hiddenMore: true
            })
        }
    }
})
