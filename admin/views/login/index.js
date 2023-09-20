import api from '../../util/api.js'
console.log(api);
const loginform = document.querySelector("#loginform")
loginform.onsubmit = async function (evt) {
    login_warning.style.display = "none"
    evt.preventDefault();
    let res = await fetch(`${api}/authorize/login`,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:{
            "username": username.value,
            "password": password.value
        }
    })
        .then(res => res.json())
    console.log(res);
    if (res.length > 0) {
        // alert("登陆成功，跳转");
        // 登陆成功，在localstorage中存储登陆信息，用于防止用户直接跳转到页面
        localStorage.setItem("token", JSON.stringify({
            ...res[0],
            // 防止密码存储到localstorage中
            password: "****"
        }))
        alert("即将跳转")
        location.href = "/views/home/index.html"
    }
    else {
        // alert("登陆失败")
        login_warning.style.display = "block"
    }
}