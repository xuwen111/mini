// pages/login/login.js
Page({
  data: {

  },
  onLoad: function (options) {

  },
  handleSubmit(e){
    //获取当前提交的“用户名”和“密码”
    let account = e.detail.value.account
    let password = e.detail.value.password
    console.log(e);
    //判断当前是“登录”还是“提交”
    let btnWhich = e.detail.target.id
    if(btnWhich === 'login'){
      console.log("登录");
    }else {
      console.log("注册");
    }
  }
})