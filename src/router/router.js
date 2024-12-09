import {createRouter,createWebHistory} from 'vue-router';

//导入组件
import LoginForm from '@/views/LoginForm.vue'
import LayoutForm from '@/views/LayoutForm.vue';

//导入子路由组件
import ArticleCategoryVue from '@/views/ArticleCategory.vue'
import ArticleManageVue from '@/views/ArticleManage.vue'
import UserAvatarVue from '@/views/UserAvatar.vue'
import UserInfoVue from '@/views/UserInfo.vue'
import UserResetPasswordVue from '@/views/UserResetPassword.vue'

//定义路由关系
const routes = [
    {path:'/login',component:LoginForm},
    {path:'/',component:LayoutForm,
        //重定向 为首页页面默认展示的子路由页面
        redirect: '/article/category',
        //子路由
        children: [
            { path: '/article/category', component: ArticleCategoryVue },
            { path: '/article/manage', component: ArticleManageVue },
            { path: '/user/info', component: UserInfoVue },
            { path: '/user/avatar', component: UserAvatarVue },
            { path: '/user/password', component: UserResetPasswordVue }
        ]
    }
]
/*import {createRouter,createWebHistory} from 'vue-router';

//导入组件
import LoginVue from '@/views/LoginForm.vue'
import LayoutVue from '@/views/LayoutForm.vue';

//定义路由关系
const routes = [
    {path:'/login',component:LoginVue},
    {path:'/',component:LayoutVue}
]
*/
//创建路由器
const router = createRouter({
    history:createWebHistory(),
    routes:routes
})

//导出路由
export default router

