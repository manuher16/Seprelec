<template>
  <v-card>
    <v-btn color="primary" @click="dialog.addEmployee = true"
      >Agregar trabajador</v-btn
    >
    <v-card>
      <v-card-title>Mano de obra</v-card-title>
    </v-card>
    <v-dialog v-model="dialog.addEmployee">
      <v-card>
        <v-sheet color="primary">
          <v-card-title class="white--text">Empleados</v-card-title>
        </v-sheet>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer />
        </v-card-title>
        <v-card-text>
          <v-data-table :headers="headers" :items="employees" :search="search">
            <template v-slot:item.actions="{ item }">
              <v-btn color="primary" @click="selectItem(item, 'add')">
                Seleccionar
              </v-btn>
            </template>
            <template v-slot:item.price="{ item }">
              <v-text-field
                v-model="item.price"
                type="number"
                :rules="rules.price"
                value="0"
              ></v-text-field>
            </template>
          </v-data-table>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn color="error" @click="dialog.addEmployee = false">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data: () => ({
    search: "",
    dialog: {
      addEmployee: false,
    },
    rules: {
      price: [
        (v) => !!v || "El precio es requerido",
        (v) => v > 0 || "El precio debe ser mayor a 0",
      ],
    },
    headers: [
      { text: "Nombre", value: "user.name", align: "start" },
      { text: "Habilidades", value: "skills" },
      { text: "Precio mano obra", value: "price" },
      { text: "Acciones", value: "actions" },
    ],
  }),
  computed: {
    ...mapState("employee", ["employees"]),
  },
  methods: {
    ...mapActions("employee", ["getEmployees", "calculteTotalWorkforce"]),
    ...mapMutations("employee", ["setEmployee", "pushSelectedEmployees"]),
    selectItem(item, action) {
      if (action == "add") {
        if (!item.price || item.price == "") {
          item.price = 0;
        }
        this.pushSelectedEmployees(item);
        this.calculteTotalWorkforce();
        this.dialog.addEmployee = false;
      }
    },
  },
  created() {
    this.getEmployees();
  },
};
</script>

<style>
</style>