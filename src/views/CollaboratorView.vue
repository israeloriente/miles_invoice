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
                      <BaseSelectWorkspace :currentItem="currentItem" />
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
          </v-toolbar>
        </template>
        <!-- Full Name -->
        <template v-slot:[`item.full_name`]="{ item }">
          <span v-if="item.attributes.fullName">{{
            item.get("fullName")
          }}</span>
          <span v-else class="danger">No data</span>
        </template>
        <!-- Age -->
        <template v-slot:[`item.age`]="{ item }">
          <span v-if="item.attributes.age">{{ item.get("age") }}</span>
          <span v-else class="danger">No data</span>
        </template>
        <!-- Salary -->
        <template v-slot:[`item.salary`]="{ item }">
          <span v-if="item.attributes.salary">{{ item.get("salary") }}</span>
          <span v-else class="danger">No data</span>
        </template>
        <!-- Area Work -->
        <template v-slot:[`item.area_work`]="{ item }">
          <span v-if="item.attributes.areaWork">{{
            item.get("areaWork")
          }}</span>
          <span v-else class="danger">No data</span>
        </template>
        <!-- Workspaces -->
        <template v-slot:[`item.button`]="{ item }">
          <v-btn
            color="primary"
            class="elevation-0"
            small
            :disabled="!item.get(`workspaces_index`)"
            @click="editItem(item)"
            >{{ item.get("workspaces_index") || 0 }}</v-btn
          >
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
import BaseSelectWorkspace from "@/components/BaseSelectWorkspace.vue";
import modal_mixin from "@/mixins/modal";
import { Collaborator } from "@/api/Collaborator.service";
import $message from "popular-message";

export default {
  components: {
    BaseSelectWorkspace,
  },
  mixins: [modal_mixin],
  data: () => ({
    dialog: false,
    // dialogDelete: false,
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
    currentItemId: -1,
    currentItem: {
      full_name: "",
      age: 23,
      salary: 2300,
      area_work: "",
      workspacesList: [],
      defaultItem: undefined,
    },
    defaultItem: {
      full_name: "",
      age: 23,
      salary: 2300,
      area_work: "",
      workspacesList: [],
      defaultItem: undefined,
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
    new Collaborator().getObjects().then((res) => {
      this.collaborators = res || [];
      for (let i = 0; i < res.length; i++) {
        let query = res[i].get("workspace").query();
        query.find().then((rela) => {
          this.collaborators[i].set("workspaces", rela);
          this.collaborators[i].set("workspaces_index", rela.length || 0);
        });
      }
    });
  },

  methods: {
    // updateWorkspace(data) {
    //   console.log(data);

    // },
    editItem(item) {
      let cola = new Collaborator();
      console.log(item);
      this.currentItemId = item.id;
      cola.getObjectById(item.id).then(async (res) => {
        let relations = (await cola.getWorkspacesList(res)) || [];
        console.log(relations);
        this.setCurrentItem(res, relations);
        // console.log(obj);
        // this.currentItem.workspaces = res.get("workspace") || [];
        // this.currentItem.workspaces_index = res.get("workspace").length || 0;
        // console.log(this.currentItem);
        console.log(res);
      });
      this.dialog = true;
    },

    deleteItem(item) {
      this.currentItemId = this.collaborators.indexOf(item);
      this.currentItem = Object.assign({}, item);
      // this.dialogDelete = true;
      this.confirmAlert().then((res) => {
        document.getElementById("mdi_delete").focus();
        if (!res) return;
        this.currentIndex = this.collaborators.indexOf(item);
        // this.setCurrentItem(item);
        this.collaborators[this.currentIndex].destroy().then(() => {
          this.showToast(`Item deleted`);
          this.collaborators.splice(this.currentIndex, 1);
          this.close();
        });
      });
    },

    deleteItemConfirm() {
      // this.collaborators.splice(this.currentItemId, 1);
      localStorage.setItem("collaborators", JSON.stringify(this.collaborators));
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.currentItem = Object.assign({}, this.defaultItem);
        this.currentItemId = -1;
      });
    },

    closeDelete() {
      // this.dialogDelete = false;
      this.$nextTick(() => {
        this.currentItem = Object.assign({}, this.defaultItem);
        this.currentItemId = -1;
      });
    },

    save() {
      if (this.currentItem.full_name) {
        if (this.currentItemId == -1) {
          new Collaborator().saveObject(this.currentItem).then((newObj) => {
            this.collaborators.push(newObj);
            this.showToast(`Item added`);
          });
        } else {
          new Collaborator().updateObject(this.currentItem.defaultItem).then((newObj) => {
            this.collaborators[this.currentItemId] = newObj;
            this.showToast(`Item updated`);
          });
          // Object.assign(
          //   this.collaborators[this.currentItemId],
          //   this.currentItem
          // );
          // let newList = JSON.stringify(this.collaborators);
          // localStorage.setItem("collaborators", newList);
        }
        this.resetCola();
        this.close();
      } else alert("Name is Required!");
    },
    resetCola() {
      this.currentItem = this.defaultItem;
    },
    setCurrentItem(item, workspaces) {
      this.currentItem = {
        full_name: item.get("fullName"),
        age: item.get("age"),
        salary: item.get("salary"),
        area_work: item.get("areaWork"),
        workspacesList: workspaces,
        defaultItem: item,
      };
      console.log(this.currentItem);
    },
    showToast(message) {
      $message.info(message, {
        duration: 3,
        closable: true,
        dangerUseHtml: false,
      });
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



