// src/stores/auth.js
import { defineStore } from "pinia";
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // Ya no se guarda el token en localStorage, solo el rol
  const rol = ref(localStorage.getItem('userRole') || '')

  function setAuth(rolValue) {
    rol.value = rolValue
    localStorage.setItem('userRole', rolValue)
  }

  function clearAuth() {
    rol.value = ''
    localStorage.removeItem('userRole')
  }

  function getRol() {
    return rol.value
  }

  return { rol, setAuth, clearAuth, getRol }
})
