<template>
  <v-card class="mx-1">
    <v-btn color="primary" @click="dialog = true"
      >Crear <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="700">
      <v-card :loading="loading">
        <v-sheet color="primary" width="100%" height="100%">
          <v-card-title class="white--text"> Crear Proveedor </v-card-title>
        </v-sheet>

        <v-divider />
        <v-card-text>
          <v-form ref="createSupplier">
            <v-text-field
              v-model="form.name"
              label="Nombre"
              :rules="[rules.required, rules.name]"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.telephone"
              label="Telefono"
              :rules="[rules.required, rules.telephone]"
              required
              type="number"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required, rules.email]"
              v-model="form.email"
              label="Correro Electronico"
              required
              type="email"
            ></v-text-field>
            <v-text-field
              v-model="form.address"
              label="Direccion"
              required
              :rules="[rules.required]"
              type=""
            ></v-text-field>
            <v-text-field
              v-model="form.heading"
              label="Rubro"
              :rules="[rules.required]"
              required
              type=""
            ></v-text-field>
            <v-text-field
              v-model="form.website"
              label="Sitio web"
              type=""
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn color="red darken-1" text @click="dialog = false"
            >Cancelar</v-btn
          >
          <v-btn color="blue darken-1" text @click="submit">Crear</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  data: () => ({
    form: {
      name: "",
      telephone: "",
      email: "",
      address: "",
      heading: "",
      website: "",
    },
    loading: false,
    rules: {
      name: [
        (v) => !!v || "El nombre es requerido",
        (v) => v.length <= 100 || "El nombre debe tener menos de 50 caracteres",
      ],
      required: [(value) => !!value || "Este campo es requerido."],
      email: [
        (value) => !!value || "Este campo es requerido.",
        (value) =>
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ||
          "Correo electronico invalido.",
      ],
      telephone: [
        (value) => !!value || "Este campo es requerido.",
        (value) => /^[0-9]{10}$/i.test(value) || "Telefono invalido.",
      ],
    },
    dialog: false,
  }),
  methods: {
    ...mapActions("notification", ["showSnackbar"]),
    ...mapActions("supplier", ["getSuppliers"]),
    submit() {
      console.log(this.form, this.$refs.createSupplier.validate());
      if (this.$refs.createSupplier.validate()) {
        this.loading = true;
        axios
          .post(
            `${process.env.VUE_APP_API_URL}/api/admin/create-supplier`,
            this.form,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            this.loading = false;
            this.showSnackbar({
              text: res.data.message,
              color: "success",
              timeout: 3000,
            });
            this.getSuppliers();
            this.dialog = false;
          })
          .catch((err) => {
            console.log(err);
            this.loading = false;
            this.showSnackbar({
              text: err.data.message,
              color: "error",
              timeout: 3000,
            });
          });
      }
    },
  },
};
</script>

<style>
</style>