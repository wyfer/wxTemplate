// components/i-date-time/index.js
const date = new Date()
const hours = []
const minutes = []

const startHour = date.getHours()
const startMinute = date.getMinutes()
const endHour = date.getHours() + 1 == 24 ? 0 : date.getHours() + 1
const endMinute = date.getMinutes() + 1 == 60 ? 0 : date.getMinutes() + 1

for (let i = 0; i <= 23; i++) {
    if (i < 10) {
        hours.push('0' + i)
    } else {
        hours.push(i)
    }
}

for (let i = 0; i <= 59; i++) {
    if (i < 10) {
        minutes.push('0' + i)
    } else {
        minutes.push(i)
    }
}

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        show: {
            type: Number,
            value: 0,
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        hours,
        hour: date.getHours(),
        minutes,
        minute: date.getMinutes(),
        showErr: false,

        show: false,

        value: [startHour, startMinute, endHour, endMinute]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        pickChange(e) {
            console.log(e)

            let v = e.detail.value
            let i = true

            if (v[0] < v[2]) {
                i = false
            }else if(v[0] == v[2]){
                if(v[1] <= v[3]){
                    i = false
                }
            }

            if (v[0] < 6) {
                i = true
            }else if(v[0] == 6){
                if(v[1] < 30){
                    console.log('<30')
                    i = true
                }
            }

            if (v[2] > 21) {
                i = true
            }else if(v[2] == 21){
                if(v[3] !== 0){
                    i = true
                }
            }

            this.setData({
                value: v,
                showErr: i
            })
        },
        choseBtn() {
            if (this.data.showErr) return false;
            this.triggerEvent('choseTime', {value: this.data.value}, {})
            this.setData({
                show: false
            })
        }
    }
})
