<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar color="primary">
                <v-toolbar-title class="title">Press enter</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    name="login"
                    label="Login"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" to="/">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
export default {
  // type inference enabled
  props: {
    name: String,
  },
  data() {
    return {};
  },
  mounted() {
    this.name; // type: string | undefined
    this.msg; // type: string
    this.count; // type: number
  },
  computed: {},
};
</script>



<style lang="scss">
.v-toolbar {
  color: var(--v-primary-base);
  background-color: var(--v-primary-base);
}
.title {
  color: var(--v-primary-base-contrast);
}
// #inspire {
//   background: center center / cover no-repeat;
//   background-image: linear-gradient(
//       rgba(255, 255, 255, 0.5),
//       rgba(255, 255, 255, 0.7)
//     ),
//     url("https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg");
// }
</style>
