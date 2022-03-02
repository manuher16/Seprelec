<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <CreateSupplier />
      <v-btn color="success" @click="getSuppliers">
        Actulizar
        <v-icon>mdi-update</v-icon>
      </v-btn>
    </v-card-title>
    <TableSuplier :items="suppliers" />
  </v-card>
</template>

<script>
import CreateSupplier from "../components/form/createSupplier.vue";
import TableSuplier from "../components/table/tableSuplier.vue";
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({}),
  computed: {
    ...mapState("supplier", ["suppliers"]),
  },
  methods: {
    ...mapActions("supplier", ["getSuppliers"]),
  },
  created() {
    this.getSuppliers();
  },
  components: {
    TableSuplier,
    CreateSupplier,
  },
};
</script>

<style>
</style>