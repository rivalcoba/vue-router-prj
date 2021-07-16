import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// import Brazil from "../views/Brazil.vue";
// import Panama from "../views/Panama.vue";
// import Jamaica from "../views/Jamaica.vue";
// import Hawaii from "../views/Hawaii.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: true,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    props: true,
  },
  {
    path: "/details/:slug",
    name: "DestinationDetails",
    component: () =>
      import(
        /* webpackChunkName: "DestinationDetails" */ "../views/DestinationDetails.vue"
      ),
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  linkExactActiveClass: "itgam-link-active-class",
  routes,
});

export default router;
