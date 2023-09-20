/*
 * @Author: yangxiaosen
 * @Date: 2023-03-25 17:17:03
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-29 20:25:27
 * @FilePath: \code\web\util\LoadView.js
 */
// 渲染topbar
async function renderTopbar(user) {


}

// 传id，分支判断当前页面是哪个页面 
async function load(id) {
    // 动态加载topbar模块
    let top_barText = await fetch("/web/components/top_bar/index.html")
        .then(res => res.text())
    document.querySelector('.top_bar').innerHTML = top_barText
    if (id) {
        document.querySelector('#' + id).style.color = '#0a58ca'
    }
}
export { load }