<template class="">
  <div class="bg-gray-100">
    <div
      v-show="!this.response"
      class="flex flex-wrap md:mx-24 lg:mx-40 py-24 md:py-32"
    >
      <ProductCard
        v-for="(product, index) in gProducts"
        :key="index"
        :product="product"
        :isInCart="selectionProducts.includes(product)"
        class="pt-10"
      >
      </ProductCard>
    </div>

    <div class="spinner h-screen " v-show="this.response">
      <div class="cube1"></div>
      <div class="cube2 "></div>
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    ProductCard
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("fetchProducts");
  },
  computed: {
    ...mapState(["selectionProducts", "response"]),
    ...mapGetters(["gProducts"])
  }
};
</script>
<style scoped>
.spinner {
  margin: 300px auto;
  width: 80px;
  height: 80px;
  position: relative;
}

.cube1,
.cube2 {
  background-color: #652572;
  width: 80px;
  height: 80px;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;
  animation: sk-cubemove 1.8s infinite ease-in-out;
}

.cube2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

@-webkit-keyframes sk-cubemove {
  25% {
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    -webkit-transform: rotate(-360deg);
  }
}

@keyframes sk-cubemove {
  25% {
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  }
  50.1% {
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}
</style>
