import { eventBus } from "@/main";

export default {
  methods: {
    confirmAlert(title, msg) {
      const modal = new Promise(function (resolve) {
        eventBus.$emit("open-confirm-alert", { title, msg });
        eventBus.$on("close-confirm-alert", (res) => resolve(res));
      });
      modal.finally(() => eventBus.$off("close-confirm-alert"));
      return modal;
    },
  },
};
