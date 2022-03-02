<template>
  <v-container fluid>
    Panel Administrador

    <v-row>
      <v-col md="2">
        <v-card>
          <v-list>
            <v-list-item-group v-model="selectedItem">
              <router-link
                v-for="(item, i) in menu"
                :to="{ path: item.path }"
                append
                :key="i"
                class="router-link"
              >
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content> {{ item.name }}</v-list-item-content>
                </v-list-item>
              </router-link>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    selectedItem: "",
    menu: [
      {
        name: "Proyectos",
        icon: "mdi-clipboard-edit",
        path: "/admin/projects",
      },
      {
        name: "Servicios",
        icon: "mdi-hammer-screwdriver",
        path: "/admin/services",
      },
      {
        name: "Compañias",
        icon: "mdi-domain",
        path: "/admin/table-companies",
      },

      {
        name: "Empleados",
        icon: "mdi-account-group",
        path: "/admin/table-employees",
      },
      {
        name: "Proveedores",
        icon: "mdi-truck",
        path: "/admin/supplier",
      },

      {
        name: "Seguridad",
        icon: "mdi-server-security",
        path: "/admin/security",
      },

      {
        name: "Configuracion",
        icon: "mdi-cog",
        path: "/admin/config",
      },
    ],
  }),
};
</script>

<style>
</style>