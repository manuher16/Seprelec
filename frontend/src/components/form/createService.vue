<template>
  <div>
    <v-btn color="primary" @click="dialog = true" class="mx-3"
      >Crear<v-icon>mdi-plus</v-icon></v-btn
    >
    <v-dialog v-model="dialog">
      <v-card :loading="loading">
        <v-sheet>
          <v-card-title>
            <span class="headline">Crear Servicio</span>
          </v-card-title>
        </v-sheet>
        <v-divider />
        <v-card-text>
          <v-form ref="createService">
            <v-text-field
              v-model="form.name"
              :rules="[(v) => !!v || 'El nombre es requerido']"
              label="Nombre del servicio"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.description"
              :rules="[(v) => !!v || 'La descripcion es requerida']"
              label="Descripcion"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.price"
              :rules="[(v) => !!v || 'El precio es requerido']"
              label="Precio"
              type="number"
              required
            ></v-text-field>
            <v-card flat>
              <v-btn color="primary" @click="modal.addMaterial = true"
                >Agregar material</v-btn
              >
              <v-dialog v-model="modal.addMaterial">
                <v-card flat>
                  <v-card-title>
                    <span class="headline">Materiales</span>
                  </v-card-title>
                  <v-divider />
                  <v-card-text>
                    <TableAddMaterials />
                  </v-card-text>
                  <v-divider />
                  <v-card-actions>
                    <v-spacer />
                    <v-btn color="error" @click="modal.addMaterial = false"
                      >Cerrar</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card>

            <v-card class="mt-3">
              <v-card-title>
                <span class="headline">Materiales Seleccionados</span>
              </v-card-title>
              <v-divider />
              <TableAddMaterials type="selection" />
            </v-card>
          </v-form>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn color="red darken-1" text @click="dialog = false">
            Cancelar
          </v-btn>
          <v-btn color="green darken-1" text @click="submit"> Guardar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import TableAddMaterials from "../table/tableAddmaterials.vue";
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    modal: {
      addMaterial: false,
    },
    dialog: false,
    loading: false,
    form: {
      name: "",
      price: "",
      description: "",
      materials: [],
    },
  }),
  computed: {
    ...mapState("material", ["selectedMaterials"]),
  },
  methods: {
    ...mapActions("material", ["getMaterials"]),
    ...mapActions("notification", ["showSnackbar"]),
    ...mapActions("services", ["showSnackbar"]),
    submit() {
      if (this.$refs.createService.validate()) {
        this.loading = true;
        this.selectedMaterials.forEach((item) => {
          this.form.materials.push({
            _id: item._id,
            quantity: item.quantity2,
          });
        });
        axios
          .post(
            `${process.env.VUE_APP_API_URL}/api/admin/create-service`,
            this.form,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            this.loading = false;
            this.dialog = false;
            this.showSnackbar({
              text: res.data.message,
              color: "success",
            });
          })
          .catch((err) => {
            this.loading = false;
            this.dialog = false;
            this.showSnackbar({
              text: err.data.message,
              color: "error",
            });
          });
      }
    },
  },
  created() {
    this.getMaterials();
  },
  components: {
    TableAddMaterials,
  },
};
</script>

<style>
</style>