<template>
  <v-main>
    <v-container>
      <v-container class="box">
        <img src="@/assets/miles.png" />
      </v-container>
      <v-layout column align-center justify-center>
        <transition name="fade">
          <v-btn elevation="0" v-if="show">See Invoices</v-btn>
        </transition>
        <transition name="fade">
          <v-btn class="mt-3" elevation="0" v-if="show">Add New Invoice</v-btn>
        </transition>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import anime from "animejs";

export default {
  name: "HomeView",
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    setTimeout(() => {
      anime({
        targets: ".box",
        translateY: -30,
        duration: 2000,
      });
      this.show = true;
    }, 1000);
  },
};
</script>

<style lang="scss">
</style>




