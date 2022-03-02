<template>
  <v-card>
    <v-card-title>
      Roles
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-btn @click="getItemsTableRole" text color="primary">Actulizar</v-btn>
    </v-card-title>
    <v-data-table
      :headers="tableRole.headers"
      :items="tableRole.itemsTable"
      :search="search"
      :loading="loading"
      ><template v-slot:item.role="{ item }">
        <p class="d-flex aling-center text-uppercase justify-center">
          {{ item.role.name }}
        </p>
      </template>
      <template v-slot:item.permissions="{ item }">
        {{ getPermissionNameToString(item.permissions) }}
      </template>
      ><template v-slot:item.action="{ item }">
        <v-card class="mx-0" flat color="transparent">
          <v-card-actions class="mx-0">
            <v-icon @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon @click="selectedItem(item, 'delete')">mdi-delete</v-icon>
            <v-icon @click="details(item)">mdi-details</v-icon>
          </v-card-actions>
        </v-card>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog.delete" width="300">
      <v-card>
        <v-card-title>
          Eliminar Rol
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog.delete = false">
            Cerrar
          </v-btn>
        </v-card-title>
        <v-card-text> ¿Esta seguro que desea eliminar el rol? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="deleteItem">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      search: "",
      selected: {},
      dialog: {
        delete: false,
        details: false,
      },
    };
  },
  computed: {
    ...mapState("tables", ["tableRole", "loading"]),
  },
  methods: {
    ...mapMutations("tables", ["setItemsTable", "setSelectedItem"]),
    ...mapMutations("notification", ["showSnackbar"]),
    ...mapActions("tables", ["getItemsTableRole"]),
    onSelectItem(item) {
      this.setSelectedItem(item);
    },
    deleteItem() {
      axios
        .delete(
          `${process.env.VUE_APP_API_URL}/api/admin/role/${this.selected._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          this.getItemsTableRole();
          this.dialog.delete = false;
          this.showSnackbar({
            text: res.data.message,
            color: "success",
            timeout: 3000,
          });
        })
        .catch(() => {
          this.showSnackbar({
            message: "Error al eliminar el rol",
            color: "error",
            timeout: 3000,
          });
        });
    },
    selectedItem(item, action) {
      this.selected = item;
      if (action == "delete") {
        this.dialog.delete = true;
      }
    },
    getPermissionNameToString(permissions) {
      let permissionName = "";
      permissions.forEach((permission) => {
        permissionName += `${permission.name}, `;
      });
      return permissionName.slice(0, -2);
    },
  },
  created() {
    this.getItemsTableRole();
  },
};
</script>

<style>
</style>