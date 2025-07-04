import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import Login from '@/views/Login.vue'
import PaginaPrincipal from '@/views/PaginaPrincipal.vue'
import CrearUsuario from '@/views/CrearUsuario.vue'
import ConsultarUsuarios from '@/views/ConsultarUsuarios.vue'
import IngresarSiniestro from '@/views/IngresarSiniestro.vue'
import ConsultarSiniestro from '@/views/ConsultarSiniestro.vue'

/**
 * Definición de rutas de la aplicación Vue Router.
 * @type {Array<import('vue-router').RouteRecordRaw>}
 */
const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/pagina_principal',
    name: 'PaginaPrincipal',
    component: PaginaPrincipal,
    meta: { requiresAuth: true } // ✅ protegida
  },
  {
    path: '/crear_usuario',
    name: 'CrearUsuario',
    component: CrearUsuario,
    meta: { requiresAuth: true } // ✅ protegida
  },
  {
    path: '/listar_usuarios',
    name: 'ConsultarUsuarios',
    component: ConsultarUsuarios,
    meta: { requiresAuth: true } // ✅ protegida
  },
  {
    path: '/ingresar_siniestro',
    name: 'IngresarSiniestro',
    component: IngresarSiniestro,
    meta: { requiresAuth: true } // ✅ protegida
  },
  {
    path: '/consultar_siniestro',
    name: 'ConsultarSiniestro',
    component: ConsultarSiniestro,
    meta: { requiresAuth: true } // ✅ protegida
  },
]

/**
 * Instancia principal del router de Vue.
 * @type {import('vue-router').Router}
 */
const router = createRouter({
  history: createWebHistory(), // Usar la raíz del frontend, no la URL del backend
  routes
})

/**
 * Middleware global para proteger rutas que requieren autenticación.
 * Redirige a /login si no hay rol de usuario en localStorage.
 * @param {import('vue-router').RouteLocationNormalized} to
 * @param {import('vue-router').RouteLocationNormalized} from
 * @param {Function} next
 */
router.beforeEach((to, from, next) => {
  // Solo revisa el rol, ya no el token
  const rol = localStorage.getItem('userRole');
  if (to.meta.requiresAuth && !rol) {
    next('/login');
  } else {
    next();
  }
});

export default router;
