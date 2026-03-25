<template>
  <div class="container-background-5" style="position: relative;">
    <div class="container" style="padding: 60px;">
      <hr size="8px" class="color-main"/><br>
      
      <div class="row align-items-center back_bg zoomIn animated" style="background-color: white">
        <div class="col-md-12">
          <div class="fondo-information">
            <img :src="logoUrl" alt="Logo" style="width: 100%;" />
          </div>
          <div class="section-header">
            <h1 style="text-align: center;">PLAN DE ESTUDIOS</h1>
          </div>
          <div class="tab-content card" id="myTabContentMD" style="width: 100%;">
            <a :href="planEstudiosUrl" target="_blank">
              <vue-pdf-embed
                :source="planEstudiosUrl"
                :disableTextLayer="true"
              />
            </a>
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
import { mapState } from "vuex";
import VuePdfEmbed from "vue-pdf-embed";
import api from "@/plugins/axios";

export default {
  name: "PlanView",
  
  components: {
    VuePdfEmbed,
  },
  
  computed: {
    ...mapState(["Institucion"]),

    logoUrl() {
      const logo = this.Institucion?.Descripcion?.institucion_logo;
      return logo ? api.getImageUrl(logo) : '';
    },
    planEstudiosUrl() {
      const organigrama = this.Institucion?.Descripcion?.institucion_organigrama;
      return organigrama ? api.getImageUrl(organigrama) : '';
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

.tab-content {
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
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

.vue-pdf-embed {
  width: 100%;
  min-height: 800px;
}

@media (max-width: 768px) {
  .vue-pdf-embed {
    min-height: 600px;
  }
}
</style>