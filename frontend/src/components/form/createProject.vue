<template>
  <v-card>
    <v-btn color="primary" @click="dialog = true">
      <v-icon>mdi-plus</v-icon></v-btn
    >
    <v-dialog v-model="dialog" max-width="">
      <v-card :loading="loading" flat>
        <v-sheet color="success" height="100%" width="100%" class="white--text">
          <v-card-title class="text-h4"> Crear Proyecto </v-card-title>
        </v-sheet>
        <v-divider />
        <SearchCompany />

        <v-card-text>
          <v-form ref="formComapny">
            <v-text-field
              label="Cobro por proyecto"
              type="number"
              v-model="form.budget"
            ></v-text-field>
            <v-row>
              <v-col
                ><v-menu
                  ref="menu1"
                  v-model="menu.initialDate"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.startDate"
                      label="Fecha incial del proyecto"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.startDate"
                    no-title
                    scrollable
                    locale="es-mx"
                    :first-day-of-week="1"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="menu.initialDate = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu1.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu></v-col
              >
              <v-col
                ><v-menu
                  ref="menu2"
                  v-model="menu.paymentDate"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.payDay"
                      label="Fecha de cobro"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.payDay"
                    no-title
                    scrollable
                    locale="es-mx"
                    :first-day-of-week="1"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="menu.paymentDate = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu2.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu></v-col
              >
            </v-row>
            <v-card flat>
              <v-btn @click="modal.addService = true" color="primary"
                >Agregar Servicio</v-btn
              >
              <v-dialog v-model="modal.addService">
                <v-card flat>
                  <TableServices type="add" />
                  <v-card-actions>
                    <v-spacer />
                    <v-btn color="error" @click="modal.addService = false">
                      Cerrar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card>
            <v-card flat>
              <TableServices type="selection" />
            </v-card>
            <v-card flat>
              <v-btn @click="modal.addMaterial = true" color="primary"
                >Agregar Material</v-btn
              >
              <v-dialog v-model="modal.addMaterial">
                <v-card flat>
                  <v-card-title>
                    <span class="headline">Agregar Material</span>
                  </v-card-title>
                  <v-card-text>
                    <TableMaterial />
                  </v-card-text>
                  <v-divider />
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="modal.addMaterial = false">
                      Cerrar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-card-title> Materiales </v-card-title>
              <v-card-text>
                <TableMaterial type="selection" />
              </v-card-text>
              <v-divider></v-divider>
            </v-card>
            <v-card flat>
              <AddEmployee />
              <TableWorkforce />
            </v-card>
          </v-form>
        </v-card-text>
        <v-divider />
        <v-card-subtitle>
          <v-spacer></v-spacer>
          <v-card max-width="100%" class="">
            <v-card-title
              >Totales<v-spacer></v-spacer
              >{{
                new Intl.NumberFormat("es-HN", {
                  style: "currency",
                  currency: "HNL",
                }).format(form.budget)
              }}</v-card-title
            >
            <v-divider />
            <v-card-text class="text-end my-0 py-0">
              Precio Servicios:
              {{
                new Intl.NumberFormat("es-HN", {
                  style: "currency",
                  currency: "HNL",
                }).format(totalServices)
              }}</v-card-text
            >
            <v-card-text class="text-end my-0 py-0">
              Precio Materiales:
              {{
                new Intl.NumberFormat("es-HN", {
                  style: "currency",
                  currency: "HNL",
                }).format(totalMaterials)
              }}</v-card-text
            >
            <v-card-text class="text-end my-0 py-0">
              Precio Mano Obra:
              {{
                new Intl.NumberFormat("es-HN", {
                  style: "currency",
                  currency: "HNL",
                }).format(totalWorkforce)
              }}</v-card-text
            >
            <v-divider></v-divider>
            <v-card-text class="text-end ma-0 my-0 py-0"
              >Total:
              {{
                new Intl.NumberFormat("es-HN", {
                  style: "currency",
                  currency: "HNL",
                }).format(totalWorkforce + totalMaterials + totalServices)
              }}</v-card-text
            >
            <v-divider></v-divider>
            <v-sheet
              :color="
                form.budget - totalWorkforce - totalMaterials - totalServices <
                0
                  ? 'red'
                  : 'success'
              "
            >
              <v-card-text
                class="text-end ma-0 my-0 py-0 font-weight-black white--text"
              >
                Utilidad:
                {{
                  new Intl.NumberFormat("es-HN", {
                    style: "currency",
                    currency: "HNL",
                  }).format(
                    form.budget -
                      totalWorkforce -
                      totalMaterials -
                      totalServices
                  )
                }}</v-card-text
              >
            </v-sheet>
          </v-card>
        </v-card-subtitle>
        <v-card-actions>
          <v-spacer />
          <v-btn color="error" @click="dialog = false">Cancelar</v-btn>
          <v-btn color="success">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import SearchCompany from "../modals/searchCompany.vue";
import TableServices from "../table/tableServices.vue";
import TableMaterial from "../table/tableAddmaterials.vue";
import AddEmployee from "../modals/addEmpleadoToProject.vue";
import TableWorkforce from "../table/tableWorkforce.vue";
import { mapState } from "vuex";
export default {
  data: () => ({
    modal: {
      addService: false,
      addMaterial: false,
    },
    menu: {
      initialDate: null,
      paymentDate: null,
    },
    date: null,
    loading: false,
    dialog: false,
    headers: [],
    form: {
      idComapny: "",
      startDate: "",
      budget: 0,
    },
    rules: {
      required: (value) => !!value || "Este campo es requerido",
      budget: [(v) => v > 0 || "El presupuesto debe ser mayor a 0"],
    },
  }),
  computed: {
    ...mapState("service", ["totalServices", "totalMaterials", "totalPrice"]),
    ...mapState("employee", ["totalWorkforce"]),
  },
  components: {
    SearchCompany,
    TableServices,
    TableMaterial,
    AddEmployee,
    TableWorkforce,
  },
};
</script>

<style>
</style>