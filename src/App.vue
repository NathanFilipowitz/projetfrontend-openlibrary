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
  height: 100vh;
  background-color: #f4f4f8;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
