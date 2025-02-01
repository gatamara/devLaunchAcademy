<template>
  <HeroHome />
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Cursos Disponibles</h1>
    <div class="flex flex-wrap gap-2 justify-between" v-if="cursos.length">
      <div v-for="curso in cursos" :key="curso.id" class="card bg-base-100 w-80 shadow-sm">
        <figure>
          <img
            src="https://blog.lioren.io/wp-content/uploads/2022/01/herramientas-y-recursos-para-crear-curso-online.png"
            alt="Curso" class="w-full h-48 object-cover" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ curso.nombre }}</h2>
          <p>{{ curso.descripcion }}</p>
          <span class="text-sm text-blue-500">Duración: {{ curso.duracion }}</span>
          <p>Valor: {{ curso.precio }}</p>
          <div class="card-actions justify-end">
            <RouterLink :to="`/curso/${curso.id}`" class="btn btn-primary">
              Ver detalles →
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <p v-else>Cargando cursos...</p>
  </div>
</template>

<script setup>
import HeroHome from '@/components/HeroHome.vue';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const cursos = computed(() => store.getters.getCursos);

onMounted(() => {
  store.dispatch('fetchCursos');
});
</script>



<style></style>
