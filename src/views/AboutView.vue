<template>
  <div class="carousel">
    <div class="image"></div>
    <div class="carousel-item">
      <div class="carousel-img" style="position: absolute; background-size: cover; background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(asets/img/BackGround-UPEA-08.jpg);"></div>
      <div class="carousel-img banner-img"></div>
      
      <div class="carousel-text zoomIn animated">
        <h1 class="display-4 text-white mb-3 mt-0 mt-lg-5">{{ institucionNombre }}</h1>
        <div class="d-inline-flex text-white">
          <p class="m-0"><a class="text-white" href="/">INICIO</a></p>
          <p class="m-0 px-2">/</p>
          <p class="m-0">SOBRE NOSOTROS</p>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid py-5">
    <div class="container">
      <div class="row justify-content-center animate-box wow zoomIn animated">
        <div class="col-12 col-lg-6 text-center mb-5">
          <h2 class="mt-2 mb-3">Sobre la Carrera</h2>
          <h1 class="mt-2 mb-3">{{ institucionNombre }}</h1>
        </div>
      </div>
    </div>
  </div>
  <div class="about" style="padding: 0;">
    <div class="gradient-img"></div>
    <div class="container-background banner-image">
      <div class="container">
        <div class="banner-img"></div>
        <div class="row align-items-center">
          <div class="col-md-6">
            <div class="about-img">
              <a href="">
                <div class="about-img-1">
                  <img src="asets/img/logo-upea.png" alt="Image">
                </div>
              </a>
              <router-link to="/">
                <div class="about-img-2">
                  <img
                    :src="logoUrl"
                    alt="img"
                  />
                  &nbsp;
                  <h3>{{ institucionNombre }}</h3>
                </div>
              </router-link>
            </div>
          </div>
          <div class="col-md-6 caja-img-color2">
            <div class="section-header">
              <p>CARRERA DE</p>
              <h2 v-html="institucionNombre"></h2>
            </div>
            <div class="about-text">
              <p class="mb-4" v-html="historia"></p>
              <a class="btn" style="bottom: 4px;" href="/about">Sobre Nosotros</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="secciona">
    <div class="galeria">
      <ul>
        <li><img src="asets/img/about-1.jpg"></li>
        <li><img src="asets/img/about-2.jpg"></li>
      </ul>
    </div>
  </div>
  <div class="about" style="padding: 0; height: 1000px;">
    <div class="gradient-img"></div>
    <div class="container-background banner-image">
      <div class="container">
        <section id="main" class="caja-img-color2" style="position: relative; height: 850px; top: 30px;">
          <div id="tabs">
            <span class="diana" id="uno"></span>
            <a href="#uno" class="tab-e">MISIÓN</a>
            <span class="diana" id="dos"></span>
            <a href="#dos" class="tab-e">VISIÓN</a>
            <span class="diana" id="tres"></span>
            <a href="#tres" class="tab-e">OBJETIVOS</a>

            <div id="pnl_0" style="opacity: 1;">
              <div class="section-header">
                <h2>MISIÓN</h2>
              </div>
              <div class="about-text">
                <p class="mb-4" v-html="mision"></p>
              </div>
            </div>

            <div id="pnl_1">
              <div class="section-header">
                <h2>MISIÓN</h2>
              </div>
              <div class="about-text">
                <p class="mb-4" v-html="mision"></p>
              </div>
            </div>

            <div id="pnl_2">
              <div class="section-header">
                <h2>VISIÓN</h2>
              </div>
              <div class="about-text">
                <p class="mb-4" v-html="vision"></p>
              </div>
            </div>

            <div id="pnl_3">
              <div class="section-header">
                <h2>OBJETIVOS</h2>
              </div>
              <div class="about-text">
                <p class="mb-4" v-html="objetivos"></p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
  <div class="container-fluid py-5">
    <div class="container">
      <div class="section-header">
        <p>VIDEO</p>
        <h2>VISIÓN</h2>
      </div>
      <div class="row justify-content-center animate-box wow zoomIn animated">
        <iframe 
          width="560" 
          height="315" 
          :src="videoVision" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
  <div class="building">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="row align-items-center">
            <div class="col-md-6">
              <div class="about-img" style="text-align: center;">
                <router-link to="/">
                  <div class="about-img-2">
                    <img style="width: 80%;" src="asets/img/logo-tit.png" />
                    &nbsp;
                    <h3 style="text-align: center;">{{ institucionNombre }}</h3>
                  </div>
                </router-link>
              </div>
            </div>
            <div class="col-md-6 caja-img-color2" style="overflow-y: scroll; height: 600px;">
              <div class="about-text">
                <p class="mb-4" v-html="perfilProfesional"></p>
                <a class="btn" style="bottom: 4px;" href="/about">Sobre Nosotros</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="about" style="padding: 0;">
    <div class="container-background-upea banner-image-2 mi-imagen">
      <div class="container">
        <div class="row align-items-center">
          <div class="caja-img-color2">
            <div class="about-text" style="margin: 20px;">
              <p class="" v-html="perfilProfesional"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <hr size="8px" class="color-main"/><br>
    <div class="row align-items-center">
      <div class="col-md-6">
        <div class="about-img" style="text-align: center;">
          <router-link to="/">
            <div class="about-img-2">
              <img style="width: 80%;" :src="logoUrl" alt="img" />
              &nbsp;
              <h3 style="text-align: center;">{{ institucionNombre }}</h3>
            </div>
          </router-link>
        </div>
      </div>
      <div class="col-md-6 caja-img-color2">
        <div class="section-header">
          <h2>HISTORIA</h2>
        </div>
        <div class="about-text">
          <p class="mb-4" v-html="historia"></p>
          <a class="btn" style="bottom: 4px;" href="/about">Sobre Nosotros</a>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid py-5">
    <div class="container">
      <hr size="8px" /><br>
      <div class="team">
        <div class="container">
          <div class="section-header">
            <p>CARRERA {{ institucionNombre }}</p>
            <h2>NUESTRAS AUTORIDADES</h2>
          </div>
          <div class="row">
            <div class="col-lg-4 col-md-6" v-for="(autoridad, index) of autoridades" :key="index">
              <div class="team-item">
                <div class="team-img">
                  <img width="400" height="400"
                       :src="getImageUrl(autoridad.foto_autoridad)" 
                       alt="Team Image"/>
                </div>
                <div class="team-text">
                  <h2>{{ autoridad.nombre_autoridad }}</h2>
                  <p>{{ autoridad.cargo_autoridad }}</p>
                  <div class="team-social">
                    <a :href="autoridad.twiter_autoridad" target="_blank"><i class="fab fa-twitter"></i></a>
                    <a :href="autoridad.facebook_autoridad" target="_blank"><i class="fab fa-facebook-f"></i></a>
                    <a v-if="autoridad.celular_autoridad && autoridad.celular_autoridad !== 2147483647"
                       :href="'https://wa.me/591' + autoridad.celular_autoridad" 
                       target="_blank">
                      <i class="fab fa-whatsapp"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr size="8px" color="blue"/><br>
      <div class="contact">
        <div class="container banner-image">
          <div class="section-header">
            <p>Contáctanos</p>
            <h2>Póngase en contacto para cualquier consulta</h2>
          </div>
          <div class="row align-items-center">
            <div class="col-md-4">
              <div class="contact-info">
                <div class="contact-icon">
                  <i class="fa fa-map-marker-alt"></i>
                </div>
                <div class="contact-text">
                  <h3>Nuestra oficina central</h3>
                  <p>{{ direccion }}</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="contact-info">
                <div class="contact-icon">
                  <i class="fa fa-phone-alt"></i>
                </div>
                <div class="contact-text">
                  <h3>Llamadas</h3>
                  <p v-if="celular1">{{ celular1 }}</p>
                  <p v-if="celular2">{{ celular2 }}</p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="contact-info">
                <div class="contact-icon">
                  <i class="fa fa-envelope"></i>
                </div>
                <div class="contact-text">
                  <h3>Correo electrónico para obtener información</h3>
                  <p v-if="correo1">{{ correo1 }}</p>
                  <p v-if="correo2 && correo2 !== correo1">{{ correo2 }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br>
      <hr size="8px" color="blue"/><br>
      <div class="contact">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-12 text-center mb-5">
            <h2 class="mt-2 mb-3">Ubicación</h2>
          </div>
          <div class="col-12 col-lg-12 text-center mb-5">
            <h3>{{ direccion }}</h3>
            <iframe
              :src="googleMapUrl"
              width="85%"
              height="400"
              frameborder="0"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section class="galeria">
    <div class="cont_accordion" data-accordion="1">
      <div class="cont_inside">
        <div class="cont_caption">
          <h1>Slide 1</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
      </div>
    </div>
    <div class="cont_accordion" data-accordion="2">
      <div class="cont_inside">
        <div class="cont_caption">
          <h1>Slide 2</h1>
        </div>
      </div>
    </div>
    <div class="cont_accordion" data-accordion="3">
      <div class="cont_inside">
        <div class="cont_caption">
          <h1>Slide 3</h1>
        </div>
      </div>
    </div>
    <div class="cont_accordion" data-accordion="4">
      <div class="cont_inside">
        <div class="cont_caption">
          <h1>Slide 4</h1>
        </div>
      </div>
    </div>
    <div class="cont_accordion" data-accordion="5">
      <div class="cont_inside">
        <div class="cont_caption">
          <h1>Slide 5</h1>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState} from "vuex";
