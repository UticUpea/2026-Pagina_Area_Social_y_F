<template>
  <div>
    <!-- Page Header Start -->
    <div class="carousel" style="height: calc(50vh - 35px);">
      <div class="carousel-item" style="height: calc(50vh - 35px);">
        <div class="carousel-img container-background-3" style="position: absolute; background-size: cover;"></div>
        <div class="carousel-img banner-img" style="position: absolute;"></div>
        
        <div class="carousel-text animated">
          <h1 class="display-4 text-white mb-3 mt-0 mt-lg-5">GACETAS</h1>
          <div class="d-inline-flex text-white">
            <p class="m-0"><a class="text-white" href="/">{{ institucionNombre }}</a></p>
            <p class="m-0 px-2">/</p>
            <p class="m-0">GACETA UNIVERSITARIA</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Header Section -->
    <div class="container-fluid-secundary p-0 mb-5 pb-5" style="position: relative;">
      <div class="row justify-content-center animate-box wow animated">
        <div class="text-center mb-5">
          <h1 class="mt-2 mb-3">GACETAS MÁS RECIENTES</h1>       
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container py-5 paused">
      <div class="row">
        <!-- Search Bar -->
        <div class="col-lg-4 mt-5 mt-lg-0">
          <div class="mb-5">
            <form action="" @submit.prevent="buscar">
              <div class="input-group">
                <input type="text" class="form-control form-control-lg" 
                       placeholder="Buscar gaceta"
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
        
        <!-- Content Area -->
        <div class="col-lg-8">    
          <div class="service-box-section set-bg text-center" data-setbg="">
            <div class="blog-area pd-top-120 pd-bottom-120">
              <div class="container">
                
            
                <div v-if="loading" class="col-12 text-center py-5">
                  <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
                    <span class="sr-only">Cargando...</span>
                  </div>
                  <p class="mt-3 text-muted">Cargando gacetas universitarias...</p>
                </div>

               
                <div v-else-if="gacetas && gacetas.length === 0" class="col-12 text-center py-5">
                  <i class="fa fa-folder-open fa-4x text-muted mb-3" style="opacity: 0.5;"></i>
                  <h2 class="mb-3">Sin gacetas disponibles</h2>
                  <p class="text-muted mb-4">Pronto se agregarán nuevas gacetas universitarias.</p>
                  <router-link to="/" class="btn btn-primary">
                    <i class="fa fa-home mr-2"></i>Volver al inicio
                  </router-link>
                </div>

               
                <div v-else-if="searchGet" class="">
                  <div v-if="gacetasBusqueda.length == 0" class="col-12 text-center py-5">
                    <i class="fa fa-search fa-4x text-muted mb-3" style="opacity: 0.5;"></i>
                    <h3 class="mb-3">No se encontraron resultados</h3>
                    <p class="text-muted">No hay gacetas que coincidan con "{{ search }}".</p>
                    <button @click="search = ''; searchGet = false;" class="btn btn-outline-primary mt-3">
                      <i class="fa fa-times mr-2"></i>Limpiar búsqueda
                    </button>
                  </div>
                  <div v-else class="row justify-content-center">
                    <div class="col-12">
                      <h3>{{ gacetasBusqueda.length }} resultado(s) encontrado(s)</h3>
                      <hr />
                    </div>
                    <div class="col-lg-5 col-md-6 zoom" 
                         v-for="(gac, index) of gacetasBusqueda"
                         :key="index">
                      <div class="solid-service-box">
                        <a :href="getPdfUrl(gac.gaceta_documento)" target="_blank">
                          <vue-pdf-embed 
                            width="200"
                            :source="getPdfUrl(gac.gaceta_documento)"
                            :page="1"
                            :disableTextLayer="true"
                          />
                        </a>
                        <h4>Gaceta</h4><br>
                        <i class="fa fa-calendar"></i> {{ formatDate(gac.gaceta_fecha) }}<br> 
                        <router-link
                          :to="'/detalleGaceta/' + gac.gaceta_id"
                          @click="$store.commit('clickLink')"
                        >
                          <h4>{{ gac.gaceta_titulo }}</h4>
                        </router-link>
                        <br>
                        <router-link
                          :to="'/detalleGaceta/' + gac.gaceta_id"
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
                  <div class="col-lg-5 col-md-6 zoom paused" 
                       v-for="(gac, index) of gacetas"
                       :key="index">
                    <div class="solid-service-box anim-down">
                      <a :href="getPdfUrl(gac.gaceta_documento)" target="_blank">
                        <vue-pdf-embed 
                          style="width:100%"
                          :source="getPdfUrl(gac.gaceta_documento)"
                          :page="1"
                          :disableTextLayer="true"
                        />
                      </a>
                      <h4>Gaceta</h4><br>
                      <i class="fa fa-calendar"></i> {{ formatDate(gac.gaceta_fecha) }}<br> 
                      <router-link
                        :to="'/detalleGaceta/' + gac.gaceta_id"
                        @click="$store.commit('clickLink')"
                      >
                        <h4>{{ gac.gaceta_titulo }}</h4>
                      </router-link>
                      <br>
                      <router-link
                        :to="'/detalleGaceta/' + gac.gaceta_id"
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
import { mapState, mapGetters } from "vuex";
import SidebarCustom from "@/components/SidebarCustom.vue";
import VuePdfEmbed from "vue-pdf-embed";
import api from "@/plugins/axios";

export default {
  name: "GacetaView",
  
  components: {
    SidebarCustom,
    VuePdfEmbed,
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
    ...mapGetters(['gacetas']),

    institucionNombre() {
      return this.Institucion?.Descripcion?.institucion_nombre || 'la Carrera';
    },
    
    gacetasBusqueda() {
      if (!this.search.trim()) return this.gacetas;
      const term = this.search.toLowerCase();
      return this.gacetas.filter(gac => 
        gac.gaceta_titulo?.toLowerCase().includes(term) ||
        gac.gaceta_tipo?.toLowerCase().includes(term)
      );
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
    
    buscar() {
      this.searchGet = this.search.trim() !== "";
    }
  },

  async mounted() {
    this.loading = true;
    try {
      await this.$store.dispatch('fetchInstitucionData');
    } catch (error) {
      console.error('Error cargando gacetas:', error);
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
canvas {
  display: none;
}

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

.solid-service-box h4 {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
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

.vue-pdf-embed {
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