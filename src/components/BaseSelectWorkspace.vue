<template>
  <v-autocomplete
    v-model="result"
    :items="list"
    item-text="name"
    item-value="uid"
    auto-select-first
    chips
    clearable
    deletable-chips
    multiple
    small-chips
    @change="updated()"
  ></v-autocomplete>
</template>

<script>
export default {
  name: "BaseSelectWorkspace",
  props: {
    resultFromParent: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    let list = JSON.parse(localStorage.getItem("workspaces")) || [];
    return {
      list,
    };
  },
  data() {
    return {
      result: [],
    };
  },
  mounted() {
    this.result = this.resultFromParent || [];
  },
  methods: {
    updated() {
      this.$emit("BaseSelectWorkspaceUpdated", this.result);
    },
  },
};
</script>
