import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    selectionProducts: [],
    numberProducts: 0,
    totalPrice: 0,
    timeout: 1000,
    text: "",
    snackbar: false,
    timeout2: 2000,
    response: false
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      // Fijamos el stock en el products reduciendo el stock del selectionProducts
      state.selectionProducts.forEach(cartProduct => {
        let productToUpdate = products.find(p => p.id === cartProduct.id);

        if (productToUpdate) {
          productToUpdate.stock = cartProduct.stock;
        }
      });
      // Creo una nueva key value para arreglar el reset
      products.forEach(product => {
        product.initialStock = product.stock;
      });
      state.products = products;
    },
    ADD_PRODUCT_CART(state, product) {
      state.numberProducts += 1;
      let newProduct = {
        id: product.id,
        photo: product.photo,
        name: product.name,
        price: product.price,
        quantity: 1,
        stock: product.stock,
        total: product.price
      };
      state.selectionProducts.push(newProduct);
      state.totalPrice += product.price;
      product.isInCart = true;
      state.snackbar = true;
      state.text = product.name + " added." + " " + "CLOSE";
      setTimeout(() => ((state.snackbar = false), (state.text = "")), 1000);
    },
    RESET_PRODUCTS(state) {
      state.selectionProducts = [];
      state.numberProducts = 0;
      state.totalPrice = 0;
      state.products.forEach(product => {
        product.stock = product.initialStock;
      });
    },
    REMOVE_PRODUCT(state, product) {
      const index = state.selectionProducts
        .map(item => item.id)
        .indexOf(product.id);
      state.selectionProducts.splice(index, 1);
      state.numberProducts -= product.quantity;
      state.totalPrice -= product.price * product.quantity;
    },
    INCREASE_PRODUCT_QUANTITY(state, product) {
      const selected = state.selectionProducts.find(
        item => item.id === product.id
      );
      state.text = product.name + " added.";

      setTimeout(() => ((state.snackbar = false), (state.text = "")), 1000);
      state.numberProducts += 1;
      const index = state.products.map(item => item.id).indexOf(product.id);
      state.products[index].stock = selected.stock - 1;

      state.totalPrice += product.price;

      selected.quantity += 1;
      selected.stock -= 1;
      state.products.stock -= 1;

      selected.total = selected.quantity * selected.price;
    },

    REDUCE_PRODUCT_QUANTITY(state, product) {
      // console.dir({ product: product, products: state.selectionProducts });
      const selected = state.selectionProducts.find(p => p.id === product.id);
      state.numberProducts -= 1;
      state.totalPrice -= product.price;

      selected.quantity -= 1;
      selected.stock += 1;
      selected.total = selected.quantity * selected.price;
      const index = state.products.map(item => item.id).indexOf(product.id);
      state.products[index].stock = selected.stock - 1;

      const select = state.products.find(p => p.id === product.id);
      if (select.stock > 0) {
        select.stock += 1;
      }

      if (product.quantity === 0) {
        const index = state.selectionProducts
          .map(item => item.id)
          .indexOf(product.id);
        state.selectionProducts.splice(index, 1);
      }
    }
  },
  actions: {
    fetchProducts({ commit }) {
      this.state.response = true;
      EventService.getProducts()
        .then(response => {
          this.state.response = false;
          commit("SET_PRODUCTS", response.data.rows);
        })
        .catch(error => {
          console.log("There was an error:", error.response);
        });
    },
    resetProducts() {
      return EventService.resetStock()
        .then(result => {
          console.log(result);
        })
        .catch(error => console.log(error));
    }
  },

  getters: {
    gProducts: state => {
      return state.products;
    },
    gSelectionProducts: state => {
      return state.selectionProducts;
    },
    gNumberProducts: state => {
      return state.numberProducts;
    },
    gTotalPrice: state => {
      return parseFloat(state.totalPrice).toFixed(2);
    }
  },

  modules: {}
});
