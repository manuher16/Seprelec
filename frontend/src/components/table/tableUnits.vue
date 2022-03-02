<template>
  <v-card>
    <v-data-table :headers="headers" :items="units">
      <template v-slot:top>
        <v-card flat>
          <v-card-title>
            Unidades de medida
            <v-spacer />
            <CreateUnit />
            <v-btn color="success" @click="getUnits"
              >Actulizar
              <v-icon>mdi-update</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider />
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar unidad"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
        </v-card>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import CreateUnit from "../form/createUnit.vue";
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    loading: false,
    search: "",
    headers: [
      { text: "Nombre", value: "name" },
      { text: "Abreviacion", value: "abbreviation" },
      { text: "Acciones", value: "actions" },
    ],
  }),
  computed: {
    ...mapState("unit", ["units"]),
  },
  methods: {
    ...mapActions("unit", ["getUnits"]),
  },
  created() {
    this.getUnits();
  },
  components: {
    CreateUnit,
  },
};
</script>

<style>
</style>