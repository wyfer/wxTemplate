import {promisify} from "../utils/promise.util";

const wxGetImageInfo = promisify(wx.getImageInfo)


const formatText = (char, widthText, fontSize) => {
    let row = []
    for (let a = 0; a < char.length; a++) {
        let garr = char[a]
        var str = new String(garr);
        var bytesCount = 0;
        var s = "";
        for (var i = 0, n = str.length; i < n; i++) {
            var c = str.charCodeAt(i);
            //统计字符串的字符长度
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                bytesCount += 1;
            } else {
                bytesCount += 2;
            }
            //换行
            s += str.charAt(i);
            if (bytesCount >= widthText / fontSize * 2) {
                s = s + '\n';
                //重置
                bytesCount = 0;
            }
        }
        garr = s;
        garr = garr.split('\n')
        for (let o = 0; o < garr.length; o++) {
            row.push(garr[o]);
        }
    }
    return row
}

const shareCommentPic = (that, ctx, planDetail, planCommentCell) => {
    console.log(planCommentCell)

    let title = planCommentCell.user.nickName
    let days = '222'
    let planTitle = planDetail.title
    let text = planCommentCell.content;

    if(planCommentCell.images == null){
        planCommentCell.images = []
    }
    //固定图片
    let picArr = [
        'http://hypervic-enjoyapp-v3.oss-cn-beijing.aliyuncs.com/other/2019/03/26/92b0bc83298b44af83e9e6af537d9337.png',
        planCommentCell.user.avatar,
        'http://hypervic-enjoyapp-v3.oss-cn-beijing.aliyuncs.com/other/2019/03/26/e58fc1d95b38456386324357cf471b0d.jpg',
        'http://hypervic-enjoyapp-v3.oss-cn-beijing.aliyuncs.com/other/2019/04/17/2d5180eb9ed9475f91629ee6140f51fc.png',
    ]

    //评论图片
    planCommentCell.images.map(item => {
        picArr.push(item)
    })


    const upImgs = picArr.map(item => {
        return wxGetImageInfo({
            src: item
        })
    })

    return new Promise((resolve, reject) => {
        Promise.all(upImgs).then(res => {
            console.log(res)

            text = text.replace(/\s+$|^\s+/g, "");
            //字号13，距离上一行20像素，
            //字数/每行字数=行数
            //行数*行高 = 行数，计算得图片高度
            let heightHead = 454;
            let heightFoot = 352;
            let fontSize = 25;
            let linheight = 36;
            let width = 750;
            let widthText = 650;
            let days_leh = days.length
            let char = text.split('\n')
            let row = formatText(char, widthText, fontSize)

            let imgList = []
            if(res.length > 4){
                imgList = res.slice(-(res.length - 4));
            }

            //得到所有图片的高度和宽度，计算得出宽度为686下的高度，保证图片不变形
            let imageLists = [];
            let imgBoxHeight = 0;
            for (let i = 0; i < imgList.length; i++) {
                let w = imgList[i].width
                let h = imgList[i].height
                if (w / 686 > 0) {
                    let b = w / 686;
                    w = w / b;
                    h = h / b;
                } else {
                    let b = 686 / w;
                    w = w * b;
                    h = h * b;
                }
                let p = {}
                p.width = w
                p.height = h
                p.path = imgList[i].path
                imgBoxHeight += h
                imageLists.push(p)
            }

            let heightBody = row.length * linheight + 30 + imgBoxHeight + imageLists.length * 30 + 10;

            let height = heightHead + heightBody + heightFoot;
            that.setData({
                canvasWidth: width,
                canvasHeight: height,
            })
            //背景白色
            ctx.setFillStyle("rgba(255,255,255,1)")
            ctx.fillRect(0, 0, width, heightHead + height + heightFoot);
            ctx.stroke();
            //中间文字
            ctx.setTextAlign('left')
            ctx.setFontSize(fontSize)
            ctx.setFillStyle("#000")
            for (let b = 0; b < row.length; b++) {
                //内容，左侧边距，行高，总宽度
                ctx.fillText(row[b], 50, heightHead + 40 + b * linheight, width);
            }

            for (let i = 0; i < imageLists.length; i++) {
                let startHeight = row.length * linheight + 40 + heightHead
                ctx.drawImage(imageLists[i].path, 32, startHeight + i * (imageLists[i].height + 30), 686, imageLists[i].height);
            }

            ctx.save()

            //顶部内容
            ctx.drawImage(res[0].path, 0, 0, width, heightHead);

            ctx.setTextAlign('center')
            ctx.setFillStyle('#333333')
            ctx.setFontSize(26)
            ctx.fillText(title, width / 2, 328)

            ctx.save()

            ctx.drawImage(res[1].path, width / 2 - 78, 130, 156, 156);

            ctx.setTextAlign('center')
            ctx.setFillStyle('#444444')
            ctx.setFontSize(26)
            ctx.fillText("坚持打卡", width / 2 - days_leh * 24 + 10, 390)

            ctx.setTextAlign('center')
            ctx.setFillStyle('#4DA6F7')
            ctx.setFontSize(48)
            ctx.fillText(days, width / 2 + days_leh * 24 / 2, 390)

            ctx.setTextAlign('center')
            ctx.setFillStyle('#444444')
            ctx.setFontSize(26)
            ctx.fillText("天", width / 2 + days_leh * 24 + 25, 390)

            //底部内容
            ctx.setFillStyle("#E8E8E8")
            ctx.fillRect(0, heightHead + heightBody, width, 1);
            ctx.stroke()

            ctx.setFillStyle("rgba(255,255,255,1)")
            ctx.fillRect(0, heightHead + heightBody + 15, width, heightFoot);
            ctx.stroke()

            ctx.setFillStyle("#E8E8E8")
            ctx.fillRect(374, heightHead + heightBody + 167, 1, 62);
            ctx.stroke()

            ctx.setTextAlign('center')
            ctx.setFillStyle('#333333')
            ctx.setFontSize(38)
            ctx.fillText(planTitle, width / 2, heightHead + heightBody + 100)

            //小程序码
            ctx.drawImage(res[3].path, 250, heightHead + heightBody + 160, 78, 78);

            ctx.drawImage(res[2].path, 424, heightHead + heightBody + 160, 76, 76);

            ctx.setTextAlign('center')
            ctx.setFillStyle('#333333')
            ctx.setFontSize(24)
            ctx.fillText("长按识别小程序，查看励志计划动态详情", width / 2, heightHead + heightBody + 310)

            ctx.draw(false, () => {
                let res = {width, height}
                resolve(res)
            });
        })
    })
}


module.exports = {
    shareCommentPic
}