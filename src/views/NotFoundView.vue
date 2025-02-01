<!-- views/NotFoundView.vue -->
<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 class="text-6xl font-bold text-gray-800">404</h1>
    <p class="text-xl text-gray-600 mt-4">Página no encontrada</p>
    <router-link to="/" class="mt-6 text-blue-500 hover:text-blue-700">
      Volver al inicio
    </router-link>
  </div>
</template>

<script setup>
// No se necesita lógica adicional para este componente
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>
