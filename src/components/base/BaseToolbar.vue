<template>
  <v-main>
    <v-app-bar elevation="0" elevate-on-scroll>
      <v-app-bar-nav-icon @click="sideMenu = !sideMenu"></v-app-bar-nav-icon>
      <v-toolbar-title>Home</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="sideMenu" fixed temporary>
      <v-list dense>
        <v-subheader class="prevent-select">💩</v-subheader>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.route">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-main>
</template>

<script>
export default {
  name: "BaseToolbar",
  data() {
    return {
      sideMenu: false,
      selectedItem: 0,
      items: [
        { text: "Workspaces", icon: "mdi-domain", route: "/workspace" },
        { text: "Collaborators", icon: "mdi-account", route: "/collaborators" },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.v-subheader {
  font-size: 24px;
}
</style>
