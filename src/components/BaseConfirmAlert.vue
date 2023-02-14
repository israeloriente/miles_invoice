<template>
  <div class="content" id="content" :class="modal_controller">
    <v-card>
      <v-card-title class="text-h5"> {{ title }} </v-card-title>
      <v-card-text> {{ message }} </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          id="cancelButton"
          @click="close_modal(false)"
        >
          Cancel
        </v-btn>
        <v-btn color="red" text @click="close_modal(true)"> Confirm </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { eventBus } from "@/main";

export default {
  name: "BaseConfirmAlert",
  data: () => ({
    last: undefined,
    show_modal: false,
    title: "Unreversible Action",
    message: "Do you really want to remove this item?",
  }),
  watch: {
    show_modal(val) {
      setTimeout(() => {
        if (!val) {
          window.removeEventListener("click", this.checkBackgroundClick);
          window.removeEventListener("keydown", this.keypress);
        } else {
          window.addEventListener("keydown", this.keypress);
          window.addEventListener("click", this.checkBackgroundClick);
        }
        document.getElementById("cancelButton").focus();
      }, 10);
    },
  },
  computed: {
    modal_controller() {
      return this.show_modal ? "modal-activated" : "";
    },
  },
  methods: {
    close_modal(value) {
      this.show_modal = false;
      eventBus.$emit("close-confirm-alert", value);
    },
    checkBackgroundClick(ev) {
      var content = document.getElementById("content");
      if (ev.target == content) {
        this.show_modal = false;
        eventBus.$emit("close-confirm-alert", undefined);
      }
    },
    keypress(ev) {
      if (this.last?.key == "Meta" && ev.key == "Enter") this.close_modal(true);
      if (ev.key == "Escape") this.close_modal(undefined);
      this.last = { key: ev.key };
    },
  },
  mounted() {
    eventBus.$on("open-confirm-alert", ({ title, msg }) => {
      if (title) this.title = title;
      if (msg) this.message = msg;
      this.show_modal = true;
    });
  },
};
</script>


<style lang="scss" scoped>
.content {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  background-color: rgba(137, 137, 137, 0.4); /* Black w/ opacity */
  .v-card {
    width: 280px;
    display: block;
    margin: auto;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
      rgba(17, 17, 26, 0.05) 0px 8px 32px;
  }
}
.modal-activated {
  display: block;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
