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
            <v-toolbar-title>Collaborators</v-toolbar-title>
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
                  New Collaborator
                </v-btn>
              </template>

              <!-- Inicio ADD Colaborator -->
              <v-card>
                <v-card-title>
                  <span class="text">New Collaborator</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          ref="full_nameRef"
                          label="Full name"
                          v-model="currentItem.full_name"
                          v-on:keyup.enter="$refs.ageRef.focus()"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="4" sm="4" md="4">
                        <v-text-field
                          ref="ageRef"
                          label="Age"
                          type="number"
                          required
                          v-model="currentItem.age"
                          v-on:keyup.enter="$refs.salaryRef.focus()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4" sm="4" md="4">
                        <v-text-field
                          ref="salaryRef"
                          label="Salary"
                          type="number"
                          required
                          v-model="currentItem.salary"
                          v-on:keyup.enter="$refs.area_workRef.focus()"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4" sm="4" md="4">
                        <v-text-field
                          ref="area_workRef"
                          label="Area of work"
                          required
                          v-model="currentItem.area_work"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <BaseSelectWorkspace
                        :resultFromParent="currentItem.workspaces"
                        @BaseSelectWorkspaceUpdated="updateWorkspace"
                      />
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
            <!-- FIM ADD Colaborator -->

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
        <!-- Salary -->
        <template v-slot:[`item.salary`]="{ item }">
          <span v-if="item.salary">{{ item.salary }}</span>
          <span v-else class="danger">No data</span>
        </template>
        <!-- Area Work -->
        <template v-slot:[`item.area_work`]="{ item }">
          <span v-if="item.area_work">{{ item.area_work }}</span>
          <span v-else class="danger">No data</span>
        </template>
        <!-- Workspaces -->
        <template v-slot:[`item.button`]="{ item }">
          <v-btn
            color="primary"
            class="elevation-0"
            small
            :disabled="!item.workspaces.length"
            @click="editItem(item)"
            >{{ item.workspaces.length }}</v-btn
          >
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
import BaseSelectWorkspace from "@/components/base/BaseSelectWorkspace.vue";

export default {
  components: {
    BaseSelectWorkspace,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Full Name", value: "full_name", sortable: true },
      { text: "Age", value: "age" },
      { text: "Salary", value: "salary" },
      { text: "Area of work", value: "area_work" },
      { text: "Workspaces", value: "button" },
      { text: "Actions", value: "actions" },
    ],
    collaborators: [],
    /**
     * @type {number}
     * @description Determine the index of the item to be edited,
     * -1 means that we want to add a new item
     */
    currentIndexItem: -1,
    currentItem: {
      full_name: "",
      age: 23,
      salary: 2300,
      area_work: "",
      workspaces: [],
    },
    defaultItem: {
      full_name: "",
      age: 23,
      salary: 2300,
      area_work: "",
      workspaces: [],
    },
  }),

  watch: {
    dialog(val) {
      val || this.close();
      if (val)
        setTimeout(() => {
          this.$refs.full_nameRef.focus();
        }, 100);
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    let local = localStorage.getItem("collaborators");
    this.collaborators = JSON.parse(local) || [];
  },

  methods: {
    updateWorkspace(data) {
      this.currentItem.workspaces = data;
    },
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
      localStorage.setItem("collaborators", JSON.stringify(this.collaborators));
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
      if (this.currentItem.full_name && this.currentItem.age) {
        if (this.currentIndexItem == -1) {
          this.collaborators.push(this.currentItem);
          let newList = JSON.stringify(this.collaborators);
          localStorage.setItem("collaborators", newList);
        } else {
          Object.assign(
            this.collaborators[this.currentIndexItem],
            this.currentItem
          );
          let newList = JSON.stringify(this.collaborators);
          localStorage.setItem("collaborators", newList);
        }
        this.resetCola();
        this.close();
      } else alert("Name and age is Required!");
    },
    resetCola() {
      this.currentItem = this.defaultItem;
    },
  },
};
</script>

<style lang="scss">
.danger {
  color: red;
  font-weight: 500;
}
</style>



