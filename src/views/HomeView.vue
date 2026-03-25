<template>
  <div>
    <div id="header-carousel" class="carousel slide carousel-fade" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item position-relative active" style="height: 100vh; min-height: 600px;">
          <img class="position-absolute w-100 h-100" src="@/assets/img/BackGround-UPEA-08.jpg" style="object-fit: cover;">
          <div class="carousel-overlay position-absolute w-100 h-100" style="background: rgba(0,0,0,0.5);"></div>
          <div class="carousel-caption d-flex flex-column justify-content-center">
            <div class="p-3 animacionX" style="max-width: 900px; position: absolute; left: 50%; transform: translateX(-50%); text-align: center;">
              <h4 class="text-white text-uppercase mb-4" style="letter-spacing: 6px;">Bienvenido</h4>
              <h3 class="display-2 text-capitalize text-white mb-4">Carrera de</h3>
              <h3 class="display-2 text-capitalize text-white mb-4">{{ institucionNombre }}</h3>
              <router-link class="btn btn-primary py-3 px-5 mt-2" to="/about">Sobre Nosotros</router-link>
            </div>
          </div>
        </div>
        <div class="carousel-item position-relative" style="height: 100vh; min-height: 600px;" v-for="(portada, index) of portadas" :key="index">
          <img class="position-absolute w-100 h-100" :src="getImageUrl(portada.portada_imagen)" style="object-fit: cover;">
          <div class="carousel-overlay position-absolute w-100 h-100" style="background: rgba(0,0,0,0.5);"></div>
          <div class="carousel-caption d-flex flex-column justify-content-center">
            <div class="p-3 animacionX" style="max-width: 900px; position: absolute; left: 50%; transform: translateX(-50%); text-align: center;">
              <h4 class="text-white text-uppercase mb-4" style="letter-spacing: 3px;">Universidad Pública de El Alto</h4>
              <h3 class="display-2 text-capitalize text-white mb-4">{{ institucionNombre }}</h3>
              <router-link class="btn btn-primary py-3 px-5 mt-2" to="/about">Conoce Más</router-link>
            </div>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#header-carousel" data-slide="prev">
        <div class="btn btn-lg btn-secondary btn-lg-square">
          <span class="carousel-control-prev-icon"></span>
        </div>
      </a>
      <a class="carousel-control-next" href="#header-carousel" data-slide="next">
        <div class="btn btn-lg btn-secondary btn-lg-square">
          <span class="carousel-control-next-icon"></span>
        </div>
      </a>
    </div>
    <div class="fact">
      <div class="container paused">
        <div class="section-header anim-fade-in">
          <h1 style="text-align: center;">NUESTRO CONTENIDO</h1>
        </div>
        <section class="galeria">
          <div class="cont_accordion" data-accordion="1">
            <div class="cont_inside anim-right">
              <router-link :to="'/convocatorias/5'" @click="$store.commit('clickLink')">
                <div class="cont_caption"><h1 style="color:var(--main-color)">CONVOCATORIAS</h1></div>
              </router-link>
            </div>
          </div>
          <div class="cont_accordion" data-accordion="2">
            <div class="cont_inside anim-up">
              <router-link :to="'/cursos/4'" @click="$store.commit('clickLink')">
                <div class="cont_caption"><h1 style="color:var(--main-color)">CURSOS</h1></div>
              </router-link>
            </div>
          </div>
          <div class="cont_accordion" data-accordion="3">
            <div class="cont_inside anim-down">
              <router-link :to="'/cursos/5'" @click="$store.commit('clickLink')">
                <div class="cont_caption"><h1 style="color:var(--main-color)">SEMINARIOS</h1></div>
              </router-link>
            </div>
          </div>
          <div class="cont_accordion" data-accordion="4">
            <div class="cont_inside anim-left">
              <router-link :to="'/publicaciones'" @click="$store.commit('clickLink')">
                <div class="cont_caption"><h1 style="color:var(--main-color)">PUBLICACIONES</h1></div>
              </router-link>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div class="fact">
      <div class="container paused">
        <div class="section-header anim-fade-in anim-up">
          <h1 style="text-align: center;">ENLACES EXTERNOS</h1>
        </div>
        <div class="row align-items-center paused" style="text-align: center; justify-content: center;">
          <div class="col-lg-4 col-md-6 animacion-sub zoom" v-for="(link, index) of linksExternos" :key="index">
            <a :href="link.url_link" target="_blank">
              <div class="fact-item method" :style="'background-image: url(' + getImageUrl(link.imagen) + '); object-fit:cover; background-size: cover; background-position:center; height:120px;'">
                <span></span>
              </div>
              <div class="cat">{{ link.tipo }}</div>
              <h2>{{ link.nombre }}</h2>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="about" style="padding: 0; position: relative;" id="mision">
      <div class="container-background paused">
        <div class="container" style="padding-top:20px">
          <div class="row align-items-center">
            <div class="col-md-6 anim-up">
              <div class="container">
                <h1 style="font-size: 60px; text-align: center;">MISIÓN, VISIÓN Y OBJETIVOS</h1>
                <iframe width="100%" height="315" :src="videoVision" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div>
            </div>
            <div class="col-md-6 anim-down">
              <ul class="nav md-tabs border_none" id="myTabMD" role="tablist">
                <li class="nav-item lisertab">
                  <a class="nav-link servi_tab active" id="home-tab-md" data-toggle="tab" href="#home-md" role="tab" aria-selected="true">MISIÓN</a>
                </li>
                <li class="nav-item lisertab">
                  <a class="nav-link servi_tab" id="profile-tab-md" data-toggle="tab" href="#profile-md" role="tab" aria-selected="false">VISIÓN</a>
                </li>
                <li class="nav-item lisertab">
                  <a class="nav-link servi_tab" id="contact-tab-md" data-toggle="tab" href="#contact-md" role="tab" aria-selected="false">OBJETIVOS</a>
                </li>
              </ul>
              <div class="tab-content card back_bg" id="myTabContentMD">
                <div class="tab-pane fade show active" id="home-md" role="tabpanel" style="margin: 50px;">
                  <div class="section-header"><h2>MISIÓN</h2></div>
                  <div class="about-text" style="color:white;">
                    <p class="mb-4" v-html="mision"></p>
                  </div>
                </div>
                <div class="tab-pane fade" id="profile-md" role="tabpanel" style="margin: 50px;">
                  <div class="section-header"><h2>VISIÓN</h2></div>
                  <div class="about-text" style="color:white;">
                    <p class="mb-4" v-html="vision"></p>
                  </div>
                </div>
                <div class="tab-pane fade" id="contact-md" role="tabpanel" style="margin: 50px;">
                  <div class="section-header"><h2>OBJETIVOS</h2></div>
                  <div class="about-text" style="color:white;">
                    <p class="mb-4" v-html="objetivos"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="service" id="service">
      <div class="container paused">
        <div class="section-header"><h2>NOVEDADES</h2></div>
        <div class="row">
          <div class="col-lg-6">
            <div class="row">
              <div class="col-lg-4 col-md-6 anim-up">
                <router-link to="/ofertas" class="card-intro">
                  <div class="service-item">
                    <img src="@/assets/img/logo-conv.png" alt="Icon">
                    <h3 style="color: black;">{{ ofertas.length }}</h3>
                    <h4>OFERTAS ACADÉMICAS</h4>
                  </div>
                </router-link>
              </div>
              <div class="col-lg-4 col-md-6 anim-down">
                <router-link to="/publicaciones" class="card-intro">
                  <div class="service-item">
                    <img src="@/assets/img/logo-conv.png" alt="Icon">
                    <h3 style="color: black;">{{ publicaciones.length }}</h3>
                    <h4>PUBLICACIONES</h4>
                  </div>
                </router-link>
              </div>
              <div class="col-lg-4 col-md-6 anim-up">
                <router-link to="/eventos" class="card-intro">
                  <div class="service-item">
                    <img src="@/assets/img/logo-cur.png" alt="Icon">
                    <h3 style="color: black">{{ eventos.length }}</h3>
                    <h4>EVENTOS</h4>
                  </div>
                </router-link>
              </div>
              <div class="col-lg-4 col-md-6 anim-down">
                <router-link to="/servicios" class="card-intro">
                  <div class="service-item">
                    <img src="@/assets/img/logo-serv.png" alt="Icon">
                    <h3 style="color: black">{{ servicios.length }}</h3>
                    <h4>SERVICIOS</h4>
                  </div>
                </router-link>
              </div>
              <div class="col-lg-4 col-md-6 anim-up">
                <router-link to="/videos" class="card-intro">
                  <div class="service-item">
                    <img src="@/assets/img/logo-vid.png" alt="Icon">
                    <h3 style="color: black">{{ videos.length }}</h3>
                    <h4>VIDEOS</h4>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-6" style="text-align: center;">
            <h1>Último video publicado</h1>
            <div v-if="videos.length===0"><h2>No hay Videos</h2></div>
            <div v-else>
              <iframe :src="videos[videos.length-1].video_enlace" frameborder="0" style="border-radius: 5px" width="100%" height="300px" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-background-2" style="position: relative;">
      <div id="conv" v-if="convocatoriasFiltradas.length > 0">
        <div class="container paused">
          <div class="section-header anim-up">
            <h2 style="color: white; text-align: center">CONVOCATORIAS, AVISOS Y COMUNICADOS</h2>
          </div>
        </div>
        <div class="about" style="padding: 0;">
          <div class="container paused">
            <div class="row align-items-center">
              <div class="team">
                <div class="container">
                  <div class="row anim-up">
                    <div class="col-lg-4 col-md-6" v-if="latestConvocatoria">
                      <div class="team-item">
                        <div class="team-img">
                          <router-link :to="'/detalleConvocatoria/' + latestConvocatoria.idconvocatorias" @click="$store.commit('clickLink')">
                            <img width="400" height="400" :src="getImageUrl(latestConvocatoria.con_foto_portada)" alt="Team Image"/>
                          </router-link>
                          <router-link :to="'/detalleConvocatoria/' + latestConvocatoria.idconvocatorias" @click="$store.commit('clickLink')">
                            <div class="team-text">
                              <h2>{{ latestConvocatoria.con_titulo }}</h2>
                              <p>{{ formatDate(latestConvocatoria.con_fecha_inicio) }} - {{ formatDate(latestConvocatoria.con_fecha_fin) }}</p>
                              <div class="team-social"><h4>Leer Convocatoria</h4></div>
                            </div>
                          </router-link>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-6" v-if="latestComunicado">
                      <div class="team-item">
                        <div class="team-img">
                          <router-link :to="'/detalleConvocatoria/' + latestComunicado.idconvocatorias" @click="$store.commit('clickLink')">
                            <img width="400" height="400" :src="getImageUrl(latestComunicado.con_foto_portada)" alt="Team Image"/>
                          </router-link>
                          <router-link :to="'/detalleConvocatoria/' + latestComunicado.idconvocatorias" @click="$store.commit('clickLink')">
                            <div class="team-text">
                              <h2>{{ latestComunicado.con_titulo }}</h2>
                              <p>{{ formatDate(latestComunicado.con_fecha_inicio) }} - {{ formatDate(latestComunicado.con_fecha_fin) }}</p>
                              <div class="team-social"><h4>Leer Comunicado</h4></div>
                            </div>
                          </router-link>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-6" v-if="latestAviso">
                      <div class="team-item">
                        <div class="team-img">
                          <router-link :to="'/detalleConvocatoria/' + latestAviso.idconvocatorias" @click="$store.commit('clickLink')">
                            <img width="400" height="400" :src="getImageUrl(latestAviso.con_foto_portada)" alt="Team Image"/>
                          </router-link>
                          <router-link :to="'/detalleConvocatoria/' + latestAviso.idconvocatorias" @click="$store.commit('clickLink')">
                            <div class="team-text">
                              <h2>{{ latestAviso.con_titulo }}</h2>
                              <p>{{ formatDate(latestAviso.con_fecha_inicio) }} - {{ formatDate(latestAviso.con_fecha_fin) }}</p>
                              <div class="team-social"><h4>Leer Aviso</h4></div>
                            </div>
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a class="btn btn-color" style="bottom: 4px;" href="/convocatorias/5">Más Convocatorias +</a> ||
                  <a class="btn btn-color" style="bottom: 4px;" href="/convocatorias/2">Más Avisos +</a> ||
                  <a class="btn btn-color" style="bottom: 4px;" href="/convocatorias/4">Más Comunicados +</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="cur" v-if="cursosFiltrados.length > 0 || seminariosFiltrados.length > 0" style="padding-top: 20px;">
        <div class="container paused">
          <div class="section-header anim-up">
            <h2 style="color: white; text-align: center">CURSOS Y SEMINARIOS</h2>
          </div>
        </div>
        <div class="about" style="padding: 0;">
          <div class="container">
            <div class="row align-items-center">
              <div class="team">
                <div class="container paused">
                  <div class="row anim-up">
                    <div class="col-lg-4 col-md-6" v-if="latestCurso">
                      <div class="team-item">
                        <div class="team-img">
                          <router-link :to="'/detalleCurso/' + latestCurso.iddetalle_cursos_academicos">
                            <img width="400" height="400" :src="getImageUrl(latestCurso.det_img_portada)" alt="Team Image"/>
                          </router-link>
                          <router-link :to="'/detalleCurso/' + latestCurso.iddetalle_cursos_academicos">
                            <div class="team-text">
                              <h2>{{ latestCurso.tipo_curso_otro?.tipo_conv_curso_nombre || 'CURSO' }}</h2>
                              <p>{{ formatDate(latestCurso.det_fecha_ini) }} - {{ formatDate(latestCurso.det_fecha_fin) }}</p>
                              <div class="team-social"><h4>Leer Curso</h4></div>
                            </div>
                          </router-link>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-6" v-if="latestSeminario">
                      <div class="team-item">
                        <div class="team-img">
                          <router-link :to="'/detalleCurso/' + latestSeminario.iddetalle_cursos_academicos">
                            <img width="400" height="400" :src="getImageUrl(latestSeminario.det_img_portada)" alt="Team Image"/>
                          </router-link>
                          <router-link :to="'/detalleCurso/' + latestSeminario.iddetalle_cursos_academicos">
                            <div class="team-text">
                              <h2>{{ latestSeminario.tipo_curso_otro?.tipo_conv_curso_nombre || 'SEMINARIO' }}</h2>
                              <p>{{ formatDate(latestSeminario.det_fecha_ini) }} - {{ formatDate(latestSeminario.det_fecha_fin) }}</p>
                              <div class="team-social"><h4>Leer Seminario</h4></div>
                            </div>
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a class="btn btn-color" style="bottom: 4px;" href="/cursos/4">Más Cursos +</a> ||
                  <a class="btn btn-color" style="bottom: 4px;" href="/cursos/5">Más Seminarios +</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="team paused" id="aut">
      <div class="container">
        <div class="section-header anim-fade-in">
          <p>CARRERA {{ institucionNombre }}</p>
          <h2>NUESTRAS AUTORIDADES</h2>
        </div>
        <div class="row paused" style="justify-content: center;">
          <carousel :items-to-show="2.5" :autoplay="2000" :wrap-around="true" style="height:600px">
            <slide v-for="(autoridad, index) of autoridades" :key="index">
              <div class="card-1">
                <div class="poster">
                  <img width="400" height="400" :src="getImageUrl(autoridad.foto_autoridad)" alt="Team Image"/>
                </div>
                <div class="details">
                  <h2>{{ autoridad.nombre_autoridad || 'Sin nombre' }}</h2>
                  <h1>{{ autoridad.cargo_autoridad }}</h1>
                  <div class="team-social">
                    <a v-if="autoridad.twiter_autoridad" :href="autoridad.twiter_autoridad" target="_blank"><i class="fab fa-twitter"></i></a>
                    <a v-if="autoridad.facebook_autoridad" :href="autoridad.facebook_autoridad" target="_blank"><i class="fab fa-facebook-f"></i></a>
                    <a v-if="autoridad.celular_autoridad && autoridad.celular_autoridad !== 2147483647" 
                       :href="'https://wa.me/591' + autoridad.celular_autoridad" 
                       target="_blank">
                      <i class="fab fa-whatsapp"></i>
                    </a>
                  </div>
                </div>
              </div>
            </slide>
            <template #addons>
              <navigation />
              <pagination />
            </template>
          </carousel>
        </div>
      </div>
    </div>
    <div class="about" style="padding: 0; display: block;" id="plan">
      <div class="container-background-15 banner-image-1">
        <div class="container" style="padding-top:20px">
          <div class="row" style="align-items: center;">
            <div class="col-md-6 anim-up">
              <div class="container" style="text-align:center;">
                <img :src="logoUrl" alt="img" width="200" height="200"/>
                <h1 class="balanceo" style="font-size: 60px;">Plan de Estudios</h1>
              </div>
            </div>
            <div class="col-md-6 anim-down">
              <div class="container animacion-sub" style="text-align:center;">
                <a class="custom-btn btn-11 zoom" style="font-size: larger;" :href="organigramaUrl" download target="_blank">
                  Ver Plan de Estudios
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="contact" id="cont">
      <div class="container paused">
        <div class="section-header anim-up"><h2>CONTÁCTOS</h2></div>
        <div class="row align-items-center paused">
          <div class="col-md-5">
            <div class="contact-info anim-right" style="backdrop-filter: blur(4px);">
              <div class="contact-icon"><i class="fa fa-map-marker"></i></div>
              <div class="contact-text">
                <h3>Nuestra oficina central</h3>
                <p>{{ direccion }}</p>
              </div>
            </div>
            <div class="contact-info anim-right" style="backdrop-filter: blur(4px);">
              <div class="contact-icon"><i class="fa fa-phone"></i></div>
              <div class="contact-text">
                <h3>Llamadas</h3>
                <p v-if="celular1">{{ celular1 }}</p>
                <p v-if="celular2">{{ celular2 }}</p>
              </div>
            </div>
            <div class="contact-info anim-right" style="backdrop-filter: blur(4px);">
              <div class="contact-icon"><i class="fa fa-envelope"></i></div>
              <div class="contact-text">
                <h3>Correo electrónico para obtener información</h3>
                <p v-if="correo1">{{ correo1 }}</p>
                <p v-if="correo2 && correo2 !== correo1">{{ correo2 }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-7">
            <div class="contact-form anim-up">
              <div id="success"></div>
              <h3 style="text-align:center">Ubicación</h3>
              <iframe :src="googleMapUrl" width="100%" height="400" frameborder="0"></iframe><br><br>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import api from "@/plugins/axios";
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

export default {
  name: "HomeView",
  
  data() {
    return {
      stado_video: 0,
    };
  },

  computed: {

    ...mapState(["Institucion", "InstitucionContenido", "InstitucionRecursos", "InstitucionEventos"]),
    ...mapGetters([
      'institucionLogo',
      'portadas',
      'videos',
      'publicaciones',
      'linksExternos',
      'eventos',
      'convocatorias',
      'cursos',
      'servicios',
      'ofertas'
    ]),

    institucionNombre() {
      return this.Institucion?.Descripcion?.institucion_nombre || 'Autotrónica';
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
    videoVision() {
      return this.Institucion?.Descripcion?.institucion_link_video_vision || '';
    },
    logoUrl() {
      return this.institucionLogo;
    },
    organigramaUrl() {
      const org = this.Institucion?.Descripcion?.institucion_organigrama;
      return org ? api.getImageUrl(org) : '#';
    },
    direccion() {
      return this.Institucion?.Descripcion?.institucion_direccion || '';
    },
    celular1() {
      const c1 = this.Institucion?.Descripcion?.institucion_celular1;
      return c1 && c1 !== 2147483647 ? `+591 ${c1}` : '';
    },
    celular2() {
      const c2 = this.Institucion?.Descripcion?.institucion_celular2;
      return c2 && c2 !== 2147483647 ? `+591 ${c2}` : '';
    },
    correo1() {
      return this.Institucion?.Descripcion?.institucion_correo1 || '';
    },
    correo2() {
      return this.Institucion?.Descripcion?.institucion_correo2 || '';
    },
    googleMapUrl() {
      return this.Institucion?.Descripcion?.institucion_api_google_map || '';
    },
    autoridades() {
      return this.InstitucionContenido?.autoridad || [];
    },
    convocatoriasFiltradas() {
      return this.convocatorias.filter(c => c.con_estado === "1");
    },
    cursosFiltrados() {
      return this.cursos.filter(c => c.det_estado === "1" && c.tipo_curso_otro?.tipo_conv_curso_nombre === "CURSOS");
    },
    seminariosFiltrados() {
      return this.cursos.filter(c => c.det_estado === "1" && c.tipo_curso_otro?.tipo_conv_curso_nombre === "SEMINARIOS");
    },
    latestConvocatoria() {
      const activas = this.convocatoriasFiltradas.filter(c => c.tipo_conv_comun?.tipo_conv_comun_titulo === "CONVOCATORIAS");
      return activas[0] || null;
    },
    latestComunicado() {
      const activas = this.convocatoriasFiltradas.filter(c => c.tipo_conv_comun?.tipo_conv_comun_titulo === "COMUNICADOS");
      return activas[0] || null;
    },
    latestAviso() {
      const activas = this.convocatoriasFiltradas.filter(c => c.tipo_conv_comun?.tipo_conv_comun_titulo === "AVISOS");
      return activas[0] || null;
    },
    latestCurso() {
      return this.cursosFiltrados[0] || null;
    },
    latestSeminario() {
      return this.seminariosFiltrados[0] || null;
    }
  },

  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },

  methods: {
    getImageUrl(filename) {
      return api.getImageUrl(filename);
    },

    formatDate(fecha) {
      if (!fecha) return '';
      const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
      const fechaCadena = fecha.substr(0, 10);
      const fechaArray = fechaCadena.split("-");
      return `${fechaArray[2]} de ${meses[fechaArray[1] - 1]} de ${fechaArray[0]}`;
    }
  },

  async mounted() {
    this.$store.commit('loadOn');
    
    try {
      const result = await this.$store.dispatch('fetchInstitucionData');
      if (!result.success) {
        console.error('❌ Error cargando datos de institución');
      }
    } catch (error) {
      console.error('Error en mounted:', error);
    } finally {
      this.$store.commit('loading');
    }
  }
};
</script>

<style scoped>
.carousel-overlay {
  z-index: 1;
}

.carousel-caption {
  z-index: 2;
}

.carousel-item {
  transition: opacity 1s ease-in-out;
}
</style>