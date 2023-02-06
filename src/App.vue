<template>
  <div id="app">
    <v-app>
      <BaseToolbar v-if="toolbar" />
      <router-view />
    </v-app>
  </div>
</template>

<script lang="ts">
import BaseToolbar from "@/components/base/BaseToolbar.vue";
import { useStore } from "@/store/main";

export default {
  name: "App",
  created() {},
  setup() {
    const { toolbar } = useStore();
    return {
      toolbar,
    };
  },
  components: {
    BaseToolbar,
  },
};
</script>

<style lang="scss">
</style>
