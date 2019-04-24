// components/i-timer/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        timer: {
            type: Number, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: 0, // 属性初始值（可选），如果未指定则会根据类型选择一个
            observer: function (newVal, oldVal) {
                this.setData({
                    time: this.time_(newVal)
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        time: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        formatDate(now) {
            var d = new Date(parseInt(now, 10));
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var date = d.getDate();
            var hour = d.getHours();
            var minute = d.getMinutes();
            return year + '-' + month + '-' + date + ' ' + hour + ':' + minute;
        },
        getTime(now) {
            var d = new Date(parseInt(now, 10));
            var hour = d.getHours();
            if(hour < 10){
                hour = '0'+hour
            }
            var minute = d.getMinutes();
            if(minute < 10){
                minute = '0'+minute
            }
            return hour + ':' + minute;
        },
        time_(now) {
            var startTime = this.formatDate(now);
            var getTime = this.getTime(now)
            var s1 = new Date(startTime.replace(/-/g, "/")),
                s2 = new Date(),
                runTime = parseInt((s2.getTime() - s1.getTime()) / 1000);
            var year = Math.floor(runTime / 86400 / 365);
            runTime = runTime % (86400 * 365);
            var month = Math.floor(runTime / 86400 / 30);
            runTime = runTime % (86400 * 30);
            var day = Math.floor(runTime / 86400);
            runTime = runTime % 86400;
            var hour = Math.floor(runTime / 3600);
            runTime = runTime % 3600;
            var minute = Math.floor(runTime / 60);
            runTime = runTime % 60;
            var second = runTime;
            if (year < 0) {
                // 判断是否超过上面的时间
                return;
            } else {
                if(day > 0){
                    return day + '天前  '
                }else if(hour > 1){
                    return hour + '小时前  '
                }else if(hour < 24){
                    return minute + '分钟前  '
                }
            }
        }
    }
})
