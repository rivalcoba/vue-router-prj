import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

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
    children: [
      {
        path: ":experienceSlug",
        name: "experienceDetails",
        props: true,
        component: () =>
          import(
            /* webpackChunkName "ExperienceDetails" */ "@/views/ExperienceDetails.vue"
          ),
      },
    ],
    beforeEnter: (to, from, next) => {
      // Verificando si existe información
      let exists = store.destinations.find(
        (destination) => destination.slug === to.params.slug
      );
      if (exists) {
        next();
      } else {
        next({ name: "NotFound" });
      }
    },
  },
  {
    path: "/404",
    alias: "*",
    name: "NotFound",
    component: () =>
      import(
        /* webpackChunkName: "NotFound" */
        "@/views/NotFound"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  linkExactActiveClass: "itgam-link-active-class",
  routes,
});

export default router;
