import {
    createRouter, createWebHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import api from "../api/index.js";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
    },
    {
        path: '/articles',
        name: 'articles',
        component: () => import('../views/ArticleListView.vue')
    },
    {
        path: '/article/:articleId',
        name: 'article',
        component: () => import('../views/ArticleDetailView.vue')
    },
    {
        path: '/404',
        name: 'about',
        component: () => import('../views/404View.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginView.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/RegisterView.vue')
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/Admin/AdminView.vue'),
        meta: {requiresAuth: false}
    },
    {
        path: '/admin/ArticleEditor',
        name: 'ArticleEditor',
        component: () => import('../views/Admin/ArticleEditorView.vue'),
        meta: {requiresAuth: false}
    },
    {
        path: '/:pathMatch(.*)',
        name: 'NotFound',
        component: () => import("../views/404View.vue")
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        api.isAdmin().then(() => {
            next();
        }).catch(() => {
            next('/404');
        })
    } else {
        next();
    }
})

export default router