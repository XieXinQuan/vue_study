<template>

  <div>
      <el-link @click="showShop" type="primary" class="rightMargin">添加职员</el-link>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="入职日期"></el-table-column>
        <el-table-column prop="shopName" label="店铺名称"></el-table-column>
        <el-table-column prop="userName" label="职工姓名"></el-table-column>
        <el-table-column prop="position" label="职位"></el-table-column>
      </el-table>
    <transition name="fade" enter-active-class="animated bounce" leave-active-class="animated fadeOutUp">
      <el-dialog :title="title" :modal=false
                 :close-on-click-modal="false"
                 v-if='isShowShop' :show-close="false"
                 :visible.sync="isShowShop" width="17%" @close="closeShop">
        <el-form :model="form" ref="form">
            <transition name="fade" enter-active-class="animated bounceInLeft" leave-active-class="animated zoomOutRight">
              <el-form-item v-show="show.isShowShopName">
                <el-autocomplete v-model="shopname" :fetch-suggestions="querySearchAsyncShopName" prefix-icon="el-icon-message"  placeholder="店 铺"  @select="handleSelectShopName">
                </el-autocomplete>
              </el-form-item>
           </transition>
          <transition name="fade" enter-active-class="animated bounceInLeft" leave-active-class="animated zoomOutRight">
            <el-form-item v-show="show.isShowNickName">
                <el-autocomplete v-model="nickname" :fetch-suggestions="querySearchAsyncUserName" placeholder="职工姓名" prefix-icon="el-icon-message" @select="handleSelectUserName">
                </el-autocomplete>
            </el-form-item>
           </transition>
        </el-form>
        
        <div slot="footer" class="dialog-footer">
             <span>填写完毕?&nbsp;<el-link @click="commmitAddShopEmployee" type="primary">提交</el-link></span>
             <span style="float: left;">不想继续?&nbsp;<el-link @click="closeShop" type="primary">退出</el-link></span>
        </div>
      </el-dialog>
    </transition>
  </div>
</template>

<script>

import { Message } from 'element-ui';
import axios from 'axios'

export default {

  name: 'shopEmployee',
  data(){ 
    return {
      tableData: [],
      title: '添加职员',
      isShowShop: false,
      show: {isShowShopName : false, isShowNickName: false},
      form: {userId : '', shopId: ''},
      timeShow: 800,
      shopname: '',
      nickname: ''
    }
  }, 
  methods: {
    showShop(){
      this.isShowShop = true
      setTimeout(()=>{this.show.isShowShopName = true}, this.timeShow)
      setTimeout(()=>{this.show.isShowNickName = true}, this.timeShow*2)
    },
    closeShop(){
      this.show.isShowNickName = false
      setTimeout(()=>{this.show.isShowShopName = false}, this.timeShow);
      setTimeout(()=>{this.isShowShop = false}, this.timeShow*2);
    },
    showForm(){
    },
    querySearchAsyncUserName(queryString, cb) {
      if (queryString.length < 1) {
        var emp = []
        cb(emp)
        return
      }
      axios.get('/user/searchUserByName?name=' + queryString).then(response => {
        var data = []
        for (var i = 0; i < response.length; i++){
          var da = {'value' : response[i].name, 'id' : response[i].id};
          data.push(da)
        }
        cb(data)
      })
    },
    querySearchAsyncShopName(queryString, cb) {
      if (queryString.length < 1) {
        var emp = []
        cb(emp)
        return
      }
      axios.get('/shop/searchShopByName?name=' + queryString).then(response => {
        var data = []
        for (var i = 0; i < response.length; i++){
          var da = {'value' : response[i].name, 'id' : response[i].id};
          data.push(da)
        }
        cb(data)
      })
    },
    handleSelectUserName(item) {
      this.form.userId = item.id
    },
    handleSelectShopName(item) {
      this.form.shopId = item.id
    },
    commmitAddShopEmployee(){
      axios.post('/shop/addEmployee', {shopId : this.form.shopId, userId: this.form.userId}).then(response => {
        Message.success(response)
        this.closeShop()
      })
    }
  },
  created(){
    axios.get('/shop/employeeList').then(response => {
      this.tableData = response
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div /deep/ .el-dialog{
  background-color: black;
}
</style>
