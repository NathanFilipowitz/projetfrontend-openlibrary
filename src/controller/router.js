import { createRouter, createWebHistory } from 'vue-router'

import BookSearch from '@/view/components/books/BookSearch.vue'
import BookDetails from '@/view/components/books/BookDetails.vue'

const routes = [
    {
        path: '/', // The default root path (what loads first)
        redirect: '/books' // Redirects the root to your books search page
    },
    {
        path: '/books',
        name: 'Books',
        component: BookSearch // Renders BookSearch.vue for the /books path
    },
    {
        path: '/books/:id', // for book details vue
        name: 'BookDetails',
        component: BookDetails
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router