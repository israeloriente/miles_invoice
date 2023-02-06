<template>
  <div id="app">
    <v-main>
      <BaseToolbar />
      <router-view />
    </v-main>
  </div>
</template>

<script lang="ts">
import BaseToolbar from "@/components/base/BaseToolbar.vue";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    BaseToolbar,
  },
};
</script>

<style lang="scss">

</style>
