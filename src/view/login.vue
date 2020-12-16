<template>

  <div class="hello" id="app" :style="ditu">
   
      <div style="width: 300px; height: 300px; position: absolute; top: 30%; right: 10%;">
        <el-form :model="form" :rules="rules" ref="form">
            <transition name="fade" enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight">
          <el-form-item prop="name" v-show="isShowLoginName">
            <el-input v-model="form.name" prefix-icon="el-icon-message"  placeholder="账 号" 
                      auto-complete="off">
            </el-input>
          </el-form-item>
           </transition>
          
          <transition name="fade" enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight">
            <el-form-item prop="password" v-show="isShowPassword">
                <el-input v-model="form.password"  placeholder="密 码"
                          type="password"  prefix-icon="el-icon-iconfont-icon-lock"
                          auto-complete="off" @keyup.enter.native="login"
                          :show-password="true">
                </el-input>
            </el-form-item>
           </transition>

          <transition name="fade" enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight">
            <el-form-item prop="emailAddress"  v-show="isShowEmail">
                <el-input v-model="form.emailAddress" prefix-icon="el-icon-message"  placeholder="邮 箱"
                          auto-complete="off">
                </el-input>
            </el-form-item>
          </transition>
          <transition name="fade" enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight">
            <el-form-item prop="verificationCode" v-show="isVerificationCode">
              <el-input v-model="form.verificationCode"  placeholder="邮箱验证码" prefix-icon="el-icon-warning" >
                <i slot="suffix" @click="sendEmailCode" style="cursor:pointer;" class="el-input__icon el-icon-iconfont-icon-send-line"></i>
              </el-input>
            </el-form-item>
          </transition>
          <el-form-item><el-button type="primary" @click="login" style="width:100%" :loading="loading">{{loginButtonText}}</el-button></el-form-item>
        </el-form>
        <div>
             <span style="font-family: 'Microsoft YaHei'; font-size: 12px;">忘记密码?<a @click="getBack();" style="cursor:pointer; color: #FF8C00;">找回</a></span>
             <!-- <span style="font-family: 'Microsoft YaHei'; font-size: 12px; float: right">{{isHaveAccount}}?<a @click="registered" style="cursor:pointer; color: #FF8C00;">{{isNeedRegister}}</a></span> -->
        </div>

      </div>
      <div style="width: 100%; height: 1.2em; position: absolute; bottom: 1.2em; text-align: center;">
        <el-link href="http://beian.miit.gov.cn" type="primary">桂ICP备2020009852号</el-link>
      </div>
  </div>
</template>

<script>

import axios from 'axios'
import { Message } from 'element-ui'

export default {

  name: 'index',
  
  data () {
    return {
      ditu: {backgroundImage: "url(" + require("../assets/ditu2.jpg") + ")", backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%", zIndex: "-1"},
      isCollapse: false,
      isShowCard:false,

      
      form: {
        name: '',
        password: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: { // 表单验证规则
        name: [
          { required: true, message: '请输入账号',  trigger: 'blur' }, // 'blur'是鼠标失去焦点的时候会触发验证
          { min: 3, max: 12, message: '账号长度为3-12.',  trigger: 'blur' },
        ],
        password:[
          { required: true, message: '请输入密码',  trigger: 'blur' }, // 'blur'是鼠标失去焦点的时候会触发验证
          { min: 6, max: 20, message: '密码的长度是6-20之间.',  trigger: 'blur' }
        ],
        emailAddress:[
          { required: true, message: '请输入邮箱',  trigger: 'blur' }, // 'blur'是鼠标失去焦点的时候会触发验证
          { min: 3, max: 20, message: '密码的长度是3-20之间.',  trigger: 'blur' }
        ]
      },
      
      loginButtonText: '登 录',
      isHaveAccount: '没有账号',
      isNeedRegister: '注册',
      isShowPassword:true,
      isShowLoginName:true,
      isShowEmail:false,
      loading: false,
      isVerificationCode: false,
      signIn: 'Sign In',
      username: '',

      drawer: false,
      direction: 'rtl',

      currentDate: new Date(),
      dialogWidth: "20%",
      msg: 'Welcome to Quan',
      activeIndex2: '1',

      dialogFormVisible: false,
    }
  },
  methods: {
     //不变
    showCard(){
      this.isShowCard = true;
    },
    cancelShowCard(){
      this.isShowCard = false;
    },


    open(){
      this.isCollapse = false;
    },
    closeMenu(ev){
      console.log(ev)
    },
    mouseOver(){
      this.$store.state.leftMenu = true
      this.$store.state.coverUpLayer = true
    },
    mouseLeave(){
      // this.$store.state.leftMenu = false
    },
    closeLeftMenu(){
      this.$store.state.leftMenu = false
      this.$store.state.coverUpLayer = false
    },

    getBack(){
      
    },
    registered(){

    },
    sendEmailCode(){
      
    },
    login(){
      var data = {'username' : this.form.name == null ? "" : this.form.name,
                 'password' : this.form.password == null ? "" : this.form.password};
      axios.post('/user/login', data).then(response => {
      Message.success('登录成功')
      localStorage.token = response
      setTimeout(() => {this.$router.push('/')}, 1000);
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

html,body,#app,.el-container,.full-height {
  height: 100%;
  margin: 0;
  padding: 0;
}
.layout-container {
  height: 100%;
}
.el-footer {
   text-align: center; 
  }
  
  .el-main {

    text-align: center;
  }
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    border-radius: 4px;
    height: 100%;
    
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>
