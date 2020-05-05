<template>
  <div>
    <header
      class=" bg-gray-200 border-b flex h-24 items-center justify-between p-4 pb-0 shadow-lg md:pb-4"
      v-show="!this.response"
    >
      <div
        class="flex flex-row items-center justify-between  
      text-3xl"
      >
        <router-link to="/"
          ><span class="font-bold">M2E</span><span>SHOP</span>
        </router-link>
        <router-link class="mx-5" to="/movil">Traductor</router-link>
        <router-link to="/pares">Pares</router-link>
      </div>

      <div :snackbar="!snackbar" :timeout="timeout">
        <h1
          class="invisible md:visible ease-in-out bg-blue-500 text-white text-xl text-bold "
          :class="getPadding()"
        >
          {{ text }}
        </h1>
      </div>

      <div>
        <nav class="flex">
          <div
            class="flex flex-col items-center content-center  flex-wrap mt-3 mr-5"
          >
            <p
              class="rounded-full h-6 w-6 flex items-center text-base text-white ml-20 justify-center bg-purple-700 p-3"
            >
              {{ numberProducts }}
            </p>
            <button
              type="button"
              :class="{ 'bg-violet-100': numberProducts > 0 }"
              :disabled="numberProducts == 0"
            >
              <router-link :to="{ name: 'Cart' }"
                ><BaseIcon
                  class="iconCartViolet"
                  name="shopping-cart"
                  width="44"
                  height="44"
              /></router-link>
            </button>
          </div>

          <div class="flex">
            <button
              type="button"
              class="focus:outline-none hover:bg-gray-400 h-24 px-1"
              @click="resetProducts"
            >
              <h3 class="text-xm md:text-xl font-bold">RESET STOCK</h3>
            </button>
          </div>
        </nav>
      </div>
    </header>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState([
      "numberProducts",
      "selectionProducts",
      "text",
      "snackbar",
      "timeout",
      "response"
    ]),
    ...mapGetters([
      "gProducts",
      "gNumberProducts",
      "gSelectionProducts",
      "gTotalPrice"
    ])
  },
  methods: {
    resetProducts(products) {
      this.$store.commit("RESET_PRODUCTS", products);
      console.log(this.text);
    },
    getPadding() {
      if (this.text !== "") {
        return { padding: 10 + "px" };
      }
      return;
    }
  }
};
</script>

<style lang="scss">
.iconCartViolet {
  stroke: currentColor;
  stroke-width: 2;
  stroke: purple;
  stroke-linecap: round;
  stroke-linejoin: round;
  color: purple;

  fill: purple;
  margin-right: 6px;
}
.snackbar {
  transition-property: opacity, bottom, left, right, width, margin,
    border-radius;
  transition-duration: 0.5s;
  transition-timing-function: ease;
  font-family: RobotoDraft;
  font-size: 30px;
  min-height: 14px;
  background-color: blue;
  // position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  line-height: 22px;
  // padding: 18px 24px;
  top: 0px;
  // opacity: 0;
}
</style>
