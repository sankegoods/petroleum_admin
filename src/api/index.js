// import * as api from './api'

// export default api

export default {
    BaseUrl: "http://localhost:5000",
    menuActions: "/api/home/GetMenuInfo", //获取菜单数据
    login: "/api/home/login", //登陆
    GetOilMaterialOrder: "/api/Order/GetOiMateOrder", //获取油料订单号
    GetOrganInfo: "/api/InfoMaintain/GetOrganInfo", //获取组织机构数据
    GetStarffInfo: "/api/InfoMaintain/GetStarffInfo", //获取员工信息数据
    GetStarffInfoByName: "/api/home/GetstaffInfoByName", //获取在职员工姓名
    GetJobRoleInfo: "/api/InfoMaintain/GetJonRoleInfo", //获取岗位和角色数据
    GetJobInfo: "/api/InfoMaintain/GetJobInfo", //获取岗位信息
    GetStarffInfoById: "/api/InfoMaintain/GetStarffInfoById", //根据jobId获取员工
    GetJueseQuanxianAll: "/api/InfoMaintain/GetJueseQuanxianAll", //查询角色权限数据
    GetEntrysInfoAll: "/api/home/GetEntrysInfoAll", //查询员工申请入职信息
    GetLeaveOfficesInfoAll: "/api/home/GetLeaveOfficesInfoAll", //查询员工申请离职信息
    GetruzhishenpiInfo: "/api/leaveOffice/GetruzhishenpiInfo", //查询入职审批的数据
    GetlizhishenpiInfo: "/api/leaveOffice/GetlizhishenpiInfo", //查询离职审批数据
    GetOilMatOrdershenpi: "/api/order/GetOilMatOrdershenpi", //查询油料审批数据

    addOrganStructureInfo: "/api/InfoMaintain/addOrganInfo", //添加组织机构数据
    addStarffInfo: "/api/InfoMaintain/addStarffInfo", //添加员工信息
    CreateOilMaterialOrder: "/api/Order/CreateOilMatOrder", //增添油料订单
    addJueSheInfo: "/api/InfoMaintain/addJueSheInfo", //增添角色权限信息
    AddEntrysInfoAll: "/api/home/AddEntrysInfoAll", //添加员工申请入职信息
    AddLeaveOfficesInfoAll: "/api/home/AddLeaveOfficesInfoAll", //添加员工申请离职信息

    UpdateOilMaterialOrder: "/api/Order/UpdateOilMatOrder", //修改油料订单
    UpdataRoleInfo: "/api/InfoMaintain/UpdataRoleInfo", //修改角色权限数据
    UpdateEntrysInfoAll: "/api/home/UpdateEntrysInfoAll", //修改员工申请入职信息
    UpdataLeaveOfficesInfoAll: "/api/home/UpdataLeaveOfficesInfoAll", //修改员工申请离职信息
    UpdateruzhishenpiInfo: "/api/leaveOffice/UpdateruzhishenpiInfo", //审批入职表信息
    UpdatelizhishenpiInfo: "/api/leaveOffice/UpdatelizhishenpiInfo", //审批离职表信息

    DeleteOrganInfoById: "/api/InfoMaintain/DeleteOrganInfoById", //删除组织机构数据
    DeleteOilMaterialOrder: "/api/Order/DeleteOilMatOrder", //删除油料顶点
}