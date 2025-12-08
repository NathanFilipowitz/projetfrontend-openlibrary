<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getBookDetails } from '@/model/books.js'


const route = useRoute() // get current route information.
const router = useRouter()


const book = ref(null)
const isLoading = ref(true)
const error = ref(null)

// Get the book's ID from the URL
const bookId = route.params.id

onMounted(async () => {
  try {
    book.value = await getBookDetails(bookId)
    console.log("Data returned from getBookDetails:", book.value)
  } catch (err) {
    error.value = "Could not load book details."
    console.error(err)
  } finally {
    isLoading.value = false
  }
})

const bookDescription = computed(() => {
  if (!book.value || !book.value.description) return 'No description available.'
  return typeof book.value.description === 'string'
      ? book.value.description
      : book.value.description.value
})

// create a direct link to the book on OpenLibrary
const openLibraryLink = computed(() => `https://openlibrary.org/works/${bookId}`)

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
              :src="`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`"
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
            <a :href="openLibraryLink" target="_blank" class="ol-button">
              View on OpenLibrary ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
//Style made by gemini (AI)
<style scoped>
.details-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  font-family: 'Segoe UI', sans-serif;
}

.back-link {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 0.9rem;
  margin-bottom: 20px;
  padding: 0;
}

.back-link:hover {
  color: #42b983;
  text-decoration: underline;
}

.content-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
}

.large-cover {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.placeholder-cover {
  width: 100%;
  height: 400px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  border-radius: 8px;
}

.info-column h1 {
  margin-top: 0;
  font-size: 2.5rem;
  color: #2c3e50;
  line-height: 1.2;
}

.meta-tags {
  margin: 15px 0;
  display: flex;
  gap: 10px;
}

.tag {
  background: #eef2f5;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  color: #555;
}

.description-box {
  margin-top: 30px;
  line-height: 1.6;
  color: #444;
}

.ol-button {
  display: inline-block;
  margin-top: 30px;
  background-color: #42b983;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s;
}

.ol-button:hover {
  background-color: #3aa876;
}

/* Loading/Error Styles */
.state-message {
  text-align: center;
  padding: 50px;
  color: #666;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b983;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 700px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  .large-cover {
    max-width: 200px;
    margin: 0 auto;
    display: block;
  }
}
</style>