// import Vue from 'vue'
// import VueRouter from 'vue-router'

// Vue.use(VueRouter)

export const constantRouterMap = [
  {
      path: '/',
      redirect:'/HomePage',
  },
    {
        path: '/HomePage',
        component: resolve => require(['@/views/HomePage/index.vue'], resolve),
        hidden: true,
        name: '主页',
        redirect:'/Home',
        children:[
            {
                path: '/Home',
                component: resolve => require(['@/views/Home/home.vue'], resolve),
                hidden: true,
                name: '主页',
                index: 1
            },
            {
                path: '/MenuQuery',
                component: resolve => require(['@/views/MenuQuery/index.vue'], resolve),
                hidden: true,
                name: 'AppId菜单查询',
                index: 2
            },
            {
                path: '/DataStatistics',
                component: resolve => require(['@/views/DataStatistics/index.vue'], resolve),
                hidden: true,
                name: "数据统计",
                index: 3
            },
            {
                path: '/LabelManagement',
                component: resolve => require(['@/views/LabelManagement/index.vue'], resolve),
                hidden: true,
                name: "标签管理",
                index: 4
            }
        ]
    }
];

export default new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})
