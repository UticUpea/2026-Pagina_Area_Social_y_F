import axios from 'axios'

const API_BASE = process.env.VUE_APP_API_V2_ADMIN?.trim()
const API_TOKEN = process.env.VUE_APP_TOKEN_ADMIN?.trim() 
const INSTITUCION_ID = process.env.VUE_APP_ID_SERVICIO_ADMIN?.trim()

if (!API_BASE) {
  console.error('ERROR CRÍTICO: VUE_APP_API_V2_ADMIN no está configurada en .env')
  throw new Error('Falta configuración requerida: VUE_APP_API_V2_ADMIN')
}
 
const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

api.interceptors.request.use(
  config => {
    let token = null
    
    try {
      token = sessionStorage.getItem('auth_token')
    } catch (e) {
      console.warn('Error al obtener token:', e)
    }
    
    if (!token && API_TOKEN) {
      token = API_TOKEN
    }
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  error => Promise.reject(error)
)

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      try {
        sessionStorage.removeItem('auth_token')
      } catch (e) {
        console.warn('Error al limpiar token:', e)
      }
    }
    return Promise.reject(error)
  }
)

api.institucionId = INSTITUCION_ID

api.getImageUrl = (filename) => {
  if (!filename) {
    return ''
  }
  
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename.trim()
  }
  
  const cleanFilename = filename.trim().replace(/^\/+/, '')
  
  return `${API_BASE.replace('/api/v2', '')}/${cleanFilename}`
}

export const setAuthToken = (token) => {
  try {
    if (token) {
      sessionStorage.setItem('auth_token', token)
    } else {
      sessionStorage.removeItem('auth_token')
    }
  } catch (e) { 
    console.warn('Error al gestionar token:', e)
  }
}

export const getAuthToken = () => {
  try {
    return sessionStorage.getItem('auth_token')
  } catch (e) { 
    console.warn('Error al obtener token:', e)
    return null
  }
}

export const clearAuthToken = () => {
  try {
    sessionStorage.removeItem('auth_token')
  } catch (e) { 
    console.warn('Error al limpiar token:', e)
  }
}

export default api