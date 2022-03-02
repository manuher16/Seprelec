<template>
  <div>
    <v-btn color="primary" @click="dialog = true"
      >Crear Compañia <v-icon>mdi-plus</v-icon></v-btn
    >
    <v-dialog v-model="dialog" width="500">
      <v-card :loading="loading">
        <v-card-title>Crear una compa;ia</v-card-title>
        <v-divider />
        <v-card-text>
          <v-form ref="formComapny">
            <v-text-field
              label="Nombre"
              v-model="form.name"
              required
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              label="Correo electronico"
              type="email"
              required
              :rules="[rules.required]"
              v-model="form.email"
            ></v-text-field>
            <v-text-field
              label="RTN"
              :rules="[rules.required]"
              v-model="form.rtn"
              required
            ></v-text-field>
            <v-text-field
              :rules="[rules.required]"
              label="Telefono"
              required
              v-model="form.telephone"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required]"
              label="Ciudad"
              required
              v-model="form.city"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required]"
              label="Departamento"
              required
              v-model="form.department"
            ></v-text-field>
            <v-textarea
              :rules="[rules.required]"
              label="Direccion"
              required
              v-model="form.address"
            ></v-textarea>
            <v-textarea
              label="Descripcion (opcional)"
              v-model="form.description"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="dialog = false">Cancelar</v-btn>
          <v-btn color="success" @click="submit">Crear</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  data: () => ({
    form: {
      name: "",
      email: "",
      telephone: "",
      address: "",
      rtn: "",
      city: "",
      department: "",
      description: "",
    },
    rules: {
      required: (value) => !!value || "Este campo es requerido.",
    },
    loading: false,
    dialog: false,
  }),
  methods: {
    ...mapActions("notification", ["showSnackbar"]),
    ...mapActions("company", ["getCompanies"]),
    submit() {
      if (this.$refs.formComapny.validate()) {
        this.loading = true;
        axios
          .post(
            `${process.env.VUE_APP_API_URL}/api/admin/create-company`,
            this.form,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            this.showSnackbar({
              text: response.data.message,
              color: "success",
            });
            this.dialog = false;
            this.loading = false;
            this.getCompanies();
          })
          .catch((error) => {
            console.log(error);
            this.showSnackbar({
              text: "No se pudo crear ",
              color: "error",
            });
            this.loading = false;
          });
      } else {
        this.loading = false;
        console.log(this.$refs.formComapny.validate());
      }
    },
  },
};
</script>

<style>
</style>