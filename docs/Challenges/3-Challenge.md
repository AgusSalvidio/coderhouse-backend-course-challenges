# Servidor con Express

## Consigna

Desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos.

## Aspectos a incluir

1. Se deberá utilizar la clase ProductManager que actualmente utilizamos con persistencia de archivos.

2. Desarrollar un servidor express que, en su archivo app.js importe al archivo de ProductManager que actualmente tenemos.

3. El servidor debe contar con los siguientes endpoints:
   - ruta '/products', la cual debe leer el archivo de productos y devolverlos dentro de un objeto. Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.
   - Si no se recibe query de límite, se devolverán todos los productos.
   - Si se recibe un límite, sólo devolver el número de productos solicitados.
   - ruta '/products/:pid', la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos.

# Sugerencias
- Tu clase lee archivos con promesas. Recuerda usar async/await en tus endpoints.
- Utiliza un archivo que ya tenga productos, pues el desafío sólo es para gets.

# Formato del entregable

Link al repositorio de Github con el proyecto completo, el cual debe incluir:
- Carpeta src con app.js dentro y tu ProductManager dentro.
- package.json con la info del proyecto.
- NO INCLUIR LOS node_modules generados.

[Proceso de testing de este entregable](https://docs.google.com/document/d/1ihCTk8qiizDgvAlRBsChdM5Xb8Moe_HLk-7ifM02fvw/edit)
