/*
 * @Author: yangxiaosen
 * @Date: 2023-03-25 17:17:03
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-28 22:46:30
 * @FilePath: \code\admin\util\LoadView.js
 */
function isLogin() {
    // 获取session数据，判断是否允许跳转到首页
    console.log(localStorage.getItem("token"));
    return localStorage.getItem("token");
}
// 渲染topbar
async function renderTopbar(user) {
    // 动态加载topbar模块
    let top_barText = await fetch("/components/top_bar/index.html")
        .then(res => res.text())
    document.querySelector('.top_bar').innerHTML = top_barText
    // 将后台请求回来的用户数据渲染到topbar中
    // console.log(user);
    let photo = document.querySelector("#top_bar-photo");
    let username = document.querySelector("#currentUsername");
    let exit = document.querySelector("#exit")
    photo.src = user.photo
    username.innerHTML = user.username
    // topbar中退出功能
    exit.onclick = function () {
        localStorage.removeItem("token")
        location.href = "/admin/views/login/index.html"
    }
}

async function renderSidmenu(user, id) {
    // 动态加载sidmenu模块
    let sidmenuText = await fetch("/components/sidmenu/index.html")
        .then(res => res.text())
    document.querySelector('.sidmenu').innerHTML = sidmenuText
    document.querySelector("#" + id).style.color = "#0a58ca";
    if (user.role != "admin") {
        document.querySelector(".user-manage-list").remove()
    }
}
// 传id，分支判断当前页面是哪个页面
function load(id) {
    // 获取浏览器session返回的用户
    let user = isLogin()
    // 如果用户存在，则加载当前界面
    if (user) {
        renderTopbar(JSON.parse(user))
        renderSidmenu(JSON.parse(user), id)
    } else {
        location.href = "/views/login/index.html"
    }
}
export { load, isLogin }