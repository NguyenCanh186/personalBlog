import Vue from "vue";
import Router from "vue-router";
import management from "@/components/admin/management.vue";

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [

        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/admin',
            component: management,
            children: [
                {
                    path: 'home',
                    name: 'home',
                    component: () => import("@/components/admin/layout/HomeComponent"),
                },
                {
                    path: 'v-point-manager',
                    name: 'VPointManager',
                    component: () => import("@/components/admin/VPointManager"),
                },
                {
                    path: 'detail/:idUser/:year',
                    name: 'detail',
                    component: () => import("@/components/admin/Detail"),
                },
                {
                    path: 'AdminSeeDetailVPoint/:year/:month/:idUser',
                    name: 'DetailPoint',
                    component: () => import("@/components/admin/DetailPoint"),
                },

            ]
        },
    ]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
    const user = JSON.parse(loggedIn)
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        if (to.path.startsWith('/admin')) {
            if (user !== null && user.roles[0].authority === 'ROLE_ADMIN') {
                next();
            } else {
                next('/access');
            }
        } else {
            next()
        }
    }

});
export default router
