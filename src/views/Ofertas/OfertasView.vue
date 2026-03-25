<template>
  <div>
    <!-- Page Header Start -->
    <div class="carousel" style="height: calc(50vh - 35px);">
      <div class="carousel-item" style="height: calc(50vh - 35px);">
        <div class="carousel-img container-background-3" style="position: absolute; background-size: cover;"></div>
        <div class="carousel-img banner-img" style="position: absolute;"></div>
        
        <div class="carousel-text zoomIn animated">
          <h1 class="display-4 text-white mb-3 mt-0 mt-lg-5">OFERTAS ACADÉMICAS</h1>
          <div class="d-inline-flex text-white">
            <p class="m-0"><a class="text-white" href="/">{{ institucionNombre }}</a></p>
            <p class="m-0 px-2">/</p>
            <p class="m-0">OFERTAS ACADÉMICAS</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Carrusel de ofertas recientes -->
    <div class="container-fluid-secundary p-0 mb-5 pb-5" style="position: relative;">
      
     
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
          <span class="sr-only">Cargando...</span>
        </div>
        <p class="mt-3 text-muted">Cargando ofertas académicas...</p>
      </div>

     
      <div v-else-if="ofertasRecientes.length === 0" class="text-center py-5">
        <i class="fa fa-graduation-cap fa-4x text-muted mb-3" style="opacity: 0.5;"></i>
        <h3 class="mb-3">Sin ofertas académicas recientes</h3>
        <p class="text-muted">Pronto se agregarán nuevas ofertas académicas.</p>
      </div>

     
      <div v-else class="row justify-content-center animate-box wow animated">
        <div class="text-center mb-5">
          <h1 class="mt-2 mb-3">OFERTAS MÁS RECIENTES</h1>       
        </div>
        <div class="container"> 
          <Carousel :autoplay="5000" :items-to-show="1" :wrapAround="true" :transition="500" style="height: 400px;">
            <Slide class="" v-for="(ofer, index) of ofertasRecientes" :key="index" style="height: 380px;">
              <router-link
                :to="'/detalleOferta/' + ofer.ofertas_id"
                @click="$store.commit('clickLink')"
              >
                <img style="object-fit: cover; height: 300px;"
                     :src="getImageUrl(ofer.ofertas_imagen)"
                     alt="img"
                />
                <h4>{{ ofer.ofertas_titulo }}</h4> 
              </router-link>   
            </Slide>
            <template #addons>
              <Pagination />
              <Navigation />
            </template>
          </Carousel>
        </div>
      </div>
    </div>

    <!-- Lista de ofertas con búsqueda -->
    <div class="container paused">
      <div class="col-lg-4 mt-5 mt-lg-0">
        <div class="mb-5">
          <form action="" @submit.prevent="buscar">
            <div class="input-group">
              <input type="text" class="form-control form-control-lg" 
                     placeholder="Buscar oferta"
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
      </div>
      
      <div class="row">
        <div class="col-lg-8">
          <div class="service-box-section set-bg text-center" data-setbg="">
            <div class="blog-area pd-top-120 pd-bottom-120">
              <div class="container">
                
              
                <div v-if="loading" class="col-12 text-center py-5">
                  <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
                    <span class="sr-only">Cargando...</span>
                  </div>
                  <p class="mt-3 text-muted">Cargando ofertas académicas...</p>
                </div>

            
                <div v-else-if="ofertas && ofertas.length === 0" class="col-12 text-center py-5">
                  <i class="fa fa-folder-open fa-4x text-muted mb-3" style="opacity: 0.5;"></i>
                  <h2 class="mb-3">Sin ofertas académicas disponibles</h2>
                  <p class="text-muted mb-4">Pronto se agregarán nuevas ofertas académicas de la carrera.</p>
                  <router-link to="/" class="btn btn-primary">
                    <i class="fa fa-home mr-2"></i>Volver al inicio
                  </router-link>
                </div>

                
                <div v-else-if="searchGet" class="">
                  <div v-if="ofertasBusqueda.length == 0" class="col-12 text-center py-5">
                    <i class="fa fa-search fa-4x text-muted mb-3" style="opacity: 0.5;"></i>
                    <h3 class="mb-3">No se encontraron resultados</h3>
                    <p class="text-muted">No hay ofertas que coincidan con "{{ search }}".</p>
                    <button @click="search = ''; searchGet = false;" class="btn btn-outline-primary mt-3">
                      <i class="fa fa-times mr-2"></i>Limpiar búsqueda
                    </button>
                  </div>
                  <div v-else class="row justify-content-center">
                    <div class="col-12">
                      <h3>{{ ofertasBusqueda.length }} resultado(s) encontrado(s)</h3>
                      <hr />
                    </div>
                    <div class="col-lg-5 col-md-6 zoom" 
                         v-for="(ofer, index) of ofertasBusqueda"
                         :key="index">
                      <div class="solid-service-box">
                        <router-link
                          :to="'/detalleOferta/' + ofer.ofertas_id"
                          @click="$store.commit('clickLink')"
                        >
                          <img width="200" 
                               :src="getImageUrl(ofer.ofertas_imagen)"
                               alt="img"
                          />
                        </router-link> 
                        <br>
                        <router-link
                          :to="'/detalleOferta/' + ofer.ofertas_id"
                          @click="$store.commit('clickLink')"
                        >
                          <h4>{{ ofer.ofertas_titulo }}</h4>
                        </router-link>
                        <i class="fa fa-calendar"></i>
                        <h6>
                          Inscripciones hasta el {{ formatDate(ofer.ofertas_inscripciones_fin) }}
                        </h6>
                        <router-link
                          :to="'/detalleOferta/' + ofer.ofertas_id"
                          @click="$store.commit('clickLink')"
                          class="readmore-text"
                        >
                          Leer más
                        </router-link>
                      </div>
                    </div>          
                  </div>
                </div>

                
                <div v-else class="row justify-content-center">
                  <div class="col-lg-5 col-md-6 zoom" 
                       v-for="(ofer, index) of ofertas"
                       :key="index">
                    <div class="solid-service-box anim-down">
                      <router-link
                        :to="'/detalleOferta/' + ofer.ofertas_id"
                        @click="$store.commit('clickLink')"
                      >
                        <img width="200" 
                             :src="getImageUrl(ofer.ofertas_imagen)"
                             alt="img"
                        />
                      </router-link> 
                      <router-link
                        :to="'/detalleOferta/' + ofer.ofertas_id"
                        @click="$store.commit('clickLink')"
                      >
                        <h4>{{ ofer.ofertas_titulo }}</h4>
                      </router-link>
                      <i class="fa fa-calendar"></i>
                      <h6>
                        Inscripciones hasta el {{ formatDate(ofer.ofertas_inscripciones_fin) }}
                      </h6>
                      <router-link
                        :to="'/detalleOferta/' + ofer.ofertas_id"
                        @click="$store.commit('clickLink')"
                        class="readmore-text"
                      >
                        Leer más
                      </router-link>
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
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import api from "@/plugins/axios";

