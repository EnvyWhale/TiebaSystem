/*
 * @Author: yangxiaosen
 * @Date: 2023-03-25 17:25:57
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-28 22:51:27
 * @FilePath: \code\admin\views\user-manage\UserList\index.js
 */
// 引入模块
import { load } from "/admin/util/LoadView.js"

//加载topbar 和 sidmenu 参数为当前页面，用来渲染是否为高亮
load("sidmenu-userList")

// 定义弹出编辑框并绑定页面模态框
const writeModal = new bootstrap.Modal(document.getElementById('writeModal'));
const deleteModal = new bootstrap.Modal(document.getElementById('userDeleteModal'));


// 定义后台返回的用户列表数据
let list = [];
// 定义点击编辑按钮时要修改或者删除的用户的id
let updateId = 0;

// 定义点击编辑按钮时要修改用户的头像
let photodate = '';
// 渲染用户列表数据
async function render() {
    list = await fetch("http://localhost:3000/users")
        .then(res => res.json())
    // console.log(list);
    // 将list用map方法映射添加到listbody中，展示出来
    document.querySelector("#listbody").innerHTML = list.map(item =>
        `
        <tr>
            <th scope="row">${item.username}</th>
                <td>
                <img src="${item.photo}" style="width:50px; height:50px;border-radius:50%;"/>
                </td>
                <td>
                <button type="button" data-id=${item.id} class="btn btn-primary btn-sm btn-write" ${item.default ? "disabled" : ''}>编辑</button>
                <button type="button" data-id=${item.id} class="btn btn-danger btn-sm btn-delete">删除</button>
                </td>
        </tr>
        `
    ).join('')
}
render()

// 给用户列表中的按钮添加事件
listbody.onclick = function (evt) {
    // 一.编辑按钮事件
    if (evt.target.className.includes("btn-write")) {
        // 1.获取自定义属性中的id值，用来确定编辑的用户是哪条数据
        // console.log("编辑", evt.target.dataset);

        // 2.将获取的id值记录下来
        updateId = evt.target.dataset.id;
        // 3.显示modal编辑框
        writeModal.toggle()
        // 4.将当前用户信息预填到modal编辑框中,预填modal
        let { username, password, introduction, photo } = list.filter(item => item.id == updateId)[0]
        document.querySelector("#username").value = username
        document.querySelector("#password").value = password
        document.querySelector("#introduction").value = introduction
        photodate = photo;
        // 更新按钮点击事件
    }
    // 二.删除按钮事件
    else if (evt.target.className.includes("btn-delete")) {
        // 1.显示删除提示框
        deleteModal.toggle()
        // 2.将获取的id值记录下来
        updateId = evt.target.dataset.id;
        // 删除功能在外面
        console.log("删除");
    }
}

// 编辑模态框中更新按钮点击事件
document.querySelector("#write_do").onclick = async function () {
    await fetch(`http://localhost:3000/users/${updateId}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            username: document.querySelector("#username").value,
            password: document.querySelector("#password").value,
            introduction: document.querySelector("#introduction").value,
            photo: photodate
        })
    }).then(res => res.json())
    // 隐藏模态框
    writeModal.toggle()
    // 重新渲染数据到用户列表
    render()

}
// 编辑模态框中上传头像input框内容改变，将文件转码为base64形式
photofile.onchange = function (evt) {
    // console.log(evt.target.files[0]);
    // ?==>base64
    let reader = new FileReader()
    // 将链接地址转化为base64编码
    photodate = reader.readAsDataURL(evt.target.files[0]);
    reader.onload = function (e) {
        // 解析结果
        // console.log(e.target.result);
        photodate = e.target.result;
    }
}
// 删除提示框中确定按钮点击
document.querySelector("#delete_do").onclick = async function () {
    await fetch(`http://localhost:3000/users/${updateId}`, {
        method: "DELETE"
    }).then(res => res.json())
    // 隐藏模态框
    deleteModal.toggle()
    // 重新渲染数据到用户列表
    render()

}