import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import routes from './pages/routes'

let router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

export function createRoutes(routes: RouteRecordRaw[]) {
  return routes
}