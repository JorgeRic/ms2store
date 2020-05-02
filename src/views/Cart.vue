<template>
  <div class="flex w-full flex-col md:flex-row mb-16 bg-gray-100 h-screen">
    <div class="w-full">
      <div class="container mt-32 md:mt-40">
        <div class="flex flex-row flex-no-wrap items-start w-full">
          <div class="w-full px-3 md:px-12">
            <table class="table-auto shadow-lg bg-white  w-full md:w-full">
              <thead class="border-b table-auto">
                <tr class="h-24 text-gray-600">
                  <td class="w-64 hidden md:table-cell"></td>
                  <td class=" text-sm md:text-base lg:text-lg w-1 md:w-64">
                    Product
                  </td>

                  <td
                    class=" text-sm md:text-base lg:text-lg w-64 hidden md:table-cell"
                  >
                    <p
                      class="hidden md:table-cell text-sm md:text-base lg:text-lg w-64"
                    >
                      Stock
                    </p>
                  </td>
                  <td
                    class=" text-sm md:text-base lg:text-lg w-64 hidden md:table-cell"
                  >
                    <p
                      class="hidden md:table-cell text-sm md:text-base lg:text-lg w-64"
                    >
                      Price (€)
                    </p>
                  </td>

                  <td class=" text-sm md:text-base lg:text-lg w-64">
                    Quantity
                  </td>
                  <td class="w-64"></td>

                  <td class=" text-sm md:text-base lg:text-lg w-64">
                    Total (€)
                  </td>
                </tr>
              </thead>

              <tbody class="border-b" v-if="selectionProducts.length === 0">
                <tr class="text-center h-16">
                  <td colspan="7" class="text-base md:text-lg lg:text-xl">
                    <strong>{{ text }}</strong>
                  </td>
                </tr>
              </tbody>

              <tbody
                v-else
                class="border-b"
                v-for="selection in selectionProducts"
                :key="selection.id"
              >
                <tr class="h-20">
                  <td class=" w-64 hidden md:table-cell">
                    <img
                      class="object-contain h-10 md:h-20 w-10 md:w-20 ml-5"
                      :src="
                        'https://res.cloudinary.com/djhqderty/image/upload/c_fit/' +
                          selection.photo
                      "
                    />
                  </td>
                  <td class="text-sm md:text-base px-5 lg:text-lg w-64 ">
                    {{ selection.name }}
                  </td>

                  <td
                    class="text-sm  md:text-base lg:text-lg w-64 hidden md:table-cell"
                  >
                    {{ selection.stock }}
                  </td>
                  <td
                    class="text-sm md:text-base lg:text-lg w-64 hidden md:table-cell"
                  >
                    {{ selection.price }}
                  </td>

                  <td
                    class="px-3 flex justify-center h-full flex-col md:flex-row md:py-10"
                  >
                    <p class=" text-sm md:text-base items-center  lg:text-lg">
                      {{ selection.quantity }}
                    </p>

                    <button
                      type="button"
                      @click="reduceProduct(selection)"
                      class="items-center "
                    >
                      <BaseIcon
                        class="minus-circle w-7 h-7"
                        name="minus-circle"
                      />
                    </button>

                    <button
                      type="button"
                      :disabled="selection.stock === 0"
                      @click="increaseProduct(selection)"
                      class="items-center "
                    >
                      <BaseIcon
                        class="plus-circle w-7 h-7"
                        name="plus-circle"
                      />
                    </button>
                  </td>
                  <td>
                    <button @click="removeProduct(selection)" class="">
                      <BaseIcon
                        class="trash w-20 md:w-28 h-20 md:h-28 flex justify-center"
                        name="trash-2"
                      />
                    </button>
                  </td>
                  <td class="text-sm md:text-base lg:text-lg">
                    {{ selection.total.toFixed(2) }} €
                  </td>
                </tr>
              </tbody>

              <tfoot class="">
                <tr class="text-right h-16">
                  <td class="hidden md:table-cell"></td>
                  <td></td>
                  <td class="hidden md:table-cell"></td>
                  <td class="hidden md:table-cell"></td>
                  <td></td>
                  <td colspan="2" class="text-base md:text-lg lg:text-xl">
                    <strong
                      v-if="discount"
                      v-show="gTotalPrice != 0"
                      class="pr-4 text-base md:text-lg lg:text-xl"
                      >Total: {{ gTotalPrice - 5 }} €</strong
                    >
                    <strong
                      v-else
                      v-show="gTotalPrice != 0"
                      class="pr-4 text-base md:text-lg lg:text-xl"
                      >Total: {{ gTotalPrice }} €</strong
                    >
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      <button
        class="bg-blue-500 hover:bg-blue-400 shadow mb-5 text-base text-white mt-5 border rounded px-4 py-3 font-bold uppercase"
        @click="checkout"
      >
        Checkout
      </button>
      <div
        v-show="question"
        class="bg-white rounded border mx-3 mt-3 mb-2 shadow-xl max-w-md h-64 ml-5 mr-3"
      >
        <div class="text-2xl mt-5 mb-5 md:mb-12">
          Have you finished to add products?
        </div>
        <div class="text-lg mb-4 md:mb-8">
          <p>
            We are going to proceed with your cart.
          </p>
          <p>
            Thank you to buy in M2E Shop.
          </p>
        </div>
        <div class="flex justify-end ">
          <button
            class="text-green-700 mx-20 text-xl font-bold"
            @click="questionNo"
          >
            No
          </button>
          <button class="text-green-700 mx-12 text-xl font-bold">
            <router-link to="/">Yes</router-link>
          </button>
        </div>
      </div>
    </div>

    <div
      class="container sm:mt-16 md:mt-64 w-full md:w-1/4 flex justify-center"
    >
      <div class="shadow-lg bg-white w-64 h-56">
        <h3 class="text-2xl font-bold pt-10">
          Take 5 € off of your total cart
        </h3>

        <div class="row">
          <div class="apply">
            <div class="floating-label-group">
              <input
                type="text"
                v-model="password"
                autocomplete="off"
                required
              />

              <label class="floating-label"> Voucher Code</label>
              <p class="text-red-500">{{ this.codeWrong }}</p>
              <p class="text-green-500">{{ this.codeCorrect }}</p>
            </div>
          </div>
        </div>

        <div class="apply">
          <button
            @click="applyDiscount"
            class="border-white text-lg pt-1"
            :class="[color]"
          >
            APPLY
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  props: {},
  data() {
    return {
      question: false,
      text: "No data available",
      discount: false,
      password: "",
      codeWrong: "",
      codeCorrect: "",
      color: "text-gray-600"
    };
  },
  computed: {
    ...mapGetters(["gProducts", "gNumberProducts", "gTotalPrice"]),
    ...mapState([
      "products",
      "numberProducts",
      "selectionProducts",
      "totalPrice"
    ])
  },
  methods: {
    applyDiscount() {
      if (this.gTotalPrice > 0 && this.password !== "") {
        if (this.password === "regalo") {
          this.discount = true;
          this.codeWrong = "";
          this.color = "text-green-500";
          this.codeCorrect = "Discount applied";
        } else {
          this.password = "";
          this.codeCorrect = "";
          this.color = "text-red-500";
          this.codeWrong = "Wrong voucher code";
        }
      }
    },
    removeProduct(product) {
      this.$store.commit("REMOVE_PRODUCT", product);
    },
    increaseProduct(product) {
      this.$store.commit("INCREASE_PRODUCT_QUANTITY", product);
    },
    reduceProduct(product) {
      this.$store.commit("REDUCE_PRODUCT_QUANTITY", product);
    },
    checkout() {
      this.question = true;
    },
    questionNo() {
      this.question = false;
    }
  }
};
</script>

