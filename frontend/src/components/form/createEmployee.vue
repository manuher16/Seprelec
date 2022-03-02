<template>
  <div>
    <v-btn color="primary" dark @click="dialogCreateEmployee = true">
      Agregar empleado
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialogCreateEmployee" width="500">
      <v-card :loading="loading">
        <v-card-title>Crear un empleado</v-card-title>
        <v-divider />
        <v-card-text>
          <v-card flat>
            <v-form ref="formCreateEmployee">
              <v-card flat class="mx-0 px-0">
                <v-card-text class="mx-0 px-0">
                  <v-text-field
                    v-model="email"
                    label="Buscar Usuario"
                    prepend-icon="mdi-magnify"
                    @keyup="searchUserEmail"
                  ></v-text-field>
                  <v-card-text class="mx-0 px-0">
                    <div v-if="users.length > 0">
                      <v-list two-line>
                        <v-list-item-group>
                          <v-list-item
                            color="primary"
                            v-for="user in users"
                            :key="user._id"
                            @click="
                              !switch1
                                ? (form.user = user)
                                : (form.user = null);
                              switch1 = !switch1;
                            "
                          >
                            <v-list-item-content>
                              <v-list-item-title>
                                {{ user.name }} ({{
                                  user.idRole.name
                                }})</v-list-item-title
                              >
                              <v-list-item-subtitle>
                                Correo: {{ user.email }}
                              </v-list-item-subtitle>
                              <v-list-item-subtitle>
                                Telefono: {{ user.telephone }}
                              </v-list-item-subtitle>
                              <v-list-item-subtitle>
                                <v-switch
                                  v-model="switch1"
                                  label="Selecionar"
                                  @click="
                                    !switch1
                                      ? (form.user = user)
                                      : (form.user = null);
                                    switch1 = !switch1;
                                  "
                                ></v-switch>
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                    </div>
                    <div v-else>No se han encontrado resultados</div>
                  </v-card-text>
                </v-card-text>
              </v-card>
              <v-divider />
              <v-text-field
                label="Numero de identidad"
                v-model="form.identifier"
              ></v-text-field>
              <v-text-field
                label="Ocupacion"
                v-model="form.occupation"
              ></v-text-field>
              <v-combobox
                label="Role"
                :items="roles"
                required
                v-model="form.role"
              >
                <template v-slot:item="{ item }">
                  {{ item.name }}
                </template>
                <template v-slot:selection="{ item }">
                  {{ item.name }}
                </template>
              </v-combobox>
              <v-combobox
                required
                v-model="model"
                :filter="filter"
                :hide-no-data="!search"
                :items="items"
                :search-input.sync="search"
                hide-selected
                label="Agregar habilidad"
                multiple
                small-chips
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <span class="subheading">Create</span>
                    <v-chip
                      :color="`${colors[nonce - 1]} lighten-3`"
                      label
                      small
                    >
                      {{ search }}
                    </v-chip>
                  </v-list-item>
                </template>
                <template v-slot:selection="{ attrs, item, parent, selected }">
                  <v-chip
                    v-if="item === Object(item)"
                    v-bind="attrs"
                    :color="`${item.color} lighten-3`"
                    :input-value="selected"
                    label
                    small
                  >
                    <span class="pr-2">
                      {{ item.text }}
                    </span>
                    <v-icon small @click="parent.selectItem(item)">
                      $delete
                    </v-icon>
                  </v-chip>
                </template>
                <template v-slot:item="{ index, item }">
                  <v-text-field
                    v-if="editing === item"
                    v-model="editing.text"
                    autofocus
                    background-color="transparent"
                    hide-details
                    @keyup.enter="edit(index, item)"
                  ></v-text-field>
                  <v-chip
                    v-else
                    :color="`${item.color} lighten-3`"
                    dark
                    label
                    small
                  >
                    {{ item.text }}
                  </v-chip>
                  <v-spacer></v-spacer>
                  <v-list-item-action @click.stop>
                    <v-btn icon @click.stop.prevent="edit(index, item)">
                      <v-icon>{{
                        editing !== item ? "mdi-pencil" : "mdi-check"
                      }}</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </template>
              </v-combobox>
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" @click="submit">
                Guardar
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialogCreateEmployee = false">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import axios from "axios";
export default {
  data: () => ({
    dialogCreateEmployee: false,
    loading: false,
    email: "",
    switch1: false,
    form: {
      user: null,
      skills: [],
      role: null,
      occupation: null,
    },
    rules: {
      name: [
        (v) => !!v || "El nombre es requerido",
        (v) =>
          (v && v.length <= 50) ||
          "El nombre debe tener menos de 50 caracteres",
      ],
      telephone: [
        (v) => !!v || "El telefono es requerido",
        (v) =>
          (v && v.length <= 50) ||
          "El telefono debe tener menos de 50 caracteres",
        (v) =>
          /^[\\(]?[\\+]?(\d{2}|\d{3})[\\)]?[\s]?((\d{6}|\d{8})|(\d{3}[\\*\\.\-\s]){3}|(\d{2}[\\*\\.\-\s]){4}|(\d{4}[\\*\\.\-\s]){2})|\d{8}|\d{10}|\d{12}$/.test(
            v
          ) || "El telefono debe ser un numero de telefono valido",
      ],
      email: [
        (v) => !!v || "El correo electronico es requerido",
        (v) =>
          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
            v
          ) || "Correo no valido",
        (v) =>
          (v && v.length <= 50) ||
          "El correo electronico debe tener menos de 50 caracteres",
      ],
      skills: [(v) => !!v || "La habilidad es requerida"],
    },
    activator: null,
    attach: null,
    colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
    editing: null,
    editingIndex: -1,
    items: [{ header: "Seleccione una opcion o cree una" }],
    nonce: 1,
    menu: false,
    model: [],
    x: 0,
    search: null,
    y: 0,
  }),
  created() {
    this.getRoles();
  },
  watch: {
    model(val, prev) {
      if (val.length === prev.length) return;

      this.model = val.map((v) => {
        if (typeof v === "string") {
          v = {
            text: v,
            color: this.colors[this.nonce - 1],
          };

          this.items.push(v);

          this.nonce++;
        }

        return v;
      });
    },
  },
  computed: {
    ...mapState("role", ["roles"]),
    ...mapState("user", ["users"]),
  },

  methods: {
    ...mapActions("role", ["getRoles"]),
    ...mapMutations("user", ["setUsers"]),
    ...mapActions("notification", ["showSnackbar"]),
    ...mapActions("employee", ["getEmployees"]),
    validForm() {},
    searchUserEmail() {
      if (
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
          this.email
        )
      ) {
        axios
          .get(`${process.env.VUE_APP_API_URL}/api/admin/user/${this.email}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            this.setUsers(res.data.users);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    submit() {
      this.form.skills = this.model;
      console.log(this.form);
      let isValidForm = this.$refs.formCreateEmployee.validate();
      if (isValidForm) {
        this.form.user = this.users[0]._id;
        this.form.role = this.form.role._id;
        this.form.skills = this.form.skills.map((v) => v.text);
        this.loading = true;
        axios
          .post(
            `${process.env.VUE_APP_API_URL}/api/admin/create-employee`,
            this.form,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            this.showSnackbar({
              text: "Empleado creado con exito",
              color: "success",
            });
            this.getEmployees();
            this.loading = false;
            this.$router.push("/admin/table-employees");
            this.dialogCreateEmployee = false;
          })
          .catch((err) => {
            this.showSnackbar({
              text: "Error al crear empleado",
              color: "error",
            });

            console.log(err);
          });
      }
    },
    edit(index, item) {
      if (!this.editing) {
        this.editing = item;
        this.editingIndex = index;
      } else {
        this.editing = null;
        this.editingIndex = -1;
      }
    },
    filter(item, queryText, itemText) {
      if (item.header) return false;

      const hasValue = (val) => (val != null ? val : "");

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return (
        text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) >
        -1
      );
    },
  },
};
</script>

<style>
</style>