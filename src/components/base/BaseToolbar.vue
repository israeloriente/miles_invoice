<template>
  <v-main>
    <v-app-bar elevation="0" elevate-on-scroll>
      <v-app-bar-nav-icon @click="sideMenu = !sideMenu"></v-app-bar-nav-icon>
      <v-toolbar-title class="hello">Hello</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="sideMenu" fixed temporary>
      <p>Side-menu</p>
    </v-navigation-drawer>
  </v-main>
</template>

<script>
export default {
  name: "BaseToolbar",
  data() {
    return {
      sideMenu: false,
    };
  },
};
</script>

<style scoped lang="scss">
</style>
