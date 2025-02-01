<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-4">{{ curso?.nombre || 'Curso no encontrado' }}</h1>

    <p class="text-gray-700">{{ curso?.descripcion }}</p>
    <span class="block text-sm text-blue-500 mt-2">Duración: {{ curso?.duracion }}</span>
    <span class="block text-sm text-gray-500">Inicio: {{ curso?.fecha_inicio }}</span>

    <h2 class="text-2xl font-semibold mt-6">Temario</h2>
    <ul class="list-disc list-inside text-gray-600">
      <li v-for="tema in curso?.temario" :key="tema">{{ tema }}</li>
    </ul>

    <h2 class="text-2xl font-semibold mt-6">Requisitos</h2>
    <ul class="list-disc list-inside text-gray-600">
      <li v-for="req in curso?.requisitos" :key="req">{{ req }}</li>
    </ul>

    <div class="mt-6 flex gap-4">
      <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
        Registrarse en el curso
      </button>
      <button @click="agregarAlCarrito"
        class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
        Agregar al carrito
      </button>
    </div>

    <!-- Mensaje de confirmación -->
    <div v-if="mostrarMensaje" class="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
      {{ mensaje }}
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const store = useStore();
const cursos = computed(() => store.getters.getCursos);


const curso = computed(() => cursos.value.find(c => c.id === parseInt(route.params.id)));


const mostrarMensaje = ref(false);
const mensaje = ref('');


const agregarAlCarrito = () => {

  mostrarMensaje.value = true;
  mensaje.value = `"${curso.value.nombre}" fue agregado al carrito correctamente.`;


  setTimeout(() => {
    mostrarMensaje.value = false;
  }, 3000);
};

onMounted(() => {
  if (!cursos.value.length) {
    store.dispatch('fetchCursos');
  }
});
</script>
