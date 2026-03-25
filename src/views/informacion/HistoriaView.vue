<template>
  <div class="container-background-5" style="position: relative;">
    <div class="container" style="padding: 60px;">
      <hr size="8px" class="color-main"/><br>
      
      <div class="row align-items-center back_bg zoomIn animated" 
           style="background-color: white">
        <div class="fondo-information">
          <img :src="logoUrl" alt="Logo Institución" style="width: 100%;" />
        </div>
        
        <div class="col-md-12">
          <div class="section-header">
            <h1 style="text-align: center;">Historia de {{ institucionNombre }}</h1>
          </div>
          
          <hr class="hr-color">
          <div class="about-text">
            <p class="mb-4" v-html="historia"></p>                    
          </div>
        </div>
      </div>
      <button class="btn-color" @click="$router.go(-1)" style="left: 0;">
        <i class=""></i> Volver atrás
      </button>
      
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import api from "@/plugins/axios";

export default {
  name: "HistoriaView",
  
  computed: {

    ...mapState(["Institucion"]),
    ...mapGetters(['institucionLogo']),

    logoUrl() {
      return this.institucionLogo;
    },
    
    institucionNombre() {
      return this.Institucion?.Descripcion?.institucion_nombre || 'la Carrera';
    },
    
    historia() {
      return this.Institucion?.Descripcion?.institucion_historia || '';
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

.section-header h1 {
  color: var(--main-color, #007bff);
  font-weight: 600;
  margin-bottom: 1rem;
}

.hr-color {
  border-color: var(--main-color-2, #6c757d);
  opacity: 0.5;
  margin: 1.5rem 0;
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