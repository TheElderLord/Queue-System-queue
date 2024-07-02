

import QueuePage from '@/views/QueuePage.vue'

import TestView from "@/views/TestView.vue"

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
      path: '/tes',
      name: 'tes',
      component: TestView
    },

  ]
})

export default router
