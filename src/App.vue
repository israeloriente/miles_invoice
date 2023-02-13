<template>
  <div id="app">
    <BaseConfirmAlert />
    <v-app>
      <BaseToolbar />
      <router-view />
    </v-app>
  </div>
</template>

<script lang="ts">
export default {
  name: "App",
  created() {},
  setup() {
    return {};
  },
  components: {
    BaseToolbar: () => import("@/components/BaseToolbar.vue"),
    BaseConfirmAlert: () => import("@/components/BaseConfirmAlert.vue"),
  },
};
</script>

<style lang="scss">
</style>
