<template>
  <el-menu
    router
    text-color='#2d3436'
    unique-opened
    active-text-color='#0984e3'>
    <div v-for='(menu,index) in menus' :key='index'>
      <el-submenu v-if='menu.children.length > 0' :index='index+""'>
        <template slot='title'>
          <i class='el-icon-menu'></i>
          <span>{{ menu.menusName }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for='(children,index) in menu.children' :key='index' :index='children.path'>
            {{ children.menusName }}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item v-else :index='menu.path'>
        <i class='el-icon-coordinate'></i>
        <span slot='title'>{{ menu.menusName }}</span>
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script>
import { getMenus } from '@/api/menus'

export default {
  name: 'aside-menu',
  data() {
    return {
      menus: {}
    }
  },
  methods: {
    getMenus() {
      getMenus()
        .then(res => {
          this.menus = res.data
          console.log(this.menus)
        })
    }
  },
  created() {
    this.getMenus()
  }

}
</script>

<style lang='less' scoped>
.el-menu {
  height: 100%;


  div {
    .el-submenu {
      .el-menu-item-group {
        /deep/ .el-menu-item-group__title {
          padding: 0;
        }
      }

      span {
        font-size: 10px;
      }
    }

    .el-menu-item {
      font-size: 10px;
    }
  }
}


</style>
