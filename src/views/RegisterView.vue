<template>
  <div class="container mx-auto p-6 max-w-md">
    <h1 class="text-2xl font-bold mb-4">Registro</h1>
    <form @submit.prevent="register">
      <label class="block mb-2">Correo Electrónico:</label>
      <input v-model="email" type="email" required class="w-full p-2 border rounded mb-3" />

      <label class="block mb-2">Contraseña:</label>
      <input v-model="password" type="password" required class="w-full p-2 border rounded mb-3" />

      <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Registrarse
      </button>
    </form>
    <p class="mt-4 text-sm">¿Ya tienes una cuenta?
      <RouterLink to="/login" class="text-blue-500">Inicia sesión</RouterLink>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const email = ref("");
const password = ref("");

const register = async () => {
  try {
    await store.dispatch("register", { email: email.value, password: password.value });
    router.push("/login");
  } catch (error) {
    alert("Error en el registro: " + error.message);
  }
};
</script>
