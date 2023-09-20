/*
 * @Author: yangxiaosen
 * @Date: 2023-03-25 17:25:57
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-29 20:20:26
 * @FilePath: \code\web\views\news\index.js
 */
// 引入模块
import { load } from "/web/util/LoadView.js"
//加载topbar 和 sidmenu 参数为当前页面，用来渲染是否为高亮
load('topbar-news')
// 接收新闻数据，存放到数组中
let list = []

// 一、设置搜索框内容改变事件
let searchInput = document.querySelector('#searchInput')
searchInput.oninput = async function () {
    // console.log(searchInput.value);
    // 1.如果搜索框内容为空，设置搜索列表不显示
    if (!searchInput.value) {
        document.querySelector(".list-group").style.display = "none"
        return
    }
    // 2.如果搜索框内容不为空，显示搜索结果列表
    document.querySelector(".list-group").style.display = "block"
    // 2.1接收模糊搜索到含有搜索内容的新闻数据
    let res = await fetch("http://localhost:3000/news?title_like=" + searchInput.value)
        .then(res => res.json())
    // console.log(res);

    // 2.2将搜索到的模糊新闻数据动态添加到结果列表中
    document.querySelector(".list-group").innerHTML = res.map(item => `
                        <li class="list-group-item"2>
                        <a href="">${item.title}</a> 
                        </li>
    `).join('')
}
// 二、设置搜索框失去焦点时隐藏结果列表
searchInput.onblur = function () {
    setTimeout(() => { document.querySelector(".list-group").style.display = "none" }
        , 300
    )
}

// 三、渲染页面函数
async function render() {
    // 渲染卡片
    await renderList()
    // 渲染新闻tab
    renderTab()
}

// 渲染新闻卡片函数
async function renderList() {
    // 1.获取所有新闻数据
    list = await fetch("http://localhost:3000/news")
        .then(res => res.json())
    //2. 倒叙，将最新发布的新闻放最前面
    list.reverse()
    // console.log(list.slice(0, 4));
    let cardTab = document.querySelector(".cardTab")
    // 3.动态添加新闻数据到页面中进行渲染
    cardTab.innerHTML = list.slice(0, 4).map(item => `
    <div class="card" data-id="${item.id}">
        <div style="background-image: url(${item.cover});" class="imgcard">
        </div>
        <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">作者：${item.author}</p>
        </div>
    </div>`).join('')
    // 4.获取卡片数组，给卡片添加点击跳转到新闻详情界面
    for (let item of document.querySelectorAll(".card")) {
        // console.log(item.dataset.id);
        // 传id跳转，知道访问的是哪个新闻数据
        item.onclick = function () {
            location.href = `/web/views/detail/index.html?id=${item.dataset.id}`
        }
    }
}
render()
// 渲染新闻tab
function renderTab() {
    // 1.将新闻按类别进行分类
    let obj = _.groupBy(list, item => item.newsType)
    // console.log(obj);
    // 2.获取对应类别的dom节点
    let tab = [tab0, tab1, tab2, tab3]
    // 3.将分类好的新闻动态添加到相应dom节点中
    // foreach拿到每一个类型的dom节点，item为相应的类型节点
    tab.forEach((item, index) => {
        item.innerHTML = obj[index]?.map(item => `
        <div class="listItem" data-id="${item.id}">
            <img src="${item.cover}" data-id="${item.id}"/>
            <div data-id="${item.id}">${item.title}</div>
            <p class="card-text" data-id="${item.id}">作者：${item.author}</p>
        </div>
        `).join('') || ''
        item.onclick = function (evt) {
            location.href = "/web/views/detail/index.html?id=" + evt.target.dataset.id
        }
    });
}