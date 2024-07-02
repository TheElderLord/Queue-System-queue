

import QueuePage from '@/views/QueuePage.vue'

import TestView from "@/views/TestView.vue"
import AdminPage from "@/views/AdminPage.vue"

import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: QueuePage
    },
    {
      path: '/test',
      name: 'test',
      component: TestView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminPage
    },

  ]
})

export default router
