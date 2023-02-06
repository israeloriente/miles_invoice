

<template>
  <v-main>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary>
      <p>Side-menu</p>
    </v-navigation-drawer>
  </v-main>
</template>

<script>

export default {
  name: "BaseToolbar",
  data() {
    return {
      drawer: null,
    };
  },
};
</script>

<style scoped lang="scss">
</style>
