import CollaboratorViewVue from "@/views/CollaboratorView.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import WorkspaceView from "../views/WorkspaceView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/workspace",
  },
  {
    path: "/workspace",
    name: "workspace",
    component: WorkspaceView,
  },
  {
    path: "/collaborator",
    name: "collaborator",
    component: CollaboratorViewVue,
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
