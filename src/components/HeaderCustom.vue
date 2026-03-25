<template>
  <div>
    <div class="top-bar d-none d-md-block">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-8">
            <div class="top-bar-left">   
              <div class="text">
                <i class="fa fa-envelope"></i>          
                <a :href="'mailto:' + correo1">
                  <h2>{{ correo1 }}</h2>
                </a>
              </div>
              <div class="text">
                <i class="fa fa-phone"></i>
                <h2>+591 {{ celular1 }}</h2>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="top-bar-right" style="display: flex;">
              <div class="social">
                <a :href="facebook" target="_blank" rel="noopener noreferrer">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a :href="youtube" target="_blank" rel="noopener noreferrer">
                  <i class="fab fa-youtube"></i>
                </a>
              </div>
              <div>
                <a class="carousel-btn" 
                   style="color: white; margin: 5px;" 
                   href="https://servicioadministrador.upea.bo"
                   target="_blank"
                   rel="noopener noreferrer">
                  INGRESAR<i class="fab fa-sign-out"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="navbar navbar-expand-lg bg-dark navbar-dark">
      <div class="container-fluid">
        <img :src="logoUrl" alt="Logo" width="80" height="80" />
        
        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
          <div class="navbar-nav ml-auto nav-collapse">

            <router-link to="/" class="nav-item nav-link" style="color: white;">INICIO</router-link>
            
            <div class="nav-item dropdown">
              <a href="#" class="nav-link dropdown-toggle" style="color: white;" 
                 data-toggle="dropdown" 
                 role="button" 
                 aria-haspopup="true" 
                 aria-expanded="false">
                CONVOCATORIAS
              </a>
              <div class="dropdown-menu" style="min-width: 200px;">
                <router-link to="/convocatorias/5" class="dropdown-item" @click="click_m()">CONVOCATORIAS</router-link>
                <router-link to="/convocatorias/2" class="dropdown-item" @click="click_m()">AVISOS</router-link>
                <router-link to="/convocatorias/4" class="dropdown-item" @click="click_m()">COMUNICADOS</router-link>  
              </div>
            </div>
            
            <div class="nav-item dropdown">
              <a href="#" class="nav-link dropdown-toggle" style="color: white;" 
                 data-toggle="dropdown" 
                 role="button" 
                 aria-haspopup="true" 
                 aria-expanded="false">
                CURSOS
              </a>
              <div class="dropdown-menu" style="min-width: 200px;">
                <router-link to="/cursos/4" class="dropdown-item" @click="click_m()">CURSOS</router-link>
                <router-link to="/cursos/5" class="dropdown-item" @click="click_m()">SEMINARIOS</router-link>
              </div>
            </div>
            
            <div class="nav-item dropdown">
              <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" style="color: white;">
                MÁS
              </a>
              <div class="dropdown-menu">
                <router-link to="/servicios" class="dropdown-item">SERVICIOS</router-link>
                <router-link to="/ofertas" class="dropdown-item">OFERTAS ACADÉMICAS</router-link>
                <router-link to="/publicaciones" class="dropdown-item">PUBLICACIONES</router-link>
                <router-link to="/gacetas" class="dropdown-item">GACETA</router-link>
                <router-link to="/eventos" class="dropdown-item">EVENTOS</router-link>
                <router-link to="/videos" class="dropdown-item">VIDEOS</router-link>
              </div>
            </div>
            
            <div class="nav-item dropdown">
              <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" style="color: white;">
                LINKS
              </a>
              <div class="dropdown-menu">
                <div v-for="(link, index) of linksExternos" :key="index">
                  <a class="dropdown-item" 
                     :href="link.url_link" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     :title="link.tipo">
                    {{ link.nombre?.toUpperCase() || 'LINK' }}
                  </a>
                </div>
              </div>
            </div>
            
            <div class="nav-item dropdown">
              <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" style="color: white;">
                INFORMACIÓN
              </a>
              <div class="dropdown-menu">
                <router-link to="/historia" class="dropdown-item">NUESTRA HISTORIA</router-link>
                <router-link to="/misionvision" class="dropdown-item">MISIÓN Y VISIÓN</router-link>
                <router-link to="/perfil" class="dropdown-item">PERFIL PROFESIONAL</router-link>
                <router-link to="/plan" class="dropdown-item">PLAN DE ESTUDIOS</router-link>
              </div>
            </div>
            
            <router-link to="/contacto" class="nav-item nav-link" style="color: white;">
              CONTACTOS
            </router-link>
            
          </div>
        </div>
      </div>
    </div>

    <ul class="menu bottomLeft">
      <li class="share top">
        <i class="fa fa-share-alt"></i>
        <ul class="submenu">
          <li>
            <a :href="facebook" class="facebook" target="_blank" rel="noopener noreferrer">
              <i class="fa fa-facebook"></i>
            </a>
          </li>
          <li>
            <a :href="youtube" class="youtube" target="_blank" rel="noopener noreferrer">
              <i class="fa fa-youtube"></i>
            </a>
          </li>
          <li>
            <a :href="'https://wa.me/591' + celular1" class="whatsapp" target="_blank" rel="noopener noreferrer">
              <i class="fa fa-whatsapp"></i>
            </a>
          </li>
          <li>
            <a :href="'mailto:' + correo1" class="envelope" target="_blank" rel="noopener noreferrer">
              <i class="fa fa-envelope"></i>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import api from "@/plugins/axios";

