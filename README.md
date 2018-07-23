# hy-vue-admin
## 特性

- 基于[vue](https://github.com/vuejs/vue)、[vuex](https://github.com/vuejs/vuex)、[element-ui](https://github.com/ElemeFE/element)以及[Yapi](https://yapi.ymfe.org/)的后台管理系统
- 基于 element-ui 设计语言，提供后台管理系统常用场景
- 基于 vuex 管理整体状态对象，易于设计与维护
- 通过配置 menu-config.js 可动态加载侧边栏以及对基本列表组件的动态属性设置
- 扩展可自行添加新可复用组件进行动态配置的对应
- 适合前后端分离实践团队开发

## 使用

- `npm install`  安装项目依赖
- `npm run dev`  运行本地环境 <http://localhost:8080>
- `npm run build` 编译

## 目录设计
```
|—— build                   # 编译目录
|—— config                  # 配置目录
|—— src
  |—— api                   # 接口目录
    |—— list.js
    |—— login.js
  |—— assets                # 静态资源目录
  |—— components            # 公共组件目录
  |—— config                # 动态化配置目录
    |—— menu-config.js
  |—— router
    |—— index.js            # 主视图路由
    |—— menu.js             # 侧边栏路由
  |—— store                 # 状态管理目录
    |—— modules
      |—— user.js
    |—— getters.js
    |—— index.js
  |—— utils                 # 扩展目录
    |—— auth.js
    |—— request.js          # axios请求封装
    |—— validate.js
    |—— permission.js       # 路由权限验证
  |—— views                 # 视图组件目录
  |—— main.js
  |—— App.vue
```