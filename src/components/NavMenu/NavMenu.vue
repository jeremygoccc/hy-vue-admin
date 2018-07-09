<template>
    <el-row class="tac">
        <el-col :span="24">
            <el-menu default-active="2" @open="handleOpen" @close="handleClose" class="el-menu-vertical-demo" unique-opened router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <template v-for="item in menu">
                    <el-menu-item v-if="!item.sub" :index="item.id" :key="item.id">
                        <i :class="item.icon"></i>&nbsp;
                        <span v-text="item.name"></span>
                    </el-menu-item>
                    <el-submenu v-else-if="item.sub" :index="item.id" :key="item.id">
                        <template slot="title">
                            <i :class="item.icon"></i>&nbsp;
                            <span v-text="item.name"></span>
                        </template>
                        <el-menu-item-group class="over-hide" v-for="sub in item.sub" :key="sub.param ? sub.componentName + sub.param : sub.componentName">
                            <el-menu-item :index="sub.param ? sub.componentName + '?info=' + sub.param : sub.componentName" v-text="sub.name"></el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </template>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script type="text/ecmascript-6">
import menu from "@/config/menu-config";
export default {
    name: 'NavMenu',
    data() {
      return {
        menu: menu
      };
    },
    components: {

    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
};
</script>

<style scoped lang="stylus">
.over-hide
	overflow hidden
</style>
