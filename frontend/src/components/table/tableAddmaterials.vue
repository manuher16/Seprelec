<template>
  <v-data-table
    :headers="type == 'selection' ? headers2 : headers"
    :items="type == 'selection' ? selectedMaterials : materials"
    :search="search"
  >
    <template v-slot:top>
      <v-spacer />
      <v-text-field
        class="mx-3"
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar Material"
        single-line
        hide-details
      ></v-text-field>
    </template>
    <template v-slot:item.unit="{ item }">
      {{ item.quantity }} {{ item.unit.name }}
    </template>
    <template v-slot:item.idSupplier="{ item }">
      {{ item.idSupplier.name }}
    </template>
    <template v-slot:item.price="{ item }">
      {{
        new Intl.NumberFormat("es-HN", {
          style: "currency",
          currency: "HNL",
        }).format(item.price)
      }}
    </template>
    <template v-slot:item.subtotal="{ item }">
      {{
        new Intl.NumberFormat("es-HN", {
          style: "currency",
          currency: "HNL",
        }).format(item.quantity2 * item.price)
      }}
    </template>
    <template v-slot:item.quantity="{ item }">
      <v-form ref="formMaterial">
        <v-text-field
          v-if="type == 'selection'"
          :rules="rules.quantity"
          v-model="item.quantity"
          type="number"
          required
          single-line
        >
        </v-text-field>
        <v-text-field
          v-else
          :rules="rules.quantity"
          v-model="item.quantity2"
          type="number"
          required
          single-line
        >
        </v-text-field>
      </v-form>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn
        color="primary"
        @click="addMaterial(item)"
        v-if="type != 'selection'"
      >
        Agregar<v-icon>mdi-plus</v-icon></v-btn
      >
      <v-btn
        color="error"
        @click="removeSelectedMaterial(item)"
        v-if="type == 'selection'"
      >
        Eliminar</v-btn
      >
    </template>
  </v-data-table>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data: () => ({
    search: "",
    loading: false,
    form: {},
    rules: {
      quantity: [
        (value) => {
          return value > 0 || "La cantidad debe ser mayor a 0";
        },
      ],
    },
    headers: [
      { text: "Nombre", value: "name" },
      { text: "Precio", value: "price" },
      { text: "Unidad", value: "unit" },
      { text: "Proveedor", value: "idSupplier" },
      { text: "Cantidad", value: "quantity" },
      { text: "Acciones", value: "actions" },
    ],
    headers2: [
      { text: "Nombre", value: "name" },
      { text: "Precio", value: "price" },
      { text: "Unidad", value: "unit" },
      { text: "Proveedor", value: "idSupplier" },
      { text: "Cantidad", value: "quantity" },
      { text: "Sub total", value: "subtotal" },
      { text: "Acciones", value: "actions" },
    ],
  }),
  methods: {
    ...mapActions("material", ["getMaterials"]),
    ...mapActions("supplier", ["getSuppliers"]),
    ...mapMutations("material", [
      "setSelectedMaterials",
      "pushSelectedMaterials",
      "removeSelectedMaterial",
    ]),
    addMaterial(item) {
      this.pushSelectedMaterials(item);
    },
  },
  props: {
    type: String,
  },
  computed: {
    ...mapState("material", ["materials"]),
    ...mapState("project", ["selectedMaterials"]),
  },
  created() {
    if (this.type == "selection") {
      this.getSuppliers();
    }
    this.getMaterials();
  },
};
</script>

<style>
</style>