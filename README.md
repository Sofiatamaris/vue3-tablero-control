# Tablero de Control Retail con Vue 3

Este proyecto es un tablero de control retail construido con Vue 3, Tailwind CSS y Vite. Permite a los usuarios visualizar estadísticas de productos, filtrar por categoría y precio, y navegar por una lista de productos paginada.

![](https://github.com/Sofiatamaris/vue3-tablero-control/blob/main/src/assets/vue-panel-control.png)

## Cómo Ejecutar el Proyecto

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

1.  **Clonar el repositorio:**

    ```bash
     git clone https://github.com/Sofiatamaris/vue3-tablero-control.git
    ```

2.  **Instalar las dependencias:**

    Este proyecto utiliza `npm` como gestor de paquetes. Asegúrate de tener Node.js y npm instalados en tu sistema. Ejecuta el siguiente comando en la raíz del proyecto:

    ```bash
    npm install
    ```

3.  **Ejecutar el servidor de desarrollo:**

    Una vez que las dependencias estén instaladas, puedes iniciar el servidor de desarrollo de Vite con el siguiente comando:

    ```bash
    npm run dev
    ```

    Esto iniciará la aplicación en modo de desarrollo. Deberías poder acceder a ella en tu navegador en la dirección que Vite te proporcione (normalmente `http://localhost:5173`).

## Decisiones Técnicas Relevantes

Durante el desarrollo de este tablero de control retail, se tomaron varias decisiones técnicas clave para asegurar la funcionalidad y el rendimiento del proyecto:

* **Componentización:** La interfaz de usuario se dividió en componentes reutilizables como `ProductCard`, `Pagination` y `ProductStats`. Esto promueve la modularidad, facilita la prueba y permite la reutilización de elementos en diferentes partes de la aplicación.

* **Manejo de Estado Local con `ref` y `computed`:** Para la gestión del estado dentro de los componentes (como la lista de productos, la página actual y los filtros), se utilizaron las `refs` reactivas y las `computed properties` de Vue. Esto proporciona una forma clara y eficiente de manejar los datos y las dependencias dentro de cada componente.

* **Comunicación entre Componentes con `props` y `emit`:** La comunicación entre componentes padre e hijo se realizó mediante el paso de `props` (datos hacia abajo) y la emisión de eventos con `emit` (acciones hacia arriba). Esto asegura un flujo de datos unidireccional y facilita el seguimiento de los cambios.

* **Lazy Loading de Imágenes con `lazysizes`:** Para mejorar el rendimiento de carga inicial, se implementó la carga diferida de imágenes utilizando la biblioteca `lazysizes`. Esto retrasa la carga de las imágenes hasta que estén cerca de la vista del usuario.

* **Persistencia de Filtros con `localStorage`:** Se uso `localStorage` para guardar las preferencias de filtrado del usuario (categoría y rango de precios). Esto permite que las preferencias se mantengan incluso después de recargar la página, mejorando la experiencia del usuario.

* **Formato de Moneda Localizado:** Se implementó la función `toLocaleString` de JavaScript para formatear los precios en bolívares venezolanos, considerando las convenciones locales para los separadores de miles y decimales.

* **Diseño Responsivo con Tailwind CSS:** Se utilizaron los puntos de quiebre y las clases responsivas de Tailwind CSS para asegurar que la aplicación se adapte correctamente a diferentes tamaños de pantalla, incluyendo dispositivos móviles y de escritorio.

* **Organización de Archivos:** Se adoptó una estructura de directorios clara y organizada (`assets`, `components`, `router`, `services`, `stores`, `views`) para facilitar la navegación y el mantenimiento del código.