import api from "@/plugins/axios";

export default {
  name: "AboutView",

  computed: {
  
    ...mapState(["Institucion", "InstitucionContenido"]),

    institucionNombre() {
      return this.Institucion?.Descripcion?.institucion_nombre || 'la Carrera';
    },

    logoUrl() {
      const logo = this.Institucion?.Descripcion?.institucion_logo;
      return logo ? api.getImageUrl(logo) : '';
    },

    historia() {
      return this.Institucion?.Descripcion?.institucion_historia || '';
    },

    mision() {
      return this.Institucion?.Descripcion?.institucion_mision || '';
    },

    vision() {
      return this.Institucion?.Descripcion?.institucion_vision || '';
    },

    objetivos() {
      return this.Institucion?.Descripcion?.institucion_objetivos || '';
    },

    perfilProfesional() {
      return this.Institucion?.Descripcion?.institucion_sobre_ins || '';
    },

    videoVision() {
      return this.Institucion?.Descripcion?.institucion_link_video_vision || '';
    },

    autoridades() {
      return this.InstitucionContenido?.autoridad || [];
    },

    direccion() {
      return this.Institucion?.Descripcion?.institucion_direccion || '';
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

  methods: {

    getImageUrl(filename) {
      return api.getImageUrl(filename);
    }
  },
};
</script>

<style scoped>

.about-img-2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.about-img-2 img {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.about-text p {
  text-align: justify;
  line-height: 1.8;
  color: #333;
}

.team-item {
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
}

.team-item:hover {
  transform: translateY(-5px);
}

.team-social a {
  margin: 0 5px;
  color: #666;
  transition: color 0.3s ease;
}

.team-social a:hover {
  color: var(--main-color, #007bff);
}

.contact-info {
  text-align: center;
  padding: 1rem;
}

.contact-icon {
  font-size: 2rem;
  color: var(--main-color, #007bff);
  margin-bottom: 1rem;
}

iframe {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
  .carousel-text h1 {
    font-size: 2rem !important;
  }
  
  .about-img-2 img {
    width: 100% !important;
    height: auto;
  }
}
</style>