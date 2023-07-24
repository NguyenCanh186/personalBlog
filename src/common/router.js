import Vue from "vue";
import VueRouter from "vue-router";
import NewsDetail from "@/components/brand/news/NewsDetail.vue";

Vue.use(VueRouter);

const routes = [
    // Các route khác...
    {
        path: "/newsDetail/:id", // Dấu hai chấm (:) đánh dấu đây là dynamic route parameter
        component: NewsDetail,
        props: true, // Cho phép sử dụng id như một prop trong component NewsDetail
    },
];

const router = new VueRouter({
    routes,
});
export default router
