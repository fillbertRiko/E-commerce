<script setup>
import {RouterLink, RouterView} from 'vue-router';
</script>

<template>
  <header>
    <nav>
      <RouterLink to ="/" class="nav-link">Home</RouterLink>
      <div>
        <RouterLink to="/register" class="nav-link">Register</RouterLink>
      </div>
    </nav>
  </header>

  <RouterView />
</template>