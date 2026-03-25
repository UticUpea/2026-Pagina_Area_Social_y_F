<template>
  <div>
    <!-- Page Header Start -->
    <div class="carousel" style="height: calc(50vh - 35px);">
      <div class="carousel-item" style="height: calc(50vh - 35px);">
        <div class="carousel-img" style="position: absolute; background-size: cover; background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(@/assets/img/BackGround-UPEA-08.jpg);"></div>
        <div class="carousel-img banner-img"></div>
        
        <div class="carousel-text zoomIn animated">
          <h1 class="display-4 text-white mb-3 mt-0 mt-lg-5">VIDEOS</h1>
          <div class="d-inline-flex text-white">
            <p class="m-0"><a class="text-white" href="/">{{ institucionNombre }}</a></p>
            <p class="m-0 px-2">/</p>
            <p class="m-0">VIDEOS</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container py-5">
      <div class="row">
        <div class="col-lg-8">
          <div class="">
            <div class="service-box-section set-bg text-center" data-setbg="">
              <div class="blog-area pd-top-120 pd-bottom-120">
                <div class="container">
                  
                 
                  <div v-if="loading" class="col-12 text-center py-5">
                    <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
                      <span class="sr-only">Cargando...</span>
                    </div>
                    <p class="mt-3 text-muted">Cargando videos...</p>
                  </div>

                 
                  <div v-else-if="videos && videos.length === 0" class="col-12 text-center py-5">
                    <i class="fa fa-video fa-4x text-muted mb-3" style="opacity: 0.5;"></i>
                    <h2 class="mb-3">Sin videos disponibles</h2>
                    <p class="text-muted mb-4">Pronto se agregarán nuevos videos de la carrera.</p>
                    <router-link to="/" class="btn btn-primary">
                      <i class="fa fa-home mr-2"></i>Volver al inicio
                    </router-link>
                  </div>

                
                  <div v-else>
                    <div class="mb-5">
                      <form action="" @submit.prevent="buscar">
                        <div class="input-group">
                          <input type="text" class="form-control form-control-lg" 
                                 placeholder="Buscar video"
                                 v-model="search"
                                 @input="buscar"/>
                          <div class="input-group-append">
                            <span class="input-group-text bg-transparent text-primary" @click="buscar">
                              <i class="fa fa-search"></i>
                            </span>
                          </div>
                        </div>
                      </form>
                    </div>

                  
                    <div v-if="searchGet" class="">
                      <div v-if="videosBusqueda.length == 0" class="col-12 text-center py-5">
                        <i class="fa fa-search fa-4x text-muted mb-3" style="opacity: 0.5;"></i>
                        <h3 class="mb-3">No se encontraron resultados</h3>
                        <p class="text-muted">No hay videos que coincidan con "{{ search }}".</p>
                        <button @click="search = ''; searchGet = false;" class="btn btn-outline-primary mt-3">
                          <i class="fa fa-times mr-2"></i>Limpiar búsqueda
                        </button>
                      </div>
                      <div v-else class="row justify-content-center">
                        <div class="col-12">
                          <h3>{{ videosBusqueda.length }} resultado(s) encontrado(s)</h3>
                          <hr />
                        </div>
                        <div class="col-lg-12 zoom" 
                             v-for="(vid, index) of videosBusqueda"
                             :key="index">
                          <div class="solid-service-box">
                            <iframe
                              :src="vid.video_enlace"
                              frameborder="0"
                              style="border-radius: 5px" 
                              width="100%" 
                              height="300px" 
                              allowfullscreen
                              loading="lazy"
                              referrerpolicy="strict-origin-when-cross-origin"
                            />
                            <br>
                            <h5>{{ vid.video_titulo }}</h5>
                            <p v-html="vid.video_breve_descripcion"></p>
                            <hr color="black" size="3px">		
                          </div>
                        </div>          
                      </div>
                    </div>

                    
                    <div v-else class="row justify-content-center">
                      <div class="col-lg-12" 
                           v-for="(vid, index) of videos"
                           :key="index">
                        <div class="solid-service-box">
                          <iframe
                            :src="vid.video_enlace"
                            frameborder="0"
                            style="border-radius: 5px" 
                            width="100%" 
                            height="300px"
                            allowfullscreen
                            loading="lazy"
                            referrerpolicy="strict-origin-when-cross-origin"
                          />
                          <br>
                          <h5>{{ vid.video_titulo }}</h5>
                          <p v-html="vid.video_breve_descripcion"></p>
                          <hr color="black" size="3px">
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>          
            </div>
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
import SidebarCustom from "@/components/SidebarCustom.vue";
import { mapState, mapGetters } from "vuex";

export default {
  name: "VideosView",
  
  components: {
    SidebarCustom,
  },
  
  data() {
    return {
      search: "",
      searchGet: false,
      loading: true,
    };
  },
  
  computed: {
    ...mapState(["Institucion"]),
    ...mapGetters(['videos']),

    institucionNombre() {
      return this.Institucion?.Descripcion?.institucion_nombre || 'la Carrera';
    },

    videosBusqueda() {
      if (!this.search.trim()) return this.videos || [];
      const term = this.search.toLowerCase();
      return (this.videos || []).filter(vid => 
        vid.video_titulo?.toLowerCase().includes(term) ||
        vid.video_breve_descripcion?.toLowerCase().includes(term) ||
        vid.video_tipo?.toLowerCase().includes(term)
      );
    }
  },

  methods: {
    buscar() {
      this.searchGet = this.search.trim() !== "";
    }
  },

  async mounted() {
    this.loading = true;
    try {
      await this.$store.dispatch('fetchInstitucionData');
    } catch (error) {
      // Error manejado silenciosamente
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.solid-service-box {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-radius: 8px;
  background: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.solid-service-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.solid-service-box h5 {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.solid-service-box p {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
}

.solid-service-box iframe {
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Loading Spinner */
.spinner-border {
  width: 3rem;
  height: 3rem;
  border-width: 0.25rem;
}

/* Empty State Icons */
.fa-4x {
  font-size: 4rem;
}

.text-muted {
  color: #6c757d !important;
}

/* Responsive */
@media (max-width: 768px) {
  .solid-service-box {
    padding: 1rem;
  }
  
  .carousel-text h1 {
    font-size: 2rem !important;
  }
  
  .fa-4x {
    font-size: 3rem;
  }
}
</style>