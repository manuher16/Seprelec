<template>
  <div>
    <v-btn @click="dialog = true" icon color="success">
      <v-icon>mdi-book-edit</v-icon>
    </v-btn>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>{{ supplier.name }}</v-card-title>
        <v-divider />
        <v-card-text>
          <v-card class="mt-3">
            <v-card-subtitle class="text-subtitle-1"
              >Informacion</v-card-subtitle
            >
            <v-divider />
            <v-card-text>
              <v-row>
                <v-col>
                  <v-icon>mdi-identifier</v-icon> {{ supplier._id }}</v-col
                >
                <v-col> <v-icon>mdi-email</v-icon> {{ supplier.email }}</v-col>
              </v-row>

              <v-row>
                <v-col
                  ><v-icon>mdi-phone</v-icon> {{ supplier.telephone }}
                </v-col>
                <v-col>
                  <v-icon>mdi-hard-hat</v-icon> {{ supplier.heading }}</v-col
                >
              </v-row>

              <v-row>
                <v-col
                  ><v-icon>mdi-iva</v-icon> % {{ supplier.telephone }}
                </v-col>
                <v-col>
                  <v-icon>mdi-web</v-icon>
                  {{ supplier.website ? supplier.website : "Sin web" }}</v-col
                >
              </v-row>

              <v-row>
                <v-col>
                  <v-icon>mdi-map-marker</v-icon>
                  {{ supplier.address }}
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-subtitle class="text-subtitle-1">Materiales</v-card-subtitle>
        <v-card-text>
          <TableMaterial :supplier="supplier" />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog = false"> Cerrar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import TableMaterial from "../table/tableMaterial.vue";
export default {
  data: () => ({
    dialog: false,
  }),
  props: {
    supplier: Object,
  },
  components: {
    TableMaterial,
  },
};
</script>

<style>
</style>