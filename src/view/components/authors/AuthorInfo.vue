<script setup>
import {ref, onMounted} from "vue";
import { useRoute } from 'vue-router'
import {searchAuthorWorks} from "@/model/authors.model.js";
import {db} from '@/db/db.js'

const route = useRoute()

const isLoading = ref(true)
let authorResult = ref([])

onMounted(async () => {
    authorResult.value = await searchAuthorWorks(route.params.name);

    isLoading.value = false;
})
</script>

<template>
    <div class="search-container">
        <div v-if="isLoading" class="loading-spinner">
            <p>Loading results...</p>
        </div>
        <div v-if="authorResult.length > 0" class="search-results">
            <div
                v-for="work in authorResult"
                :key="work.key"
                class="book-result-card"
            >
                <div class="author-info">
                    <img class="author-img" v-if="work.cover_i !== undefined" :src="'https://covers.openlibrary.org/b/id/' + work.cover_i + '-M.jpg'" alt="{{work.cover_i}}">
                    <div class="author-body">
                        <h3 class="author-title">{{ work.title }}</h3>
                        <p v-if="work.language !== undefined" class="author-lang">
                            Language: {{ work.language[0] }}
                        </p>
                    </div>
                </div>
                <hr>
            </div>
        </div>

        <!-- Message 'No results' seulement après une vraie recherche -->
        <div v-else-if="authorResult.length <= 0 && isLoading === false" class="no-results">
            <p>No books found matching your search.</p>
        </div>
    </div>
</template>