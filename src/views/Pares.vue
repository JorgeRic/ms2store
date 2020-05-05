<template>
  <div>
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
                    Numeros Pares
                  </label>
                  <input
                    class="shadow w-1/3 text-xl appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    v-model="numeros"
                    type="number"
                  />
                </div>
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  @click="cantidadDePares"
                >
                  Buscar Pares
                </button>
              </form>
              <h2
                class="font-bold border w-1/2 rounded py-2 px-3 bg-yellow-200"
              >
                Numero de parejas: {{ numerosPares }}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pares",
  data() {
    return {
      numerosPares: 0,
      numeros: ""
    };
  },
  methods: {
    cantidadDePares() {
      var array = this.numeros.split("");
      var newObject = [];
      var copyArray = array.slice(0);
      for (var i = 0; i < array.length; i++) {
        var myCount = 0;
        for (var w = 0; w < copyArray.length; w++) {
          if (array[i] == copyArray[w]) {
            myCount++;
            delete copyArray[w];
          }
        }
        if (myCount > 1) {
          var object = new Object();
          object.value = array[i];
          object.count = myCount;
          newObject.push(object);
        }
      }
      var numerosPares = newObject.map(function(object) {
        return object.count;
      });
      var contador = 0;
      for (var b = 0; b < numerosPares.length; b++) {
        if (numerosPares[b] > 2) {
          var num = Math.floor(numerosPares[b] / 2);
          contador += num;
        } else {
          contador++;
        }
        this.numerosPares = contador;
      }
    }
  }
};
</script>

<style scoped></style>
