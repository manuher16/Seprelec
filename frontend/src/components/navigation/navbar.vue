<template>
  <v-app-bar app color="white" dark>
    <router-link to="/" class="router-link">
      <div class="d-flex align-center container-logo">
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
    </router-link>
    <v-spacer></v-spacer>
    <router-link to="/" class="router-link text-button"> Inicio </router-link>
    <DropMenu
      :label="menus.services.name"
      :items="menus.services.items"
      link="/services"
    />
    <DropMenu
      :label="menus.expirence.name"
      :items="menus.expirence.items"
      link="/expirence"
    />
    <DropMenu
      :label="menus.products.name"
      :items="menus.products.items"
      link="/products"
    />
    <DropMenu
      :label="menus.notice.name"
      :items="menus.notice.items"
      link="/notice"
    />

    <router-link to="/about" class="router-link text-button">
      Nosotros
    </router-link>
  </v-app-bar>
</template>

<script>
import DropMenu from "./dropMenu.vue";
export default {
  data: () => ({
    showMenu: false,
    menus: {
      services: {
        name: "Servicios",
        items: [
          { name: "Construccion", url: "/" },
          { name: "Mantenimiento", url: "/" },
          { name: "Instalacion", url: "/" },
          { name: "Reparacion", url: "/" },
        ],
      },
      expirence: {
        name: "Experiencia",
        items: [
          { name: "Construccion", url: "/" },
          { name: "Mantenimiento", url: "/" },
          { name: "Instalacion", url: "/" },
          { name: "Reparacion", url: "/" },
        ],
      },
      products: {
        name: "Productos",
        items: [
          { name: "Construccion", url: "/" },
          { name: "Mantenimiento", url: "/" },
          { name: "Instalacion", url: "/" },
          { name: "Reparacion", url: "/" },
        ],
      },
      notice: {
        name: "Noticias",
        items: [
          { name: "Construccion", url: "/" },
          { name: "Mantenimiento", url: "/" },
          { name: "Instalacion", url: "/" },
          { name: "Reparacion", url: "/" },
        ],
      },
    },

    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" },
    ],
  }),
  components: { DropMenu },
  methods: {
    redirect(url) {
      this.$router.push(url);
    },
  },
};
</script>

<style>
.menu-navbar {
  cursor: pointer;
}
.container-logo {
  cursor: pointer;
}
</style>