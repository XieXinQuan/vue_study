<template>

  <div class="hello" id="app" :style="ditu">
    <el-container style="opacity: 0.8;">
      <el-header class="full-height" height="2em">
        <el-row class="full-height">
          <el-col :span="8" class="full-height">
          </el-col>
          <el-col :span="8" class="full-height" style="text-align: center">
            <el-link @click="showRouter('shop')" type="primary" class="rightMargin">店铺管理</el-link>
            <el-link @click="showRouter('shopEmployee')" type="primary" class="rightMargin">店铺职员</el-link>
            <el-link @click="showRouter('dish')" type="primary" class="rightMargin">店铺菜品</el-link>
          </el-col>
          <el-col :span="8" class="full-height" style="text-align: right; font-size: 1.2em; cursor:pointer">
            <span @mouseover="$store.state.rightMenu = true; $store.state.coverUpLayer = true" 
              style="color: #409EFF;font-size: 1em;font-family: 'Avenir', Helvetica, Arial, sans-serif;">
               我的
              </span>
          </el-col>
        </el-row>
      </el-header>
      <!-- <el-scrollbar> -->
        <el-main>
          <transition name="fade" enter-active-class="animated fadeInDown">
            <router-view/>
          </transition>
        </el-main>
      <!-- </el-scrollbar> -->
      <el-footer height="2em"><el-link href="http://beian.miit.gov.cn" type="primary">桂ICP备2020009852号</el-link></el-footer>
    </el-container>

    <div v-if='$store.state.coverUpLayer'
                 :visible.sync="$store.state.coverUpLayer" @click="closeLeftRightMenu"
                  style="position: absolute; top:0px; left:0px; width:100%; height:100%; zIndex: 888;">
    </div>

    <transition  name="fade" enter-active-class="animated fadeInLeft" leave-active-class="animated slideOutLeft">
    <div v-if='$store.state.leftMenu'
                 :visible.sync="$store.state.leftMenu" style="position: absolute; top:0px; left:0px; width:15%; height:100%; background-color: #DCDFE6; zIndex:999">
      
    </div>
    </transition>
    <transition  name="fade" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
    <div v-if='$store.state.rightMenu'
                 :visible.sync="$store.state.rightMenu" style="position: absolute; top:0px; right:0px; width:15%; height:50%; background-color: #DCDFE6; zIndex:999">
      <div>个人中心</div>
      <table style="width: 100%; margin-top: 1em" @mousemove="extensionAside('right')">
        <tr><td>登录账号:</td><td>{{userInfo.loginName}}</td></tr>
        <tr><td>昵称:</td><td>{{userInfo.nickName}}</td></tr>
        <tr><td>性别:</td><td>{{userInfo.sex}}</td></tr>
        <tr><td>所在店铺:</td><td>{{userInfo.shopName}}</td></tr>
        <tr><td>职位名称:</td><td>{{userInfo.employeeName}}</td></tr>
        <tr><td>工号:</td><td>{{userInfo.workNumber}}</td></tr>
        <tr><td>入职时间:</td><td>{{userInfo.firstWorkTime}}</td></tr>
        <tr><td>在职时长:</td><td>{{userInfo.inWorkTime}}</td></tr>
      </table>
    </div>
    </transition>

  </div>
</template>

<script>
import { Message } from 'element-ui';
import axios from 'axios'
import { Notification } from 'element-ui';

// import login from '../components/login'

export default {

  name: 'index',
  

  // components: {
  //   login
  // },
  data () {
    return {
      ditu: {backgroundImage: "url(" + require("../assets/ditu5.jpg") + ")", backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%", zIndex: "-1"},
      isCollapse: false,
      isShowCard: false,
      leftDrawer: false,
      userInfo: {loginName: '', nickName: '', shopName: '', employeeName: '', workNumber: '', firstWorkTime: '', inWorkTime: '', sex: ''}
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


    closeMenu(ev){
      console.log(ev)
    },
    // mouseOver(){
    //   this.$store.state.leftMenu = true
    //   this.$store.state.coverUpLayer = true
    // },
    mouseLeave(){
      // this.$store.state.leftMenu = false
    },
    closeLeftRightMenu(){
      this.$store.state.leftMenu = false
      this.$store.state.rightMenu = false
      this.$store.state.coverUpLayer = false
    },
    
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    showRouter(path){
      this.$router.push("/" + path);
    }
  },
  
  created(){
    if (typeof localStorage.token == 'undefined'){
      Message.error('未登录, 即将跳转登录页面');
      setTimeout(() => {this.$router.push('/login')}, 1000)
    }else{
      
      axios.get('/user/info').then(response => {
        Notification.success({'title': '成功', 'message' : '欢迎您 : ' + response.nickName, position: 'bottom-right'})
        // Message.success('欢迎您 : ' + response.nickName)
        this.userInfo = response
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

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
  .rightMargin{
    margin-right: 1em;
  }

</style>
