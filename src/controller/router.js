import {createRouter, createWebHistory} from 'vue-router'
// const axios = require('axios');
import BookSearch from '@/view/components/books/BookSearch.vue'
import BookAuthors from '@/view/components/authors/BookAuthors.vue'
import AuthorInfo from '@/view/components/authors/AuthorInfo.vue'

const routes = [{
    path: '/', // The default root path (what loads first)
    redirect: '/books' // Redirects the root to your books search page
}, {
    path: '/books', name: 'Books', component: BookSearch // Renders BookSearch.vue for the /books path
}, // Add other routes here for the links in Navigation.vue
    { path: '/authors', name: 'Authors', component: BookAuthors },
    { path: '/authors/:name', name: 'Authors Info', component: AuthorInfo }
    // { path: '/covers', name: 'Covers', component: Covers },
    // { path: '/subjects', name: 'Subjects', component: Subjects },
]

const router = createRouter({
    // Use history mode for clean URLs (e.g., /books instead of /#/books)
    history: createWebHistory(), routes
})


export default router