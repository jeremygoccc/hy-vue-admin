<template>
  <div class="page">
      <el-card class="box-card">
          <div class="header" slot="header">
              <h3>Todo List</h3>
              <el-input type="text" v-model="note" style="width: 200px" placeholder="输入待办事项"></el-input>
              <el-button type="primary" icon="el-icon-plus" circle @click="addNote" style="margin-left: 10px"></el-button>
          </div>
          <div v-for="(item, index) in items" :key="index" :class="item.done ? 'item text done' : 'item text'" @click="toggle(index)">
              {{ item.text }}
          </div>
          <span>已完成： {{ done }}/{{ items.length }}</span>
      </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
        items: [{
            text: '学习',
            done: false
        }, {
            text: '吃饭',
            done: false
        }],
        note: ''
    }
  },
  methods: {
    addNote () {
        if (!this.note) return
        this.items.push({
            text: this.note,
            done: false
        })
        this.note = ''
    },
    toggle (index) {
        this.items[index].done = !this.items[index].done
    }
  },
  computed: {
    done () {
      return this.items.filter(v => v.done).length
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">

.box-card
    width 350px
    margin 100px auto
    .header
        text-align center
    .text
        font-size 14px
        text-align center
    .item
        margin-bottom 18px
        cursor pointer
    .done
        text-decoration line-through
</style>
