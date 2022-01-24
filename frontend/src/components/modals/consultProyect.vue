<template>
  <v-dialog v-model="modalConsultProject.show" max-width="500">
    <v-card>
      <v-card-title>Haz tu consulta</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="formConsult">
          <v-text-field
            v-model="form.name"
            label="Nombre completo"
            placeholder="Juan Miguel Soto"
          ></v-text-field>
          <v-text-field
            v-model="form.phone"
            label="Numero telefono"
            placeholder="504 7091-8091"
          ></v-text-field>
          <v-text-field
            v-model="form.email"
            label="Correo electronico"
            placeholder="proyectos@seprelec.com"
          ></v-text-field>
          <v-text-field
            v-model="form.company"
            label="Compañia"
            placeholder="Seprelec"
          ></v-text-field>
          <v-textarea
            v-model="form.description"
            name="input-7-4"
            label="Descripcion del proyecto"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn color="success" dark @click="submitForm"> Enviar </v-btn>
        <v-spacer />
        <v-btn color="error" dark @click="modalConsultProject.show = false">
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState("modals", ["modalConsultProject"]),
  },
  data: () => ({
    valid: true,
    show: false,
    form: {
      name: "",
      phone: "",
      email: "",
      company: "",
      description: "",
    },
  }),
  methods: {
    ...mapMutations("modals", ["hideModalConsultProject"]),
    hideModal: () => {
      this.hideModalConsultProject();
      this.modalConsultProject.show = false;
    },
    submitForm: () => {
      console.log(this);
    },
  },
};
</script>

<style>
</style>