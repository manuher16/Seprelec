<template>
  <v-container>
    <v-card flat class="text-center">
      <v-card-text class="text-h3 text-center">
        <p>No se ha encontrado la pagina</p>
      </v-card-text>
      <v-card-text>
        <v-img
          height="150"
          contain
          src="https://cdn.pixabay.com/photo/2021/02/19/14/42/sad-emoji-6030450_960_720.png"
        ></v-img>
      </v-card-text>
      <v-card-text>
        <p>La pagina que estas buscando no existe.</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" href="/"> Volver al inicio </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>