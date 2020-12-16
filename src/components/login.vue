<template>
    <transition  name="fade" enter-active-class="animated tada" leave-active-class="animated bounceOut">
      <el-dialog title="Sign In"
                 :close-on-click-modal=false
                 v-if='$store.state.isShowLogin'
                 :visible.sync="$store.state.isShowLogin"
                 :width="dialogWidth"
                 @close="closeDialog">
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
        <div slot="footer"
             class="dialog-footer">
             <span style="float:left;font-family: 'Microsoft YaHei'; font-size: 12px;">忘记密码?<a @click="getBack();">找回</a></span>
             <span style="font-family: 'Microsoft YaHei'; font-size: 12px;">{{isHaveAccount}}?<a @click="registered">{{isNeedRegister}}</a></span>
        </div>
      </el-dialog>
    </transition>
</template>

<script>
import axios from 'axios'
import { Message } from 'element-ui'
export default {

  name: 'login',

  data () {
    return {
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
    handleSelect () {
    },
    handleClose (done) {
      done();
    },
    GoToLogin () {
    },
    registered(){
      if(this.isNeedRegister == '注册'){

        this.isShowLoginName = false
        this.isShowPassword = false
        this.loginButtonText = '注 册'
        this.isShowEmail = true
        this.isHaveAccount = '已有账号'
        this.isVerificationCode = true
        this.isNeedRegister = '登录'
      }else{
        
        this.isShowLoginName = true
        this.isShowPassword = true
        this.loginButtonText = '登 录'
        this.isShowEmail = false
        this.isHaveAccount = '没有账号'
        this.isVerificationCode = false
        this.isNeedRegister = '注册'

      }
    }, 
    getBack(){
      
    },
    isShowPasswordFun(){
      this.isShowPassword = true
    },
    showLoginPage(){
      this.form = {}
      this.dialogFormVisible = true
      this.isVerificationCode = false
    },
    closeDialog(){
      this.$emit("sendLoginPageInfor", {'isLogin': false})
    },
    sendEmailCode(){
      axios.get('/login/sendEmailVerificationCode?emailAddress='+this.form.emailAddress)
        .then(response => {
          if(typeof response == 'undefined') return
          Message.success("验证码已发送到您的邮箱..")

        }).catch(response => {
          Message.error(response.msg)
          this.isShowPassword = false
          this.isShowEmail = false
          this.isVerificationCode = true
      });
    },
    login () {
      var loginButtonText = this.loginButtonText
      if(loginButtonText == '注 册'){
        axios.post('/login/add', {
          "emailAddress": this.form.emailAddress == null ? "" : this.form.emailAddress,
          "verificationCode": this.form.verificationCode == null ? "" : this.form.verificationCode
        }).then(response => {
          if(typeof response == 'undefined') return
          Message.success(response)

          this.loginButtonText = '绑 定'
          this.isShowLoginName = true
          this.isShowPassword = true

          this.isShowEmail = false
          this.isVerificationCode = false
          
        })
      }else if(loginButtonText == '登 录'){

        this.loading = true
        axios.post('/login/login', {
          "loginName": this.form.name == null ? "" : this.form.name,
          "password": this.form.password == null ? "" : this.form.password,
          "verificationCode" : this.form.verificationCode == null ? "" : this.form.verificationCode
        }).then(response => {
          if(typeof response == 'undefined') {
            this.loading = false
            return
          }

          Message.success('Welcome..')
          this.$store.state.isShowLogin = false
          this.$emit("sendLoginPageInfor", {'isLogin': true, 'name': response.name, 'id': response.id})
  
          this.dialogFormVisible = false
          this.username = this.form.name
          this.signIn = ''
          this.form.name = ''
          this.form.password = ''
          
          this.loading = false
        }).catch(response => {
          Message.error(response.msg)
          
          this.loading = false
        });
      }else if(loginButtonText == '绑 定'){
        
        axios.post('/login/setName', {
          "loginName": this.form.name == null ? "" : this.form.name,
          "password": this.form.password == null ? "" : this.form.password,
        }).then(response => {
          if(typeof response == 'undefined') return
          Message.success("绑定成功..")
          
          this.$store.state.isShowLogin = false
          this.$emit("sendLoginPageInfor", {'isLogin': true, 'name': this.form.name, "id": response.id})


          this.loginButtonText = '登 录'
          this.isShowLoginName = true
          this.isShowPassword = true

          this.isShowEmail = false
          this.isVerificationCode = false
          
        })
      }

    },
    init(){
      // this.$store.state.isShowLogin = true
    }
  },
  //用于数据初始化
  created:function(){
    setTimeout(this.init, 3000);
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header,
.el-footer {
  background-color: #000;
  color: #fff;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.rightFloat {
  float: right;
}
a {
  cursor:pointer;
}
</style>
