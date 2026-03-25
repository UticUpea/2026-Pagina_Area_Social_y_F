<template>
  <div>
    <!-- Page Header Start -->
    <div class="carousel" style="height: calc(50vh - 35px);">
      <div class="carousel-item" style="height: calc(50vh - 35px);">
        <div class="carousel-img" style="position: absolute; background-size: cover; background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(@/assets/img/BackGround-UPEA-08.jpg);"></div>
        <div class="carousel-img banner-img"></div>
        
        <div class="carousel-text">
          <h1 class="display-4 text-white mb-3 mt-0 mt-lg-5">VIDEO</h1>
          <div class="d-inline-flex text-white">
            <p class="m-0"><a class="text-white" href="/">{{ institucionNombre }}</a></p>
            <p class="m-0 px-2">/</p>
            <p class="m-0">DETALLE DE VIDEO</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container text-center py-5">
      <div class="row">
        <div class="col-lg-8 zoomIn animated">
          
        
          <div v-if="loading" class="text-center py-5">
            <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
              <span class="sr-only">Cargando...</span>
            </div>
            <p class="mt-3 text-muted">Cargando información del video...</p>
          </div>
          
        
          <div v-else-if="errorGet" class="text-center py-5">
            <i class="fa fa-video fa-4x text-danger mb-3" style="opacity: 0.5;"></i>
            <h2 class="mb-3">Video no encontrado</h2>
            <p class="text-muted mb-4">El video que buscas no existe o fue eliminado.</p>
            <button class="btn btn-primary" @click="clickBack">
              <i class="fa fa-arrow-left mr-2"></i>Volver atrás
            </button>
          </div>
          
         
          <div v-else-if="video" class="position-relative">
            
            <!-- Iframe del video con privacidad mejorada -->
            <iframe
              :src="getVideoEmbedUrl(video.video_enlace)"
              style="width: 100%; aspect-ratio: 16/9; border-radius: 10px;"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
            />
            
            <!-- Título -->
            <h3 class="m-0 mt-3 text-left">VIDEOS</h3>
            
            <!-- Información del video -->
            <div class="pt-4 pb-2 text-left"> 
              <h4 class="font-weight-bold">{{ video.video_titulo }}</h4>
              
              <p v-if="video.video_tipo">
                <i class="fa fa-tag"></i> 
                <b>Tipo:</b> {{ video.video_tipo }}
              </p>
              
              <p v-if="video.video_estado !== undefined">
                <i class="fa fa-check-circle"></i> 
                <b>Estado:</b> {{ video.video_estado === 1 || video.video_estado === "1" ? "Activo" : "Inactivo" }}
              </p>
            </div>
            
            <!-- Descripción -->
            <div class="mb-5 text-left">
              <b>Descripción</b>
              <p v-html="video.video_breve_descripcion"></p>
            </div>
            
            <!-- Botón volver -->
            <div class="text-center mt-4">
              <button class="btn btn-color" @click="clickBack">
                <i class="fa fa-arrow-left"></i> Volver atrás
              </button>
            </div>    
            
          </div>

          <div v-else class="text-center py-5">
            <i class="fa fa-folder-open fa-4x text-muted mb-3" style="opacity: 0.5;"></i>
            <h2 class="mb-3">Sin información disponible</h2>
            <p class="text-muted">No se pudo cargar la información de este video.</p>
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

export default {
  name: "DetalleVideo",
  
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
    ...mapGetters(['videos']),

    institucionNombre() {
      return this.Institucion?.Descripcion?.institucion_nombre || 'la Carrera';
    },
    
    video() {
      const id = parseInt(this.$route.params.idVid);
      return this.videos.find(v => v.video_id === id) || null;
    }
  },

  methods: {
    
    getVideoEmbedUrl(url) {
      if (!url) return '';
      // Si ya es una URL de embed, usarla tal cual
      if (url.includes('embed') || url.includes('youtube-nocookie')) {
        return url;
      }
      // Si es YouTube normal, convertir a nocookie
      if (url.includes('youtube.com')) {
        return url.replace('youtube.com', 'youtube-nocookie.com');
      }
      return url;
    },
    
    clickBack() {
      this.$store.commit("clickLink");
      this.$router.go(-1);
    }
  },

  watch: {
    video: {
      handler(newVal) {
        if (newVal) {
          this.errorGet = false;
          this.loading = false;
          this.$store.commit("loading");
        } else if (this.videos.length > 0) {
          this.errorGet = true;
          this.loading = false;
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
      this.errorGet = true;
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
iframe {
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

iframe:hover {
  transform: scale(1.01);
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
  
  iframe {
    aspect-ratio: 16/9;
    height: auto;
  }
  
  .fa-4x {
    font-size: 3rem;
  }
}
</style>