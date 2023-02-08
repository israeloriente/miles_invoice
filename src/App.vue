<template>
  <div id="app">
    <v-app>
      <BaseToolbar />
      <router-view />
    </v-app>
  </div>
</template>

<script lang="ts">
import BaseToolbar from "@/components/base/BaseToolbar.vue";

export default {
  name: "App",
  created() {},
  setup() {
    return {};
  },
  components: {
    BaseToolbar,
  },
};
</script>

<style lang="scss">
</style>
