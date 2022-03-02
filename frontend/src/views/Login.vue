<template>
  <v-container class="">
    <v-card
      width="100%"
      color="trasparent"
      flat
      height="450"
      class="d-flex flex-column justify-center align-center"
    >
      <v-card
        min-width="350"
        max-width="450"
        class="text-center d-flex align-center justify-center flex-column"
      >
        <v-card-title>Iniciar sesion </v-card-title>
        <v-divider />
        <v-card-text>
          <v-form ref="formLogin">
            <v-text-field
              v-model="formData.email"
              label="Correo"
              required
              :rules="rules.email"
            ></v-text-field>
            <v-text-field
              v-model="formData.password"
              label="Contrasena"
              required
              :rules="rules.password"
              :type="passwordHidden ? 'password' : 'text'"
              :append-icon="!passwordHidden ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="passwordHidden = !passwordHidden"
            >
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-text>
          Olvidaste tu contrasena?
          <router-link to="/recovery/password"
            >recuperar contrasena</router-link
          >
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="submit">Iniciar sesion</v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  data: () => ({
    passwordHidden: true,
    formData: {
      email: "",
      password: "",
    },
    rules: {
      email: [
        (v) => !!v || "Correo es requerido",
        (v) => /.+@.+\..+/.test(v) || "Correo invalido",
      ],
      password: [
        (v) => !!v || "Contrasena es requerida",
        (v) => v.length >= 6 || "Contrasena debe tener al menos 6 caracteres",
      ],
    },
  }),
  created() {},
  methods: {
    ...mapMutations("session", ["setLogin", "setToken"]),
    submit: function () {
      if (this.$refs.formLogin.validate()) {
        axios
          .post(
            `${process.env.VUE_APP_API_URL}/api/user/login-admin`,
            this.formData
          )
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("session", true);
            this.setLogin(true);
            this.setToken(res.data.token);
            console.log(this.$router.push({ path: "/admin" }));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style>
</style>