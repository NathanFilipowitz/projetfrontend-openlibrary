<script setup>
import {ref} from 'vue'
</script>

<template>
    <nav class="sidebar">
        <div class="logo">
            <h1>OpenLibrary</h1>
            <p>Data Explorer</p>
        </div>
        <div class="routing">
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
                    <router-link to="/subjects" class="nav-link">
                        <i class="icon-subjects"></i> Subjects
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style scoped>
.sidebar {
    width: 100%;
    background-color: #2c3e50;
    color: white;
    padding: 10px 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
}

.logo {
    text-align: left;
    margin-bottom: 0;
}

.logo h1 {
    color: #42b983;
    margin: 0;
    font-size: 1.2rem;
}

.logo p {
    display: none;
}

.nav-menu {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 10px;
}

.nav-link {
    display: flex;
    align-items: center;
    color: white;
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    font-size: 0.9rem;
}

.nav-link:hover, .nav-link.router-link-active {
    background-color: #42b983;
}

.icon-books, .icon-authors, .icon-covers, .icon-subjects {
    margin-right: 5px;
}

@media (min-width: 768px) {
    .sidebar {
        width: 250px;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        padding: 20px;
    }

    .logo {
        text-align: center;
        margin-bottom: 30px;
    }

    .logo h1 {
        margin-bottom: 5px;
        font-size: 2em;
    }

    .logo p {
        display: block;
        margin: 0;
    }

    .nav-menu {
        display: block;
    }

    .nav-link {
        padding: 10px 15px;
        margin-bottom: 10px;
        font-size: 1rem;
    }

    .icon-books, .icon-authors, .icon-covers, .icon-subjects {
        margin-right: 10px;
    }
}
</style>
