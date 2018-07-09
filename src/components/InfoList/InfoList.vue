<template>
  <div class="pages">
    <el-table ref="multipleTable" :data="tableData" v-loading="loading" stripe border style="width: 100%" tooltip-effect="dark" @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column v-for="(info, index) in tableInfo" :key="index" :prop="info.field" :label="info.title"></el-table-column>
    </el-table>
    <div class="opreation">
      <el-button-group>
        <el-button type="primary" @click="dialogVisible = true">编辑</el-button>
        <el-button type="danger">删除</el-button>
        <span v-if="selected.length" class="selected">选中{{selected.length}}条</span>
      </el-button-group>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length*this.length"></el-pagination>
    </div>
    <!-- <el-dialog title="提示" width="30%" :visiable.sync="dialogVisible">
      <span>选中了 {{ selected.length }} 条</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script type="text/ecmascript-6">
import menus from '@/config/menu-config.js'
import axios from '@/axios/api.js'

export default {
  data() {
    return {
      tableInfo: [],
      tableData: [],
      url: '',
      dialogVisible: false,
      loading: true,
      selected: [],
      currentPage: 1,
      start: 0,
      length: 10
    }
  },
  created() {
    this.tableInit()
  },
  watch: {
    // 可复用组件中监听路由参数变化
    '$route': 'tableInit'
  },
  components: {

  },
  methods: {
    tableInit () {
      this.tableFieldInit()
      this.setList()
    },
    tableFieldInit () {
      menus.forEach(item => {
        if (item.componentName === this.$route.name && (item.param && item.param === this.$route.query.info || !item.param)) {
          if (item.tableTitle) {
            this.tableInfo = item.tableTitle
            this.url = item.url
          }
        }
        if (item.sub)
          item.sub.forEach(sub => {
            if (sub.componentName === this.$route.name && (sub.param && sub.param === this.$route.query.info || !sub.param)) {
              if (sub.tableTitle) {
                this.tableInfo = sub.tableTitle
                this.url = sub.url
              }
            }
          })
      })
    },
    setList () {
      axios.getList(this.url)
          .then(res => {
            console.log(res)
            this.tableData = res.data.splice(this.start, this.length)
            this.loading = false
          })
    },
    edit () {
      this.dialogVisible = true
      console.log(this.dialogVisible)
      // this.$refs.multipleTable.toggleRowSelection()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.selected = val
      console.log(val)
    },
    handleCurrentChange (e) {
      this.start += 10
      this.setStuList()
    },
    handleSizeChange (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="stylus">
.opreation
  margin-top: 15px
  position: relative
  .el-row
    display: inline-block
  .el-pagination
    display: inline-block
    float: right
  .selected
    position: absolute
    top: 12px
    left: 150px
</style>
