<script setup>
import { ref } from 'vue'
import Navigation from '@/view/components/Navigation.vue'
</script>

<template>
  <div class="app-container">
    <Navigation />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column; /* Mobile-first: stack nav and content vertically by default */
  min-height: 100vh; /* Use min-height to allow content to grow */
  background-color: #f4f4f8;
}

.main-content {
  flex-grow: 1;
  padding: 15px; /* Reduced padding for mobile */
  overflow-y: auto; /* Allows only main content to scroll */
}

@media (min-width: 768px) {
  .app-container {
    flex-direction: row; /* Side-by-side layout on larger screens */
  }

  .main-content {
    padding: 30px; /* Restore more generous padding */
  }
}
</style>
