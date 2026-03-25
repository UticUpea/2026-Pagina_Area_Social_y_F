<template>
  <div>dsadsa</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "contanctView",
  computed: {
    ...mapState(["url_api", "Institucion"]),
  },
};
</script>