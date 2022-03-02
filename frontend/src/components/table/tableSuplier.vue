<template>
  <v-card flat :loading="loading">
    <v-card-title>
      <span class="headline">Proveedores</span>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :loading="loading"
    >
      <template v-slot:item.materials="{ item }">
        {{ item.materials.length }}
      </template>
      <template v-slot:item.actions="{ item }">
        <ManageSupplier :supplier="item" @click="setSupplier(item)" />
        <v-btn
          icon
          @click="selectedItem(item, 'edit')"
          class="mx-1"
          small
          color="primary"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          icon
          @click="selectedItem(item, 'delete')"
          class="mx-1"
          small
          color="error"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
      <template v-slot:item.website="{ item }">
        <a :href="item.website">{{ item.website }}</a>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog.delete" width="300">
      <v-card>
        <v-card-title class="headline">Eliminar proveedor</v-card-title>
        <v-card-text>
          ¿Esta seguro que desea eliminar el proveedor?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click.native="dialog.delete = false">
            Cancelar
          </v-btn>
          <v-btn color="primary" text @click.native="deleteSupplier">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import ManageSupplier from "../card/manageSupplier.vue";
import { mapActions, mapMutations } from "vuex";
import axios from "axios";
export default {
  data: () => ({
    search: "",
    selected: {},
    loading: false,
    dialog: {
      delete: false,
    },
    headers: [
      { text: "Nombre", value: "name" },
      { text: "Direccion", value: "address" },
      { text: "Telefono", value: "telephone" },
      { text: "Correo", value: "email" },
      { text: "Web", value: "website" },
      { text: "Materiales", value: "materials" },
      { text: "Acciones", value: "actions" },
    ],
  }),
  computed: {},
  props: {
    items: Array,
  },
  methods: {
    ...mapActions("supplier", ["getSuppliers"]),
    ...mapActions("notification", ["showSnackbar"]),
    ...mapMutations("supplier", ["setSupplier"]),
    selectedItem(item, action) {
      this.selected = item;
      if (action == "delete") {
        this.dialog.delete = true;
      }
    },
    deleteSupplier() {
      this.loading = true;
      axios
        .delete(
          `${process.env.VUE_APP_API_URL}/api/admin/supplier/${this.selected._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          this.loading = false;
          this.showSnackbar({
            text: res.data.message,
            color: "success",
          });
          this.getSuppliers();
          this.dialog.delete = false;
        })
        .catch((err) => {
          this.loading = false;
          this.showSnackbar({
            text: err.response.data.message,
            color: "error",
          });
          this.dialog.delete = false;
        });
    },
  },
  components: { ManageSupplier },
};
</script>

<style>
</style>