<style lang="scss">
.trash {
  stroke: currentColor;
  stroke-width: 2;
  stroke: red;
  stroke-linecap: round;
  stroke-linejoin: round;
  color: red;
  fill: none;
}
.minus-circle {
  stroke: currentColor;
  stroke-width: 2;
  stroke: red;
  stroke-linecap: round;
  stroke-linejoin: round;
  color: red;
  fill: none;
}
.plus-circle {
  stroke: currentColor;
  stroke-width: 2;
  stroke: blue;
  stroke-linecap: round;
  stroke-linejoin: round;
  color: blue;
  fill: none;
}
.floating-label-group {
  position: relative;
  margin-top: 21px;
  margin-bottom: 10px;

  .floating-label {
    font-size: 18px;
    color: #404040;
    position: absolute;
    pointer-events: none;
    top: 0px;
    left: 65px;
    transition: all 0.2s ease;
    border-bottom: 2px solid gray;
  }

  input:focus ~ .floating-label,
  input:not(:focus):valid ~ .floating-label {
    top: -20px;
    bottom: 0px;
    left: 65px;
    font-size: 13px;
    margin-bottom: 1px;
    opacity: 1;
    color: blue;
    border-color: white;
  }
}
.row {
  height: 50px;

  padding-right: 3px;
  // border-bottom: 2px solid gray;
  padding-bottom: 25px;
}

label {
  color: gray;
  font-size: 20px;
}
</style>
