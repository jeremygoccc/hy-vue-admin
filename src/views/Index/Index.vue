<template>
  <div class="page">
      这是首页
      <icon type="home-fill"></icon>
      <icon type="eye-fill"></icon>
      <icon type="rocket-fill"></icon>
      <icon type="404"></icon>
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
import './assets/svg/logo.svg'
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
