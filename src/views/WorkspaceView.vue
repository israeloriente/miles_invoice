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
      </v-data-table>
    </v-container>
  </v-main>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const nameRef = ref("");
    return {
      nameRef,
    };
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
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
      colaborators: [],
    },
    defaultItem: {
      name: "",
      colaborators: [],
    },
  }),
  watch: {
    dialog(val) {
      val || this.close();
      if (val)
        setTimeout(() => {
          this.$refs.nameRef.focus();
        }, 100);
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.workspaces = JSON.parse(localStorage.getItem("workspaces")) || [];
  },
  methods: {
    editItem(item) {
      this.currentIndex = this.workspaces.indexOf(item);
      this.currentItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.currentIndex = this.workspaces.indexOf(item);
      this.currentItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.workspaces.splice(this.currentIndex, 1);
      localStorage.setItem("workspaces", JSON.stringify(this.workspaces));
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.currentItem = Object.assign({}, this.defaultItem);
        this.currentIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.currentItem = Object.assign({}, this.defaultItem);
        this.currentIndex = -1;
      });
    },
    /** Save or Edit the current item */
    save() {
      if (this.currentItem.name) {
        if (this.currentIndex == -1) {
          this.workspaces.push(this.currentItem);
          let newList = JSON.stringify(this.workspaces);
          localStorage.setItem("workspaces", newList);
        } else {
          Object.assign(this.workspaces[this.currentIndex], this.currentItem);
          let newList = JSON.stringify(this.workspaces);
          localStorage.setItem("workspaces", newList);
        }
        this.resetCurrentItem();
        this.close();
      } else alert("Campos name é obrigatórios");
    },
    resetCurrentItem() {
      this.currentItem = Object.assign({}, this.defaultItem);
    },
  },
};
</script>




