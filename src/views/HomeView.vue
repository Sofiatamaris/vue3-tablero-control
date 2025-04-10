<template>
  <div class="space-y-4 m-4">
    <ProductStats
      :totalProducts="areFiltersActive ? filteredProducts.length : products.length"
      :uniqueCategories="uniqueCategories"
      :averagePrice="averagePrice"
      :dolarRate="dolarRate"
    />

    <h2 class="text-xl font-bold mb-4">Lista de Productos</h2>

    <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
      <div class="w-full sm:w-auto">
        <label for="category-filter" class="mr-2 font-semibold block sm:inline-block">Filtrar por Categoría:</label>
        <select
          id="category-filter"
          v-model="selectedCategory"
          class="border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300 w-full sm:w-auto"
        >
          <option value="">Todas las categorías</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
        <label for="min-price" class="mr-2 font-semibold block sm:inline-block w-full sm:w-auto">Precio (USD):</label>
        <div class="flex space-x-2 w-full sm:w-auto">
          <input
            type="number"
            id="min-price"
            v-model.number="minPrice"
            placeholder="Min"
            class="border rounded-md py-2 px-3 w-1/2 sm:w-24 focus:outline-none focus:ring focus:border-blue-300"
          />
          <span class="hidden sm:inline-block">-</span>
          <input
            type="number"
            id="max-price"
            v-model.number="maxPrice"
            placeholder="Max"
            class="border rounded-md py-2 px-3 w-1/2 sm:w-24 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button @click="applyPriceFilter"></button>
        
      </div>
    </div>

    <transition name="fade" mode="out-in">
      <ProductCard
        :products="displayedProducts"
        :dolarRate="dolarRate"
      />
    </transition>

    <Pagination
      :totalPages="totalPages"
      :currentPage="currentPage"
      @page-changed="handlePageChange"
    />

    <div v-if="loading" class="text-center mt-4">Cargando productos...</div>
    <div v-if="error" class="text-center mt-4 text-red-500">Error al cargar los productos.</div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { getProducts, getCategories, getDolarRate } from '../services/productService.js';
import 'lazysizes';
import 'lazysizes/plugins/unveilhooks/ls.unveilhooks';
import ProductCard from '../components/ProductCard.vue';
import Pagination from '../components/Pagination.vue';
import ProductStats from '../components/ProductStats.vue';

const LOCAL_STORAGE_KEY = 'productFilters';
const products = ref([]);
const currentPage = ref(1);
const itemsPerPage = 5;
const dolarRate = ref(0);
const categories = ref([]);
const selectedCategory = ref('');
const minPrice = ref(null);
const maxPrice = ref(null);
const loading = ref(false);
const error = ref(null);

// Función asíncrona para obtener todos los productos desde el servicio
const fetchAllProducts = async () => {
  loading.value = true;
  error.value = null;
  try {
    products.value = await getProducts();
    currentPage.value = 1; // Resetear la página a 1 al cargar nuevos productos
  } catch (err) {
    console.error('Error fetching products:', err);
    error.value = 'Error al cargar los productos.';
  } finally {
    loading.value = false;
  }
};

// Función asíncrona para obtener todas las categorías desde el servicio
const fetchCategories = async () => {
  try {
    categories.value = await getCategories();
  } catch (err) {
    console.error('Error fetching categories:', err);
    error.value = 'Error al cargar las categorías.';
  }
};

// Función asíncrona para obtener la tasa de cambio del dólar desde el servicio
const fetchDolarRate = async () => {
  dolarRate.value = await getDolarRate();
};

// Hook onMounted que se ejecuta una vez que el componente se ha montado
onMounted(async () => {
  // Cargar las preferencias de los filtros desde localStorage al montar el componente
  const storedFilters = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedFilters) {
    const parsedFilters = JSON.parse(storedFilters);
    selectedCategory.value = parsedFilters.category || '';
    minPrice.value = parsedFilters.minPrice !== undefined ? parsedFilters.minPrice : null;
    maxPrice.value = parsedFilters.maxPrice !== undefined ? parsedFilters.maxPrice : null;
  }

  // Llamar a las funciones para obtener los datos iniciales
  await fetchDolarRate();
  await fetchCategories();
  await fetchAllProducts();
});

// Watcher que observa los cambios en los filtros (categoría, precio mínimo y máximo)
watch([selectedCategory, minPrice, maxPrice], (newValues) => {
  const [newCategory, newMinPrice, newMaxPrice] = newValues;
  // Guardar los nuevos valores de los filtros en localStorage
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
    category: newCategory,
    minPrice: newMinPrice,
    maxPrice: newMaxPrice,
  }));
}, { deep: true }); 

// Propiedad computed para determinar si algún filtro está activo
const areFiltersActive = computed(() => {
  return selectedCategory.value !== '' || minPrice.value !== null || maxPrice.value !== null;
});

// Propiedad computed para filtrar los productos basados en la categoría y el rango de precio seleccionados
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const categoryMatch = !selectedCategory.value || product.category === selectedCategory.value;
    const priceFilterActive = !(minPrice.value === null && maxPrice.value === null);
    const priceMatch = !priceFilterActive || (
      (minPrice.value === null || product.price >= minPrice.value) &&
      (maxPrice.value === null || product.price <= maxPrice.value)
    );
    return categoryMatch && priceMatch;
  });
});

// Propiedad computed para calcular el número total de páginas para los productos filtrados
const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage);
});

// Propiedad computed para obtener los productos que se mostrarán en la página actual
const displayedProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredProducts.value.slice(startIndex, endIndex);
});

// Propiedad computed para calcular el número de categorías únicas (basado en filtros o todos)
const uniqueCategories = computed(() => {
  const productsToConsider = areFiltersActive.value ? filteredProducts.value : products.value;
  const categoriesSet = new Set(productsToConsider.map(product => product.category));
  return Array.from(categoriesSet).length;
});

// Propiedad computed para calcular el precio promedio de los productos (basado en filtros o todos)
const averagePrice = computed(() => {
  const productsToConsider = areFiltersActive.value ? filteredProducts.value : products.value;
  if (productsToConsider.length > 0) {
    const sum = productsToConsider.reduce((total, product) => total + product.price, 0);
    return sum / productsToConsider.length;
  }
  return 0;
});

// Watcher que resetea la página actual a 1 cuando cambia la categoría seleccionada
watch(selectedCategory, () => {
  currentPage.value = 1;
});

// Función para aplicar el filtro de precio (simplemente resetea la página a 1)
const applyPriceFilter = () => {
  currentPage.value = 1;
};

// Función para manejar el cambio de página emitido por el componente Pagination
const handlePageChange = (page) => {
  currentPage.value = page;
};
</script>

<style scoped>

</style>
