import axios from 'axios'

const API_BASE = process.env.VUE_APP_API_V2_ADMIN?.trim()
const API_TOKEN = process.env.VUE_APP_TOKEN_ADMIN?.trim()
const UPLOADS_URL = process.env.VUE_APP_UPLOADS_URL?.trim()
const INSTITUCION_ID = process.env.VUE_APP_ID_SERVICIO_ADMIN?.trim()

if (!API_BASE) {
  console.error('❌ ERROR CRÍTICO: VUE_APP_API_V2_ADMIN no está configurada en .env')
  throw new Error('Falta configuración requerida: VUE_APP_API_V2_ADMIN')
}

if (!UPLOADS_URL) {
  console.error('❌ ERROR CRÍTICO: VUE_APP_UPLOADS_URL no está configurada en .env')
  throw new Error('Falta configuración requerida: VUE_APP_UPLOADS_URL')
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
      // eslint-disable-next-line no-console
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
        // eslint-disable-next-line no-console
        console.warn('Error al limpiar token:', e)
      }
    }
    return Promise.reject(error)
  }
)
api.uploadsUrl = UPLOADS_URL
api.institucionId = INSTITUCION_ID

api.getImageUrl = (filename) => {
  if (!filename) return ''
  
  if (filename.startsWith('http')) {
    return filename
  }
  
  const base = UPLOADS_URL.endsWith('/') ? UPLOADS_URL.slice(0, -1) : UPLOADS_URL
  const cleanFilename = filename.startsWith('/') ? filename.slice(1) : filename
  
  if (!cleanFilename.includes('uploads/')) {
    return `${base}/uploads/${cleanFilename}`
  }
  
  return `${base}/${cleanFilename}`
}

export const setAuthToken = (token) => {
  try {
    if (token) {
      sessionStorage.setItem('auth_token', token)
    } else {
      sessionStorage.removeItem('auth_token')
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Error al gestionar token:', e)
  }
}

export const getAuthToken = () => {
  try {
    return sessionStorage.getItem('auth_token')
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Error al obtener token:', e)
    return null
  }
}

export const clearAuthToken = () => {
  try {
    sessionStorage.removeItem('auth_token')
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Error al limpiar token:', e)
  }
}

export default api