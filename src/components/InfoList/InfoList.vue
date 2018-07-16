<template>
  <div class="pages">
    <template v-if="dynamicSearchs.length > 0">
      <el-form :model="dynamicForm" :inline="true">
        <el-form-item v-for="(dynamicSearch, index) in dynamicSearchs" :key="index" class="search-item">
          <template v-if="dynamicSearch.search === 'select'">
            <el-select :placeholder="dynamicSearch.title" v-model="dynamicSearch.titile" style="width: 150px">
              <el-option v-for="(option, index) in dynamicSearch.options" :key="index" :label="option" :value="option"></el-option>
            </el-select>
          </template>
          <template v-else-if="dynamicSearch.search === 'text'">
            <el-input class="search-input" :placeholder="dynamicSearch.title" style="width: 150px"></el-input>
          </template>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" class="search-button" @click="onSubmit" round>搜索</el-button>
        <el-button-group style="float: right">
          <el-button type="success" class="search-button" @click="addVisible = true">新增</el-button>
          <el-button type="info" class="search-button" @click="exportExcel">导出</el-button>
        </el-button-group>
      </el-form>
    </template>
    <el-table ref="multipleTable" :data="tableData" v-loading="loading" stripe border style="width: 100%" tooltip-effect="dark" @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column v-for="(info, index) in tableInfo" :key="index" :prop="info.field" :label="info.title"></el-table-column>
    </el-table>
    <div class="opreation">
      <el-button-group>
        <el-button type="primary" @click="edit" :disabled="selected.length >= 2">编辑</el-button>
        <el-button type="danger">删除</el-button>
        <span v-if="selected.length" class="selected">选中{{ selected.length }}条</span>
      </el-button-group>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length*this.length"></el-pagination>
    </div>
    <el-dialog title="信息编辑" width="30%" :visible.sync="editVisible">
      <el-form :model="dynamicForm">
        <el-form-item v-for="(editData, index) in editDatas" :key="index" class="search-item" :label="editData.title" label-width="100px" size="medium">
          <template v-if="editData.search === 'select'">
            <el-select :placeholder="editData.title" v-model="editData.val" :value="editData.val">
              <el-option v-for="(option, index) in editData.options" :key="index" :label="option" :value="option"></el-option>
            </el-select>
          </template>
          <template v-else-if="editData.search === 'text'">
            <el-input class="search-input" :placeholder="editData.title" :value="editData.val"></el-input>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="editVisible = false">取消</el-button>
        <el-button type="success" @click="editVisible = false">提交</el-button>
      </span>
    </el-dialog>
    <el-dialog title="信息新增" width="30%" :visible.sync="addVisible">
      <el-form :model="dynamicForm">
        <el-form-item v-for="(editData, index) in editDatas" :key="index" class="search-item" :label="editData.title" label-width="100px" size="medium">
          <template v-if="editData.search === 'select'">
            <el-select :placeholder="editData.title" v-model="addData.val">
              <el-option v-for="(option, index) in editData.options" :key="index" :label="option" :value="option"></el-option>
            </el-select>
          </template>
          <template v-else-if="editData.search === 'text'">
            <el-input class="search-input" :placeholder="editData.title"></el-input>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="editVisible = false">取消</el-button>
        <el-button type="success" @click="editVisible = false">提交</el-button>
      </span>
    </el-dialog>
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
      editVisible: false,
      addVisible: false,
      loading: true,
      selected: [],
      editDatas: [],
      addData: [],
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
          // console.log(title.field)
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
          // console.log(dynamicSearch.field)
          this.tableData.forEach(data => {   // 这里后期应该是所有数据
            // console.log(data)
            for (let key in data) {
              // console.log(key)
              if (key === dynamicSearch.field) {
                if (fields.indexOf(data[key]) === -1) fields.push(data[key])
              }
            }
          })
          fields.sort((a, b) => b - a)
          dynamicSearch.options = fields
        }
      })
      // console.log(this.dynamicSearchs)
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
      this.editVisible = true
      this.editDatas = []
      var selected = this.selected[0]
      this.tableInfo.forEach(info => {
        let fields = []
        if (info.search === 'select') {
          this.tableData.forEach(data => {
            for (let key in data) {
              if (key === info.field) {
                if (fields.indexOf(data[key]) === -1) fields.push(data[key])
              }
            }
          })
          info.options = fields
        }
        this.editDatas.push({
          title: info.title,
          field: info.field,
          search: info.search,
          val: selected[info.field],
          options: info.options
        })
      })
      console.log(this.editDatas)
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
    },
    exportExcel () {

    }
  }
}
</script>

<style scoped lang="stylus">
.search-button
  // float right
  margin-left 10px
  margin-bottom 20px
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
