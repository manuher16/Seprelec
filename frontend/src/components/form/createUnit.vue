<template>
  <v-card flat>
    <v-btn color="primary" @click="dialog = true" class="mx-3">
      Crear <v-icon>mdi-plus</v-icon></v-btn
    >
    <v-dialog v-model="dialog" width="400">
      <v-card>
        <v-card-title>Crear unidad</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="createUnit">
            <v-text-field
              label="Nombre"
              v-model="form.name"
              :rules="rules.name"
              required
            ></v-text-field>
            <v-text-field
              required
              :rules="rules.abbreviation"
              label="Abreviacion"
              v-model="form.abbreviation"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submit">Crear</v-btn>
          <v-btn color="error" @click="dialog = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
  data: () => ({
    dialog: false,
    form: {
      name: "",
      abbreviation: "",
    },
    rules: {
      name: [
        (v) => !!v || "El nombre es requerido",
        (v) => v.length <= 50 || "El nombre debe tener menos de 50 caracteres",
      ],
      abbreviation: [
        (v) => !!v || "La abreviacion es requerida",
        (v) =>
          v.length <= 10 || "La abreviacion debe tener menos de 10 caracteres",
      ],
    },
  }),
  methods: {
    ...mapActions("notification", ["showSnackbar"]),
    ...mapActions("unit", ["getUnits"]),
    submit() {
      if (this.$refs.createUnit.validate()) {
        axios
          .post(
            `${process.env.VUE_APP_API_URL}/api/admin/create-unit`,
            this.form,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((response) => {
            this.form = {
              name: "",
              abbreviation: "",
            };
            this.getUnits();
            this.showSnackbar({
              text: response.data.message,
              color: "success",
            });
            this.dialog = false;
          })
          .catch(() => {
            this.showSnackbar({
              text: "Error al crear unidad",
              color: "error",
            });
          });
      }
    },
  },
};
</script>

<style>
</style>