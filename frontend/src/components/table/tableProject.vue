<template>
  <v-card>
    <v-card-actions>
      <div class="text-h6">Lista de proyectos</div>
      <v-spacer />
      <v-btn color="primary" class="mx-1" @click="getProjects">
        <v-icon>mdi-update</v-icon></v-btn
      >
      <CreateProject />
    </v-card-actions>
    <v-divider></v-divider>
    <v-card-title class="my-0">
      <v-text-field
        class="my-0"
        v-model="search"
        append-icon="mdi-magnify"
        label="Busqueda"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="projects" :search="search">
      <template v-slot:item.company="{ item }">
        {{ item.company.name }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-card flat color="transparent">
          <v-card-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  color="primary"
                  @click="selectItem(item)"
                >
                  <v-icon>mdi-cog</v-icon>
                </v-btn>
              </template>
              <span>Administrar</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  color="error"
                  @click="dialogDelete = true"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-dialog v-model="dialogDelete" width="300">
                  <v-card>
                    <v-card-title>Comfirmacion</v-card-title>
                    <v-card-text>
                      Esta seguro de eliminar el proyecto?
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn color="error" text @click="dialogDelete = false">
                        Cancelar
                      </v-btn>
                      <v-btn color="success" text @click="deleteItem(item._id)">
                        Aceptar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
              <span>ELiminar</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip v-if="item.status == 'En espera'" color="warning">
          {{ item.status }}</v-chip
        >
        <v-chip v-if="item.status == 'En Proceso'" color="primary">
          {{ item.status }}</v-chip
        >
        <v-chip v-if="item.status == 'Finalizada'" color="success">
          {{ item.status }}</v-chip
        >
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapActions, mapState, mapMutations } from "vuex";
import CreateProject from "../form/createProject.vue";
export default {
  data: () => ({
    dialogDelete: false,
    search: "",
    headers: [
      {
        text: "Compania",
        value: "company",
        align: "start",
      },
      { text: "Presupuesto", value: "budget" },
      { text: "Fecha de Inicio", value: "startDate" },
      { text: "Fecha de Finalización", value: "endDate" },
      { text: "Fecha de Cobro", value: "payDay" },
      { text: "Estado", value: "status" },
      { text: "Acciones", value: "actions" },
    ],
  }),
  computed: {
    ...mapState("project", ["projects"]),
  },
  methods: {
    ...mapMutations("project", ["setSelecteProject"]),
    ...mapActions("project", ["getProjects"]),
    ...mapActions("notification", ["showSnackbar"]),
    selectItem(item) {
      this.setSelecteProject(item);
      this.$router.push(`/admin/project`);
    },
    deleteItem(_id) {
      axios
        .delete(`${process.env.VUE_APP_API_URL}/api/admin/project/${_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.showSnackbar({
            text: res.data.message,
            color: "success",
          });
          this.getProjects();
        })
        .catch(() => {
          this.showSnackbar({
            text: "No se puedo eliminar",
            color: "error",
          });
        });
    },
  },
  created() {
    this.getProjects();
  },

  components: {
    CreateProject,
  },
};
</script>

<style>
</style>