<!--Aide de l'article Medium pour pagination: https://medium.com/@obapelumi/pagination-with-vuejs-1f505ce8d15b-->

<script setup>
import {ref, onMounted, computed} from "vue";
import { useRoute } from 'vue-router'
import {authorModel} from "@/model/authors.model.js";
import router from "@/controller/router.js";

const route = useRoute()

const isLoading = ref(true)
const authorWorks = ref([])
const sortOrder = ref('asc')

const pages = ref([])
const page = ref(1)
const perPage = ref(9)

function setPages () {
    let numberOfPages = Math.ceil(authorWorks.value.length / perPage.value);
    for (let index = 1; index <= numberOfPages; index++) {
        pages.value.push(index);
    }
}

function paginate (posts) {
    let from = (page.value * perPage.value) - perPage.value;
    let to = (page.value * perPage.value);
    return posts.slice(from, to);
}

const paginatedPosts = computed(() => {
    return paginate(filteredWorks.value);
})

// Filtrage
const filteredWorks = computed(() => {
    // Aide IA: How to sort js array in js
    const copiedData = [...authorWorks.value];

    copiedData.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();

        if (titleA < titleB) {
            return -1;
        }
        if (titleA > titleB) {
            return 1;
        }
        return 0;
    });

    if (sortOrder.value === 'asc') {
        return copiedData;
    } else {
        return copiedData.reverse();
    }
})

const toggleSort = () => {
    if (sortOrder.value === 'asc') {
        sortOrder.value = 'desc';
    } else {
        sortOrder.value = 'asc';
    }
}

const showDetails = (book) => {
    const bookId = book.replace("/works/", "");
    router.push({ name: 'BookDetails', params: { id: bookId } })
}

const goBack = () => router.back()

onMounted(async () => {
    const authorKey = route.query.key;
    authorWorks.value = await authorModel.searchAuthorWorks(authorKey);
    setPages()
    isLoading.value = false;
})
</script>

<template>
    <div class="search-container">
        <button @click="goBack" class="back-link">← Back to Search</button>
        <button
            v-if="!isLoading && authorWorks.length > 0"
            @click="toggleSort"
            class="button"
        >
            Filtrage {{ sortOrder === 'asc' ? ' (A-Z)' : '(Z-A)' }}
        </button>
        <div v-if="isLoading" class="loading-spinner">
            <p>Loading results...</p>
        </div>

        <div v-else-if="paginatedPosts.length > 0" class="search-results">
            <div
                v-for="work in paginatedPosts"
                :key="work.key"
                class="book-result-card"
            >
                <div class="author-info">
                    <div class="author-img-container">
                        <img v-if="work.covers" class="author-img" :src="'https://covers.openlibrary.org/b/id/' + work.covers[0] + '-M.jpg'" alt="{{work.covers[0]}}">
                        <img v-else class="author-img" src="@/assets/img/No_Image_Available.jpg" alt="No Image Available">
                    </div>
                    <div class="author-body">
                        <h3 class="author-title">{{ work.title }}</h3>
                    </div>
                    <div class="book-actions">
                        <button class="details-button" @click="showDetails(work.id)">View Details</button>
                    </div>
                </div>
                <hr>
            </div>
        </div>

        <div v-else-if="authorWorks.length <= 0 && isLoading === false" class="no-results">
            <p>No books found matching your search.</p>
        </div>

<!--        Pagination-->
        <div v-if="pages.length > 1">
            <button type="button" class="pagination" v-if="page !== 1" @click="page--"> << </button>
            <button type="button" class="pagination" v-for="pageNumber in pages.slice(page - 1, page + 5)" @click="page = pageNumber"> {{pageNumber}} </button>
            <button type="button" class="pagination" @click="page++" v-if="page < pages.length" > >> </button>
        </div>
    </div>
</template>