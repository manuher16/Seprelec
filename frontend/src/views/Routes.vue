<template>
  <v-container fluid>
    <v-card class="mx-0">
      <v-card-title>
        Table de rutas<v-spacer></v-spacer>
        <CreateRoute />
        <v-btn color="success" text @click="getRoutes">
          Actualizar <v-icon>mdi-update</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text><TableRoute :items="routes" /></v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import CreateRoute from "../components/modals/createRoute.vue";
import TableRoute from "../components/table/tableRoute.vue";
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({}),
  computed: {
    ...mapState("route", ["routes"]),
  },
  methods: {
    ...mapActions("route", ["getRoutes"]),
  },
  created() {
    this.getRoutes();
  },
  components: { CreateRoute, TableRoute },
};
</script>

<style>
</style>