<template>
  <v-main>
    <v-container>
      <v-data-table
        height="500"
        :headers="headers"
        :items="collaborators"
        sort-by="calories"
        class="elevation-0"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>workspaces</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  dark
                  color="primary"
                  class="mb-2"
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
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          label="Name"
                          v-model="currentItem.name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          label="Email"
                          required
                          v-model="currentItem.email"
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

            <!-- CONFIRM ALERT -->
            <v-dialog max-width="290" v-model="dialogDelete">
              <v-card>
                <v-card-title class="text"
                  >Do you really want to remove this item?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="closeDelete">
                    Cancel
                  </v-btn>
                  <v-btn color="red" text @click="deleteItemConfirm">
                    Confirm
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- FIM CONFIRM ALERT -->
          </v-toolbar>
        </template>
        <!-- EDIT -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <!-- <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template> -->
      </v-data-table>
    </v-container>
  </v-main>
</template>

<script>
// import BaseAddWorkspace from "@/components/base/BaseAddWorkspace.vue";
// import BaseConfirmAlert from "@/components/base/BaseConfirmAlert.vue";

export default {
  components: {
    // BaseConfirmAlert,
  },
  data: () => ({
    cola: {
      name: "",
      email: "",
    },

    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Name",
        value: "name",
      },
      {
        text: "Email",
        value: "email",
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
    collaborators: [],
    /**
     * @type {number}
     * @description Determine the index of the item to be edited,
     * -1 means that we want to add a new item
     */
    currentIndexItem: -1,
    currentItem: {
      name: "",
      email: "",
    },
    defaultItem: {
      name: "",
      email: "",
    },
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.collaborators = JSON.parse(localStorage.getItem("workspaces")) || [];
  },

  methods: {
    editItem(item) {
      this.currentIndexItem = this.collaborators.indexOf(item);
      this.currentItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.currentIndexItem = this.collaborators.indexOf(item);
      this.currentItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.collaborators.splice(this.currentIndexItem, 1);
      localStorage.setItem("workspaces", JSON.stringify(this.collaborators));
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.currentItem = Object.assign({}, this.defaultItem);
        this.currentIndexItem = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.currentItem = Object.assign({}, this.defaultItem);
        this.currentIndexItem = -1;
      });
    },

    save() {
      if (this.currentItem.name && this.currentItem.email) {
        if (this.currentIndexItem == -1) {
          this.collaborators.push(this.currentItem);
          let newList = JSON.stringify(this.collaborators);
          localStorage.setItem("workspaces", newList);
        } else {
          Object.assign(
            this.collaborators[this.currentIndexItem],
            this.currentItem
          );
          let newList = JSON.stringify(this.collaborators);
          localStorage.setItem("workspaces", newList);
        }
        this.resetCola();
        this.close();
      } else alert("Campos name e email são obrigatórios");
    },
    resetCola() {
      this.cola = {
        name: "",
        email: "",
      };
    },
  },
};
</script>

<style lang="scss">
</style>




