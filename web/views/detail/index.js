/*
 * @Author: yangxiaosen
 * @Date: 2023-03-29 20:23:51
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-29 20:36:48
 * @FilePath: \code\web\views\detail\index.js
 */
import { load } from "/web/util/LoadView.js"
//加载topbar 和 sidmenu 参数为当前页面，用来渲染是否为高亮
load('topbar-news')
async function render() {
    let id = new URL(location.href).searchParams.get("id")
    console.log(id);
    let { title, author, content } = await fetch(`http://localhost:3000/news/${id}`)
        .then(res => res.json())
    document.querySelector(".title").innerHTML = title;
    document.querySelector(".author").innerHTML = author;
    document.querySelector(".newcontent").innerHTML = content;
}
render()