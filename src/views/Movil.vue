<template>
  <div class="flex w-full flex-col md:flex-row mb-16 bg-gray-100 h-screen">
    <div class="w-full">
      <div class="container mt-32 md:mt-40">
        <div class="flex flex-row flex-no-wrap items-start w-full">
          <div class="w-full px-3 md:px-12">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="username"
                >
                  Traducir letras a numeros
                </label>
                <input
                  class="shadow text-xl appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  v-model="letras"
                  type="text"
                />
              </div>
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Tradudir
              </button>
            </form>
            <h2 class="font-bold border rounded py-2 px-3 bg-yellow-200">
              {{ convetirLetras }}
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Movil",
  data() {
    return {
      letras: ""
    };
  },
  methods: {},
  computed: {
    convetirLetras() {
      let abecedario = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      ];
      let numeros = [
        1,
        11,
        111,
        2,
        22,
        222,
        3,
        33,
        333,
        4,
        44,
        444,
        5,
        55,
        555,
        6,
        66,
        666,
        7,
        77,
        777,
        8,
        88,
        888,
        9,
        99
      ];
      let nuevaLetra = this.letras.toLowerCase().split("");

      let nuevoArray = [];
      console.log(nuevaLetra);
      nuevaLetra.forEach(item => {
        let index = abecedario.indexOf(item);
        if (abecedario) {
          nuevoArray.push(numeros[index]);
        }
      });
      return nuevoArray.join(" ");
    }
  }
};
</script>

<style scoped></style>
