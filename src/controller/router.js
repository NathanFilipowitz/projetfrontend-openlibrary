import { createRouter, createWebHistory } from 'vue-router'

import BookSearch from '@/view/components/books/BookSearch.vue'

const routes = [
    {
        path: '/', // The default root path (what loads first)
        redirect: '/books' // Redirects the root to your books search page
    },
    {
        path: '/books',
        name: 'Books',
        component: BookSearch // Renders BookSearch.vue for the /books path
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router