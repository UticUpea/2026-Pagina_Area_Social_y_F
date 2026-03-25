<template>
  <footer>
    <div class="footer">
      <div class="container">
        <div class="row">
          <div class="col-lg-5">
            <div class="footer-newsletter">
              <img :src="logoUrl" alt="Logo" width="80" height="80" />
              <h2>{{ institucionNombre }}</h2>
              <div class="footer-social">
                <a v-if="celular1" :href="'https://wa.me/591' + celular1" target="_blank">
                  <i class="fab fa-whatsapp"></i>
                </a>
                <a v-if="facebook" :href="facebook" target="_blank">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a v-if="youtube" :href="youtube" target="_blank">
                  <i class="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-7">
            <div class="row">
              <div class="col-md-6">
                <div class="footer-contact">
                  <h2>Nuestras Oficinas</h2>
                  <p><i class="fa fa-map-marker"></i> {{ direccion }}</p>
                  <p v-if="celular1"><i class="fa fa-phone"></i> {{ celular1 }}</p>
                  <p v-if="correo1">
                    <i class="fa fa-envelope"></i>
                    <a style="color: white;" :href="'mailto:' + correo1">{{ correo1 }}</a>
                  </p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="footer-link">
                  <h2>Accesos Directos</h2>
                  <a class="text-white mb-2" href="/">Inicio</a>
                  <a class="text-white mb-2" href="/publicaciones">Publicaciones</a>
                  <a class="text-white mb-2" href="/servicios">Servicios</a>
                  <a class="text-white mb-2" href="/eventos">Eventos</a>
                  <a class="text-white mb-2" href="/ofertas">Ofertas Académicas</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container copyright">
        <div class="row">
          <div class="col-md-6">
            <p>&copy; <a href="#">{{ institucionNombre }}</a>, Todos los derechos reservados.</p>
          </div>
          <div class="col-md-6">
            <p>
              Diseñado por 
              <a href="https://utic.upea.bo" target="_blank">
                @GAO UPEA-UTIC <img src="@/assets/img/Logoutic.jpeg" alt="" height="30">
                <br>
              </a>
            </p>
            <p> Suport by 
               <a href="https://www.linkedin.com/in/ivan-ancasi-tumiri-a58764393?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                 target="_blank"
                   rel="noopener noreferrer">@IAT.</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <a href="#" class="back-to-top animacionY"><i class="fa fa-chevron-up"></i></a>
  </footer>
</template>

<script>
import { mapState } from "vuex";
import api from "@/plugins/axios";

export default {
  name: "FooterCustom",
  
  computed: {
    ...mapState(["Institucion"]),

    institucionNombre() {
      return this.Institucion?.Descripcion?.institucion_nombre || 'UPEA';
    },
    
    logoUrl() {
      const logo = this.Institucion?.Descripcion?.institucion_logo;
      return logo ? api.getImageUrl(logo) : '';
    },
    
    celular1() {
      const cel = this.Institucion?.Descripcion?.institucion_celular1;
      return cel && cel !== 2147483647 ? cel : '';
    },
    
    facebook() {
      return this.Institucion?.Descripcion?.institucion_facebook || '#';
    },
    
    youtube() {
      return this.Institucion?.Descripcion?.institucion_youtube || '#';
    },
    
    direccion() {
      return this.Institucion?.Descripcion?.institucion_direccion || '';
    },
    
    correo1() {
      return this.Institucion?.Descripcion?.institucion_correo1 || '';
    }
  },

  methods: {}
};
</script>

<style scoped>
.footer {
  background-color: #1a1a2e;
  color: white;
  padding: 3rem 0 1rem;
}

.footer-newsletter h2 {
  margin: 1rem 0;
  font-size: 1.2rem;
}

.footer-social a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin: 0 5px;
  background-color: rgba(255,255,255,0.1);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.footer-social a:hover {
  background-color: var(--main-color, #007bff);
}

.footer-contact p,
.footer-link a {
  display: block;
  margin: 0.5rem 0;
  color: rgba(255,255,255,0.9);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link a:hover {
  color: var(--main-color, #007bff) !important;
}

.copyright {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 1rem;
  margin-top: 2rem;
  font-size: 0.9rem;
}

.copyright a {
  color: var(--main-color, #007bff);
  text-decoration: none;
}

.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background-color: var(--main-color, #007bff);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background-color 0.3s ease;
  z-index: 1000;
}

.back-to-top:hover {
  background-color: var(--main-color-2, #0056b3);
}

/* Responsive */
@media (max-width: 768px) {
  .footer {
    text-align: center;
  }
  
  .footer-social {
    justify-content: center;
  }
  
  .footer-contact p,
  .footer-link a {
    text-align: center;
  }
}
</style>