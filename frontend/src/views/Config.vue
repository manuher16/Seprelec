<template>
  <v-card>
    <v-card-title>Configuracion</v-card-title> <v-divider />
    <v-list>
      <v-list-item-group>
        <router-link
          :to="item.to"
          class="router-link"
          v-for="(item, index) in menu"
          :key="index"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>{{ item.label }} </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list-item-group>
    </v-list>
    <v-card>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-card>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    menu: [
      {
        label: "Unidades de medida",
        to: "/admin/config/unit",
        icon: "mdi-tape-measure",
      },
    ],
  }),
};
</script>

<style>
</style>