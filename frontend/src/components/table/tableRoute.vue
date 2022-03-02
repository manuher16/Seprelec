<template>
  <v-card flat>
    <v-card-title>
      Nutrition
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="items" :search="search">
      <template v-slot:item.roles="{ item }">
        <div v-if="item.roles.length > 0">
          <v-chip-group>
            <v-chip
              v-for="role in item.roles"
              :key="role.id"
              :color="role.color"
              :text-color="role.textColor"
            >
              {{ role.name }}
            </v-chip>
          </v-chip-group>
        </div>
        <div v-else>
          <v-icon small>mdi-alert-outline</v-icon>
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon @click="selectItem(item, 'delete')">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog.delete" width="300">
      <v-card>
        <v-card-title>Desea eliminar la ruta</v-card-title>
        <v-card-text> Esta acción no se puede deshacer </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog.delete = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="deleteItem">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  data: () => ({
    search: "",
    selected: null,
    dialog: {
      delete: false,
      edit: false,
    },
    headers: [
      { text: "Ruta", value: "path", aling: "start" },
      { text: "Roles", value: "roles" },
      { text: "Tipo", value: "type" },
      { text: "Origen", value: "origin" },
      { text: "Descripcion", value: "description" },
      { text: "Acciones", value: "actions" },
    ],
  }),
  methods: {
    ...mapActions("notification", ["showSnackbar"]),
    ...mapActions("route", ["getRoutes"]),
    selectItem(item, action) {
      this.selected = item;
      if (action == "delete") {
        this.dialog.delete = true;
      }
    },
    deleteItem() {
      axios
        .delete(
          `${process.env.VUE_APP_API_URL}/api/admin/route/${this.selected._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          this.showSnackbar({ text: response.data.message, color: "success" });
          this.dialog.delete = false;
          this.getRoutes();
        })
        .catch((error) => {
          this.showSnackbar({
            text: error.response.data.message,
            color: "error",
          });
        });
    },
  },
  props: {
    items: Object,
  },
};
</script>

<style>
</style>