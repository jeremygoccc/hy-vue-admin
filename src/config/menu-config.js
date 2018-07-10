module.exports = [
  {
    name: "首页",
    id: "Home",
    icon: "el-icon-menu",
    componentName: "Home",
    meta: { roles: [] }
  },
  {
    name: "个人中心",
    id: "userCenter",
    icon: "el-icon-message",
    meta: { roles: [] },
    sub: [
      {
        name: "上传文档",
        componentName: "Documents"
      },
      {
        name: "短信互送",
        componentName: "SmsManager"
      },
      {
        name: "积分系统",
        componentName: "PointsSystem"
      },
      {
        name: "设置",
        componentName: "Setting"
      }
    ]
  },
  {
    name: "信息管理",
    id: "basic",
    icon: "el-icon-document",
    meta: { roles: [] },
    sub: [
      {
        name: "学生列表",
        icon: "el-icon-document",
        componentName: "InfoList",
        param: "student",
        url:
          "https://easy-mock.com/mock/5b3f5c1f18892e144d79f955/hyVue/info/studentList",
        tableTitle: [
          {
            title: "名字",
            field: "name"
          },
          {
            title: "性别",
            field: "sex"
          },
          {
            title: "学号",
            field: "stuNum"
          },
          {
            title: "班级",
            field: "class"
          }
        ]
      },
      {
        name: "班级列表",
        icon: "el-icon-document",
        componentName: "InfoList",
        param: "class",
        url:
          "https://easy-mock.com/mock/5b3f5c1f18892e144d79f955/hyVue/info/classList",
        tableTitle: [
          {
            title: "班级名称",
            field: "name"
          },
          {
            title: "学院",
            field: "college"
          },
          {
            title: "辅导员",
            field: "instructor"
          },
          {
            title: "辅导员电话",
            field: "instructorNum"
          },
          {
            title: "入学年份",
            field: "entryYear"
          }
        ]
      },
      {
        name: "教工列表",
        icon: "el-icon-document",
        componentName: "InfoList",
        param: "teacher",
        url:
          "https://easy-mock.com/mock/5b3f5c1f18892e144d79f955/hyVue/info/teacherList",
        tableTitle: [
          {
            title: "姓名",
            field: "name"
          },
          {
            title: "性别",
            field: "sex"
          },
          {
            title: "角色",
            field: "role"
          },
          {
            title: "部门",
            field: "department"
          },
          {
            title: "个人电话",
            field: "privateNum"
          },
          {
            title: "上次登录",
            field: "lastLogin"
          }
        ]
      }
    ]
  },
  {
    name: "操作管理",
    id: "opreation",
    icon: "el-icon-setting",
    meta: { roles: ["admin"] },
    sub: [
      {
        name: "查看日志",
        icon: "el-icon-setting",
        componentName: "CheckLog"
      }
    ]
  },
  {
    name: "说明",
    id: "illustrate",
    icon: "el-icon-setting",
    componentName: "Illustrate",
    meta: { roles: [] }
  }
];
