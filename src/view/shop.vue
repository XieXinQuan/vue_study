<template>
  <div>
      <el-link @click="showShop" type="primary" class="rightMargin">添加新店</el-link>
      <el-table :data="tableData" height="250" border style="width: 100%">
        <el-table-column prop="date" label="成立日期"></el-table-column>
        <el-table-column prop="createUserName" label="创始人"></el-table-column>
        <el-table-column prop="shopName" label="店铺名称"></el-table-column>
        <el-table-column prop="shopManager" label="店铺经理"></el-table-column>
        <el-table-column prop="status" label="店铺状态"></el-table-column>
      </el-table>
    <transition name="fade" enter-active-class="animated bounce" leave-active-class="animated fadeOutUp">
      <el-dialog :title="title" :modal=false
                 :close-on-click-modal="false"
                 v-if='isShowShop' :show-close="false"
                 :visible.sync="isShowShop" width="30%" @close="closeShop">
        <el-form :model="form" ref="form">
            <transition name="fade" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
              <el-form-item v-show="show.isShowShopName">
                <el-input v-model="form.shopName" prefix-icon="el-icon-message"  placeholder="名 称" auto-complete="off">
                </el-input>
              </el-form-item>
           </transition>
          <transition name="fade" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
            <el-form-item v-show="show.isShowShopManager">
                <el-autocomplete
                  v-model="state"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="经 理"
                  @select="handleSelect"
                ></el-autocomplete>
            </el-form-item>
           </transition>
          <transition name="fade" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
            <el-form-item v-show="show.isShowShopLocation">
                <el-input v-model="form.location" placeholder="地 址" prefix-icon="el-icon-message" auto-complete="off">
                </el-input>
            </el-form-item>
           </transition>
        </el-form>
        
        <div slot="footer" class="dialog-footer">
             <span style="float: left;">不想继续?&nbsp;<el-link @click="closeShop" type="primary">退出</el-link></span>
             <span>填写完毕?&nbsp;<el-link @click="commmitAddShop" type="primary">提交</el-link></span>
        </div>
      </el-dialog>
    </transition>
  </div>
</template>
<script>

import { Message } from 'element-ui';
import axios from 'axios'

export default {

  name: 'shop',
  data(){ 
    return {
      tableData: [],
      title: '添加店铺',
      isShowShop: false,
      show: {isShowShopName : false, isShowShopManager: false, isShowShopLocation: false},
      form: {shopName : '', shopManager: '', shopManagerId: '', location: ''},
      state: '',
      timeShow: 800
    }
  }, 
  methods: {
    showShop(){
      this.isShowShop = true
      setTimeout(()=>{this.show.isShowShopName = true}, this.timeShow)
      setTimeout(()=>{this.show.isShowShopManager = true}, this.timeShow*2)
      setTimeout(()=>{this.show.isShowShopLocation = true}, this.timeShow*3)
    },
    closeShop(){
      this.show.isShowShopLocation = false
      setTimeout(()=>{this.show.isShowShopManager = false}, this.timeShow);
      setTimeout(()=>{this.show.isShowShopName = false}, this.timeShow*2);
      setTimeout(()=>{this.isShowShop = false}, this.timeShow*3);
    },
    showForm(){
    },
    commmitAddShop(){
      axios.post('/shop/add', {shopName: this.form.shopName, shopManager: this.form.shopManagerId, location: this.form.location}).then(response => {
        Message.success(response)
        this.closeShop()
      })
    },

    querySearchAsync(queryString, cb) {
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
    handleSelect(item) {
      this.form.shopManagerId = item.id
    }
  },
  created(){
    axios.get('/shop/list', {}).then(response => {
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
