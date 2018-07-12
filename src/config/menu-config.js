module.exports = [
  {
    name: '首页',
    id: 'Home',
    icon: 'el-icon-menu',
    componentName: 'Home'
  },
  {
    name: '个人中心',
    id: 'userCenter',
    icon: 'el-icon-message',
    meta: { roles: [] },
    sub: [
      {
        name: '上传文档',
        componentName: 'Documents'
      },
      {
        name: '短信互送',
        componentName: 'SmsManager'
      },
      {
        name: '积分系统',
        componentName: 'PointsSystem'
      },
      {
        name: '设置',
        componentName: 'Setting'
      }
    ]
  },
  {
    name: '信息管理',
    id: 'basic',
    icon: 'el-icon-document',
    sub: [
      {
        name: '学生列表',
        icon: 'el-icon-document',
        componentName: 'InfoList',
        param: 'student',
        url:
          '/info/studentList',
        tableTitle: [
          {
            title: '名字',
            field: 'name',
            search: 'text'
          },
          {
            title: '性别',
            field: 'sex',
            search: 'select'
          },
          {
            title: '学号',
            field: 'stuNum',
            search: 'text'
          },
          {
            title: '班级',
            field: 'class',
            search: 'select'
          }
        ]
      },
      {
        name: '班级列表',
        icon: 'el-icon-document',
        componentName: 'InfoList',
        param: 'class',
        url:
          '/info/classList',
        tableTitle: [
          {
            title: '班级名称',
            field: 'name',
            search: 'select'
          },
          {
            title: '学院',
            field: 'college',
            search: 'select'
          },
          {
            title: '辅导员',
            field: 'instructor',
            search: 'text'
          },
          {
            title: '辅导员电话',
            field: 'instructorNum',
            search: 'text'
          },
          {
            title: '入学年份',
            field: 'entryYear',
            search: 'select'
          }
        ]
      },
      {
        name: '教工列表',
        icon: 'el-icon-document',
        componentName: 'InfoList',
        param: 'teacher',
        url:
          '/info/teacherList',
        tableTitle: [
          {
            title: '姓名',
            field: 'name',
            search: 'text'
          },
          {
            title: '性别',
            field: 'sex',
            search: 'select'
          },
          {
            title: '角色',
            field: 'role',
            search: 'select'
          },
          {
            title: '部门',
            field: 'department',
            search: 'select'
          },
          {
            title: '个人电话',
            field: 'privateNum',
            search: 'text'
          },
          {
            title: '上次登录',
            field: 'lastLogin'
          }
        ]
      }
    ]
  },
  {
    name: '操作管理',
    id: 'opreation',
    icon: 'el-icon-setting',
    meta: { roles: ['admin'] },
    sub: [
      {
        name: '查看日志',
        icon: 'el-icon-setting',
        componentName: 'CheckLog'
      }
    ]
  },
  {
    name: '说明',
    id: 'illustrate',
    icon: 'el-icon-setting',
    componentName: 'Illustrate'
  }
]
