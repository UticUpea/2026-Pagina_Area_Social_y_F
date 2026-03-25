<template>
  <div>

    <div v-if="apiError" class="container text-center py-5">
      <div class="alert alert-warning" role="alert">
        <i class="fa fa-exclamation-triangle fa-3x mb-3"></i>
        <h2 class="mb-3">Datos limitados disponibles</h2>
        <p class="mb-4">Algunos datos de la institución no están disponibles en este momento.</p>
        <div class="d-flex justify-content-center gap-3">
          <button @click="retryLoad" class="btn btn-primary">
            <i class="fa fa-refresh mr-2"></i>Reintentar
          </button>
          <router-link to="/" class="btn btn-outline-secondary">
            <i class="fa fa-home mr-2"></i>Continuar de todas formas
          </router-link>
        </div>
      </div>
    </div>

    <div v-else-if="isLoading" class="container text-center py-5">
      <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
        <span class="sr-only">Cargando...</span>
      </div>
      <p class="mt-3 text-muted">Cargando información de la institución...</p>
      <p class="text-muted small">ID: {{ institucionId }}</p>
    </div>

 
    <div v-else>
      <div class="fondo">
        <div class="background-fondo-1" style="left: 50%;">   
          <img :src="logoUrl" alt="Logo Institución" />   
        </div>
      </div>
      <HeaderCustom />
      <router-view />
      <FooterCustom /> 
    </div>
  </div>
</template>

<script>
import HeaderCustom from "@/components/HeaderCustom.vue";
import FooterCustom from "@/components/FooterCustom.vue";
import { mapState, mapGetters } from "vuex";
import api from "@/plugins/axios";

export default {
  name: "AppWrapper",
  
  components: {
    HeaderCustom,
    FooterCustom,
  },

  data() {
    return {
      isLoading: true,
      apiError: false,
      partialData: false,
    };
  },

  computed: {
    ...mapState([
      "Institucion",
      "InstitucionContenido",
      "InstitucionRecursos",
      "statusImg",
      "institucion_id"
    ]),
    
    ...mapGetters([
      'institucionLogo',
      'institucionColors',
      'portadas',
      'linksExternos'
    ]),

    institucionId() {
      return this.institucion_id;
    },

    logoUrl() {
      return this.institucionLogo;
    },

    institucionColors() {
      return this.Institucion?.Descripcion?.colorinstitucion?.[0] || {};
    }
  },

  methods: {
    applyThemeColors() {
      const colors = this.institucionColors;
      if (colors.color_primario) {
        document.documentElement.style.setProperty('--main-color', colors.color_primario);
      }
      if (colors.color_secundario) {
        document.documentElement.style.setProperty('--main-color-2', colors.color_secundario);
      }
      if (colors.color_terciario) {
        document.documentElement.style.setProperty('--main-color-3', colors.color_terciario);
      }
    },

    updateDocumentMeta() {
      const nombre = this.Institucion?.Descripcion?.institucion_nombre || 'UPEA';
      const logo = this.institucionLogo;
      
      const titleEl = document.querySelector("#title-page");
      if (titleEl) titleEl.innerHTML = nombre;
      document.title = nombre;
      
      const icoEl = document.querySelector("#ico");
      if (icoEl && logo) {
        icoEl.setAttribute("href", logo);
      }
    },

    setupCarouselBackgrounds() {
      const portadas = this.portadas;
      if (!portadas || portadas.length === 0) return;

      const applyBg = (selector, filename) => {
        const el = document.querySelector(selector);
        if (el && filename) {
          const imgUrl = api.getImageUrl(filename);
          el.setAttribute("style", `background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("${imgUrl}"); background-size: cover;`);
        }
      };

      if (portadas[0]?.portada_imagen) {
        applyBg(".banner-image-1", portadas[0].portada_imagen);
        applyBg(".banner-img", portadas[0].portada_imagen);
      }
      if (portadas[1]?.portada_imagen) {
        applyBg(".banner-image-2", portadas[1].portada_imagen);
      }
      if (portadas[2]?.portada_imagen) {
        applyBg(".banner-image-3", portadas[2].portada_imagen);
      }

      if (portadas.length > 1) {
        let index = 0;
        setInterval(() => {
          index = (index + 1) % portadas.length;
          if (portadas[index]?.portada_imagen) {
            applyBg(".banner-img", portadas[index].portada_imagen);
          }
        }, 5000);
      }
    },

    async loadInstitucionData() {
      this.isLoading = true;
      this.apiError = false;
      
      try {
        const result = await this.$store.dispatch('fetchInstitucionData');
        
        if (result.success) {
          this.applyThemeColors();
          this.updateDocumentMeta();
          this.setupCarouselBackgrounds();
        } else {
          this.apiError = true;
        }
      } catch (error) {
        this.apiError = true;
      } finally {
        this.isLoading = false;
        this.$store.commit('loading');
      }
    },

    retryLoad() {
      this.loadInstitucionData();
    }
  },

  async created() {
    await this.loadInstitucionData();
  }
};
</script>

<style scoped>
.spinner-border {
  width: 3rem;
  height: 3rem;
  border-width: 0.25rem;
}

.alert {
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.gap-3 {
  gap: 1rem;
}

.fa-3x {
  font-size: 3rem;
}
</style>