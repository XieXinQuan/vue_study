<template>

  <div>
      <el-link @click="showShop" type="primary" class="rightMargin">添加职员</el-link>
      <el-table
        :data="tableData"
        height="250"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="入职日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="shopName"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="shopManager"
          label="职位">
        </el-table-column>
      </el-table>
    <transition name="fade" enter-active-class="animated bounce" leave-active-class="animated fadeOutUp">
      <el-dialog :title="title" :modal=false
                 :close-on-click-modal="true"
                 v-if='isShowShop'
                 :visible.sync="isShowShop" width="30%" @close="closeShop">
        <el-form :model="form" ref="form">
            <transition name="fade" enter-active-class="animated fadeInDown" leave-active-class="animated zoomOutRight">
              <el-form-item v-show="show.isShowUserName">
                <el-input v-model="form.userName" prefix-icon="el-icon-message"  placeholder="账 号" auto-complete="off">
                </el-input>
              </el-form-item>
           </transition>
          <transition name="fade" enter-active-class="animated fadeInDown" leave-active-class="animated zoomOutRight">
            <el-form-item v-show="show.isShowNickName">
                <el-input v-model="form.nickName" placeholder="姓 名" prefix-icon="el-icon-message" auto-complete="off">
                </el-input>
            </el-form-item>
           </transition>
          <transition name="fade" enter-active-class="animated fadeInDown" leave-active-class="animated zoomOutRight">
            <el-form-item v-show="show.isShowEmployee">
                <el-input v-model="form.employee" placeholder="职 位" prefix-icon="el-icon-message" auto-complete="off">
                </el-input>
            </el-form-item>
           </transition>
        </el-form>
        
        <div slot="footer" class="dialog-footer">
             <span style="float: left;">填写完毕?&nbsp;<el-link @click="commmitAddShopEmployee" type="primary">提交</el-link></span>
             <span>不想继续?&nbsp;<el-link @click="closeShop" type="primary">退出</el-link></span>
        </div>
      </el-dialog>
    </transition>
  </div>
</template>

<script>

export default {

  name: 'shopEmployee',
  data(){ 
    return {
      tableData: [{
            date: '2016-05-03',
            shopName: '深圳幻听火锅店',
            shopManager: '谢新权'
          }],
      title: '添加职员',
      isShowShop: false,
      show: {isShowUserName : false, isShowNickName: false, isShowEmployee: false},
      form: {userName : '', nickName: '', employee: ''}
    }
  }, 
  methods: {
    showShop(){
      this.isShowShop = true
      setTimeout(()=>{
        this.show.isShowUserName = true
        setTimeout(()=>{
        this.show.isShowNickName = true
        setTimeout(()=>{
          this.show.isShowEmployee = true
        }, 800);
        }, 800);
        }, 800);
    },
    closeShop(){
      this.isShowShop = false
      this.show.isShowUserName = false
      this.show.isShowNickName = false
      this.show.isShowEmployee = false
    },
    showForm(){
    },
    commmitAddShopEmployee(){
      
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div /deep/ .el-dialog{
  background-color: black;
}
</style>
