<template>
  <v-card>
    <v-card-title>Compañias</v-card-title>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar comapania"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn @click="getCompanies" color="success" class="mx-1"
        >Actualizar <v-icon>mdi-update</v-icon></v-btn
      >
      <CreateCompany />
    </v-card-title>
    <v-data-table :headers="headers" :items="companies" :search="search">
      <template v-slot:item.actions="{ item }">
        <v-btn icon @click="deleteCompany(item._id)"
          ><v-icon>mdi-delete</v-icon></v-btn
        >
      </template></v-data-table
    >
  </v-card>
</template>

<script>
import axios from "axios";
import CreateCompany from "../form/createCompany.vue";
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    search: "",
    headers: [
      { text: "Nombre", value: "name" },
      { text: "Correo", value: "email" },
      { text: "Telefono", value: "telephone" },
      { text: "Direccion", value: "address" },
      { rtn: "RTN", value: "rtn" },
      { text: "Fecha de Registro", value: "createdAt" },
      { text: "Acciones", value: "actions" },
    ],
  }),
  computed: {
    ...mapState("company", ["companies"]),
  },
  methods: {
    ...mapActions("company", ["getCompanies"]),
    ...mapActions("notification", ["showSnackbar"]),
    deleteCompany(_id) {
      axios
        .delete(`${process.env.VUE_APP_API_URL}/api/admin/company/${_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.showSnackbar({ text: res.data.message, color: "success" });
          this.getCompanies();
        })
        .catch((err) => {
          this.showSnackbar({
            text: err.response.data.message,
            color: "error",
          });
        });
    },
  },
  created() {
    this.getCompanies();
  },
  components: { CreateCompany },
};
</script>

<style>
</style>