<template>
  <v-container fluid>
    Seguridad
    <v-row>
      <v-col md="4">
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
        <transition>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
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
        name: "Agregar Role",
        icon: "mdi-shield-lock-outline",
        path: "/admin/create/role",
      },
      {
        name: "Roles",
        icon: "mdi-card-account-details",
        path: "/admin/security/roles",
      },
      {
        name: "Rutas",
        icon: "mdi-routes",
        path: "/admin/security/routes",
      },
    ],
  }),
};
</script>

<style>
</style>