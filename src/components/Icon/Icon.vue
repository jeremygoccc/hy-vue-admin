<template>
  <svg :width="width" :height="height">
      <use :xlink:href="iconName"/>
  </svg>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'Icon',
    props: {
        type: { default: 'logo' },
        width: { default: 50 },
        height: { default: 50 }
    },
    data() {
      return {

      }
    },
    computed: {
        iconName () {
            return '#' + this.$props.type
        }
    },
    components: {

    }
}
</script>

<style scoped lang="stylus">
svg
    fill currentColor
    overflow hidden
</style>
