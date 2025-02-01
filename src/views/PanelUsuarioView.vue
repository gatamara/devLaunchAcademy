<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold mb-6">Settings</h1>

    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4">Edit Profile</h2>
      <div class="space-y-4">
        <div class="flex space-x-4">
          <button class="text-blue-500 hover:text-blue-700">Account</button>
          <button class="text-blue-500 hover:text-blue-700">Billing</button>
          <button class="text-blue-500 hover:text-blue-700">Subscriptions</button>
          <button class="text-blue-500 hover:text-blue-700">Notifications</button>
        </div>

        <div class="border-t pt-4">
          <h3 class="font-semibold mb-2">Profile Photo</h3>
          <div class="flex items-center space-x-4">
            <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Upload Photo</button>
            <button class="text-red-500 hover:text-red-700">Remove</button>
          </div>
          <div class="text-sm text-gray-600 mt-2">
            <p>Image requirements:</p>
            <ul class="list-disc list-inside">
              <li>Min. 400 x 400px</li>
              <li>Max. 2MB</li>
              <li>Your face or company logo</li>
            </ul>
          </div>
        </div>

        <div class="border-t pt-4">
          <h3 class="font-semibold mb-2">User Details</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input v-model="email" type="email" placeholder="Enter your email"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            </div>
            <!-- Otros campos de usuario pueden ir aquí -->
          </div>
        </div>

        <div class="border-t pt-4">
          <button @click="saveProfile"
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
          <p v-if="saveSuccess" class="text-sm text-green-600 mt-2">✓ Successfully Saved. Your profile settings have
            been saved.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const email = ref('');
const saveSuccess = ref(false);

onMounted(() => {
  const user = store.state.user;
  if (user) {
    email.value = user.email;
  }
});

const saveProfile = async () => {
  try {
    await store.dispatch('updateEmail', email.value);
    saveSuccess.value = true;
    setTimeout(() => {
      saveSuccess.value = false;
    }, 3000);
  } catch (error) {
    console.error("Error updating email:", error);
  }
};
</script>

<style scoped></style>
