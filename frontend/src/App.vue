<template>
  <v-app>
    <v-app-bar app color="white" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Seprelec Logo"
          class="shrink mr-2"
          contain
          src="logo_icon.png"
          transition="scale-transition"
          width="40"
        />
        <v-img
          alt="Seprelec Logo"
          class="shrink mr-2"
          contain
          src="logo_seprelec.png"
          transition="scale-transition"
          width="200"
        />
      </div>

      <v-spacer></v-spacer>
      <div>Inicio</div>
      <v-btn href="/about" text color="black"> Sobre </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
    <BtnContact />
    <ModalConsultProject />
    <Footer />
  </v-app>
</template>

<script>
import axios from "axios";
import BtnContact from "./components/buttons/contactButton.vue";
import ModalConsultProject from "./components/modals/consultProyect.vue";
import Footer from "./components/navigation/footer.vue";
export default {
  name: "App",

  data: () => ({
    //
  }),
  components: {
    BtnContact,
    ModalConsultProject,
    Footer,
  },
  created() {
    if (this.$cookies.get("iplocation") == "false") {
      axios
        .get(
          `https://ipinfo.io/json?token=${process.env.VUE_APP_API_KEY_IPINFO}`
        )
        .then((response) => {
          console.log(response.data);
          this.$cookies.set("iplocation", true, "1d");
        });
    }
  },
};
</script>
