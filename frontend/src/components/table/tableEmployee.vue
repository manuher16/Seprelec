<template>
  <v-container fluid>
    <v-card flat>
      <v-card-title>Lista de empledos</v-card-title>
      <v-divider />
      <v-card-actions>
        <v-text-field label="Busqueda" fill>
          <template v-slot:append>
            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </template>
        </v-text-field>
        <v-spacer></v-spacer>
        <FormCreateEmployee />
      </v-card-actions>
    </v-card>
    <v-list three-line>
      <card v-for="(item, index) in employees" :key="index" tile elevation="">
        <v-list-item>
          <v-list-item-avatar size="80">
            <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ item.user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.occupation }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ item.role.name }}</v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-card-text class="pb-0 px-0 mx-0">
                <v-icon class="mr-1">mdi-phone</v-icon>
                <span>{{ item.user.telephone }}</span>
              </v-card-text>
              <v-card-text class="py-0 px-0 mx-0">
                <v-icon class="mr-1 my-0">mdi-email</v-icon>
                <span>{{ item.user.email }}</span>
              </v-card-text>
              <v-row>
                <v-col
                  v-for="(skill, i) in item.skills"
                  :key="i"
                  class="justify-center aling-center text-center"
                >
                  <v-chip class="mx-1">{{ skill }}</v-chip>
                </v-col>
                <v-col>
                  <v-card-actions class="">
                    <v-spacer />
                    <v-btn color="primary" small>
                      <v-icon>mdi-pencil</v-icon></v-btn
                    >
                    <v-btn color="primary" small>
                      <v-icon>mdi-details</v-icon></v-btn
                    >
                    <v-btn
                      color="error"
                      small
                      @click="deleteEmployee(item._id)"
                    >
                      <v-icon>mdi-delete</v-icon></v-btn
                    >
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="index" inset></v-divider>
      </card>
    </v-list>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import FormCreateEmployee from "../form/createEmployee.vue";
import axios from "axios";
export default {
  data: () => ({
    dialogCreateEmployee: true,
  }),
  methods: {
    ...mapActions("employee", ["getEmployees"]),
    ...mapActions("notification", ["showSnackbar"]),
    deleteEmployee(_id) {
      axios
        .delete(`${process.env.VUE_APP_API_URL}/api/admin/employee/${_id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          this.showSnackbar({ text: response.data.message, color: "success" });
          this.getEmployees();
        })
        .catch((error) => {
          this.showSnackbar({
            text: error.response.data.message,
            color: "error",
          });
        });
    },
  },
  computed: {
    ...mapState("employee", ["employees"]),
  },
  components: {
    FormCreateEmployee,
  },
  created() {
    this.getEmployees();
  },
};
</script>

<style>
</style>