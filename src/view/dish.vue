<template>

  <div style="height: 100%">
    
    <el-container style="opacity: 0.8;">
      <el-header class="full-height" height="2em">
        <el-link @click="showShop" type="primary" style="text-align:center;">添加菜品</el-link>
      </el-header>
        <el-main>
          
      <!-- <el-scrollbar> -->
            <el-table :data="tableData" border style="width: 100%;" height="100%">
            <el-table-column prop="imgUrl" label="菜品名称">
              <template slot-scope="scope">
                <img :src="scope.row.imgUrl" width="40" height="40"/>
              </template>
            </el-table-column>
            <el-table-column prop="dishName" label="菜品名称"></el-table-column>
            <el-table-column prop="shopName" label="店铺名称"></el-table-column>
            <el-table-column prop="category" label="所属分类"></el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column prop="uploadUserName" label="上传人员"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
            </el-table-column>
          </el-table>
        </el-main>
      <el-footer height="2em">
        <el-pagination style="margin-top: 0.8em; "
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="page"
          layout="total, prev, pager, next"
          :total="size">
        </el-pagination>
      </el-footer>
    </el-container>

      
      


    <transition name="fade" enter-active-class="animated bounce" leave-active-class="animated fadeOutUp">
      <el-dialog :title="title" :modal=false top="8vh"
                 :close-on-click-modal="false"
                 v-if='isShowDish' :show-close="false"
                 :visible.sync="isShowDish" width="30%" @close="closeShop">
        <el-form :model="form" ref="form">
            <transition name="fade" enter-active-class="animated bounceInLeft" leave-active-class="animated zoomOutRight">
              <el-form-item v-show="show.isShowShopName">
                <el-autocomplete v-model="shopname" :fetch-suggestions="querySearchAsyncShopName" prefix-icon="el-icon-message"  placeholder="店 铺"  @select="handleSelectShopName">
                </el-autocomplete>
              </el-form-item>
           </transition>
          <transition name="fade" enter-active-class="animated bounceInLeft" leave-active-class="animated zoomOutRight">
            <el-form-item v-show="show.isShowDishName">
                <el-input v-model="form.dishName" placeholder="菜 名" prefix-icon="el-icon-message" auto-complete="off">
                </el-input>
            </el-form-item>
           </transition>
          <transition name="fade" enter-active-class="animated bounceInLeft" leave-active-class="animated zoomOutRight">
            <el-form-item v-show="show.isShowCategory">
              <el-radio v-model="form.category" label="1">素菜</el-radio>
              <el-radio v-model="form.category" label="2">肉类</el-radio>
              <el-radio v-model="form.category" label="3">饮料</el-radio>
              <el-radio v-model="form.category" label="4">水果</el-radio>
            </el-form-item>
           </transition>
          <transition name="fade" enter-active-class="animated bounceInLeft" leave-active-class="animated zoomOutRight">
            <el-form-item v-show="show.isShowPrice">
                <el-input v-model="form.price" placeholder="价 格" prefix-icon="el-icon-message" auto-complete="off">
                </el-input>
            </el-form-item>
           </transition>
          <transition name="fade" enter-active-class="animated bounceInLeft" leave-active-class="animated zoomOutRight">
            <el-form-item v-show="show.isShowUnit">
              <el-input-number v-model="form.stock" :min="1" :max="10000" label="单位" style="margin-right: 1.2em"></el-input-number>
              <el-radio v-model="form.unit" label="克">克</el-radio>
              <el-radio v-model="form.unit" label="千克">千克</el-radio>
              <el-radio v-model="form.unit" label="瓶">瓶</el-radio>
            </el-form-item>
           </transition>
           <el-upload
            class="avatar-uploader"
            :action="imageCommitUrl"
            :show-file-list="false"
            :headers="requestHeaders"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </el-form>
        
        <div slot="footer" class="dialog-footer">
             <span>填写完毕?&nbsp;<el-link @click="commmitAddDish" type="primary">提交</el-link></span>
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
      isShowDish: false,
      show: {isShowShopName: false, isShowDishName: false, isShowCategory: false, isShowPrice: false, isShowUnit:  false, isShowStock: false},
      form: {shopId: '', dishName:'', category: '', price: '', stock: '', unit: ''},
      timeShow: 800,
      shopname: '',
      nickname: '',

      imageCommitUrl: '',
      imageUrl: '',
      requestHeaders: '',
      currentPage: 1,
      page: 10,
      size: 10
    }
  }, 
  methods: {
    showShop(){
      this.isShowDish = true
      setTimeout(()=>{this.show.isShowShopName = true}, this.timeShow)
      setTimeout(()=>{this.show.isShowDishName = true}, this.timeShow*2)
      setTimeout(()=>{this.show.isShowCategory = true}, this.timeShow*3)
      setTimeout(()=>{this.show.isShowPrice = true}, this.timeShow*4)
      setTimeout(()=>{this.show.isShowUnit = true}, this.timeShow*5)
    },
    closeShop(){
      this.shopname = ''
      this.imageUrl = ''
      this.form = {shopId: '', dishName:'', category: '', price: '', stock: '', unit: ''}
      this.show.isShowUnit = false
      setTimeout(()=>{this.show.isShowPrice = false}, this.timeShow*1);
      setTimeout(()=>{this.show.isShowCategory = false}, this.timeShow*2);
      setTimeout(()=>{this.show.isShowDishName = false}, this.timeShow*3);
      setTimeout(()=>{this.show.isShowShopName = false}, this.timeShow*4);
      setTimeout(()=>{this.isShowDish = false}, this.timeShow*5);
      setTimeout(()=>{this.refreshTable()}, this.timeShow*5);
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
    handleSelectShopName(item) {
      this.form.shopId = item.id
    },
    commmitAddDish(){
      axios.post('/dish/add', {shopId : this.form.shopId, dishName: this.form.dishName, category: this.form.category,
                                   price: this.form.price, stock: this.form.stock, unit: this.form.unit, imageUrl: this.imageUrl}).then(response => {
        Message.success(response)
        this.closeShop()
      })
    },
    
    handleAvatarSuccess(res) {
      this.imageUrl = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    refreshTable(){
      axios.post('/dish/list', {dishName: '', page: this.currentPage, size: this.page}).then(response => {
        if (response.size >= 1){
          this.tableData = response.data
          this.size = response.size
        }else{
          this.tableData = []
          this.size = 0
        }
      })
    },
    handleCurrentChange(val){
      this.currentPage = val
      this.refreshTable()
    },
    handleEdit(id){
      Message.success(""+id)
    },
    handleDelete(id){
      Message.success(""+id)
    }
  },
  created(){
    this.imageUrl = ''
    this.imageCommitUrl = axios.defaults.baseURL + '/file/upload'
    this.requestHeaders = {token : localStorage.token}
    this.refreshTable()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-container{
  height: 100%;
  margin: 0;
  padding: 0;
}
div /deep/ .el-dialog{
  background-color: black;
}
.avatar {
  width: 80px;
  height: 80px;
  display: block;
}
.el-footer {
  text-align: center; 
}
.el-header {
  text-align: center; 
}

</style>