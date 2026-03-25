<template>
  <div class="blog-right">
    
    <!-- Categorías -->
    <div class="category">
      <h3>Categorías</h3>
      <ul class="left-aligned">
        <li>
          <router-link to="/servicios" @click="$store.commit('clickLink')">
            Servicios <span>{{ serviciosCount }}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/ofertas" @click="$store.commit('clickLink')">
            Ofertas académicas <span>{{ ofertasCount }}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/publicaciones" @click="$store.commit('clickLink')">
            Publicaciones <span>{{ publicacionesCount }}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/gacetas" @click="$store.commit('clickLink')">
            Gaceta <span>{{ gacetaCount }}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/eventos" @click="$store.commit('clickLink')">
            Eventos <span>{{ eventosCount }}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/videos" @click="$store.commit('clickLink')">
            Videos <span>{{ videosCount }}</span>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Tags / Links Externos -->
    <div class="tags">
      <h3>Links</h3>
      <ul class="tags-list clearfix left-aligned">
        <li v-for="(link, index) of linksData" :key="link.id_link || index">
          <a :href="link.url_link?.trim()" 
             target="_blank" 
             rel="noopener noreferrer"
             :title="link.tipo">
            {{ link.nombre?.toUpperCase() }}<br>
          </a>
        </li>
        <li>
          <a href="https://utic.upea.bo" target="_blank" rel="noopener noreferrer">UTIC UPEA</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.left-aligned { text-align: left; }
.category ul li { list-style: none; padding: 8px 0; border-bottom: 1px solid #eee; }
.category ul li a { display: flex; justify-content: space-between; align-items: center; text-decoration: none; color: inherit; }
.category ul li a:hover { color: var(--main-color); }
.category ul li span { 
  background: var(--main-color); 
  color: #fff; 
  padding: 2px 8px; 
  border-radius: 12px; 
  font-size: 0.85rem;
  min-width: 24px;
  text-align: center;
  display: inline-block;
}
.tags-list li { display: inline-block; margin: 4px; }
.tags-list a { 
  display: inline-block; 
  padding: 4px 10px; 
  background: #f5f5f5; 
  border-radius: 4px; 
  text-decoration: none; 
  color: #333; 
  font-size: 0.9rem; 
  transition: background 0.3s; 
}
.tags-list a:hover { background: var(--main-color); color: #fff; }
</style>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "SidebarCustom",
  
  computed: {
    ...mapState([
      "MenuConv", 
      "MenuCur", 
      "InstitucionEventos",
      "InstitucionRecursos"
    ]),
   
    ...mapGetters([
      'convocatorias',
      'cursos',
      'servicios',
      'ofertas',
      'publicaciones',
      'gacetas',
      'eventos',
      'videos',
      'linksExternos'
    ]),

    menuConvocatorias() {
      return this.MenuConv || [];
    },
    
    menuCursos() {
      return this.MenuCur || [];
    },

    linksData() {
      return this.linksExternos?.map(link => ({
        id_link: link.id_link || link.id,
        url_link: link.url_link,
        nombre: link.nombre,
        tipo: link.tipo,
      })) || [];
    },

    serviciosCount() {
      return this.servicios?.filter(s => 
        s.serv_active === "1" || s.serv_active === 1
      )?.length || 0;
    },
    
    ofertasCount() {
      return this.ofertas?.filter(o => 
        o.ofertas_estado === 1 || o.ofertas_id
      )?.length || 0;
    },
    
    publicacionesCount() {
      return this.publicaciones?.filter(p => p.publicaciones_id)?.length || 0;
    },
    
    gacetaCount() {
      return this.gacetas?.filter(g => 
        g.gaceta_id && g.gaceta_documento
      )?.length || 0;
    },
    
    eventosCount() {
      return this.eventos?.filter(e => e.evento_id)?.length || 0;
    },
    
    videosCount() {
      return this.videos?.filter(v => 
        v.video_id && (v.video_estado === 1 || v.video_estado === "1" || !v.video_estado)
      )?.length || 0;
    },
  },
  
  methods: {
    formatTitle(text) {
      if (!text) return '';
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    },

   contarConv(tipo) {
  if (!tipo) return 0;
  const convocatorias = this.$store.state.InstitucionEventos?.convocatorias || [];
  return convocatorias.filter(c => 
    c.tipo_conv_comun?.tipo_conv_comun_titulo === tipo && 
    (c.con_estado === '1' || c.con_estado === 1)
  ).length;
},

contarCur(tipo) {
  if (!tipo) return 0;
  const cursos = this.$store.state.InstitucionEventos?.cursos || [];
  return cursos.filter(c => 
    c.tipo_curso_otro?.tipo_conv_curso_nombre === tipo && 
    (c.det_estado === '1' || c.det_estado === 1)
  ).length;
},
    clickBack() {
      this.$store.commit("clickLink");
      this.$router.go(-1);
    },
  },
};
</script>