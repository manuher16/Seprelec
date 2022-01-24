<template>
  <v-sheet
    class="btn-contact-float"
    width="190"
    height="40"
    color="transparent"
    rounded
  >
    <v-menu transition="scroll-x-reverse-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-sheet :color="iconSuffle.color" rounded>
          <v-btn
            text
            class="white--text"
            v-bind="attrs"
            v-on="on"
            fill
            color=""
          >
            Contactanos
            <v-icon large class="mx-2">{{ iconSuffle.icon }}</v-icon>
          </v-btn>
        </v-sheet>
      </template>
      <v-list>
        <v-list-item-group v-model="model">
          <div v-for="(item, index) in icons" :key="index">
            <v-list-item
              v-if="item.action.type == 'modal'"
              @click="showModalConsultProject"
            >
              <v-list-item-icon>
                <v-btn
                  fab
                  elevation="0"
                  :color="item.color"
                  class="my-0 mx-0"
                  small
                  text
                >
                  <v-icon v-text="item.icon" large></v-icon>
                </v-btn>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="item.action.type == 'href'" href="/">
              <v-list-item-icon>
                <v-btn
                  fab
                  elevation="0"
                  :color="item.color"
                  class="my-0 mx-0"
                  small
                  text
                >
                  <v-icon v-text="item.icon" large></v-icon>
                </v-btn>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </v-sheet>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data: () => ({
    iconSuffle: {
      name: "Whatsapp",
      icon: "mdi-whatsapp",
      color: "success",
    },
    indexsuffle: 1,
    icons: [
      {
        name: "Consultar proyecto",
        icon: "mdi-hard-hat",
        color: "primary",
        action: {
          type: "modal",
        },
      },
      {
        name: "Whatsapp",
        icon: "mdi-whatsapp",
        color: "success",
        action: {
          type: "modal",
        },
      },
      {
        name: "Email",
        icon: "mdi-email",
        color: "red",
        action: {
          type: "modal",
        },
      },
      {
        name: "Facebook",
        icon: "mdi-facebook",
        color: "primary",
        action: {
          type: "modal",
        },
      },
      {
        name: "Instagram",
        icon: "mdi-instagram",
        color: "error",
        action: {
          type: "href",
        },
      },
    ],
  }),
  methods: {
    ...mapMutations("modals", ["showModalConsultProject"]),
  },
  created() {
    setInterval(() => {
      this.iconSuffle = this.icons[this.indexsuffle];
      if (this.indexsuffle < this.icons.length - 1) {
        this.indexsuffle++;
      } else {
        this.indexsuffle = 1;
      }
    }, 5000);
  },
};
</script>

<style>
.btn-contact-float {
  position: fixed;
  display: flex;
  z-index: 100;
  justify-content: center;
  align-items: center;
  bottom: 30px;
  right: 30px;
}
</style>