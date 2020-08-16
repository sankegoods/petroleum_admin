const Home = () =>
    import ('../views/Home.vue')
const login = () =>
    import ('../views/login.vue')

const routes = [{
    path: '/',
    component: Home,
    children: [{
        path: '',
        redirect: '/HomeIndex',
    }, {
        path: '/HomeIndex',
        component: () =>
            import ('../views/Home/HomeIndex.vue'),
        name: '首页'
    }, {
        path: '/UserInfo/SelectEntrys',
        component: () =>
            import ('../views/Home/SelectEntrys.vue'),
        name: '员工入职申请'
    }, {
        path: '/StaffInfo/LeaveOfficeView',
        component: () =>
            import ('../views/Home/LeaveOfficeView.vue'),
        name: '员工离职申请'
    }, {
        path: '/Oilseeds/Index',
        component: () =>
            import ('../views/Home/Oilseeds.vue'),
        name: '油料申请'
    }, ]
}, {
    path: '/',
    name: '基础信息维护',
    component: Home,
    children: [{
        path: '/Organisation/Index',
        component: () =>
            import ('../views/Home/SelectEntrys.vue'),
        name: '组织机构管理'
    }, {
        path: '/StaffInfo/Index',
        component: () =>
            import ('../views/Home/LeaveOfficeView.vue'),
        name: '员工基础信息管理'
    }, {
        path: '/JobInfo/Index',
        component: () =>
            import ('../views/Home/Oilseeds.vue'),
        name: '职位管理'
    }, ]
}, {
    path: '/',
    name: '系统设置',
    component: Home,
    children: [{
        path: '/StaffInfo/AddRoleInsetStaff',
        component: () =>
            import ('../views/Home/SelectEntrys.vue'),
        name: '用户（员工）角色'
    }, {
        path: '/StaffInfo/空',
        component: () =>
            import ('../views/Home/LeaveOfficeView.vue'),
        name: '系统模块资源'
    }, {
        path: '/StaffInfo/circuitView',
        component: () =>
            import ('../views/Home/Oilseeds.vue'),
        name: '流程设置'
    }, {
        path: '/RoleInfo/Index',
        component: () =>
            import ('../views/Home/Oilseeds.vue'),
        name: '角色权限'
    }, ]
}, {
    path: '/',
    name: '日常管理',
    component: Home,
    children: [{
        path: '/UserInfo/EntryAudit',
        component: () =>
            import ('../views/Home/SelectEntrys.vue'),
        name: '员工入职审批'
    }, {
        path: '/StaffInfo/LeavingAudit',
        component: () =>
            import ('../views/Home/Oilseeds.vue'),
        name: '员工离职审批'
    }, {
        path: '/Oilseeds/ApprovalIndex',
        component: () =>
            import ('../views/Home/Oilseeds.vue'),
        name: '油料申请审批'
    }, ]
}, {
    path: '/login',
    name: 'login',
    component: login
}]

export default routes