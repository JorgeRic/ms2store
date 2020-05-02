<template>
  <div class=" md:w-1/2 xl:w-1/3  ">
    <div class=" w-auto bg-gray-200 rounded border mx-3 mt-3 mb-2 shadow-xl">
      <div class="relative flex justify-end mr-5">
        <button
          type="button"
          :disabled="product.stock === 0"
          class="button-buy mt-56 md:mt-64 focus:outline-none  "
          :class="background"
          @click="addOrIncrease(product)"
        >
          <BaseIcon
            class="iconCartWhite"
            name="shopping-cart"
            width="28"
            height="28"
          />
        </button>
      </div>

      <div class=" recuadro">
        <div class="imagen_recuadro">
          <img
            class="object-cover w-full h-64  "
            :src="
              'https://res.cloudinary.com/djhqderty/image/upload/c_fit/' +
                product.photo
            "
          />
        </div>

        <p class="precio font-bold  text-3xl ">{{ product.price }} €</p>
        <img
          class="object-cover w-full h-64 opacity-50 "
          :src="
            'https://res.cloudinary.com/djhqderty/image/upload/c_fit/' +
              product.photo
          "
          :title="product.price"
        />
      </div>

      <p class="text-gray-600 pt-4 text-xl mb-2 ml-4 font-light text-left">
        Stock:
        <span class="text-gray-700 text-xl  mb-2 ml-4 font-light text-left">
          {{ product.stock }}
        </span>
      </p>
      <p class="font-light text-3xl text-left text-orange-500 my-2 ml-4">
        {{ product.name }}
      </p>
      <p class="font-light text-2xl my-2 ml-4 text-left">
        {{ product.price }} €
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  props: {
    product: {
      type: Object
    }
  },
  data() {
    return {
      background: ["hover: bg-orange-500", "hover:bg-orange-400"]
    };
  },
  computed: {
    ...mapState([
      "numberProducts",
      "selectionProducts",
      "text",
      "snackbar",
      "timeout",
      "products",
      "totalStock"
    ]),
    ...mapGetters([
      "gProducts",
      "gNumberProducts",
      "gSelectionProducts",
      "gTotalPrice"
    ])
  },

  methods: {
    addOrIncrease(product) {
      product.stock -= 1;
      if (product.stock === 0) {
        this.background = "hover: bg-gray-400";
      }

      this.$store.commit(
        product.isInCart ? "INCREASE_PRODUCT_QUANTITY" : "ADD_PRODUCT_CART",
        product
      );
    }
  }
};
</script>

<style lang="scss">
.iconCartWhite {
  stroke: currentColor;
  stroke-width: 2;
  stroke: white;
  stroke-linecap: round;
  stroke-linejoin: round;
  color: white;
  fill: white;
  margin-right: 6px;
}
.recuadro {
  width: 100%;
  height: 260px;
  overflow: hidden;
}

.imagen_recuadro {
  margin-left: -23px;
  margin-right: -23px;
  margin-bottom: 5px;

  -webkit-transition-property: margin-top;
  -webkit-transition-duration: 0.9s;
}

.recuadro:hover .imagen_recuadro {
  margin-top: -260px;
}
</style>
