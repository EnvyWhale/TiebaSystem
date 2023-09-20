/*
 * @Author: yangxiaosen
 * @Date: 2023-03-25 17:25:57
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-28 22:49:55
 * @FilePath: \code\admin\views\user-manage\AddUsers\index.js
 */
// 引入模块
import { load } from "/admin/util/LoadView.js"
load("sidmenu-addUser")//加载topbar 和 sidmenu 参数为当前页面，用来渲染是否为高亮
addUserform.onsubmit = async function (evt) {
    // 阻止默认行为，自己设置跳转
    evt.preventDefault();
    console.log(username.value);
    console.log(password.value);
    console.log(introduction.value);
    await fetch("http://localhost:3000/users", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
            introduction: introduction.value,
            photo
        })
    }).then(res => res.json())
    location.href = "/admin/views/user-manage/UserList/index.html"
}
let photo = "";
photofile.onchange = function (evt) {
    // console.log(evt.target.files[0]);
    // ?==>base64
    let reader = new FileReader()
    // 将链接地址转化为base64编码
    photo = reader.readAsDataURL(evt.target.files[0]);
    reader.onload = function (e) {
        // 解析结果
        // console.log(e.target.result);
        photo = e.target.result;
    }
}