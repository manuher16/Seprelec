<template>
  <v-container>
    <v-card>
      <v-card-text>{{ selectedProject }}</v-card-text></v-card
    >
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({}),
  computed: {
    ...mapState("project", ["selectedProject"]),
  },
  created() {},
};
</script>

<style>
</style>