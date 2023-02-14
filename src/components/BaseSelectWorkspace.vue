<template>
  <v-autocomplete
    v-model="selected"
    :items="allWorkspaces"
    item-text="attributes.name"
    item-value="id"
    auto-select-first
    chips
    clearable
    deletable-chips
    multiple
    small-chips
  >
  </v-autocomplete>
</template>

<script>
// import { Collaborator } from '@/api/Collaborator.service';
import { Workspace } from "@/api/Workspace.service";
export default {
  name: "BaseSelectWorkspace",
  props: {
    currentItem: {
      type: Object,
      default: () => {
        return {
          full_name: undefined,
          age: undefined,
          salary: undefined,
          area_work: undefined,
          workspacesList: [],
          defaultItem: undefined,
        };
      },
    },
  },
  watch: {
    selected: {
      handler: function (val) {
        console.log("mudou selected");
        console.log(val);
        console.log(this.currentItem.workspacesList);
        let diff = val.filter((x) => !this.currentItem.workspacesList.includes(x));
        // let diff = val.filter((x) => !this.currentItem.workspacesList.includes(x));
        console.log(diff);
      },
      deep: true,
    },
    currentItem: {
      handler: function (val) {
        console.log("mudou currentItem");
        console.log(val);
        this.selected = this.currentItem.workspacesList;
      },
      deep: true,
    },
  },
  data: () => ({
    allWorkspaces: [],
    selected: [],
  }),
  created() {
    console.log(this.currentItem.workspacesList);
    this.selected = this.currentItem.workspacesList;
  },
  mounted() {
    new Workspace().getObjects().then((allWorkspaces) => {
      this.allWorkspaces = allWorkspaces || [];
    });
  },
  methods: {
    // updated(list) {
    //   console.log(this.currentItem.workspacesList);
    //   console.log(list);
    //   // this.$emit("BaseSelectWorkspaceUpdated", this.selected);
    // },
  },
};
</script>