export default {
  name: "HeaderCustom",
  
  data() {
    return {
      sopen: false,
    };
  },

  computed: {
    ...mapState(["Institucion"]),
    ...mapGetters(['institucionLogo', 'linksExternos', 'convocatorias']),

    logoUrl() {
      return this.institucionLogo;
    },
    
    correo1() {
      return this.Institucion?.Descripcion?.institucion_correo1 || '';
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
    
    menuCursos() {
      return this.$store.state.MenuCur || [];
    },
    
    convocatoriasCount() {
      return this.convocatorias?.filter(c => 
        c.tipo_conv_comun?.tipo_conv_comun_titulo === "CONVOCATORIAS" &&
        (c.con_estado === "1" || c.con_estado === 1)
      ).length || 0;
    },  
    
    avisosCount() {
      return this.convocatorias?.filter(c => 
        c.tipo_conv_comun?.tipo_conv_comun_titulo === "AVISOS" &&
        (c.con_estado === "1" || c.con_estado === 1)
      ).length || 0;
    },  
    
    comunicadosCount() {
      return this.convocatorias?.filter(c => 
        c.tipo_conv_comun?.tipo_conv_comun_titulo === "COMUNICADOS" &&
        (c.con_estado === "1" || c.con_estado === 1)
      ).length || 0;
    },
  },

  methods: {
    click_m() {
      this.$store.commit("clickLink");
      this.openMenu();
    },   
    
    openMenu() {
      this.sopen = !this.sopen;
    },  
    
    getImageUrl(filename) {
      return api.getImageUrl(filename);
    }
  }
};
</script>

<style scoped>
.dropdown-menu {
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 0.5rem 0;
}

.dropdown-item {
  padding: 0.5rem 1.5rem;
  color: #333;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dropdown-item:hover {
  background-color: var(--main-color, #007bff);
  color: white !important;
}

.dropdown-item i {
  width: 20px;
  text-align: center;
}

.badge {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 12px;
}

.badge-primary {
  background-color: var(--main-color, #007bff);
}

.dropdown-divider {
  margin: 0.5rem 0;
  border-top: 1px solid rgba(0,0,0,0.1);
}

.navbar-nav .nav-link {
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
  color: var(--main-color, #007bff) !important;
}

@media (max-width: 991px) {
  .nav-collapse {
    background-color: rgba(0,0,0,0.95);
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1rem;
  }
  
  .dropdown-menu {
    background-color: rgba(255,255,255,0.1);
    border: none;
    padding-left: 1rem;
  }
  
  .dropdown-item {
    color: white !important;
  }
}
</style>