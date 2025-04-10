<template>
  <div class="overflow-x-auto w-full">
    <table class="min-w-full bg-white rounded-md shadow-md">
      <thead class="bg-gray-100">
        <tr>
          <th class="py-2 px-4 text-left">Imagen</th>
          <th class="py-2 px-4 text-left sm:table-cell">Título</th>
          <th class="py-2 px-4 text-left md:table-cell">Categoría</th>
          <th class="py-2 px-4 text-left">Precio (USD)</th>
          <th class="py-2 px-4 text-left">Precio (VES)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td class="py-2 px-4">
            <img
              :data-src="product.image"
              :alt="product.title"
              class="w-16 h-16 object-contain lazyload"
              loading="lazy"
            >
          </td>
          <td class="py-2 px-4 sm:table-cell">{{ product.title }}</td>
          <td class="py-2 px-4 md:table-cell">{{ product.category }}</td>
          <td class="py-2 px-4">${{ product.price.toFixed(2) }}</td>
          <td class="py-2 px-4">{{ formatBolivares(product.price, dolarRate) }} Bs</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  // Define las props que este componente espera recibir del componente padre.
  const props = defineProps({
    products: {
      type: Array,
      required: true,
    },
    // 'dolarRate': Propiedad que representa la tasa de cambio del dólar (debe ser un Number y es requerida).
    dolarRate: {
      type: Number,
      required: true,
    },
  });

  // Define una función para formatear el precio en dólares a bolívares venezolanos.
  const formatBolivares = (usdPrice, dolarRate) => {
    // Verifica si la tasa de cambio es mayor que cero y si el precio en dólares es un número.
    if (dolarRate > 0 && typeof usdPrice === 'number') {
      // Calcula el precio en bolívares multiplicando el precio en dólares por la tasa de cambio.
      const bolivares = usdPrice * dolarRate;
      // Formatea el número a la representación local venezolana con dos decimales.
      return bolivares.toLocaleString('es-VE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    // Si la tasa de cambio no está disponible o el precio no es un número, devuelve un mensaje de carga.
    return 'Cargando...';
  };
</script>

<style scoped>
  
</style>