<template>
  <v-row justify="center">
    <v-dialog max-width="290">
      <v-card>
        <v-card-title class="text-h5"> {{ title }} </v-card-title>
        <v-card-text>
          {{ message }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="emit(false)"> Cancel </v-btn>
          <v-btn color="red" text @click="emit(true)"> Confirm </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
export default {
  name: "BaseConfirmAlert",
  props: {
    title: {
      type: String,
      default: "Unreversible Action",
    },
    message: {
      type: String,
      default: "Do you really want to remove this item?",
    },
  },
  methods: {
    emit(value) {
      this.$emit("confirmAlert", value);
    },
  },
};
</script>
