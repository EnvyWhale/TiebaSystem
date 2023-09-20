/*
 * @Author: yangxiaosen
 * @Date: 2023-03-25 17:25:57
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-28 22:46:06
 * @FilePath: \code\admin\views\home\index.js
 */
// 引入模块
import { load, isLogin } from "/util/LoadView.js"
load("sidmenu-home")//加载topbar 和 sidmenu 参数为当前页面，用来渲染是否为高亮
let user = JSON.parse(isLogin());
console.log(user);
let newsType = ["最新动态", "典型案例", "通知公告", "广告投放"];
document.querySelector('#userprofile').innerHTML = `
<img src="${user.photo}" style="width: 100px; height: 100px; border-radius: 50%"/>
<div>
    <div>${user.username}</div>
    
    <div><pre>${user.introduction || "这个人很懒，没有简介"}</pre></div>
</div>
`
//用pre标签会保留用户输入的换行

// 图表



function renderEchars(arr) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 指定图表的配置项和数据
    let option = {
        title: {
            text: '当前用户发布新闻数',
            left: 'center'
        },
        legend: {
            top: 'bottom'
        },
        toolbox: {
            trigger: 'item'
        },
        series: [
            {
                name: 'Nightingale Chart',
                type: 'pie',
                radius: [50, 250],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                data: arr
            }
        ],
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

}

async function anyalist() {
    let res = await fetch(` http://localhost:3000/news?author=` + user.username).then(res => res.json())
    console.log(res);
    let obj = _.groupBy(res, item => item.newsType);
    let arr = [];
    for (const i in obj) {
        arr.push({
            name: newsType[i],
            value: obj[i].length
        })
    }
    console.log(arr);

    renderEchars(arr);
}
anyalist()
