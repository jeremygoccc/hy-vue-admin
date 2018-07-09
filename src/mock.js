import Mock from 'mockjs'

const Random = Mock.Random

const studentList = () => {
    let stuList = []
    for (let i = 0; i < 100; i++) {
        let newStuInfo = {
            name: Random.cname(),
            sex: '男',
            stuNum: Random.time(),
            class: '网工二班'
        }
        stuList.push(newStuInfo)
    }

    return { stuList }
}

const token = (req ,res) => {
    const userInfo = JSON.parse(req.body)
    if (userInfo.username === 'admin' && userInfo.password === 'admin') {
        return {
            code: 20000,
            token: 'admin',
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
            roles: ['admin']
        }
    } else {
        return {
            code: 50008,
            token: 'name or password error'
        }
    }
}

Mock.mock(`/info/students`,  'post', studentList)
Mock.mock(`/user/login`, 'post', token)