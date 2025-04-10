<template>
  <div class="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div class="bg-gray-100 rounded-md shadow-md p-4">
      <h3 class="font-semibold text-gray-700">Total Productos</h3>
      <p class="text-2xl font-bold text-blue-500">{{ totalProducts }}</p>
    </div>
    <div class="bg-gray-100 rounded-md shadow-md p-4">
      <h3 class="font-semibold text-gray-700">Categorías Únicas</h3>
      <p class="text-2xl font-bold text-green-500">{{ uniqueCategories }}</p>
    </div>
    <div class="bg-gray-100 rounded-md shadow-md p-4">
      <h3 class="font-semibold text-gray-700">Precio Promedio (USD)</h3>
      <p class="text-2xl font-bold text-indigo-500">${{ (averagePrice || 0).toFixed(2) }}</p>
    </div>
    <div class="bg-gray-100 rounded-md shadow-md p-4">
      <h3 class="font-semibold text-gray-700">Tasa de Cambio (VES/USD)</h3>
      <p class="text-2xl font-bold text-yellow-500">{{ dolarRate > 0 ? dolarRate.toFixed(2) : 'Cargando...' }}</p>
    </div>
  </div>
</template>

<script setup>
  // Importa la función 'defineProps' de Vue para la tipificación de las propiedades.
  import { defineProps } from 'vue';

  // Define las props que este componente espera recibir del componente padre.
  const props = defineProps({
    
    totalProducts: {
      type: Number,
      required: true,
    },
    
    uniqueCategories: {
      type: Number,
      required: true,
    },
    
    averagePrice: {
      type: Number,
      required: true,
    },
    // 'dolarRate': Propiedad que representa la tasa de cambio del dólar (debe ser un Number y es requerida).
    dolarRate: {
      type: Number,
      required: true,
    },
  });
</script>

<style scoped>
  
</style>