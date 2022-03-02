<template>
  <v-card> <TableService /> </v-card>
</template>

<script>
import { mapActions } from "vuex";
import TableService from "../components/table/tableServices.vue";
export default {
  methods: {
    ...mapActions("service", ["getServices"]),
  },
  created() {
    this.getServices();
  },
  components: {
    TableService,
  },
};
</script>

<style>
</style>