<script setup>
import { RouterView } from 'vue-router';
import NavLateral from './components/NavLateral.vue';
import { observeAuthState } from './services/authService';
observeAuthState();
</script>

<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <NavLateral class="w-56 bg-gray-100 shadow-md" />

    <!-- Contenido dinámico -->
    <div class="flex-1 overflow-auto p-6">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
