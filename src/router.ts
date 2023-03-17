import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

import routes from './pages/routes'

let router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0)
    next()
})

export default router

export function createRoutes(routes: RouteRecordRaw[]) {
    return routes
}