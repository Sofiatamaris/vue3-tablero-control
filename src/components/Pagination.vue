<template>
  <div class="flex justify-center flex-wrap space-x-2 mt-4">
    <button
      v-for="pageNumber in totalPages"
      :key="pageNumber"
      @click="$emit('page-changed', pageNumber)"
      :class="{
        'px-4 py-2 rounded-md m-1': true,
        'bg-blue-500 text-white': currentPage === pageNumber,
        'bg-gray-200 text-gray-700 hover:bg-gray-300': currentPage !== pageNumber,
      }"
    >
      {{ pageNumber }}
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// Define las props que este componente espera recibir del componente padre
const props = defineProps({
  // 'totalPages': El número total de páginas disponibles para la paginación.
  totalPages: {
    type: Number,
    required: true,
  },
  // 'currentPage': El número de la página que se está mostrando actualmente.
  currentPage: {
    type: Number,
    required: true,
  },
});

// Define los eventos que este componente puede emitir al componente padre
const emit = defineEmits(['page-changed']);
// 'page-changed': Evento que ocurre cuando el usuario hace clic en un número de página.
//  El valor emitido es el número de la página seleccionada.
</script>

<style scoped>

</style>