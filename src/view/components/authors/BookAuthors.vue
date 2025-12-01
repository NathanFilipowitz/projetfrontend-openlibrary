<script setup>
import {searchAuthors} from "@/model/authors.model.js";
import {ref} from 'vue'

const searchQuery = ref('')
const searchResults = ref([])
const isLoading = ref(false)
const hasSearched = ref(false)

const performSearch = async () => {
    const query = searchQuery.value.trim()

    if (!query) {
        searchResults.value = []
        hasSearched.value = false
        return
    }

    isLoading.value = true
    hasSearched.value = true

    try {
        searchResults.value = await searchAuthors(query)
        console.log(searchResults.value)
    } catch (error) {
        console.error('Search failed:', error)
        searchResults.value = []
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div class="search-container">
        <div class="search-header">
            <h2>Author Search</h2>
            <form @submit.prevent="performSearch" class="search-form">
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search for authors"
                    class="search-input"
                />
                <button type="submit" class="search-button" :disabled="isLoading">
                    {{ isLoading ? 'Searching...' : 'Search' }}
                </button>
            </form>
        </div>

        <div v-if="isLoading" class="loading-spinner">
            <p>Loading results...</p>
        </div>

        <div v-else-if="searchResults.length" class="search-results">
            <div
                v-for="author in searchResults"
                :key="author.key"
                class="book-result-card"
            >
                <div class="title">
                    <h3>{{ author.name }}</h3>
                    <div class="section-1">
                        Top subjects
                        <p class="p-section-1">{{ author.top_subjects.join(', ') }}</p>
                    </div>
                    <div class="section-2">
                        Top work
                        <p class="p-section-2">{{ author.top_work }}</p>
                    </div>
                    <div class="section-3">
                        Number of publications
                        <p class="p-section-3">{{ author.work_count }}</p>
                    </div>
                </div>
                <div class="book-actions">
                    <a v-bind:href="'/author/' + author.name">
                        <button class="details-button">View Details</button>
                    </a>
                </div>
            </div>
        </div>

        <!-- Message 'No results' seulement après une vraie recherche -->
        <div v-else-if="hasSearched" class="no-results">
            <p>No books found matching your search.</p>
        </div>
    </div>
</template>