// import * as api from './api'

// export default api

export default {
    BaseUrl: "http://localhost:5000",
    menuActions: "/api/home/GetMenuInfo", //获取菜单数据
    login: "/api/home/login", //登陆
    GetOilMaterialOrder: "/api/Order/GetOiMateOrder", //获取油料订单号
    CreateOilMaterialOrder: "/api/Order/CreateOilMatOrder", //增添油料订单
    UpdateOilMaterialOrder: "/api/Order/UpdateOilMatOrder", //修改油料订单
    DeleteOilMaterialOrder: "/api/Order/DeleteOilMatOrder", //删除油料顶点
}