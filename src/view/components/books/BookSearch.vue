<script setup>
import { ref } from 'vue'
import { searchBooks } from '@/model/books.js'

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
  <div class="book-search-container">
    <div class="search-header">
      <h2>Book Search</h2>
      <form @submit.prevent="performSearch" class="search-form">
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for books, titles, or authors"
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
        </div>
        <div class="book-actions">
          <button class="details-button">View Details</button>
        </div>
      </div>
    </div>

    <!-- Message 'No results' seulement après une vraie recherche -->
    <div v-else-if="hasSearched" class="no-results">
      <p>No books found matching your search.</p>
    </div>
  </div>
</template>

<style scoped>
.book-search-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.search-header {
  margin-bottom: 20px;
}

.search-form {
  display: flex;
  gap: 10px;
}

.search-input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.search-button {
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background-color: #3aa876;
}
</style>