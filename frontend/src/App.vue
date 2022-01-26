<template>
  <v-app>
    <Navbar />
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
import Navbar from "./components/navigation/navbar.vue";
export default {
  name: "App",

  data: () => ({
    //
  }),
  components: {
    BtnContact,
    ModalConsultProject,
    Footer,
    Navbar,
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
