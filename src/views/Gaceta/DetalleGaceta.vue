<template>
  <div>
    <!-- Page Header Start -->
    <div class="carousel" style="height: calc(50vh - 35px);">
      <div class="carousel-item" style="height: calc(50vh - 35px);">
        <div class="carousel-img container-background-3" style="position: absolute; background-size: cover;"></div>
        <div class="carousel-img banner-img" style="position: absolute;"></div>
        
        <div class="carousel-text zoomIn animated">
          <h1 class="display-4 text-white mb-3 mt-0 mt-lg-5">GACETAS</h1>
          <div class="d-inline-flex text-white">
            <p class="m-0"><a class="text-white" href="/">{{ institucionNombre }}</a></p>
            <p class="m-0 px-2">/</p>
            <p class="m-0">DETALLE DE GACETA</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container text-center py-5">
      <div class="row">
        <!-- Main Content -->
        <div class="col-lg-8 zoomIn animated">
          
          
          <div v-if="loading" class="text-center py-5">
            <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
              <span class="sr-only">Cargando...</span>
            </div>
            <p class="mt-3 text-muted">Cargando información de la gaceta...</p>
          </div>

        
          <div v-else-if="errorGet" class="text-center py-5">
            <i class="fa fa-file-excel fa-4x text-danger mb-3" style="opacity: 0.5;"></i>
            <h2 class="mb-3">Gaceta no encontrada</h2>
            <p class="text-muted mb-4">La gaceta que buscas no existe o fue eliminada.</p>
            <button class="btn btn-primary" @click="clickBack">
              <i class="fa fa-arrow-left mr-2"></i>Volver atrás
            </button>
          </div>

         
          <div v-else-if="gaceta" class="position-relative">
            
            <!-- Título -->
            <h3 class="m-0 text-left">{{ gaceta.gaceta_titulo }}</h3>
            
            <!-- Información -->
            <div class="pt-4 pb-2 text-left"> 
              <p>
                <i class="fa fa-calendar"></i> 
                <b>Fecha:</b> {{ formatDate(gaceta.gaceta_fecha) }}
              </p>
              <p v-if="gaceta.gaceta_tipo">
                <i class="fa fa-tag"></i> 
                <b>Tipo:</b> {{ gaceta.gaceta_tipo }}
              </p>
              <p v-if="gaceta.gaceta_estado !== undefined">
                <i class="fa fa-check-circle"></i> 
                <b>Estado:</b> {{ gaceta.gaceta_estado === "1" || gaceta.gaceta_estado === 1 ? "Activo" : "Inactivo" }}
              </p>
            </div>

            <!-- Documento PDF -->
            <div class="mb-5 text-left">
              <b>Documento PDF</b>
              <div class="mt-3">
                <a :href="getPdfUrl(gaceta.gaceta_documento)" target="_blank" class="btn btn-primary mb-3">
                  <i class="fa fa-download mr-2"></i>Descargar PDF
                </a>
                <vue-pdf-embed
                  :source="getPdfUrl(gaceta.gaceta_documento)"
                  :disableTextLayer="true"
                  style="width: 100%; border: 1px solid #ddd; border-radius: 8px;"
                />
              </div>
            </div>

            <!-- Botón volver -->
            <div class="text-center mt-4">
              <button class="btn btn-color" @click="clickBack">
                <i class="fa fa-arrow-left mr-2"></i>Volver atrás
              </button>
            </div>
            
          </div>

         
          <div v-else class="text-center py-5">
            <i class="fa fa-folder-open fa-4x text-muted mb-3" style="opacity: 0.5;"></i>
            <h2 class="mb-3">Sin información disponible</h2>
            <p class="text-muted">No se pudo cargar la información de esta gaceta.</p>
            <button class="btn btn-primary" @click="clickBack">
              <i class="fa fa-arrow-left mr-2"></i>Volver atrás
            </button>
          </div>

        </div>

        <!-- Sidebar -->
        <div class="col-lg-4 mt-5 mt-lg-0">
          <SidebarCustom></SidebarCustom>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import SidebarCustom from "@/components/SidebarCustom.vue";
import VuePdfEmbed from "vue-pdf-embed";
import api from "@/plugins/axios";

export default {
  name: "DetalleGaceta",
  
  components: { 
    SidebarCustom, 
    VuePdfEmbed 
  },
  
  data() {
    return {
      errorGet: false,
      loading: true,
    };
  },
  
  computed: {
    ...mapState(["Institucion"]),
    ...mapGetters(['gacetas']),

    institucionNombre() {
      return this.Institucion?.Descripcion?.institucion_nombre || 'la Carrera';
    },
    
    gaceta() {
      const id = parseInt(this.$route.params.idGac);
      return this.gacetas.find(g => g.gaceta_id === id) || null;
    }
  },

  methods: {
    getPdfUrl(filename) {
      return api.getImageUrl(filename);
    },
    
    formatDate(fecha) {
      if (!fecha) return '';
      const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
      ];
      const fechaCadena = fecha.substr(0, 10);
      const fechaArray = fechaCadena.split("-");
      return `${fechaArray[2]} de ${meses[parseInt(fechaArray[1]) - 1]} de ${fechaArray[0]}`;
    },
    
    clickBack() {
      this.$store.commit("clickLink");
      this.$router.go(-1);
    }
  },

  watch: {
    gaceta: {
      handler(newVal) {
        if (newVal) {
          this.errorGet = false;
          this.loading = false;
          this.$store.commit("loading");
        } else if (this.gacetas.length > 0) {
          this.errorGet = true;
          this.loading = false;
          console.warn('Gaceta no encontrada con ID:', this.$route.params.idGac);
        }
      },
      immediate: true
    }
  },

  async mounted() {
    this.loading = true;
    try {
      await this.$store.dispatch('fetchInstitucionData');
    } catch (error) {
      console.error('Error cargando gaceta:', error);
      this.errorGet = true;
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.vue-pdf-embed {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.btn-color {
  padding: 10px 25px;
  background-color: var(--main-color, #007bff);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-color:hover {
  background-color: var(--main-color-2, #0056b3);
}

.btn-primary {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
  color: white;
}

/* Loading Spinner */
.spinner-border {
  width: 3rem;
  height: 3rem;
  border-width: 0.25rem;
}

/* Error/Empty State Icons */
.fa-4x {
  font-size: 4rem;
}

.text-muted {
  color: #6c757d !important;
}

.text-danger {
  color: #dc3545 !important;
}

/* Responsive */
@media (max-width: 768px) {
  .carousel-text h1 {
    font-size: 2rem !important;
  }
  
  .vue-pdf-embed {
    width: 100% !important;
  }
  
  .fa-4x {
    font-size: 3rem;
  }
}
</style>