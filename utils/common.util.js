import objectUtil from './object.util'

const formatNumber = (n) => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const formatTime = (date) => {
    return formatDate(date) + ' ' + [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    ].map(formatNumber).join(':')
}

const formatDate = (date) => {
    var date = new Date(date);
    var y = 1900 + date.getYear();
    var m = "0" + (date.getMonth() + 1);
    var d = "0" + date.getDate();
    return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
}

const $init = (page) => {
    page.$data = objectUtil.$copy(page.data, true)
}

const $digest = (page) => {
    let data = page.data
    let $data = page.$data
    let ready2set = {}

    for (let k in data) {
        if (!objectUtil.$isEqual(data[k], $data[k])) {
            ready2set[k] = data[k]
            $data[k] = objectUtil.$copy(data[k], true)
        }
    }

    if (Object.keys(ready2set).length) {
        page.setData(ready2set)
    }
}

//获取当前时间
const nowDate = () => {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

//当前时间加1天
const nowDateAddOne = () => {
    var dateTime=new Date();
    dateTime=dateTime.setDate(dateTime.getDate()+1);
    var date = new Date(dateTime);
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

//当前时间加2天
const nowDateAddTwo = () => {
    var dateTime=new Date();
    dateTime=dateTime.setDate(dateTime.getDate()+2);
    var date = new Date(dateTime);
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

const ymd = () => {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + month + strDate;
    return currentdate;
}

const nowDateTimestamp = () => {
    return Date.parse(new Date().toLocaleDateString());
}

const nowDateAddOneTimestamp = () => {
    var dateTime=new Date();
    dateTime=dateTime.setDate(dateTime.getDate()+1);
    return Date.parse(new Date(dateTime).toLocaleDateString());
}

const nowDateAddTwoTimestamp = () => {
    var dateTime=new Date();
    dateTime=dateTime.setDate(dateTime.getDate()+2);
    return Date.parse(new Date(dateTime).toLocaleDateString());
}

module.exports = {
    formatDate,
    nowDate,
    formatTime,
    nowDateTimestamp,
    nowDateAddOne,
    nowDateAddTwo,
    nowDateAddOneTimestamp,
    nowDateAddTwoTimestamp,
    ymd,
    $init,
    $digest
}
