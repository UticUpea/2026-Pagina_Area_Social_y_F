<template>
  <div class="contact" style="padding-top: 10%;">
    <div class="container zoomIn animated" style="position: relative;">
      
      <div class="section-header">
        <h2>Contactos</h2>
      </div>
      <div class="row align-items-center">              
        <div class="contact-info col-lg-4">
          <div class="contact-icon">
            <i class="fa fa-map-marker"></i>
          </div>
          <div class="contact-text">
            <h3>Nuestra oficina central</h3>
            <p>{{ direccion }}</p>
          </div>
        </div>
        <div class="contact-info col-lg-4">
          <div class="contact-icon">
            <i class="fa fa-phone"></i>
          </div>
          <div class="contact-text">
            <h3>Llamadas</h3>
            <p v-if="celular1">{{ celular1 }}</p>
            <p v-if="celular2">{{ celular2 }}</p> 
          </div>
        </div>
        <div class="contact-info col-lg-4">
          <div class="contact-icon">
            <i class="fa fa-envelope"></i>
          </div>
          <div class="contact-text">
            <h3>Correo electrónico</h3>
            <p v-if="correo1">
              <a :href="'mailto:' + correo1">{{ correo1 }}</a>
            </p>
            <p v-if="correo2 && correo2 !== correo1">
              <a :href="'mailto:' + correo2">{{ correo2 }}</a>
            </p>
          </div>
        </div>     
      </div>
      <div class="col-lg-12">
        <div class="contact-form">
          <div id="success"></div>
          <h3 style="text-align:center">Ubicación</h3>
          <iframe
            :src="googleMapUrl"
            width="100%"
            height="400"
            frameborder="0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe><br><br>
        </div>
      </div>
      
    </div>
  </div> 
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ContactoView",
  
  computed: {

    ...mapState(["Institucion"]),

    direccion() {
      return this.Institucion?.Descripcion?.institucion_direccion || 'Sin dirección registrada';
    },
    
    celular1() {
      const cel = this.Institucion?.Descripcion?.institucion_celular1;
      return cel && cel !== 2147483647 ? `+591 ${cel}` : '';
    },
    
    celular2() {
      const cel = this.Institucion?.Descripcion?.institucion_celular2;
      return cel && cel !== 2147483647 && cel !== this.Institucion?.Descripcion?.institucion_celular1 
        ? `+591 ${cel}` 
        : '';
    },
    
    correo1() {
      return this.Institucion?.Descripcion?.institucion_correo1 || '';
    },
    
    correo2() {
      const c2 = this.Institucion?.Descripcion?.institucion_correo2;
      const c1 = this.correo1;
      return c2 && c2 !== c1 ? c2 : '';
    },
    
    googleMapUrl() {
      return this.Institucion?.Descripcion?.institucion_api_google_map || '';
    }
  },
};
</script>

<style scoped>

.contact-info {
  margin-bottom: 2rem;
  padding: 1rem;
  text-align: center;
  transition: transform 0.3s ease;
}

.contact-info:hover {
  transform: translateY(-5px);
}

.contact-icon {
  font-size: 2rem;
  color: var(--main-color, #007bff);
  margin-bottom: 1rem;
}

.contact-text h3 {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.contact-text p {
  margin: 0.25rem 0;
  color: #666;
}

.contact-text a {
  color: var(--main-color, #007bff);
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-text a:hover {
  color: var(--main-color-2, #0056b3);
  text-decoration: underline;
}

.contact-form iframe {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

@media (max-width: 991px) {
  .contact-info {
    margin-bottom: 1.5rem;
  }
}
</style>