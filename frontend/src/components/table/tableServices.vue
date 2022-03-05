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
            @click="popServicesToProject(item)"
            ><v-icon large>mdi-close</v-icon></v-btn
          >
        </template>
        <template v-slot:item.materials="{ item }">
          {{ totalQuantityMaterials(item) }}
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
            }).format(
              calcuteTotalMaterial(item) * (item.quantity ? item.quantity : 1) +
                item.price * (item.quantity ? item.quantity : 1)
            )
          }}
        </template>
        <template v-slot:item.totalMaterials="{ item }">
          {{
            Intl.NumberFormat("es-HN", {
              style: "currency",
              currency: "HNL",
            }).format(
              calcuteTotalMaterial(item) * (item.quantity ? item.quantity : 1)
            )
          }}
        </template>
        <template v-slot:item.totalService="{ item }">
          {{
            Intl.NumberFormat("es-HN", {
              style: "currency",
              currency: "HNL",
            }).format((item.quantity ? item.quantity : 1) * item.price)
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
      { text: "Servicio", value: "name" },
      { text: "Descripcion", value: "description" },
      { text: "Precio", value: "price" },
      { text: "Precio materiales", value: "priceMaterial" },
      { text: "Materiales", value: "materials" },
      { text: "Total", value: "total" },
      { text: "Acciones", value: "actions" },
    ],
  }),
  computed: {
    ...mapState("service", ["services"]),
    ...mapState("project", ["selectedServices"]),
  },
  methods: {
    ...mapMutations("material", ["pushSelectedMaterials"]),
    ...mapMutations("project", [
      "pushServicesForProject",
      "removeSelectedService",
      "pushSelectedMaterialsForProject",
      "popServices",
    ]),

    ...mapActions("service", ["getServices", "calculateTotal"]),
    ...mapActions("project", [
      "calculteTotalWorkforce",
      "calculteTotalMaterials",
      "calculteTotal",
      "calculteTotalDiscount",
      "calculteTotalServices",
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
    popServicesToProject(item) {
      this.popServices(item);
      this.calculteTotalServices();
      this.calculteTotalMaterials();
      this.calculteTotalWorkforce();
      this.calculteTotalDiscount();
      this.calculteTotal();
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

    calcuteTotalMaterial(item) {
      let total = 0;
      item.materials.forEach((element) => {
        total += element.quantity * element.price;
      });

      return total;
    },
    getTotalMaterialsPrice(service) {
      let total = 0;
      service.materials.forEach((material) => {
        total += parseFloat(material.price) * parseFloat(material.quantity);
      });
      return total;
    },
    totalQuantityMaterials(item) {
      let total = 0;
      item.materials.forEach((material) => {
        total += parseFloat(material.quantity);
      });
      total = total * (item.quantity || 1);
      return total;
    },
  },
  created() {
    if (this.type == "selection") {
      Array.prototype.insert = function (index, item) {
        this.splice(index, 0, item);
      };
      this.headers.splice(3, 1);
      this.headers.insert(4, {
        text: "Cantidad servicios",
        value: "quantity",
      });
      this.headers.insert(5, {
        text: "Total Materiales",
        value: "totalMaterials",
      });
      this.headers.insert(6, { text: "Total Servicio", value: "totalService" });
    }
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