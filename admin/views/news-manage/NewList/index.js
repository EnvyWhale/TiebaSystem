/*
 * @Author: yangxiaosen
 * @Date: 2023-03-25 17:25:57
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-28 22:52:23
 * @FilePath: \code\admin\views\news-manage\NewList\index.js
 */
// 引入模块
import { load, isLogin } from "/admin/util/LoadView.js"
load("sidmenu-newsList")//加载topbar 和 sidmenu 参数为当前页面，用来渲染是否为高亮
// 创建新闻接收器
let newsList = [];
let updateId = 0;
// 获取新闻列表数据并渲染到页面
let newsType = ["最新动态", "典型案例", "通知公告", "广告投放"];
// 初始化预览模态框
const newsLookModal = new bootstrap.Modal(document.getElementById('newsLookModal'));

// 初始化删除模态框
const newsDeleteModal = new bootstrap.Modal(document.getElementById('newsDeleteModal'));

async function render() {
    let author = JSON.parse(isLogin()).username
    newsList = await fetch(`http://localhost:3000/news/?author=${author}`)
        .then(res => res.json())
    console.log(newsList);
    let listbody = document.querySelector("#listbody")
    listbody.innerHTML = newsList.map(item =>
        `
        <tr>
            <th scope="row">${item.title}</th>
                <td>
                ${newsType[item.newsType]}
                </td>
                <td>
                <button type="button" data-id=${item.id} class="btn btn-success btn-sm btn-look"}>预览</button>
                <button type="button" data-id=${item.id} class="btn btn-primary btn-sm btn-write"}>编辑</button>
                <button type="button" data-id=${item.id} class="btn btn-danger btn-sm btn-delete">删除</button>
                </td>
        </tr>
        `).join('')
}
render()
listbody.onclick = function (evt) {
    if (evt.target.className.includes('btn-look')) {
        // 1.预览
        newsLookModal.toggle()
        let news_modal_body = document.querySelector(".news-modal-body")
        let obj = newsList.filter(item => item.id == evt.target.dataset.id)[0]
        console.log(obj);
        renderLookModal(obj)
        // news_modal_body.innerHTML =
    }
    else if (evt.target.className.includes('btn-write')) {
        // 2.编辑
        location.href = "/admin/views/news-manage/EditNews/index.html?id=" + evt.target.dataset.id//带上id跳转到更新新闻页面
    }
    else if (evt.target.className.includes('btn-delete')) {
        // 删除
        updateId = evt.target.dataset.id;
        // 显示删除模态框
        newsDeleteModal.toggle()

    }
}
function renderLookModal(obj) {
    newsLookModalTitle.innerHTML = obj.title;
    newsLookModalContent.innerHTML = obj.content;
}
// 删除提示框中确定按钮点击
document.querySelector("#delete_do").onclick = async function () {
    await fetch(`http://localhost:3000/news/${updateId}`, {
        method: "DELETE"
    }).then(res => res.json())
    // 隐藏模态框
    newsDeleteModal.toggle()
    // 重新渲染数据到新闻列表
    render()

}