<template>
  <div class="pages">
    <template v-if="dynamicSearchs.length > 0">
      <el-form :model="dynamicForm" :inline="true">
        <el-form-item v-for="(dynamicSearch, index) in dynamicSearchs" :key="index" class="search-item">
          <template v-if="dynamicSearch.search === 'select'">
            <el-select :placeholder="dynamicSearch.title" v-model="dynamicSearch.titile">
              <el-option v-for="(option, index) in dynamicSearch.options" :key="index" :label="option" :value="option"></el-option>
            </el-select>
          </template>
          <template v-else-if="dynamicSearch.search === 'text'">
            <el-input class="search-input" :placeholder="dynamicSearch.title"></el-input>
          </template>
        </el-form-item>
        <el-button type="info" icon="el-icon-share" class="search-button">导出</el-button>
        <el-button type="primary" icon="el-icon-search" class="search-button" @click="onSubmit">搜索</el-button>
      </el-form>
    </template>
    <el-table ref="multipleTable" :data="tableData" v-loading="loading" stripe border style="width: 100%" tooltip-effect="dark" @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column v-for="(info, index) in tableInfo" :key="index" :prop="info.field" :label="info.title"></el-table-column>
    </el-table>
    <div class="opreation">
      <el-button-group>
        <el-button type="primary" @click="dialogVisible = true">编辑</el-button>
        <el-button type="danger">删除</el-button>
        <span v-if="selected.length" class="selected">选中{{ selected.length }}条</span>
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
import menus from '@/config/menu-config'
import { getList } from '@/api/list'
import { login } from '@/api/login'

export default {
  data() {
    return {
      dynamicForm: {},
      dynamicSearchs: [],
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
      this.dynamicSearchs = []
      this.tableFieldInit()
      this.setList()
    },
    tableFieldInit () {
      menus.some(item => {
        if (item.componentName === this.$route.name && (!item.param || item.param === this.$route.query.info)) {
          if (item.tableTitle) {
            this.tableFieldConInit(item)
            return true
          }
        }
        if (item.sub)
          item.sub.some(sub => {
            if (sub.componentName === this.$route.name && (!sub.param || sub.param === this.$route.query.info)) {
              if (sub.tableTitle) {
                this.tableFieldConInit(sub)
                return true
              }
            }
          })
      })
    },
    tableFieldConInit (item) {
      this.tableInfo = item.tableTitle
      this.url = item.url
      item.tableTitle.forEach(title => {
        if (title.hasOwnProperty('search')) {
          console.log(title.field)
          this.dynamicSearchs.push({
            search: title.search,
            field: title.field,
            title: title.title,
            options: []
          })
        }
      })
    },
    tableSearchsInit () {
      if (!this.dynamicSearchs) return
      this.dynamicSearchs.forEach(dynamicSearch => {
        if (dynamicSearch.search === 'select') {
          let fields = []
          console.log(dynamicSearch.field)
          this.tableData.forEach(data => {   // 这里后期应该是所有数据
            console.log(data)
            for (let key in data) {
              console.log(key)
              if (key === dynamicSearch.field) {
                if (fields.indexOf(data[key]) === -1) fields.push(data[key])
              }
            }
          })
          dynamicSearch.options = fields
        }
      })
      console.log(this.dynamicSearchs)
    },
    setList () {
      getList(this.url)
          .then(res => {
            this.tableData = res.data.splice(this.start, this.length)
            console.log(this.tableData)
            this.tableSearchsInit()
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
    },
    onSubmit (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="stylus">
.search-button
  float right
  margin-left 10px
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
