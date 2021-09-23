# Gestión de consultas para la Casa De La Mujer Tunja - Boyacá (Front-end).

Interfaz gráfica que utiliza [REST API](https://github.com/luisgomez29/gestion-consultas-api) para su funcionamiento.

## Requerimientos

**Node JS (última versión)**

**npm (última versión)**

## Instalación en local

1. Verificar que los [requerimientos](#requerimientos) estén instalados y tengan la última versión disponible.

2. Clonar el proyecto e ingresar a la carpeta.

3. Instalar dependencias:

    ```bash
    npm install
    ```
4. Configurar variables de entorno en el archivo `.env.development`. Ver el archivo `.env.example`.

5. Ejecutar la aplicación en el modo de desarrollo:
    ```bash
   npm run start
    ```

## Scripts disponibles

En el directorio del proyecto, puede ejecutar:

### `npm run start`

Ejecuta la aplicación en el modo de desarrollo.\
Abrir [http://localhost:3000](http://localhost:3000) para verla en el navegador.

La página se recargará si se hacen ediciones.\
También se verá cualquier error de lint en la consola.

### `npm run test`

Lanza el ejecutor de pruebas en el modo de vigilancia interactiva.\
Consulte la sección sobre [ejecución de pruebas](https://facebook.github.io/create-react-app/docs/running-tests) para
obtener más información.

### `npm run build`

Construye la aplicación para producción en la carpeta `build`.\
Agrupa correctamente React en modo de producción y optimiza la compilación para obtener el mejor rendimiento.

La compilación está minificada y los nombres de los archivos incluyen los hashes.\
La aplicación está lista para ser desplegada.

Consultar la sección sobre [deployment](https://facebook.github.io/create-react-app/docs/deployment) para más
información.

### `npm run lint`

Soluciona problemas relacionados con `eslint`.

## Actualizar dependencias

Para actualizar las dependencias ver el
artículo [Update all the Node.js dependencies to their latest version](https://nodejs.dev/learn/update-all-the-nodejs-dependencies-to-their-latest-version)
. \
Tener cuidado con los nuevos cambios de las dependencias ya que puede dejar de funcionar correctamente el proyecto.

## Construir aplicación para producción y ejecutarla en local

1. Crear archivo `.env.production`
2. Ejecutar el comando `npm run build`
3. Ejecutar servidor local (ver [Deployment](#deployment)):
   ```bash
   npm install -g serve
   
   # puerto 5000
   serve -s build
   
   # puerto personalizado
   serve -s build -l 3000
   ```

## Más información

### Code Splitting

This section has moved
here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved
here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Advanced Configuration

This section has moved
here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved
here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved
here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
