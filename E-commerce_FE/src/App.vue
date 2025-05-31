<script setup>
import {RouterLink, RouterView} from 'vue-router';
</script>

<template>
  <header>
    <nav>
      <RouterLink :to="{ name: 'home' }" class="nav-link">Home</RouterLink>
      <div>
        <RouterLink :to="{ name: 'register' }" class="nav-link">Register</RouterLink>
      </div>
    </nav>
  </header>

  <RouterView />
</template>