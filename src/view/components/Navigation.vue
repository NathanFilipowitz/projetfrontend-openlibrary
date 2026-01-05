<script setup>
import { ref } from 'vue'
</script>

<template>
  <nav class="sidebar">
    <div class="logo">
      <h1>OpenLibrary</h1>
      <p>Data Explorer</p>
    </div>
    <ul class="nav-menu">
      <li>
        <router-link to="/books" class="nav-link">
          <i class="icon-books"></i> Books
        </router-link>
      </li>
      <li>
        <router-link to="/authors" class="nav-link">
          <i class="icon-authors"></i> Authors
        </router-link>
      </li>
<!--      <li>-->
<!--        <router-link to="/covers" class="nav-link">-->
<!--          <i class="icon-covers"></i> Covers-->
<!--        </router-link>-->
<!--      </li>-->
      <li>
        <router-link to="/subjects" class="nav-link">
          <i class="icon-subjects"></i> Subjects
        </router-link>
      </li>
    </ul>
  </nav>
</template>
