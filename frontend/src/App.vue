<template>
  <v-app>
    <Navbar />
    <v-main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
    <BtnContact />
    <ModalConsultProject />
    <Snackbar />
    <Footer />
  </v-app>
</template>

<script>
import axios from "axios";
import BtnContact from "./components/buttons/contactButton.vue";
import ModalConsultProject from "./components/modals/consultProyect.vue";
import Footer from "./components/navigation/footer.vue";
import Navbar from "./components/navigation/navbar.vue";
import Snackbar from "./components/notification/snackbar.vue";
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
    Snackbar,
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
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>