export default {
  name: "OfertasView",
  
  components: {
    SidebarCustom,
    Carousel, 
    Slide, 
    Pagination, 
    Navigation
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
    ...mapGetters(['ofertas']),

    institucionNombre() {
      return this.Institucion?.Descripcion?.institucion_nombre || 'la Carrera';
    },
    
    ofertasRecientes() {
      return this.ofertas?.slice(0, 5) || [];
    },
    
    ofertasBusqueda() {
      if (!this.search.trim()) return this.ofertas || [];
      const term = this.search.toLowerCase();
      return (this.ofertas || []).filter(ofer => 
        ofer.ofertas_titulo?.toLowerCase().includes(term) ||
        ofer.ofertas_descripcion?.toLowerCase().includes(term)
      );
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

.solid-service-box img {
  border-radius: 8px;
  margin-bottom: 1rem;
  object-fit: cover;
}

.solid-service-box h4 {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.solid-service-box h6 {
  font-size: 0.9rem;
  color: #666;
  margin: 0.25rem 0;
}

.readmore-text {
  display: inline-block;
  margin-top: 1rem;
  color: var(--main-color, #007bff);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.readmore-text:hover {
  color: var(--main-color-2, #0056b3);
  text-decoration: underline;
}

.carousel__slide {
  padding: 10px;
}

.carousel__pagination {
  margin-top: 10px;
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
  
  .solid-service-box img {
    width: 100% !important;
    height: auto;
  }
  
  .carousel-text h1 {
    font-size: 2rem !important;
  }
  
  .fa-4x {
    font-size: 3rem;
  }
}
</style>