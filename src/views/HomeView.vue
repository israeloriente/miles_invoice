<template>
  <v-container>
    <v-row>
      <v-col class="mt-2" cols="12">
        <strong>Users</strong>
      </v-col>

      <v-col cols="6" md="2">
        <v-sheet height="150"></v-sheet>
      </v-col>
      <v-col cols="6" md="2">
        <v-sheet height="150"></v-sheet>
      </v-col>
      <v-col cols="6" md="2">
        <v-sheet height="150"></v-sheet>
      </v-col>
      <v-col cols="6" md="2">
        <v-sheet height="150"></v-sheet>
      </v-col>
      <v-col cols="6" md="2">
        <v-sheet height="150"></v-sheet>
      </v-col>
      <v-col cols="6" md="2">
        <v-sheet height="150"></v-sheet>
      </v-col>
      <v-col cols="6" md="2">
        <v-sheet height="150"></v-sheet>
      </v-col>
      <v-col cols="6" md="2">
        <v-sheet height="150"></v-sheet>
      </v-col>
      <v-col cols="6" md="2">
        <v-sheet height="150"></v-sheet>
      </v-col>
      <v-col cols="6" md="2">
        <v-sheet height="150"></v-sheet>
      </v-col>
      <v-col cols="6" md="2">
        <v-sheet height="150"></v-sheet>
      </v-col>
    </v-row>
  </v-container>
  <!-- <h1>Add new Invoice</h1>
      <h3>See invoices list</h3>
      <v-btn elevation="2">Abrir</v-btn> -->
</template>

<script lang="ts">
export default {
  name: "HomeView",
  data() {
    return {
      drawer: null,
      users: 10,
    };
  },
  components: {},
};
</script>

<style lang="scss">
.content {
  color: var(--v-primary-base-contrast);
}
</style>




