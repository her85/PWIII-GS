<template>
  <div class="contenedor-inicio">
    <section class="container text-center">
      <div>
        <h1>Iniciar sesión</h1>
      </div>
      <div class="row justify-content-md-center">
        <p v-if="error" style="color: red;">{{ error }}</p>
        <form @submit.prevent="login">
          <label for="username" class="col-sm-2 col-form-label col-form-label-lg">Usuario:</label>
          <input type="text" id="username" v-model="username" required />
          <br />
          <label for="password" class="col-sm-2 col-form-label col-form-label-lg">Contraseña:</label>
          <input type="password" id="password" v-model="password" required />
          <br />
          <div class="boton-inicio">
            <button type="submit" class="btn btn-primary btn-block iniciar-sesion">Aceptar</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

import { useAuthStore } from '@/stores/auth'

const username = ref('')
const password = ref('')
const error = ref(null)
const router = useRouter()
const auth = useAuthStore()

const login = async () => {
  try {
    const response = await api.post('/login', {
      username: username.value,
      password: password.value
    })

    if (response.status === 200) {
      const token = response.data.token
      const role = response.data.role; // backend devuelve el rol en la respuesta
      if (token && role) {
        auth.setAuth(token, role)
        console.log('Login exitoso, token:', token, 'rol:', role);
        router.push('/pagina_principal');
      } else {
        error.value = 'No se recibió el token o el rol del servidor.';
        console.error('Login exitoso, pero sin token o rol.');
      }
    } else {
      error.value = response.data?.error || 'Error de inicio de sesión.'
      console.error('Error en login:', response.data)
    }
  } catch (err) {
    console.error('Error al intentar iniciar sesión:', err)
    error.value = 'Credenciales incorrectas.'
    router.push('/login')
  }
}
</script>

<style scoped>
/* Aquí puedes incluir tus estilos personalizados */
</style>
