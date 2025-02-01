import { createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import academyStore from '@/stores/academyStore';
import NotFoundView from '@/views/NotFoundView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/curso',
      name: 'curso',
      component: () => import('../views/CursoView.vue'),
      meta: { requiresAuth: true },
    },
    { path: '/curso/:id',
       name: 'curso-detalle',
       component: () => import('@/views/CursoDetalleView.vue'),
       meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/PanelUsuarioView.vue'),
      meta: { requiresAuth: true },
    },
    // Ruta 404
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

const store = academyStore;

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !store.state.isAuthenticated) {
    next({ name: 'login' }); // Redirige al login si no estas autenticado
  } else {
    next(); // Continúa la navegación
  }
});
export default router
