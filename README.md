
# APLICACIONES DISTRIBUIDAS - MORFANDO Inc

Consigna:
La empresa Morfando Inc., recientemente desembarcada en Argentina y dedicada al
rubro gastronómico, nos ha contratado para el desarrollo de una aplicación móvil, que
según ellos promete revolucionar el mercado.
Nos pidieron crear una aplicación móvil, el backend y su despliegue en la nube para
poder visualizar el listado de restaurantes asociados a Morfando Inc..
Luego de un exhaustivo análisis, se lista lo relevado a nivel funcional y no funcional:
1. Cada dueño de un restaurante que se quiera asociar a Morfando Inc. para poder
figurar en la aplicación móvil, primero se deberá registrar en la aplicación
utilizando un correo y contraseña. Una vez confirmado, se podrá loguear
utilizando las mismas credenciales y podrá dar de alta uno o más restaurantes,
visualizarlos, editarlos, darlos de baja o dar de baja la cuenta.
También debe poder recuperar la contraseña en caso de olvido.
a. Restaurantes. Cuentan con el nombre del restaurante, la dirección
completa (calle, número, barrio, localidad, provincia, país), la
geolocalización (latitud y longitud), el horario de apertura y cierre por día y
la posibilidad de ponerlo en cerrado temporalmente.
También cuenta con el agregado de una o más fotos del restaurante en
modo landscape, el tipo de comida en la que se especializa, por ejemplo
“cocina general”, “comida china”, “comida mexicana”, etc y el rango de
precio, siendo los valores posibles $,$$, $$$, $$$$
b. Menú. Cada restaurante tiene un menú que puede variar en el tiempo. El
menú cuenta con una o más categorías (Promoción del día, entradas,
ensaladas, minutas, carnes, pescado, pastas, pizza, postres,
cafetería,bebidas, vinos, cervezas,etc) y cada categoría cuenta con ítems
que pueden ser platos, postres o bebidas. Cada ítem tiene un nombre,
precio y los ítems relacionados con comidas, ej. un plato de comida o
postre, pueden tener una o más fotos y los ingredientes del plato. A la vez
cada plato puede ser apto para celíacos y/o apto vegano
2. Para los usuarios no asociados a Morfando Inc., o sea, el público en general,
para ingresar a la app, estos deberán iniciar sesión con Google si la plataforma
es Android, o con Google o Apple si la plataforma es iOS.
Una vez logueado, se debe permitir completar de manera opcional el nombre y Al inicio de la aplicación se listan los restaurantes cercanos a la ubicación del
usuario y se podrán aplicar filtros de búsqueda como “distancia respecto su
ubicación”, “tipo de comida”, “rango de precio” y “cantidad de estrellas”. También
se debe permitir la búsqueda por nombre parcial o completo del restaurante.
Al seleccionar un restaurante, se podrá visualizar el detalle del mismo, ofrecer la
opción de compartir, agregar a favoritos y de como llegar utilizando algún mapa.
El usuario también podrá ver el listado de los restaurantes favoritos y poder
remover alguno de ellos si lo quisiera.
Por último un usuario podrá calificar a un restaurante (cantidad de estrellas) y
dejar un comentario que aparecerán en el detalle del restaurante.
3. Se debe poder manejar los errores que puedan surgir durante el uso de la
aplicación, ej. sin conexión a internet, servidor caído, login incorrecto, usuario ya
registrado, etc.
4. Aplicación móvil
a. La aplicación móvil se debe realizar en Android nativo o en React Native.
b. El diseño de la UX/UI se deberá realizar utilizando Figma o Adobe XD,
aunque se aceptan otras opciones.
5. Repositorio
a. Debe utilizar como repositorio Gitlab, Github o Bitbucket.
6. API REST
a. Se debe documentar utilizando Swagger o Postman, pero se aceptan
otras opciones.
b. Debe cumplir con todas las buenas prácticas.
c. Se podrá elegir el lenguaje y framework que se desee, pero se
recomienda el uso de Java/Kotlin + Spring Boot o JavaScript/TypeScript +
Node/Express js.
7. BD
a. Se podrá elegir entre una base de datos relacional o no relacional.
8. Cloud
a. Se debe desplegar todo el backend en la nube, para esto se recomienda
hacerlo en servidores sin costo como Heroku, AWS (t2 nano o micro) o
Google Cloud.
9. Readme

a. Tanto la aplicación móvil como el backend deben contar con un readme,
que explique todos los pasos necesarios para hacer correr el proyecto y
los integrantes del grupo.
10.Recomendaciones
a. Agile
i. Utilizar alguna aplicación de administración de proyectos como
Trello o Jira
ii. Amar un backlog y un sprint backlog
iii. Agregar todas las tareas a partir de los requerimientos funcionales
iv. Trabajar en sprints de 2 semanas
b. QA
i. Separar tiempo para hacer pruebas manuales de la aplicación
## Documentation

[Documentation](https://localhost:5000/doc)

- Instalar las dependencias
 npm install

- Para correr el backend, ejecutar el comando
  npm start

Luego será subido en una lambda de aws y la db en DynamoDB.