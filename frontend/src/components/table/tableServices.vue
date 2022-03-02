<template>
  <v-card class="my-3" flat>
    <v-card-title v-if="type != 'selection'">
      Servicios<v-spacer /> <CreateService /><v-btn
        color="success"
        @click="getServices"
        >Actulizar<v-icon>mdi-update</v-icon></v-btn
      ></v-card-title
    >
    <v-card-title v-if="type == 'selection'">
      Servicios <v-spacer />
    </v-card-title>
    <v-divider />
    <v-card-title>
      <v-text-field
        label="Buscar Servicio"
        v-model="search"
        append-icon="mdi-magnify"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :search="search"
        :items="type == 'selection' ? selectedServices : services"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn
            icon
            @click="selectedItem(item, 'delete')"
            v-if="type == 'normal'"
            ><v-icon>mdi-delete</v-icon></v-btn
          >
          <v-btn v-if="type == 'add'" color="primary" @click="add(item)"
            >Agregar</v-btn
          >
          <v-btn
            v-if="type == 'selection'"
            color="error"
            icon
            @click="removeItem(item)"
            ><v-icon large>mdi-close</v-icon></v-btn
          >
        </template>
        <template v-slot:item.materials="{ item }">
          {{ item.materials.length }}
        </template>

        <template v-slot:item.price="{ item }">
          {{
            new Intl.NumberFormat("es-HN", {
              style: "currency",
              currency: "HNL",
            }).format(item.price)
          }}
        </template>
        <template v-slot:item.priceMaterial="{ item }">
          {{
            Intl.NumberFormat("es-HN", {
              style: "currency",
              currency: "HNL",
            }).format(calcuteTotalMaterial(item))
          }}
        </template>
        <template v-slot:item.total="{ item }">
          {{
            Intl.NumberFormat("es-HN", {
              style: "currency",
              currency: "HNL",
            }).format(calcuteTotalMaterial(item) + item.price)
          }}
        </template>
      </v-data-table>
    </v-card-text>
    <v-dialog v-model="dialog.delete" width="300">
      <v-card>
        <v-card-title>Confirmar</v-card-title>
        <v-card-text>
          {{ selected.name }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog.delete = false"
            >Cancelar</v-btn
          >
          <v-btn color="red darken-1" text @click="deleteService"
            >Eliminar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
import CreateService from "../form/createService.vue";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data: () => ({
    search: "",
    selected: {},
    loading: false,
    dialog: {
      create: false,
      update: false,
      delete: false,
    },
    headers: [
      { text: "Nombre", value: "name" },
      { text: "Descripcion", value: "description" },
      { text: "Precio servicio", value: "price" },
      { text: "Precio materiales", value: "priceMaterial" },
      { text: "Materiales", value: "materials" },
      { text: "Total", value: "total" },
      { text: "Acciones", value: "actions" },
    ],
  }),
  computed: {
    ...mapState("service", ["services", "selectedServices"]),
  },
  methods: {
    ...mapActions("service", ["getServices", "calculateTotal"]),
    ...mapMutations("material", ["pushSelectedMaterials"]),
    ...mapMutations("service", [
      "pushSelectedServices",
      "removeSelectedService",
    ]),

    ...mapActions("notificartion", ["showSnackbar"]),
    ...mapActions("employee", ["calculteTotalWorkforce"]),

    selectedItem(item, type) {
      if (type === "delete") {
        this.dialog.delete = true;
        this.selected = item;
        this.calculateTotal();
        this.calculteTotalWorkforce();
      }
    },
    deleteService() {
      this.loading = true;
      axios
        .delete(
          `${process.env.VUE_APP_API_URL}/api/admin/service/${this.selected._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          this.getServices();
          this.showSnackbar({
            text: res.data.message,
            color: "success",
          });
          this.loading = false;
          this.dialog.delete = false;
        })
        .catch((err) => {
          this.loading = false;
          this.showSnackbar({
            text: err.data.message,
            color: "error",
          });
          this.dialog.delete = false;
        });
    },
    removeItem(item) {
      this.removeSelectedService(item);
      this.calculateTotal();
      this.calculteTotalWorkforce();
    },
    add(item) {
      this.pushSelectedServices(item);
      item.materials.forEach((material) => {
        this.pushSelectedMaterials(material);
      });

      this.calculateTotal();
      this.calculteTotalWorkforce();
    },
    calcuteTotalMaterial(item) {
      let total = 0;
      this.calculateTotal();
      this.calculteTotalWorkforce();
      item.materials.forEach((element) => {
        total += element.quantity * element.price;
      });
      return total;
    },
  },
  created() {
    if (this.type != "selection") {
      this.getServices();
    }
  },
  props: {
    type: String,
  },
  components: { CreateService },
};
</script>

<style>
</style>