<template>
  <v-card>
    <v-card-title>Cree un perfil de Role</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form ref="formCreateRole">
        <v-text-field
          v-model="formData.name"
          label="Nombre"
          required
          :rules="rules.name"
        ></v-text-field>
        <v-text-field
          v-model="formData.code"
          label="Codigo"
          required
          :rules="rules.code"
        ></v-text-field>
        <v-textarea
          v-model="formData.description"
          label="Descripcion"
          required
          :rules="rules.description"
        ></v-textarea>
        <v-card>
          <v-card-actions class="">
            <v-card-subtitle class="text-h6"> Permisos</v-card-subtitle>

            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="dialogAddPermissions.show = true"
              >Agregar<v-icon>mdi-plus</v-icon></v-btn
            >
          </v-card-actions>
          <v-divider />
          <div v-if="formData.permissions.length > 0">
            <v-list>
              <v-card
                class="my-1"
                v-for="(item, index) in formData.permissions"
                :key="index"
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item.description }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      <v-row>
                        <v-col>
                          <v-checkbox
                            v-model="item.write"
                            label="Write"
                          ></v-checkbox>
                        </v-col>
                        <v-col>
                          <v-checkbox
                            v-model="item.read"
                            label="Read"
                          ></v-checkbox
                        ></v-col>
                        <v-col>
                          <v-checkbox
                            v-model="item.delete"
                            label="Delete"
                          ></v-checkbox
                        ></v-col>
                        <v-col>
                          <v-checkbox v-model="item.me" label="Me"></v-checkbox
                        ></v-col>
                      </v-row>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider />
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="error" @click="deletePermission(index)"
                    >Eliminar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-list>
          </div>
          <div v-else>
            <v-list>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title
                    >No se ha agregado ningun permiso</v-list-item-title
                  >
                  <v-list-item-subtitle>
                    Presion el boton de agregar
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </v-card>
      </v-form>
    </v-card-text>
    <v-dialog v-model="dialogAddPermissions.show">
      <v-card>
        <v-card-actions>
          <v-card-title>Permisos</v-card-title>

          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dialogNewPermissions.show = true">
            Crear
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-text>
          <v-text-field
            v-model="dialogAddPermissions.textSearch"
            label="Buscar permiso"
            @keypress="searchPermissions"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <div v-if="dialogAddPermissions.permissions.length === 0">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title
                  >No hay ningun permiso registrado</v-list-item-title
                >
                <v-list-item-subtitle> Agregue permisos </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div v-else>
            <v-list
              v-if="
                dialogAddPermissions.searchMatches.length > 0 &&
                dialogAddPermissions.textSearch.length > 1
              "
            >
              <v-card
                class="my-1"
                v-for="(item, index) in dialogAddPermissions.searchMatches"
                :key="index"
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item.description }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      <v-row>
                        <v-col>
                          <v-checkbox
                            v-model="item.write"
                            label="Write"
                          ></v-checkbox>
                        </v-col>
                        <v-col>
                          <v-checkbox
                            v-model="item.read"
                            label="Read"
                          ></v-checkbox
                        ></v-col>
                        <v-col>
                          <v-checkbox
                            v-model="item.delete"
                            label="Delete"
                          ></v-checkbox
                        ></v-col>
                        <v-col>
                          <v-checkbox v-model="item.me" label="Me"></v-checkbox
                        ></v-col>
                      </v-row>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider />
                <v-card-actions>
                  <v-btn color="success">Editar</v-btn>
                  <v-spacer />
                  <v-btn color="primary" @click="addPermission(index)"
                    >Agregar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-list>
            <v-list v-else>
              <v-card
                class="my-1"
                v-for="(item, index) in dialogAddPermissions.permissions"
                :key="index"
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item.description }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      <v-row>
                        <v-col>
                          <v-checkbox
                            v-model="item.write"
                            label="Write"
                          ></v-checkbox>
                        </v-col>
                        <v-col>
                          <v-checkbox
                            v-model="item.read"
                            label="Read"
                          ></v-checkbox
                        ></v-col>
                        <v-col>
                          <v-checkbox
                            v-model="item.delete"
                            label="Delete"
                          ></v-checkbox
                        ></v-col>
                        <v-col>
                          <v-checkbox v-model="item.me" label="Me"></v-checkbox
                        ></v-col>
                      </v-row>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider />
                <v-card-actions>
                  <v-btn color="success">Editar</v-btn>
                  <v-spacer />
                  <v-btn color="primary" @click="addPermission(index)"
                    >Agregar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-list>
          </div>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn text color="error" @click="dialogAddPermissions.show = false">
            Cerrar
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="submit">Guardar</v-btn>
    </v-card-actions>
    <v-dialog v-model="dialogNewPermissions.show" max-width="400">
      <v-card>
        <v-card-title>Crear Permiso</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="formAddPermission">
            <v-combobox label="Colleciones"></v-combobox>
            <v-text-field
              v-model="dialogNewPermissions.newPermission.name"
              label="Nombre"
              required
            ></v-text-field>
            <v-textarea
              v-model="dialogNewPermissions.newPermission.description"
              label="Descripcion"
              required
            ></v-textarea>
            <v-row>
              <v-col>
                <v-checkbox
                  v-model="dialogNewPermissions.newPermission.write"
                  label="Write"
                ></v-checkbox>
              </v-col>
              <v-col>
                <v-checkbox
                  v-model="dialogNewPermissions.newPermission.read"
                  label="Read"
                ></v-checkbox>
              </v-col>
              <v-col>
                <v-checkbox
                  v-model="dialogNewPermissions.newPermission.del"
                  label="Delete"
                ></v-checkbox>
              </v-col>
              <v-col>
                <v-checkbox
                  v-model="dialogNewPermissions.newPermission.me"
                  label="Me"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-progress-linear
          indeterminate
          color="green"
          v-if="dialogNewPermissions.disable"
        ></v-progress-linear>
        <v-card-actions>
          <v-btn text color="error" @click="dialogNewPermissions.show = false">
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text color="success" @click="createPermission"> Crear </v-btn>
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
    dialogNewPermissions: {
      disable: false,
      newPermission: {
        name: "",
        description: "",
        write: false,
        read: false,
        del: false,
        me: false,
      },
      show: false,
      permissions: [],
    },
    dialogAddPermissions: {
      show: false,
      title: "",
      content: "",
      data: {},
      permissions: [],
      textSearch: "",
      searchMatches: [],
    },
    formData: {
      name: "",
      description: "",
      code: "",
      permissions: [],
    },
    rules: {
      name: [
        (v) => !!v || "Nombre es requerido",
        (v) => v.length >= 3 || "Nombre debe tener al menos 3 caracteres",
      ],
      description: [
        (v) => !!v || "Descripcion es requerida",
        (v) => v.length >= 3 || "Descripcion debe tener al menos 3 caracteres",
      ],
      code: [
        (v) => !!v || "Codigo es requerido",
        (v) => v.length >= 3 || "Codigo debe tener al menos 3 caracteres",
      ],
    },
  }),
  methods: {
    ...mapActions("notification", ["showSnackbar"]),
    submit: function () {
      if (this.$refs.formCreateRole.validate()) {
        this.dialogNewPermissions.disable = true;
        axios
          .post(
            `${process.env.VUE_APP_API_URL}/api/admin/create-role`,
            this.formData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            this.showSnackbar({
              text: "Role Creado con exito",
              timeout: 6000,
              color: "success",
            });
            this.dialogNewPermissions.disable = false;
            console.log(response);
          })
          .catch((error) => {
            this.showSnackbar({
              text: "Error al crear role",
              timeout: 6000,
              color: "error",
            });
            this.dialogNewPermissions.disable = false;
            console.log(error);
          });
      }
    },
    getPermission: function () {
      axios
        .get(`${process.env.VUE_APP_API_URL}/api/admin/permission`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          this.dialogAddPermissions.permissions = response.data.permissions;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addPermission: function (index) {
      for (let i = 0; i < this.formData.permissions.length; i++) {
        if (
          this.formData.permissions[i]._id ==
          this.dialogAddPermissions.permissions[index]._id
        ) {
          this.showSnackbar({
            text:
              "Ya ha agregado el permiso: " +
              this.dialogAddPermissions.permissions[index].name,
            timeout: 3000,
            color: "error",
          });
          return false;
        }
      }
      this.showSnackbar({
        text: `Agregado permiso: ${this.dialogAddPermissions.permissions[index].name}`,
        timeout: 3000,
        color: "success",
      });
      this.formData.permissions.push(
        this.dialogAddPermissions.permissions[index]
      );
      return true;
    },
    deletePermission: function (index) {
      this.formData.permissions.splice(index, 1);
    },
    createPermission: function () {
      if (this.$refs.formAddPermission.validate()) {
        axios
          .post(
            `${process.env.VUE_APP_API_URL}/api/admin/create-permission`,
            this.dialogNewPermissions.newPermission,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            this.showSnackbar({
              text: `Permiso ${response.data?.permission.name}  creado con exito`,
              timeout: 3000,
              color: "success",
            });
            this.dialogNewPermissions.show = false;
            this.dialogNewPermissions.newPermission.name = "";
            this.dialogNewPermissions.newPermission.description = "";
            this.getPermission();
          })
          .catch((error) => {
            this.showSnackbar({
              text: "Error al crear permiso",
              timeout: 3000,
              color: "error",
            });
            console.log(error);
          });
      }
    },
    searchPermissions: function () {
      let re = new RegExp(
        this.dialogAddPermissions.textSearch.toLowerCase(),
        "g"
      );
      this.dialogAddPermissions.searchMatches = [];
      this.dialogAddPermissions.permissions.forEach((permission) => {
        if (re.test(permission.name.toLowerCase())) {
          console.log(permission);
          this.dialogAddPermissions.searchMatches.push(permission);
        }
      });
      console.log(this.dialogAddPermissions.searchMatches);
    },
  },
  created() {
    this.getPermission();
  },
};
</script>

<style>
</style>