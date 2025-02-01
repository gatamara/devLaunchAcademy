<template>
  <div class="w-56 h-full bg-gray-100 shadow-md flex flex-col justify-between p-4">
    <!-- Logo -->
    <div class="text-xl font-bold flex items-center gap-2 p-2 text-blue-600">
      DevLaunch Academy
    </div>
    <!-- Buscador -->
    <div class="relative mt-4">
      <label class="input">
        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input type="search" required placeholder="Search" />
      </label>
    </div>
    <!-- Menú de navegación -->
    <ul class="mt-6 space-y-2">
      <li>
        <RouterLink to="/curso" class="flex items-center gap-3 p-2 text-gray-700 hover:bg-gray-200 rounded-md">
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          Cursos
        </RouterLink>
      </li>
    </ul>

    <!-- Botones en la parte inferior -->
    <div class="mt-auto space-y-2">
      <template v-if="!isAuthenticated">
        <router-link to="/login">
          <button
            class="w-full py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition mb-4">
            Log In
          </button>
        </router-link>
        <router-link to="/register">
          <button class="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Sign Up Free
          </button>
        </router-link>
      </template>
      <template v-else>
        <button @click="logout"
          class="w-full py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition mb-4">
          Cerrar Sesión
        </button>
        <router-link to="/user">
          <button class="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Panel de Usuario
          </button>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script setup>

import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const isAuthenticated = computed(() => store.state.isAuthenticated);

const logout = async () => {
  try {
    await store.dispatch('logout');
    router.push({ name: 'login' });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
</script>
