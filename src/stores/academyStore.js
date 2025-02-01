import { loginFirebase, logoutFirebase, registerFirebase } from '@/services/authService';
import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,
    isAuthenticated: false,
    cursos: []
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.user;
      state.isAuthenticated = payload.isAuthenticated;
    },
    setCursos(state, cursos) {
      state.cursos = cursos;
    }
  },
  actions: {
    async fetchCursos({ commit }) {
      try {
        const response = await fetch('/src/services/cursos.json'); // Ruta del archivo JSON
        const data = await response.json();
        commit('setCursos', data.cursos);
      } catch (error) {
        console.error('Error al cargar los cursos:', error);
      }
    },
    async register({ commit }, credentials) {
      try {
        const user = await registerFirebase(credentials);
        commit('setUser', { user, isAuthenticated: false });
      } catch (error) {
        console.error("Error al registrar:", error);
        throw error; // Puedes manejar este error en el componente
      }
    },
    async login({ commit }, credentials) {
      try {
        const user = await loginFirebase(credentials);
        commit('setUser', { user, isAuthenticated: true });
      } catch (error) {
        console.error("Error en el login:", error);
        throw error;
      }
    },
     async logout() {
          await logoutFirebase();
          this.user = null;
          this.isAuthenticated = false;
        },
        setUser(user, isAuthenticated) {
          this.user = user;
          this.isAuthenticated = isAuthenticated;
        }
  },
  getters: {
    getCursos: (state) => state.cursos
  }
});
