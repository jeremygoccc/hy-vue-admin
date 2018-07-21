<template>
  <div class="page">
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
  </div>
</template>

<script type="text/ecmascript-6">
export default {

  prop: [
    'dynamicSearch'
  ],
  data () {
    return {
      dynamicForm: '',
      dynamicSearchs: this.dynamicSearch
    }
  },
  components: {

  },
  methods: {
    onSubmit (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
