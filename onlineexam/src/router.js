import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            // redirect: '/sys'
            component:()=> import('./views/login/login.vue')
        },
        {
            path: '*',
            // redirect: '/sys'
            component:()=> import('./views/login/login.vue')
        },
        {
            path:'/login',
            name:'login',
            component:()=> import('./views/login/login.vue')
        },
        {
            path:'/zhuce',
            name:'zhuce',
            component:()=> import('./views/login/zhuce.vue')
        },
        {
            path: '/sys',
            name: 'sys',
            component: () => import('./views/system.vue'),
            children: [
                {
                    // 首页
                    path: '/indexPage',
                    name: 'indexPage',
                    component: () => import('./views/indexPage.vue')                    
                },
                {
                    //用户管理
                    path: 'userManagement',
                    name: 'userManagement',
                    component: () => import('./views/userManagement.vue'),               
                },
                {                    
                    path: 'examinationPaperManagement',
                    name: 'examinationPaperManagement',
                    component: () => import('./views/examinationPaperManagement.vue')                    
                },
                {                    
                    path: 'questionBankManagement',
                    name: 'questionBankManagement',
                    component: () => import('./views/questionBankManagement.vue')                    
                },
                {                    
                    path: 'informationRelease',
                    name: 'informationRelease',
                    component: () => import('./views/informationRelease.vue')                    
                },
                {                    
                    path: 'expertsAnswer',
                    name: 'expertsAnswer',
                    component: () => import('./views/expertsAnswer.vue')                    
                },
                {                    
                    path: 'examineeRegistration',
                    name: 'examineeRegistration',
                    component: () => import('./views/examineeRegistration.vue')                    
                },
                {                    
                    path: 'userActionLog',
                    name: 'userActionLog',
                    component: () => import('./views/userActionLog.vue')                    
                },
                {
                    path:'paperDetail',
                    name:'paperDetail',
                    component:()=>import('./views/paperDetail.vue')
                },
                {
                    path:'paperList',
                    name:'paperList',
                    component:()=>import('./views/paperList.vue')
                }
            ]
        },
      
    ]
});