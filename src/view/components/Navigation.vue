<script setup>
import {ref} from 'vue'
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
            <li>
                <router-link to="/covers" class="nav-link">
                    <i class="icon-covers"></i> Covers
                </router-link>
            </li>
            <li>
                <router-link to="/subjects" class="nav-link">
                    <i class="icon-subjects"></i> Subjects
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
.sidebar {
    width: 250px;
    background-color: #2c3e50;
    color: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.logo {
    text-align: center;
    margin-bottom: 30px;
}

.logo h1 {
    color: #42b983;
    margin-bottom: 5px;
}

.nav-menu {
    list-style: none;
    padding: 0;
}

.nav-link {
    display: flex;
    align-items: center;
    color: white;
    text-decoration: none;
    padding: 10px 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.nav-link:hover, .nav-link.router-link-active {
    background-color: #42b983;
}

.icon-books, .icon-authors, .icon-covers, .icon-subjects {
    margin-right: 10px;
}
</style>
