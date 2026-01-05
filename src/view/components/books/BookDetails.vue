<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getBookDetails } from '@/model/books.js'
import { db } from '@/db/db.js'

const route = useRoute() // get current route information.
const router = useRouter()

const FAVORITES_KEY = 'favoriteBooks'
const book = ref(null)
const isLoading = ref(true)
const error = ref(null)
const isFavorite = ref(false)

// get bookId from url
const bookId = route.params.id

onMounted(async () => {
  try {
    book.value = await getBookDetails(bookId)
    checkIfFavorite() // Check favorite status on load
    console.log("Data returned from getBookDetails:", book.value)
  } catch (err) {
    error.value = "Could not load book details."
    console.error(err)
  } finally {
    isLoading.value = false
  }
})

const checkIfFavorite = () => {
  const existingFavorites = db.readDB(FAVORITES_KEY) || []
  isFavorite.value = existingFavorites.includes(bookId)
}

const addToFavorite = async () => {
    // checks if favorite is already in db and adds it if not
  try {
    const existingFavorites = db.readDB(FAVORITES_KEY) || []
    const favIndex = existingFavorites.indexOf(bookId)
    // add bookId to favorites if not already in list
    console.log(existingFavorites)
    if (!existingFavorites.includes(bookId)) {
        const updatedFavorites = [...existingFavorites, bookId]
        console.log(`bookId: ${bookId}, existingFavorites: ${existingFavorites}, Updated favorites: ${updatedFavorites}, favIndex: ${favIndex}`)
        // push updated list to db
        db.writeDB(FAVORITES_KEY, updatedFavorites)
        console.log(`Book ${bookId} added to favorites.`)
        isFavorite.value = true
    } else {
      // Remove from favorites using favorite position
      existingFavorites.splice(favIndex, 1)
      db.writeDB(FAVORITES_KEY, existingFavorites)
      isFavorite.value = false
    }
  } catch (err) {
    error.value = 'Could not save favorite to the database.'
    console.error('Failed to add to favorites:', err)
  }
}

const bookDescription = computed(() => {
  if (!book.value || !book.value.description) return 'No description available.'
  return typeof book.value.description === 'string'
      ? book.value.description
      : book.value.description.value
})

// create a direct link to the book on OpenLibrary
const openLibraryLink = computed(() => `https://openlibrary.org${book.value?.key}`)

const goBack = () => router.back()
</script>

<template>
  <div class="details-container">
    <div v-if="isLoading" class="state-message">
      <div class="spinner"></div>
      <p>Loading book details...</p>
    </div>
    <div v-else-if="error" class="state-message error">
      <p>{{ error }}</p>
      <button @click="goBack" class="back-btn">Go Back</button>
    </div>
    <!-- If not loading and no error, show this block if 'book' has data -->
    <div v-else-if="book" class="book-content">
      <button @click="goBack" class="back-link">← Back to Search</button>
      <div class="content-grid">
        <div class="image-column">
          <img
              v-if="book.covers && book.covers.length"
              :src="`https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`"
              alt="Book Cover"
              class="large-cover"
          />
          <div v-else class="placeholder-cover">
            No Image
          </div>
        </div>
        <div class="info-column">
          <h1>{{ book.title }}</h1>
          <div class="meta-tags">
            <span v-if="book.first_publish_date" class="tag">
              📅 {{ book.first_publish_date }}
            </span>
          </div>
          <div class="description-box">
            <h3>Description</h3>
            <p>{{ bookDescription }}</p>
          </div>
          <div class="action-area">
            <button @click="addToFavorite" class="btn-icon favorite-btn" :class="{ 'is-favorite': isFavorite }" title="Add to favorites">
              <span class="icon-heart">♥</span>
            </button>
            <a :href="openLibraryLink" target="_blank" class="ol-button">
              View on OpenLibrary ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* --- Mobile First Styles (Default) --- */
.details-container {
  max-width: 100%; /* Use full width on mobile */
  margin: 0 auto;
  padding: 20px;
  background: var(--background-light);
  border-radius: var(--border-radius);
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  font-family: 'Segoe UI', sans-serif;
  overflow-wrap: break-word; /* Prevents text overflow */
  word-wrap: break-word;
}

.back-link {
  background: none;
  border: none;
  color: #555;
  cursor: pointer;
  font-size: 0.9rem;
  margin-bottom: 15px;
  padding: 0;
  display: inline-block;
}

.back-link:hover {
  color: var(--primary-color);
}

.content-grid {
  display: flex;
  flex-direction: column; /* Stack image and info vertically */
  gap: 25px;
}

.large-cover {
  max-width: 200px; /* Constrain image size on mobile */
  width: 50%;
  height: auto;
  display: block;
  margin: 0 auto; /* Center the image */
  border-radius: var(--border-radius);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.placeholder-cover {
  max-width: 200px;
  width: 50%;
  height: 300px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  border-radius: var(--border-radius);
  margin: 0 auto;
}

.info-column h1 {
  margin-top: 0;
  font-size: 1.8rem; /* Smaller font size for mobile */
  color: var(--text-color-dark);
  line-height: 1.2;
  text-align: center; /* Center title on mobile */
}

.meta-tags {
  margin: 10px 0;
  display: flex;
  gap: 10px;
  justify-content: center; /* Center tags on mobile */
}

.tag {
  background: #eef2f5;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  color: #555;
}

.description-box {
  margin-top: 20px;
  line-height: 1.6;
  color: #444;
  overflow-wrap: break-word;
}

.action-area {
  margin-top: 25px;
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: center; /* Center actions on mobile */
}

.ol-button {
  padding: 10px 20px;
  text-decoration: none;
  font-size: 0.9rem;
}

.ol-button:hover {
  background-color: var(--primary-color-hover);
}

/* --- Tablet Styles (min-width: 768px) --- */
@media (min-width: 768px) {
  .details-container {
    padding: 30px;
    overflow-wrap: break-word; /* Prevents text overflow */
    word-wrap: break-word;
  }

  .content-grid {
    display: grid;
    grid-template-columns: 250px 1fr; /* Two-column grid layout */
    gap: 30px;
  }

  .info-column {
    min-width: 0; /* Prevents grid blowout when content is wide */
  }

  .large-cover {
    width: 100%;
    max-width: none; /* Allow image to fill its column */
    margin: 0;
  }

  .info-column h1 {
    font-size: 2.5rem; /* Larger font for desktop */
    text-align: left; /* Align left on larger screens */
  }

  .meta-tags, .action-area {
    justify-content: flex-start; /* Align left on larger screens */
  }
}

/* --- Favorite Button Styles --- */
.btn-icon {
  background-color: #f0f0f0;
  color: #888;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  padding: 0;
  line-height: 1;
}

.btn-icon.is-favorite {
  background-color: #fdeaea;
  color: #e53e3e; /* Red for favorite */
}
</style>