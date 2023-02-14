<template>
  <v-main>
    <v-container>
      <v-data-table
        height="500"
        :headers="headers"
        :items="workspaces"
        sort-by="name"
        class="elevation-0"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Workspaces</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  dark
                  color="primary"
                  class="mb-2"
                  data-cy="add_workspace"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Workspace
                </v-btn>
              </template>

              <!-- Inicio ADD Workspace -->
              <v-card>
                <v-card-title>
                  <span class="text-h5">New Workspace</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          label="Name"
                          ref="nameRef"
                          data-cy="save_workspace_name"
                          v-model="currentItem.name"
                          v-on:keyup.enter="save()"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="dialog = false">
                    Close
                  </v-btn>
                  <v-btn color="primary" text @click="save()"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- FIM ADD Workspace -->
          </v-toolbar>
        </template>
        <template v-slot:[`item.name`]="{ item }">
          <span>{{ item.get("name") }}</span>
        </template>
        <!-- EDIT -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)" id="mdi_delete">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-container>
  </v-main>
</template>

<script>
import { ref } from "vue";
import { Workspace } from "@/api/Workspace.service";
import Parse from "parse";
import modal_mixin from "@/mixins/modal";
import $message from "popular-message";

export default {
  components: {},
  mixins: [modal_mixin],
  setup() {
    const nameRef = ref("");
    return {
      nameRef,
    };
  },
  data: () => ({
    dialog: false,
    headers: [
      { text: "Name", value: "name" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    workspaces: [],
    /**
     * @type {number}
     * Determine the index of the item to be edited,
     * -1 means that we want to add a new item
     */
    currentIndex: -1,
    currentItem: {
      name: "",
    },
    defaultItem: {
      name: "",
    },
  }),
  watch: {
    dialog(val) {
      val || this.close();
      if (val)
        setTimeout(() => {
          this.$refs.nameRef?.focus();
        }, 100);
    },
  },
  created() {
    new Workspace().getObjects().then((res) => {
      this.workspaces = res || [];
    });
  },
  methods: {
    editItem(item) {
      this.currentIndex = this.workspaces.indexOf(item);
      this.currentItem = { name: item.get("name") };
      this.dialog = true;
    },
    deleteItem(item) {
      this.confirmAlert().then((res) => {
        document.getElementById("mdi_delete").focus();
        if (!res) return;
        this.currentIndex = this.workspaces.indexOf(item);
        this.currentItem = { name: item.get("name") };
        this.workspaces[this.currentIndex].destroy().then((res) => {
          this.showToast(`${res.get("name")} deleted`);
          this.workspaces.splice(this.currentIndex, 1);
          this.close();
        });
      });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.currentItem = Object.assign({}, this.defaultItem);
        this.currentIndex = -1;
      });
    },
    /** Save or Edit the current item */
    save() {
      if (this.currentItem.name) {
        if (this.currentIndex == -1) {
          const myNewObject = new Parse.Object("Workspace");
          myNewObject.set("name", this.currentItem.name);
          myNewObject.save().then((res) => {
            this.workspaces.push(res);
            this.showToast("Workspace Created");
          });
        } else {
          this.workspaces[this.currentIndex].set("name", this.currentItem.name);
          this.workspaces[this.currentIndex]
            .save()
            .then(() => this.showToast("Workspace Updated"));
        }
        this.resetCurrentItem();
        this.close();
      } else alert("Name Required");
    },
    showToast(message) {
      $message.info(message, {
        duration: 3,
        closable: true,
        dangerUseHtml: false,
      });
    },
    resetCurrentItem() {
      this.currentItem = Object.assign({}, this.defaultItem);
    },
  },
};
</script>




