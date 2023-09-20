/*
 * @Author: yangxiaosen
 * @Date: 2023-03-25 17:25:57
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-28 23:46:23
 * @FilePath: \code\web\views\products\index.js
 */
// 引入模块
import { load } from "/web/util/LoadView.js"
//加载topbar 和 sidmenu 参数为当前页面，用来渲染是否为高亮
load('topbar-products')

// 获取后台数据，渲染首页样式
async function render() {
    let list = await fetch(`http://localhost:3000/products`)
        .then(res => res.json())
    console.log(list);
    // 1.动态创建指示器
    let btnText = list.map((item, index) => `
     <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${index}" class="${index == 0 ? 'active' : ''}"
                        aria-current="true" aria-label="Slide ${item.id}"></button>
    `).join('')
    document.querySelector('.carousel-indicators').innerHTML = btnText
    // 2.动态创建图片
    let imgText = list.map((item, index) => `
    <div class="carousel-item ${index == 0 ? 'active' : ''}">
        <div style="background-image: url(${item.cover}); width: 100%; height: calc(100vh - 50px);">
        </div>
        <div class="carousel-caption d-none d-md-block">
                <h5>${item.title}</h5>
                    <p>${item.introduction}</p>
        </div>
    </div>`).join('')
    document.querySelector('.carousel-inner').innerHTML = imgText

}
render()

// 图片轮播
let btn_next = document.querySelector('.carousel-control-next-icon')
console.log(btn_next);
btn_next.onclick = function () {
    // let nowimg=document.querySelector('')
}