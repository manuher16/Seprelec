<template>
  <v-card flat>
    <v-btn text color="primary" @click="dialog = true"
      >Crear<v-icon>mdi-plus</v-icon></v-btn
    >
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>Crear Ruta</v-card-title>
        <v-divider />
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="form.path"
              :rules="[(v) => !!v || 'Este campo es requerido']"
              label="Ruta"
              placeholder="ejemplo: /home"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.origin"
              :rules="[(v) => !!v || 'Este campo es requerido']"
              label="Dominio"
              placeholder="ejemplo: dominio.com"
              required
            ></v-text-field>
            <v-combobox
              v-model="form.type"
              :items="typesRoute"
              label="Tipo"
            ></v-combobox>
            <v-combobox
              v-model="form.roles"
              :items="roles"
              label="Selecione los roles permitidos"
              multiple
              chips
            >
              <template v-slot:selection="data">
                <v-chip
                  :key="JSON.stringify(data.item)"
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  :disabled="data.disabled"
                  @click:close="data.parent.selectItem(data.item)"
                >
                  <v-avatar
                    class="accent white--text"
                    left
                    v-text="data.item.slice(0, 1).toUpperCase()"
                  ></v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template v-slot:item="{ item }">
                <v-checkbox
                  v-model="item.checkbox"
                  :label="item.name"
                ></v-checkbox>
              </template>
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  :disabled="data.disabled"
                  @click:close="data.parent.selectItem(data.item)"
                >
                  {{ data.item.name }}
                </v-chip>
              </template>
            </v-combobox>
            <v-textarea
              v-model="form.description"
              :rules="[(v) => !!v || 'Este campo es requerido']"
              label="Descripción"
              required
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialog = false"> Cancelar </v-btn>
          <v-btn color="success" @click="submit"> Crear </v-btn>
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
    dialog: false,
    form: {
      description: "",
      type: null,
      roles: [],
      path: "",
      origin: "",
    },

    typesRoute: ["SERVER", "CLIENT"],
  }),
  computed: {
    ...mapState("tables", ["tableRole"]),
    ...mapState("role", ["roles"]),
  },
  methods: {
    ...mapActions("tables", ["getItemsTableRole"]),
    ...mapActions("role", ["getRoles"]),
    ...mapActions("notification", ["showSnackbar"]),
    submit() {
      if (this.$refs.form.validate()) {
        axios
          .post(
            `${process.env.VUE_APP_API_URL}/api/admin/create-route`,
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
          });
      }
    },
  },
  created() {
    this.getItemsTableRole();
    this.getRoles();
  },
};
</script>

<style>
</style>