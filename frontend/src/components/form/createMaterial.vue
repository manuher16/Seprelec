<template>
  <v-card flat>
    <v-btn @click="dialog = true" color="primary" class="mx-2">
      Crear <v-icon>mdi-plus</v-icon></v-btn
    >
    <v-dialog v-model="dialog" max-width="700">
      <v-card :loading="loading">
        <v-sheet color="primary" width="100%" height="">
          <v-card-title class="white--text">
            Crear material para {{ supplier.name }}
          </v-card-title>
        </v-sheet>
        <v-divider />
        <v-card-text>
          <v-form ref="createMaterial">
            <v-text-field
              v-model="form.name"
              label="Nombre"
              required
              autofocus
              :rules="rules.required"
            >
            </v-text-field>

            <v-text-field
              v-model="form.price"
              :rules="rules.price"
              label="Precio"
              required
              type="number"
            >
            </v-text-field>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="form.quantity"
                  label="Cantidad"
                  required
                  type="number"
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-combobox
                  v-model="form.unit"
                  label="Unidades"
                  required
                  :items="units"
                  :rules="rules.requerid"
                >
                  <template v-slot:item="{ item }">
                    {{ item.name }}
                  </template>
                  <template v-slot:selection="{ item }">
                    {{ item.name }}
                  </template>
                </v-combobox>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog = false"> Cerrar </v-btn>
          <v-btn color="success" text @click="submit"> Guardar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    form: {
      name: "",
      price: "",
      quantity: "",
      unit: "",
    },
    rules: {
      required: [(value) => !!value || "Este campo es requerido"],
      price: [
        (value) => !!value || "Este campo es requerido",
        (value) => value > 0 || "El precio debe ser mayor a 0",
      ],
    },
    loading: false,
    dialog: false,
  }),
  computed: {
    ...mapState("unit", ["units"]),
  },
  methods: {
    ...mapActions("unit", ["getUnits"]),
    ...mapActions("notification", ["showSnackbar"]),
    ...mapActions("supplier", ["getSuppliers"]),
    submit() {
      if (this.$refs.createMaterial.validate()) {
        this.loading = true;
        axios
          .post(
            `${process.env.VUE_APP_API_URL}/api/admin/${this.supplier._id}/create-material`,
            this.form,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            this.loading = false;
            this.showSnackbar({
              text: response.data.message,
              color: "success",
              timeout: 6000,
            });
            this.form.name = "";
            this.form.price = "";
            this.dialog = false;
            this.getSuppliers();
          })
          .then((error) => {
            this.showSnackbar({
              text: error.data.message,
              color: "error",
              timeout: 6000,
            });
            this.loading = false;
          });
      }
    },
  },
  created() {
    this.getUnits();
  },
  props: {
    supplier: Object,
  },
};
</script>

<style>
</style>