// CursoView.spec.js
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import CursoView from '@/views/CursoView.vue'; // Ajusta la ruta según tu estructura de proyecto
import HeroHome from '@/components/HeroHome.vue'; // Ajusta la ruta según tu estructura de proyecto
import { createRouter, createWebHistory } from 'vue-router';
import { createStore } from 'vuex';

// Mock de Vuex Store
const mockStore = createStore({
  state: {
    cursos: [
      {
        id: 1,
        nombre: 'Curso de Vue.js',
        descripcion: 'Aprende Vue.js desde cero',
        duracion: '10 horas',
        precio: '$50',
      },
      {
        id: 2,
        nombre: 'Curso de React',
        descripcion: 'Aprende React desde cero',
        duracion: '12 horas',
        precio: '$60',
      },
    ],
  },
  getters: {
    getCursos: (state) => state.cursos,
  },
  actions: {
    fetchCursos: vi.fn(), // Mock de la acción fetchCursos
  },
});

// Mock de Vue Router
const mockRouter = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/curso/:id', component: {} },
  ],
});

describe('CursoView', () => {
  it('debe renderizar correctamente', () => {
    const wrapper = mount(CursoView, {
      global: {
        plugins: [mockStore, mockRouter],
        components: {
          HeroHome,
        },
      },
    });

    // Verifica que el componente se renderiza
    expect(wrapper.exists()).toBe(true);
  });

  it('debe mostrar los cursos correctamente', async () => {
    const wrapper = mount(CursoView, {
      global: {
        plugins: [mockStore, mockRouter],
        components: {
          HeroHome,
        },
      },
    });

    // Verifica que los cursos se muestran
    const cursos = wrapper.findAll('.card');
    expect(cursos.length).toBe(2); // Verifica que hay 2 cursos

    // Verifica que el nombre del primer curso es correcto
    expect(cursos[0].find('.card-title').text()).toBe('Curso de Vue.js');
    expect(cursos[1].find('.card-title').text()).toBe('Curso de React');
  });


});
