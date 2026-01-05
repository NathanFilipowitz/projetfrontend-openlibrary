<script setup>
import {searchSubjects} from "@/model/subjects.js";
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
    searchResults.value = await searchSubjects(query)
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
      <h2>Subject Search</h2>
      <form @submit.prevent="performSearch" class="search-form">
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for subjects..."
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
          <h3>{{ book.title }}</h3>
          <p class="book-authors">
            Authors: {{ book.authors.join(', ') }}
          </p>
          <p class="book-year">
            First Published: {{ book.first_publish_year }}
          </p>
          <p class="book-subject">
            <span v-html="book.subject"></span>
          </p>
        </div>
        <div class="book-actions">
          <a :href="'/subject/' + encodeURIComponent(book.title)">
            <button class="details-button">View Details</button>
          </a>
        </div>
      </div>
    </div>

    <div v-else-if="hasSearched" class="no-results">
      <p>No books found matching your search.</p>
    </div>
  </div>
</template>