<script setup>
import {authorModel} from "@/model/authors.model.js";
import {computed, ref} from 'vue'

const searchQuery = ref('')
const searchResults = ref([])
const isLoading = ref(false)
const hasSearched = ref(false)

const performSearch = async () => {
    const query = searchQuery.value.trim()

    if (!query) {
        searchResults.value = []
        return
    }

    isLoading.value = true
    hasSearched.value = true

    try {
        const results = await authorModel.searchAuthors(query)
        for (let i = 0; i < results.length; i++) {
            if (results[i].work_count > 1) {
                searchResults.value.push(results[i])
            }
        }
        // searchResults.value = await authorModel.searchAuthors(query)
        console.log('Search results:', searchResults.value);
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
<!--        <div v-if="showFilters" class="filters-panel">-->
<!--            <div class="filter-group">-->
<!--                <label>Trier par :</label>-->
<!--                <select v-model="selectedSort" @change="filteredAuthors">-->
<!--                    <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">-->
<!--                        {{ opt.label }}-->
<!--                    </option>-->
<!--                </select>-->
<!--            </div>-->
<!--        </div>-->
        <div class="search-header">
            <h2>Author Search</h2>
            <form @submit.prevent="performSearch" class="search-form">
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search for authors"
                    class="search-input"
                />
                <button type="submit" class="button" :disabled="isLoading">
                    {{ isLoading ? 'Searching...' : 'Search' }}
                </button>
            </form>
        </div>

        <div v-if="isLoading" class="loading-spinner">
            <p>Loading results...</p>
        </div>

        <div v-else-if="searchResults.length > 0" class="search-results">
            <div
                v-for="author in searchResults"
                :key="author.key"
                class="book-result-card"
            >
                <div v-if="author.work_count > 1" class="author-title">
                    <h3>{{ author.name }}</h3>
                    <div class="author-subtitle">
                        Top subjects
                        <p v-if="author.top_subjects !== undefined">{{ author.top_subjects.join(', ') }}</p>
                    </div>
                    <div class="author-subtitle">
                        Top work
                        <p>{{ author.top_work }}</p>
                    </div>
                    <div class="author-subtitle">
                        Number of publications
                        <p>{{ author.work_count }}</p>
                    </div>
                    <div class="book-actions">
                        <a v-bind:href="'/authors/about?name=' + author.name + '&key=' + author.key">
                            <button class="button">More details about {{author.name}}</button>
                        </a>
                    </div>
                    <hr>
                </div>
            </div>
        </div>

        <div v-else-if="searchResults.length === 0 && hasSearched === true" class="no-results">
            <p>No authors found matching your search.</p>
        </div>
    </div>
</template>