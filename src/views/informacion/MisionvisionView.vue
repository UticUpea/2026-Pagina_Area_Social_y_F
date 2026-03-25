<template>
  <div class="container-background" style="position: relative;">
    <div class="about" style="padding: 0; top: 50px;">
      <div class="container" style="padding: 100px;">   
        <div class="row zoomIn animated">
          <div class="col-sm-12">
            <div class="tab-content back_bg" id="myTabContentMD" style="padding: 20px; background-color: white">
              <div class="fondo-information">
                <img :src="logoUrl" alt="Logo Institución" style="width: 100%;" />
              </div>
              <h1 style="text-align: center">Carrera de {{ institucionNombre }}</h1>
              <h2 style="text-align: center">MISIÓN Y VISIÓN</h2> <br>
              <hr class="hr-color"/><br>
              <div class="section-header">    
                <h4>MISIÓN</h4>
              </div>
              <div class="about-text">
                <p class="mb-4" v-html="mision"></p>
              </div>  
              <hr class="hr-color"/><br>
              <div class="section-header">    
                <h3>VISIÓN</h3>
              </div>
              <div class="about-text">
                <p class="mb-4" v-html="vision"></p>
              </div>                
              <hr class="hr-color"/><br>
              <div class="section-header">    
                <h3>OBJETIVOS</h3>
              </div>
              <div class="about-text">
                <p class="mb-4" v-html="objetivos"></p>                           
              </div>                     
              
            </div>
            <button class="btn-color" @click="$router.go(-1)" style="left: 0;">
              <i class=""></i> Volver atrás
            </button>
            
          </div>
        </div>
      </div>
    </div>        
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import api from "@/plugins/axios";

export default {
  name: "MisionVisionView",
  
  computed: {
  
    ...mapState(["Institucion"]),
    ...mapGetters(['institucionLogo']),

    logoUrl() {
      return this.institucionLogo;
    },
    
    institucionNombre() {
      return this.Institucion?.Descripcion?.institucion_nombre || 'Carrera';
    },
    
    mision() {
      return this.Institucion?.Descripcion?.institucion_mision || '';
    },
    
    vision() {
      return this.Institucion?.Descripcion?.institucion_vision || '';
    },
    
    objetivos() {
      return this.Institucion?.Descripcion?.institucion_objetivos || '';
    }
  },

  methods: {

    getImageUrl(filename) {
      return api.getImageUrl(filename);
    }
  },
};
</script>

<style scoped>

.fondo-information {
  margin-bottom: 2rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.about-text p {
  text-align: justify;
  line-height: 1.8;
  color: #333;
}

.section-header h3,
.section-header h4 {
  color: var(--main-color, #007bff);
  font-weight: 600;
  margin-bottom: 1rem;
}

.hr-color {
  border-color: var(--main-color-2, #6c757d);
  opacity: 0.5;
}

.btn-color {
  position: fixed;
  bottom: 20px;
  padding: 10px 20px;
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
</style>