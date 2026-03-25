<template>
  <div>
    <!-- Page Header Start -->
    <div class="carousel" style="height: calc(50vh - 35px);">
      <div class="carousel-item" style="height: calc(50vh - 35px);">
        <div class="carousel-img container-background-3" style="position: absolute; background-size: cover;"></div>
        <div class="carousel-img banner-img" style="position: absolute;"></div>
        <div class="carousel-text zoomIn animated">
          <h1 class="display-4 text-white mb-3 mt-0 mt-lg-5">CURSOS</h1>
          <div class="d-inline-flex text-white">
            <p class="m-0"><a class="text-white" href="/">{{ institucionNombre }}</a></p>
            <p class="m-0 px-2">/</p>
            <p class="m-0">DETALLE DEL CURSO</p>
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
            <p class="mt-3 text-muted">Cargando información del curso...</p>
          </div>
          
        
          <div v-else-if="errorGet" class="text-center py-5">
            <i class="fa fa-graduation-cap fa-4x text-danger mb-3" style="opacity: 0.5;"></i>
            <h2 class="mb-3">Curso no encontrado</h2>
            <p class="text-muted mb-4">El curso que buscas no existe o fue eliminado.</p>
            <button class="btn btn-primary" @click="clickBack">
              <i class="fa fa-arrow-left mr-2"></i>Volver atrás
            </button>
          </div>
          
      
          <div v-else-if="curso" class="position-relative">
            
            <!-- Imagen principal -->
            <a :href="getImageUrl(curso.det_img_portada)" target="_blank">
              <img 
                :src="getImageUrl(curso.det_img_portada)"
                alt="img"
                style="cursor:zoom-in; width:100%; border-radius: 8px;"
              />
            </a><br>        
            
            <!-- Título -->
            <h3 class="text-left">{{ curso.det_titulo }}</h3>
            <hr>
            
            <!-- Información general -->
            <div style="text-align: left;">
              <p><b>Versión:</b> {{ curso.det_version }}</p> 
              <p><b>Modalidad:</b> {{ curso.det_modalidad }}</p> 
              <hr>
              
              <!-- Descripción -->
              <i class="fa fa-book"></i> <b>Descripción del curso</b>
              <p v-html="curso.det_descripcion"></p>
              <hr>
              
              <!-- Ubicación y fechas -->
              <p><i class="fa fa-map-marker"></i> <b>Ubicación: </b>{{ curso.det_lugar_curso }}</p>
              <p>
                <b>Fechas:</b> 
                {{ formatDate(curso.det_fecha_ini) }} - {{ formatDate(curso.det_fecha_fin) }}
              </p>
              <p><b>Hora:</b> {{ curso.det_hora_ini }} </p>
              <hr>
              
              <!-- Costos -->
              <b>Costo del Curso</b>
              <p><b>Costo Estudiantes UPEA:</b> {{ curso.det_costo }} bs</p>
              <p><b>Costo Externos:</b> {{ curso.det_costo_ext }} bs</p>
              <p><b>Costo Profesionales:</b> {{ curso.det_costo_profe }} bs</p>
              <p><b>Carga Horaria:</b> {{ curso.det_carga_horaria }} hrs</p>
              <p><b>Cupos Disponibles:</b> {{ curso.det_cupo_max }}</p>
              <hr>
              
              <!-- Grupo WhatsApp -->
              <b>Grupo WhatsApp</b>
              <p v-if="curso.det_grupo_whatssap">
                <a :href="getWhatsAppUrl(curso.det_grupo_whatssap)" target="_blank" class="text-success">
                  <i class="fab fa-whatsapp"></i> Unirse al grupo
                </a>
              </p>
              <p v-else class="text-muted">No disponible</p>
              <hr>
              
              <!-- Facilitadores -->
              <p><b>Facilitadores:</b></p>  
              <div class="row">
                <div class="col-lg-6 mb-3" v-for="(fac, index) of curso.facilitadores" :key="index">                  
                  <div class="card p-3 text-left">
                    <div class="d-flex align-items-center">
                      <img style="object-fit: cover; height: 60px; width: 60px; border-radius: 50%;"
                           :src="getImageUrl(fac.foto_facilitador)"
                           alt="img" 
                           class="mr-3"/>
                      <div>
                        <h5 class="mb-0">{{ fac.nombre_facilitador }}</h5>
                        <p class="mb-0 text-muted"><b>Cargo:</b> {{ fac.cargo_facilitador }}</p>
                      </div>
                    </div>
                    <p class="mt-2 mb-0"><b>Descripción:</b> {{ fac.descripcion_facilitador }}</p>
                    <div class="footer-social mt-2">
                      <a v-if="fac.celular_facilitador" 
                         :href="getWhatsAppUrl(fac.celular_facilitador)" 
                         target="_blank">
                        <i class="fab fa-whatsapp" style="margin: 10px;"></i>
                      </a>
                      <a v-if="fac.facebook_facilitador" 
                         :href="getFacebookUrl(fac.facebook_facilitador)" 
                         target="_blank">
                        <i class="fab fa-facebook-f"></i>
                      </a>                               
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="text-center mt-4">
              <button class="btn btn-color" @click="clickBack">
                <i class="fa fa-arrow-left"></i> Volver atrás
              </button>
            </div>
            
          </div>

       
          <div v-else class="text-center py-5">
            <i class="fa fa-folder-open fa-4x text-muted mb-3" style="opacity: 0.5;"></i>
            <h2 class="mb-3">Sin información disponible</h2>
            <p class="text-muted">No se pudo cargar la información de este curso.</p>
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
  name: "DetalleCurso",
  
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
    ...mapGetters(['cursos']),

    institucionNombre() {
      return this.Institucion?.Descripcion?.institucion_nombre || 'la Carrera';
    },
    
    curso() {
      const id = parseInt(this.$route.params.idCur);
      return this.cursos.find(c => c.iddetalle_cursos_academicos === id) || null;
    }
  },

  methods: {
    getImageUrl(filename) {
      return api.getImageUrl(filename);
    },
    
    
    getWhatsAppUrl(numero) {
      if (!numero) return '';
      const clean = numero.replace(/\s+/g, '');
      return `https://wa.me/591${clean}`;
    },
    
    
    getFacebookUrl(url) {
      if (!url) return '#';
      return url.startsWith('http') ? url : `https://${url}`;
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
    curso: {
      handler(newVal) {
        if (newVal) {
          this.errorGet = false;
          this.loading = false;
          this.$store.commit("loading");
        } else if (this.cursos.length > 0) {
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
.card {
  border: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.footer-social a {
  color: #666;
  font-size: 1.2rem;
  transition: color 0.3s ease;
  margin: 0 5px;
}

.footer-social a:hover {
  color: var(--main-color, #007bff);
}

img[style*="cursor:zoom-in"] {
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
}

img[style*="cursor:zoom-in"]:hover {
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

/* Responsive */
@media (max-width: 768px) {
  .carousel-text h1 {
    font-size: 2rem !important;
  }
  
  .fa-4x {
    font-size: 3rem;
  }
}
</style>