/** @format */

import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store'
// import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        // component: Home
        component: () => import('../views/Main/Home.vue'),
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/Main/About.vue'),
    },
    {
        path: '*',
        name: 'NotFoundPage',
        component: () => import('../views/Main/NotFoundPage.vue'),
    },
];

const router = new VueRouter({
    routes,
});
router.beforeEach((to, from, next) => {
    if (from.path == '/panoviewer' || from.path == '/xmleditor') {
        store.dispatch('viewer/resetKrpano', true)
    }
    next();
})
export default router;
