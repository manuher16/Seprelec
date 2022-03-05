<template>
  <v-card>
    <v-btn color="primary" @click="dialog = true">
      Agregar servicio
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="headline">Agregar servicio</span>
          <v-spacer />
          <v-btn color="success" @click="getServices"
            >Actulizar <v-icon>mdi-update</v-icon></v-btn
          >
        </v-card-title>
        <v-card-subtitle>
          <v-text-field
            label="Buscar Servicio"
            v-model="search"
            append-icon="mdi-magnify"
            single-line
            hide-details
          ></v-text-field>
        </v-card-subtitle>
        <v-divider />
        <v-card-text>
          <v-data-table :headers="headers" :items="services">
            <template v-slot:item.quantity="{ item }">
              <v-text-field
                v-model="item.quantity"
                label="Cantidad"
                type="number"
                min="1"
                step="1"
                required
              ></v-text-field>
            </template>
            <template v-slot:item.materialsLength="{ item }">
              {{
                totalQuantityMaterials(item) *
                (item.quantity ? item.quantity : 1)
              }}
            </template>
            <template v-slot:item.totalMaterial="{ item }">
              {{
                new Intl.NumberFormat("es-HN", {
                  style: "currency",
                  currency: "HNL",
                }).format(
                  getTotalMaterialsPrice(item) *
                    (item.quantity ? item.quantity : 1)
                )
              }}
            </template>
            <template v-slot:item.totalService="{ item }">
              {{
                new Intl.NumberFormat("es-HN", {
                  style: "currency",
                  currency: "HNL",
                }).format(item.price * (item.quantity ? item.quantity : 1))
              }}
            </template>
            <template v-slot:item.total="{ item }">
              {{
                new Intl.NumberFormat("es-HN", {
                  style: "currency",
                  currency: "HNL",
                }).format(
                  (getTotalMaterialsPrice(item) + parseFloat(item.price)) *
                    (item.quantity ? item.quantity : 1)
                )
              }}
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn icon @click="addService(item)" class="mr-4">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialog = false"> Cerrar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      { text: "Servicio", value: "name" },
      { text: "Precio", value: "price" },
      { text: "Cantidad", value: "quantity" },
      { text: "Materiales necesarios", value: "materialsLength" },
      { text: "Total Materiales", value: "totalMaterial" },
      { text: "Total servicio", value: "totalService" },
      { text: "Total", value: "total" },
      { text: "", value: "actions" },
    ],
  }),
  computed: {
    ...mapState("service", ["services"]),
    ...mapState("project", ["selectedServices"]),
  },
  methods: {
    ...mapActions("service", ["getServices"]),
    ...mapActions("project", [
      "calculteTotalServices",
      "calculteTotalMaterials",
    ]),
    ...mapMutations("project", [
      "pushServicesForProject",
      "pushMaterialsForProject",
    ]),
    getTotalMaterialsPrice(service) {
      let total = 0;
      service.materials.forEach((material) => {
        total += parseFloat(material.price) * parseFloat(material.quantity);
      });
      return total;
    },
    addService(item) {
      if (!item.quantity || item.quantity < 1) {
        item.quantity = 1;
      } else {
        item.quantity = parseInt(item.quantity);
      }
      this.pushServicesForProject(item);
      if (item.materials.length > 0) {
        item.materials.forEach((material) => {
          material.serviceQuantity = item.quantity || 1;
          this.pushMaterialsForProject(material);
        });
      }
      this.calculteTotalServices();
      this.calculteTotalMaterials();
      this.dialog = false;
    },
    totalQuantityMaterials(item) {
      let total = 0;
      item.materials.forEach((material) => {
        total += parseFloat(material.quantity);
      });
      return total;
    },
  },
  created() {
    this.getServices();
  },
};
</script>

<style>
</style>