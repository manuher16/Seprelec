<template>
  <v-container> </v-container>
</template>

<script>
import JSONTest from "../../public/test.json";
export default {
  data: () => ({
    json: JSONTest,
  }),
  created() {
    this.json.data = "hola";
    console.log(this.json);
  },
};
</script>

<style>
</style>
