/*
 * @Author: yangxiaosen
 * @Date: 2023-03-25 17:25:57
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-29 15:26:10
 * @FilePath: \code\admin\views\news-manage\GreatNews\index.js
 */
// 引入模块
import { load, isLogin } from "/admin/util/LoadView.js"
load("sidmenu-addNews")//加载topbar 和 sidmenu 参数为当前页面，用来渲染是否为高亮

const { createEditor, createToolbar } = window.wangEditor

// 收集文本编辑器中的内容
let content = "";
// 收集base64，图片
let cover = ''
const editorConfig = {
    placeholder: 'Type here...',
    onChange(editor) {
        const html = editor.getHtml()
        // 文本编辑器内容
        // console.log('editor content', html)
        content = html
        // 也可以同步到 <textarea>
    }
}

const editor = createEditor({
    selector: '#editor-container',
    html: '<p><br></p>',
    config: editorConfig,
    mode: 'default', // or 'simple'
})

const toolbarConfig = {}

const toolbar = createToolbar({
    editor,
    selector: '#toolbar-container',
    config: toolbarConfig,
    mode: 'default', // or 'simple'
})
// 封面图片文件解析base64格式文件
closeImageFile.onchange = function (evt) {
    // console.log(evt.target.files[0]);
    // ?==>base64
    let reader = new FileReader()
    // 将链接地址转化为base64编码
    reader.readAsDataURL(evt.target.files[0]);
    // 解析完成后赋值给收集器
    reader.onload = function (e) {
        // 解析结果
        // console.log(e.target.result);
        cover = e.target.result;
    }
}
addNewsForm.onsubmit = async function (evt) {
    evt.preventDefault()
    await fetch("http://localhost:3000/news", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            title: document.querySelector("#title").value,
            content,
            newsType: document.querySelector("#news_type").value,
            cover,
            author: JSON.parse(isLogin()).username
            // 作者

        })
    }).then(res => res.json())
    // .then(res => console.log(res))
    location.href = "/admin/views/news-manage/NewList/index.html"
}