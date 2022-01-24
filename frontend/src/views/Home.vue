<template>
  <v-container fluid class="mx-0 px-0">
    <v-card width="100%" height="100vh" flat class="d-flex aling-start">
      <v-carousel
        v-model="model"
        height="500"
        show-arrows-on-hover
        cycle
        hide-delimiters
      >
        <v-carousel-item v-for="(color, i) in colors" :key="i">
          <v-parallax
            width="100%"
            src="https://organizaciongen.files.wordpress.com/2019/08/cc3b3mo-sobrevivir-a-un-dc3ada-lleno-de-reuniones-y-aun-asc3ad-terminar-su-trabajo.jpeg"
          >
            <v-card
              color="transparent white--text d-flex aling-center"
              flat
              height="100%"
            >
              <v-card-title class="text-h3 text-weight-bold text-parallax">
                Soluciones Electricas
              </v-card-title>
            </v-card>
          </v-parallax>
        </v-carousel-item>
      </v-carousel>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    model: 0,
    colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
  }),
  components: {},
};
</script>
<style scoped>
.text-parallax {
  color: white;
  text-shadow: 0 5px 0 rgba(0, 0, 0, 0.5);
}
</style>
