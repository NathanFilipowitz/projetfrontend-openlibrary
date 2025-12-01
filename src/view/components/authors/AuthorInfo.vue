<script setup>
import {ref} from "vue";
import {searchBooks} from "@/model/books.js";

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
        searchResults.value = await searchBooks(query)
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
            <h2>Book Search</h2>
            <form @submit.prevent="performSearch" class="search-form">
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search for books"
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
                v-for="book in searchResults"
                :key="book.key"
                class="book-result-card"
            >
                <div class="book-info">
                    <h3 v-for="author in searchResults"
                        :key="author.key"
                        class="book-result-card"> </h3>
<!--                    <h3>{{ book.title }}</h3>-->
                    <p class="book-authors">
                        Authors: {{ book.authors.join(', ') }}
                    </p>
                    <p class="book-year">
                        First Published: {{ book.first_publish_year }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Message 'No results' seulement après une vraie recherche -->
        <div v-else-if="hasSearched" class="no-results">
            <p>No books found matching your search.</p>
        </div>
    </div>
</template>