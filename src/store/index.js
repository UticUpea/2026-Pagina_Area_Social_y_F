import { createStore } from 'vuex'
import api from '@/plugins/axios'

if (!process.env.VUE_APP_API_V2_ADMIN?.trim()) {
  console.error('❌ ERROR: VUE_APP_API_V2_ADMIN no configurada')
}

export default createStore({
  state: {
    url_api: process.env.VUE_APP_API_V2_ADMIN?.trim(),
    institucion_id: process.env.VUE_APP_ID_SERVICIO_ADMIN?.trim(),
    
    getter: true,
    statusImg: true,
    Institucion: {},
    InstitucionContenido: {},
    InstitucionRecursos: {},
    InstitucionEventos: {},
    MenuConv: [],
    MenuCur: [],
    Links: [],
    InstitucionUpea: {},
  },

  getters: {

    institucionLogo: (state) => {
      const logo = state.Institucion?.Descripcion?.institucion_logo
      if (!logo) return ''
      return api.getImageUrl(logo)
    },
    
    institucionColors: (state) => {
      return state.Institucion?.Descripcion?.colorinstitucion?.[0] || {}
    },
    
    autoridadPrincipal: (state) => state.InstitucionContenido?.autoridad?.[0] || null,
    portadas: (state) => state.InstitucionContenido?.portada || [],
    videos: (state) => state.InstitucionContenido?.upea_videos || [],
    publicaciones: (state) => state.InstitucionRecursos?.upea_publicaciones || [],
    linksExternos: (state) => state.InstitucionRecursos?.linksExternoInterno || [],
    eventos: (state) => state.InstitucionEventos?.upea_evento || [],
    convocatorias: (state) => state.InstitucionEventos?.convocatorias || [],
    cursos: (state) => state.InstitucionEventos?.cursos || [],
    servicios: (state) => state.InstitucionEventos?.serviciosCarrera || [],
    ofertas: (state) => state.InstitucionEventos?.ofertasAcademicas || [],
    gacetas: (state) => state.InstitucionEventos?.upea_gaceta_universitaria || []
  },

  mutations: {
    loadOn() {
      const el = document.querySelector("#contened")
      if (el) el.style.visibility = "visible"
      window.scrollTo(0, 0)
    },
    loading() {
      const el = document.querySelector("#contened")
      if (el) el.style.visibility = "hidden"
      document.querySelector("body")?.classList.add("loaded")
    },
    clickLink(state) {
      window.scrollTo(0, 0)
      state.getter = true
    },
    idEncrypt() {},
    setInstitucion(state, data) {
      state.Institucion = data || {}
    },
    setInstitucionContenido(state, data) {
      state.InstitucionContenido = data || {}
    },
    setInstitucionRecursos(state, data) {
      state.InstitucionRecursos = data || {}
      if (data?.linksExternoInterno) {
        state.Links = data.linksExternoInterno.filter(l => l.estado === 1 || l.estado === "1")
      }
    },
    setInstitucionEventos(state, data) {
      state.InstitucionEventos = data || {}
      if (data?.convocatorias) {
        state.MenuConv = data.convocatorias.filter(c => c.con_estado === "1" || c.con_estado === 1)
      }
      if (data?.cursos) {
        state.MenuCur = data.cursos.filter(c => c.det_estado === "1" || c.det_estado === 1)
      }
    },
    setLinks(state, data) {
      state.Links = data || []
    },
    setMenuConv(state, data) {
      state.MenuConv = data || []
    },
    setMenuCur(state, data) {
      state.MenuCur = data || []
    },
    setGetter(state, value) {
      state.getter = value
    },
    setStatusImg(state, value) {
      state.statusImg = value
    },
  },

  actions: {
    async fetchInstitucionData({ commit, state }) {
      try {
        const id = state.institucion_id
        
        if (!id) {
          console.error('ERROR: institucion_id no configurada')
          return { success: false, error: new Error('Falta institucion_id') }
        }
        
        const [principal, contenido, recursos, eventos] = await Promise.allSettled([
          api.get(`/institucionesPrincipal/${id}`),
          api.get(`/institucion/${id}/contenido`),
          api.get(`/institucion/${id}/recursos`),
          api.get(`/institucion/${id}/gacetaEventos`)
        ])

        if (principal.status === 'fulfilled') {
          commit('setInstitucion', principal.value.data)
        } else {
          commit('setInstitucion', {})
        }

        if (contenido.status === 'fulfilled') {
          commit('setInstitucionContenido', contenido.value.data)
        } else {
          commit('setInstitucionContenido', {})
        }

        if (recursos.status === 'fulfilled') {
          commit('setInstitucionRecursos', recursos.value.data)
        } else {
          commit('setInstitucionRecursos', {})
        }

        if (eventos.status === 'fulfilled') {
          commit('setInstitucionEventos', eventos.value.data)
        } else {
          commit('setInstitucionEventos', {})
        }
        
        return { success: true }
      } catch (error) {
        return { success: false, error }
      }
    },

    async fetchInstitucionPrincipal({ commit, state }) {
      try {
        const { data } = await api.get(`/institucionesPrincipal/${state.institucion_id}`)
        commit('setInstitucion', data)
        return { success: true, data }
      } catch (error) {
        return { success: false, error }
      }
    },

    async fetchInstitucionContenido({ commit, state }) {
      try {
        const { data } = await api.get(`/institucion/${state.institucion_id}/contenido`)
        commit('setInstitucionContenido', data)
        return { success: true, data }
      } catch (error) {
        return { success: false, error }
      }
    },

    async fetchInstitucionRecursos({ commit, state }) {
      try {
        const { data } = await api.get(`/institucion/${state.institucion_id}/recursos`)
        commit('setInstitucionRecursos', data)
        return { success: true, data }
      } catch (error) {
        return { success: false, error }
      }
    },

    async fetchInstitucionEventos({ commit, state }) {
      try {
        const { data } = await api.get(`/institucion/${state.institucion_id}/gacetaEventos`)
        commit('setInstitucionEventos', data)
        return { success: true, data }
      } catch (error) {
        return { success: false, error }
      }
    },
  },
  
  modules: {}
})