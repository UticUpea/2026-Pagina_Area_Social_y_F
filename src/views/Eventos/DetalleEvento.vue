<template>
  <div>
    <!-- Page Header Start -->
    <div class="carousel" style="height: calc(50vh - 35px);">
      <div class="carousel-item" style="height: calc(50vh - 35px);">
        <div class="carousel-img container-background-3" style="position: absolute; background-size: cover;"></div>
        <div class="carousel-img banner-img" style="position: absolute;"></div>
        
        <div class="carousel-text zoomIn animated">
          <h1 class="display-4 text-white mb-3 mt-0 mt-lg-5">EVENTOS</h1>
          <div class="d-inline-flex text-white">
            <p class="m-0"><a class="text-white" href="/">{{ institucionNombre }}</a></p>
            <p class="m-0 px-2">/</p>
            <p class="m-0">DETALLE DEL EVENTO</p>
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
            <p class="mt-3 text-muted">Cargando información del evento...</p>
          </div>

        
          <div v-else-if="errorGet" class="text-center py-5">
            <i class="fa fa-calendar-times fa-4x text-danger mb-3" style="opacity: 0.5;"></i>
            <h2 class="mb-3">Evento no encontrado</h2>
            <p class="text-muted mb-4">El evento que buscas no existe o fue eliminado.</p>
            <button class="btn btn-primary" @click="clickBack">
              <i class="fa fa-arrow-left mr-2"></i>Volver atrás
            </button>
          </div>

      
          <div v-else-if="evento" class="position-relative">
            
            <!-- Imagen principal -->
            <a :href="getImageUrl(evento.evento_imagen)" target="_blank">
              <img 
                :src="getImageUrl(evento.evento_imagen)"
                alt="img"
                style="cursor: zoom-in; width: 100%; border-radius: 8px;"
              />
            </a>
            
            <!-- Título -->
            <h3 class="m-0 mt-3 text-left">{{ evento.evento_titulo }}</h3>
            
            <!-- Información del evento -->
            <div class="pt-4 pb-2 text-left"> 
              <p>
                <i class="fa fa-calendar"></i> 
                <b>Fecha:</b> {{ formatDate(evento.evento_fecha) }}
              </p>
              <p>
                <i class="fa fa-clock"></i> 
                <b>Hora:</b> {{ evento.evento_hora }}
              </p>
              <p>
                <i class="fa fa-map-marker"></i> 
                <b>Lugar:</b> {{ evento.evento_lugar }}
              </p>
              <p v-if="evento.tipo_evento">
                <i class="fa fa-tag"></i> 
                <b>Tipo:</b> {{ evento.tipo_evento }}
              </p>
              <p v-if="evento.evento_estado !== undefined">
                <i class="fa fa-check-circle"></i> 
                <b>Estado:</b> {{ evento.evento_estado === "1" || evento.evento_estado === 1 ? "Activo" : "Inactivo" }}
              </p>
            </div>

            <!-- Descripción -->
            <div class="mb-5 text-left">
              <b>Descripción</b>
              <p v-html="evento.evento_descripcion"></p>
            </div>

           
            <div v-if="evento.galeria && evento.galeria.length > 0" class="mb-5 text-left">
              <b>Galería</b>
              <div class="row mt-3">
                <div class="col-4 mb-2" v-for="(img, index) of evento.galeria" :key="index">
                  <a :href="getImageUrl(img)" target="_blank">
                    <img 
                      :src="getImageUrl(img)" 
                      alt="Galería" 
                      class="img-fluid rounded"
                      style="cursor: zoom-in;"
                    />
                  </a>
                </div>
              </div>
            </div>

          
            <div class="text-center mt-4">
              <button class="btn btn-color" @click="clickBack">
                <i class="fa fa-arrow-left mr-2"></i>Volver atrás
              </button>
            </div>      
            
          </div>

          
          <div v-else class="text-center py-5">
            <i class="fa fa-folder-open fa-4x text-muted mb-3" style="opacity: 0.5;"></i>
            <h2 class="mb-3">Sin información disponible</h2>
            <p class="text-muted">No se pudo cargar la información de este evento.</p>
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
import api from "@/plugins/axios";

export default {
  name: "DetalleEvento",
  
  components: { 
    SidebarCustom 
  },
  
  data() {
    return {
      errorGet: false,
      loading: true,
    };
  },
  
  computed: {
    ...mapState(["Institucion"]),
    ...mapGetters(['eventos']),

    institucionNombre() {
      return this.Institucion?.Descripcion?.institucion_nombre || 'la Carrera';
    },
    
    evento() {
      const id = parseInt(this.$route.params.idEv);
      return this.eventos.find(e => e.evento_id === id) || null;
    }
  },

  methods: {
    getImageUrl(filename) {
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
    evento: {
      handler(newVal) {
        if (newVal) {
          this.errorGet = false;
          this.loading = false;
          this.$store.commit("loading");
        } else if (this.eventos.length > 0) {
          this.errorGet = true;
          this.loading = false;
          console.warn('Evento no encontrado con ID:', this.$route.params.idEv);
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
      console.error('Error cargando evento:', error);
      this.errorGet = true;
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
img[style*="cursor: zoom-in"] {
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
}

img[style*="cursor: zoom-in"]:hover {
  transform: scale(1.02);
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

/* Galería images */
.img-fluid.rounded {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.img-fluid.rounded:hover {
  transform: scale(1.05);
}

/* Responsive */
@media (max-width: 768px) {
  .carousel-text h1 {
    font-size: 2rem !important;
  }
  
  .fa-4x {
    font-size: 3rem;
  }
  
  .col-4 {
    flex: 0 0 50%;
    max-width: 50%;
  }
}
</style>