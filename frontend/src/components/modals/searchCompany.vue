<template>
  <v-card flat>
    <v-card-text class="">
      <v-row>
        <v-col class="order-md-1" md="3">
          <v-btn color="primary" @click="dialog = true">
            Buscar Compañia<v-icon>mdi-magnify</v-icon></v-btn
          ></v-col
        >
        <v-col
          ><v-card
            v-if="selectedCompany != null"
            width="100%"
            class="mr-2"
            tile
          >
            <v-card-title>{{ selectedCompany.name }}<v-spacer /></v-card-title>
            <v-divider />
            <v-card-text class="my-0 py-0">
              <v-icon>mdi-email</v-icon>
              {{ selectedCompany.email }}
            </v-card-text>
            <v-card-text class="my-0 py-0">
              <v-icon>mdi-phone</v-icon>

              {{ selectedCompany.telephone }}
            </v-card-text>
            <v-card-text class="my-0">
              <v-icon>mdi-map-marker</v-icon>

              {{ selectedCompany.address }}
            </v-card-text>
          </v-card>
          <v-card
            v-else
            width="100%"
            tile
            class="mr-3 white--text"
            color="error"
            dark
          >
            <v-card-text class="text-h6"
              >No a selecionado ninguna comapania</v-card-text
            >
          </v-card></v-col
        >
      </v-row>
    </v-card-text>
    <v-dialog v-model="dialog" max-width="700">
      <v-card>
        <v-card-title
          >Buscar Compania<v-spacer /><CreateCompany
        /></v-card-title>
        <v-divider />
        <v-card-text>
          <v-data-table :headers="headers" :items="companies">
            <template v-slot:item.actions="{ item }">
              <v-btn @click="selectItem(item)" color="primary"
                >Seleccionar</v-btn
              >
            </template>
          </v-data-table>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn color="error" @click="dialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import CreateCompany from "../form/createCompany.vue";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Compañia",
        align: "left",
        sortable: false,
        value: "name",
      },
      { text: "Correo", value: "email" },
      { text: "Telefono", value: "telephone" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
  }),
  computed: {
    ...mapState("company", ["companies", "selectedCompany"]),
  },
  methods: {
    ...mapMutations("company", ["setSelectedCompany"]),
    ...mapActions("company", ["getCompanies"]),
    selectItem(item) {
      this.setSelectedCompany(item);
      this.dialog = false;
    },
  },
  components: {
    CreateCompany,
  },
  created() {
    this.getCompanies();
  },
};
</script>

<style>
</style>