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
    path: "/user",
    name: "user",
    component: () => import(/* webpackChunkName: "User" */ "@/views/User.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/invoices",
    name: "invoices",
    component: () =>
      import(/* webpackChunkName: "Invoices" */ "@/views/Invoices.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "@/views/Login.vue"),
  },
  {
    path: "/404",
    alias: "*",
    name: "NotFound",
    component: () =>
      import(
        /* webpackChunkName: "NotFound" */
        "@/views/NotFound.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  linkExactActiveClass: "itgam-link-active-class",
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
      return savePosition;
    } else {
      const position = {};
      // Para simular el scroll hacia una ancla
      if (to.hash) {
        position.selector = to.hash;
        if (to.hash === "#experience") {
          position.offset = { y: 200 };
        }
        if (document.querySelector(to.hash)) {
          return position;
        }
        return false;
      }
    }
  },
  routes,
});

// Adding the middleware
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Need to login
    if (!store.user) {
      next({
        name: "login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
