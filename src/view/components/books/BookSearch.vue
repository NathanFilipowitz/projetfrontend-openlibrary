<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { searchBooks } from '@/model/books.js'
import { sortOptions, languageOptions } from '@/model/filters.js'

const searchQuery = ref('')
const searchResults = ref([])
const isLoading = ref(false)
const hasSearched = ref(false)
const router = useRouter()

// État pour afficher/cacher les filtres
const showFilters = ref(false)

// Variables pour stocker les choix de l'utilisateur
const selectedSort = ref('')
const selectedLanguage = ref('')

const performSearch = async () => {
  const query = searchQuery.value.trim()

  if (!query) {
    searchResults.value = []
    hasSearched.value = false
    return
  }

  isLoading.value = true
  hasSearched.value = true

  const filters = {
    sort: selectedSort.value,
    language: selectedLanguage.value
  }

  try {
    // On envoie les filtres à la fonction de recherche
    searchResults.value = await searchBooks(query, filters)
  } catch (error) {
    console.error('Search failed:', error)
    searchResults.value = []
  } finally {
    isLoading.value = false
  }
}

// Fonction pour basculer l'affichage des filtres
const toggleFilters = () => {
  showFilters.value = !showFilters.value
}

const showDetails = (book) => {
  const bookId = book.key.split('/').pop()
  router.push({ name: 'BookDetails', params: { id: bookId } })
}
</script>

<template>
  <div class="book-search-container">
    <div class="search-header">
      <h2>Book Search</h2>

      <form @submit.prevent="performSearch" class="search-form-wrapper">
        <div class="search-input-group">
          <input
              v-model="searchQuery"
              type="text"
              placeholder="Search for books, titles, or authors"
              class="search-input"
          />

          <button
              type="button"
              class="filter-toggle-btn"
              @click="toggleFilters"
              :class="{ 'active': showFilters }"
          >
            <span v-if="showFilters">Fermer Filtres</span>
            <span v-else>Filtres</span>
          </button>

          <button type="submit" class="search-button" :disabled="isLoading">
            {{ isLoading ? 'Searching...' : 'Search' }}
          </button>
        </div>

        <div v-if="showFilters" class="filters-panel">
          <div class="filter-group">
            <label>Trier par :</label>
            <select v-model="selectedSort" @change="performSearch">
              <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
          </div>

          <div class="filter-group">
            <label>Langue :</label>
            <select v-model="selectedLanguage" @change="performSearch">
              <option v-for="opt in languageOptions" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
          </div>
        </div>
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
          <div class="book-item">
            <h3>{{ book.title }}</h3>
            <img v-if="book.cover_image" :src="'https://covers.openlibrary.org/b/id/' + book.cover_image + '-M.jpg'">
            <div v-else class="no-cover">No Cover</div>
          </div>
          <div class="book-item">
            <p class="book-authors">Authors: {{ book.authors.join(', ') }}</p>
            <p class="book-year">First Published: {{ book.first_publish_year }}</p>
            <div class="book-actions">
              <button class="details-button" @click="showDetails(book)">View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="hasSearched" class="no-results">
      <p>No books found matching your search.</p>
    </div>
  </div>
</template>

<style scoped>
/* Conteneur principal */
.book-search-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Groupe Input + Boutons */
.search-input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.search-input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

/* Bouton Filtre */
.filter-toggle-btn {
  padding: 10px 15px;
  background-color: #6c757d; /* Gris neutre */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.filter-toggle-btn:hover {
  background-color: #5a6268;
}

.filter-toggle-btn.active {
  background-color: #495057;
  box-shadow: inset 0 3px 5px rgba(0,0,0,0.125);
}

/* Bouton Search */
.search-button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.search-button:hover {
  background-color: #3aa876;
}

/* Panneau des filtres */
.filters-panel {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  display: flex;
  gap: 20px;
  animation: slideDown 0.3s ease-out;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.filter-group label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 600;
}

.filter-group select {
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: white;
  min-width: 150px;
}

/* Grille résultats (ajustement CSS existant) */
.book-info {
  display: grid;
  grid-template-columns: 120px 1fr; /* Image un peu plus large */
  gap: 20px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.book-item img {
  max-width: 100%;
  border-radius: 4px;
}

.no-cover {
  width: 100%;
  height: 150px;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}

.details-button {
  padding: 8px 16px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

/* Animation simple fais avec l'aide de l'ia */
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  .filters-panel {
    flex-direction: column;
  }
  .search-input-group {
    flex-wrap: wrap;
  }
  .search-input {
    width: 100%;
  }
}
</style>