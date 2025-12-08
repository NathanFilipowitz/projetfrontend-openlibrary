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
  min-height: 100vh; /* Use min-height to allow content to grow */
  background-color: #f4f4f8;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto; /* Allows only main content to scroll */
}

/* AI: how to make the navbar go on top when on smartphone (responsive layout)*/
/* Responsive styles for mobile and smaller tablets */
@media (max-width: 767px) {
  .app-container {
    flex-direction: column; /* Stack navigation and main content vertically */
  }

  .main-content {
    flex-grow: 1; /* Ensure it still fills available space */
  }
}
</style>
