<template>
  <v-container fluid>
    <v-parallax
      class=""
      contain
      src="https://www.10wallpaper.com/wallpaper/1366x768/1701/Apple_laptop_notebook_office-Brand_HD_Wallpaper_1366x768.jpg"
    >
      <v-card
        height="100%"
        color="transparent"
        flat
        class="d-flex flex-column aling-end md-6 justify-center"
      >
        <v-card
          class="d-flex align-start mb-6 flex-column white--text"
          color="transparent"
          flat
        >
          <v-card-title class="text-h2 text-parallax text-uppercase">
            Servicios
          </v-card-title>

          <v-card-subtitle class="white--text d-flex text-parallax">
            <router-link to="/" class="router-link white--text">
              Home
            </router-link>

            <v-icon class="mx-3" color="white">mdi-arrow-right</v-icon>
            Servicios
          </v-card-subtitle>
        </v-card>
      </v-card>
    </v-parallax>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
.text-parallax {
  text-shadow: 0 2px 2px rgba(0, 0, 0, 1);
}
</style>