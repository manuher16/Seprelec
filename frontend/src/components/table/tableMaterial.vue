<template>
  <v-card>
    <v-card-title>
      Materiales
      <v-spacer></v-spacer>
      <CreateMaterial :supplier="supplier" />
      <v-btn color="success" @click="getMaterials">
        Actulizar
        <v-icon>mdi-update</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar Material"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="type == 'add' ? materials : supplier.materials"
        ><template v-slot:item.unit="{ item }">
          {{ item.unit.name }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn icon small @click="editMaterial(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon small @click="deleteMaterial(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <template v-slot:item.price="{ item }">
          {{
            new Intl.NumberFormat("es-HN", {
              style: "currency",
              currency: "HNL",
            }).format(item.price)
          }}
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CreateMaterial from "../form/createMaterial.vue";
export default {
  data: () => ({
    search: "",
    headers: [
      { text: "Nombre", value: "name" },
      {
        text: "Precio",
        value: "price",
      },
      { text: "Cantidad", value: "quantity" },
      { text: "Unidades", value: "unit" },
      { text: "Acciones", value: "actions" },
    ],
  }),
  computed: {
    ...mapState("material", ["materials"]),
  },
  methods: {
    ...mapActions("material", ["getMaterials"]),
  },
  props: { supplier: Object, type: String },
  components: {
    CreateMaterial,
  },
  created() {
    this.getMaterials();
  },
};
</script>

<style>
</style>