<template>
  <v-card>
    <v-data-table :headers="headers" :items="selectedEmployees">
      <template v-slot:item.price="{ item }">
        <v-text-field
          v-model="item.price"
          type="number"
          @keyup="calculteTotalWorkforce"
          @click="calculteTotalWorkforce"
        ></v-text-field>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn color="error" @click="selectedItem(item, 'delete')" icon
          ><v-icon large>mdi-close</v-icon></v-btn
        >
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data: () => ({
    headers: [
      { text: "Nombre", value: "user.name", aling: "start" },
      { text: "Ocupacion", value: "occupation" },
      { text: "Precio mano obra", value: "price" },
      { text: "Acciones", value: "actions" },
    ],
  }),
  computed: {
    ...mapState("employee", ["selectedEmployees"]),
  },
  methods: {
    ...mapMutations("employee", ["removeSelectedEmployees"]),
    ...mapActions("employee", ["calculteTotalWorkforce"]),
    selectedItem(item, action) {
      if (action === "delete") {
        this.removeSelectedEmployees(item);
        this.calculteTotalWorkforce();
      }
    },
  },
};
</script>