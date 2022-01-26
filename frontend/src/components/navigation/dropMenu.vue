<template>
  <v-hover v-slot="{ hover }">
    <div class="container-drop-menu">
      <router-link :to="link" class="router-link">
        <div class="drop-menu-label text-button">
          {{ label }} <v-icon color="black">mdi-chevron-down</v-icon>
        </div>
      </router-link>
      <div class="list-drop-menu" v-if="hover">
        <v-list dark>
          <v-list-item-group v-model="selectedItem" color="primary">
            <router-link
              :to="item.url"
              v-for="(item, i) in items"
              :key="i"
              class="router-link"
            >
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </v-list-item-group>
        </v-list>
      </div>
    </div>
  </v-hover>
</template>

<script>
export default {
  props: {
    items: Array,
    label: String,
    link: String,
  },
};
</script>

<style>
.container-drop-menu {
  position: relative;
  cursor: pointer;
  background: transparent;
  margin-left: 10px;
  margin-right: 10px;
  height: 40px;
  width: auto;
  min-width: 120px;
}
.drop-menu-label {
  position: relative;
  color: black;
}
.drop-menu-label:hover {
  border-bottom: 2px solid rgb(221, 201, 25);
  transition: border-bottom 0.2s;
}
.container-drop-menu :hover {
}
.list-drop-menu {
  display: flex;
  position: relative;
  justify-content: start;
  top: 10px;
  width: 100%;
  flex-direction: column;
  background: transparent;
  color: white;
}
.router-link {
  text-decoration: none;
  color: black !important;
}
</style>