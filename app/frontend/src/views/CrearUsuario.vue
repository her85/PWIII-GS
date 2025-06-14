<!--src/views/CrearUsuario.vue-->
<template>
  <div class="contenedor-inicio bg-light d-flex align-items-center justify-content-center min-vh-100">
    <div class="crear-usuario-card card col-12 col-md-7 col-lg-5 p-4 text-center">
      <section>
        <div v-if="isAdmin">
          <h3 class="mb-3 fw-bold text-primary">Crear nuevo usuario</h3>
          <form id="crear-usuario-form" @submit.prevent="handleCreateUser" class="text-start">
            <div class="mb-3">
              <label for="username" class="form-label">Nombre de usuario</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="nuevoUsuario.username"
                placeholder="Nombre de usuario"
                required
                autocomplete="username"
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Contraseña</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="nuevoUsuario.password"
                placeholder="Contraseña"
                required
                autocomplete="new-password"
              />
            </div>
            <div class="mb-3">
              <label for="role" class="form-label">Rol</label>
              <select class="form-select" id="role" v-model="nuevoUsuario.role" required>
                <option value="Administrador">Administrador</option>
                <option value="Tramitador">Tramitador</option>
                <option value="Consulta">Consulta</option>
              </select>
            </div>
            <div class="d-grid gap-2 mt-3">
              <button type="submit" class="btn btn-primary btn-lg" :disabled="isCreating">
                <span v-if="isCreating" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {{ isCreating ? 'Creando...' : 'Crear usuario' }}
              </button>
            </div>
            <transition name="fade">
              <div v-if="success" class="alert alert-success mt-3 text-center">{{ success }}</div>
            </transition>
            <transition name="fade">
              <div v-if="error" class="alert alert-danger mt-3 text-center">{{ error }}</div>
            </transition>
          </form>
        </div>
        <div v-else>
          <p class="mt-3 alert alert-warning">No tienes permisos para ver esta página.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useForm } from '@/composables/useForm'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUserActions } from '@/composables/useUserActions'
import { useFeedback } from '@/composables/useFeedback'

const authStore = useAuthStore()
const { createUser, isCreating } = useUserActions()
const isAdmin = computed(() => authStore.getRol() === 'Administrador')

const {
  form: nuevoUsuario,
  validate,
  resetForm
} = useForm({ username: '', password: '', role: 'Consulta' })

const { error, success, setError, setSuccess, clearFeedback } = useFeedback()

const handleCreateUser = async () => {
  if (!isAdmin.value) return
  clearFeedback()
  if (!validate()) return
  const creationSuccessful = await createUser(nuevoUsuario.value)
  if (creationSuccessful) {
    resetForm()
    setSuccess('Usuario creado con éxito.')
  } else {
    setError('Error al crear el usuario.')
  }
}
</script>

<style scoped>
.crear-usuario-card {
  max-width: 420px;
  margin: 0 auto;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.08);
  background: #fff;
}
</style>
