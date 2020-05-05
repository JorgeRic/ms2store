import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Cart from "../views/Cart.vue";
import Movil from "../views/Movil.vue";
import Pares from "../views/Pares.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart
  },
  {
    path: "/movil",
    name: "Movil",
    component: Movil
  },
  {
    path: "/pares",
    name: "Pares",
    component: Pares
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
