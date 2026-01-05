import {createRouter, createWebHistory} from 'vue-router'
import BookSearch from '@/view/components/books/BookSearch.vue'
import BookAuthors from '@/view/components/authors/BookAuthors.vue'
import AuthorInfo from '@/view/components/authors/AuthorInfo.vue'
import BookSubjects from "@/view/components/subjects/BookSubjects.vue"
import SubjectInfo from "@/view/components/subjects/SubjectInfo.vue";
import BookDetails from "@/view/components/books/BookDetails.vue";

const routes = [{
    path: '/', // The default root path (what loads first)
    redirect: '/books' // Redirects the root to your books search page
}, {
    path: '/books', name: 'Books', component: BookSearch // Renders BookSearch.vue for the /books path
}, {
    path: '/books/:id', // for book details vue
    name: 'BookDetails',
    component: BookDetails
}, { path: '/authors', name: 'Authors', component: BookAuthors },
    { path: '/authors/about', name: 'Authors Info', component: AuthorInfo }
    // { path: '/covers', name: 'Covers', component: Covers },
    { path: '/subjects', name: 'Subjects', component: BookSubjects },
]




const router = createRouter({
    // Use history mode for clean URLs (e.g., /books instead of /#/books)
    history: createWebHistory(), routes
})


export default router