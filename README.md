# MIDDLEWARE PROJECT 

## Objetivos del Proyecto

- Construir una App utlizando las tecnologias aprendidas durante el Bootcamp.
- Aprender sobre nuevas tecnologias necesarias para el correcto desarrollo.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.

## Comenzando

1. Clonar el repositorio en sus computadoras para comenzar a trabajar.
2. Crear la rama y trabajar sobre ella.

Se crea un `boilerplate` con la estructura general tanto del servidor como de cliente.

__IMPORTANTE:__ Es necesario contar minimamente con la última versión estable de Node y NPM. Asegurarse de contar con ella para poder instalar correctamente las dependecias necesarias para correr el proyecto.

Actualmente las versiónes necesarias son:

 * __Node__: 12.18.3 o mayor
 * __NPM__: 6.14.16 o mayor

Para verificar que versión tienen instalada:

> node -v
>
> npm -v

## BoilerPlate

El boilerplate cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

## Enunciado

Desarrollar una aplicacion que permita formar una comunidad de profesionales programadores para compartir sus tecnologias, proyectos e ideas, crecer en el mundo IT, mejorando o cambiando su situación profesional frente a los inconvenientes al momento de buscar su primer equipo de trabajo, siendo nuestra app el puente entre empresas y programadores.

La idea general es crear una aplicación en la cual se pueda ver información de los distintos programadores y empresas utilizando las api que sean necesarias y a partir de ella poder, entre otras cosas:

  - Buscar el programador que mas se ajuste al perfil de la Empresa
  - Buscar la empresa que mas se ajuste al perfil del programador
  - Filtrarlos
  - Crear reuniones laborales entre los usuarios
  - Compartir mejores practicas para lograr el tan ansiado puesto

  #### Tecnologías necesarias:
- [ ] React
- [ ] Redux
- [ ] Express
- [ ] A definir por el equipo

#### Frontend

Se debe desarrollar una aplicación de React/Redux que contenga las siguientes pantallas/rutas.

__Pagina inicial__: landing page con
- [ ] Alguna imagen de fondo representativa al proyecto
- [ ] Botón para ingresar como programador al inicio de sesion
- [ ] Botón para ingresar como empresa al inicio de sesion
- [ ] Video o texto representativo del proyecto

__Pagina para acceder__: inicion de sesion y autenticacion
- [ ] Posibilidad de crear una cuenta con mail o github si es la primera vez en la app
- [ ] Posibilidad de loguearse con la cuenta ya existente
- [ ] Posibilidad de recuperar su cuenta
- [ ] Nuevos usuarios seran redirigidos a la ruta de Perfil que corresponda segun sean programadores o empresas
- [ ] Usuarios ya existentes seran redirigidos a la Ruta Home

__Ruta principal__: La Home debe contener
- [ ] Informacion necesaria para ayudar a programadores a mejorar su perfil
        - cursos
        - templates
        - challenges
        - guias
- [ ] Publicaciones destacadas de los usuarios
- [ ] Área donde se podra acceder a la Ruta de empresas y a la de programadores
- [ ] Poder buscar por nombre de empresa o programador (reveer) 

__Ruta de creación de Perfil Programador__: debe contener
- [ ] Un formulario __controlado__ con los siguientes campos como lineamiento general pudiendo ser modificados
- [ ] Botón/Opción para crear el perfil
- [ ] Botón/Opción para eliminar el perfil
- [ ] Botón/Opción para redirigir a la Ruta Home
- [ ] Posibilidad de seleccionar/agregar varios campos en simultaneo
- [ ] Posibilidad de eliminar/editar varios campos en simultaneo
  - Datos personales
        - Nombre Completo
        - Nombre de usuario 
  - Contacto
        - Enlaces a github, Linkedin, redes
        - telefono
        - mail 
  - Trabajo de interes
        - Tiempo completo
        - Trabajo Flexible
        - Pasantias
  - Habilidades
        - Listado de Tecnologias
        - Idiomas
        - Otras habilidades
  - Ubicacion (pudiendo usar API de ciudades/paises)
        -Oportunidades Remoto
        -Fijas u oficinas
- [ ] Posibilidad de subir Fotografia desde su pc o celular
- [ ] Posibilidad de compartir sus Proyectos
- [ ] Posibilidad de grabar un Video de presentacion de 30 segundos

__Ruta de creación de Perfil Empresa__: debe contener
- [ ] Un formulario __controlado__ de publicacion de empleo con los siguientes campos como lineamiento general pudiendo ser modificados
- [ ] Posibilidad de seleccionar/agregar varios campos en simultaneo 
- [ ] Posibilidad de eliminar/editar varios campos en simultaneo 
- [ ] Botón/Opción para crear el perfil
- [ ] Botón/Opción para eliminar el perfil
- [ ] Botón/Opción para redirigir a la Ruta Home
- [ ] Botón/Opción para eliminar/ editar pubicaciones de empleos
- [ ] Botón/Opción para acceder a los programadores postulados en su publicacion
- [ ] Botón/Opción para acceder a un programador postulado en su publicacion
- [ ] Botón/Opción para ver las publicaciones de empleo
- [ ] Botón/Opción para marcar a un programador postulado como favorito en su publicacion
  - Datos de la Compania
        - Nombre (pudiendo usar API de listado de companias)
        - Nombre de usuario 
  - Contacto
        - Enlaces a paginas web de la marca
        - telefono
        - mail 
  - Tipo de Trabajo
        - Tiempo completo
        - Medio Tiempo
        - Freelance
        - Pasantias
  - Tipo de Contrato
        - Empleado
        - Contratista
        - Depende de la ubicacion
        - A definir       
  - Cargo a Cubrir
        - input para colocarlo
  - Ubicacion del Empleo
        - Oportunidades Remoto
        - Ubicacion Fisica
  - Eleccion de Residentes
        - Latam
        - Ciertos paises
        - Ciertas zonas horarias
  - Salario
        - Definido
        - En Rango
        - Posibilidad de Ingresar moneda
        - Posibilidad de ingresar el monto
        - Posibilidad de ingresar:
            - al mes
            - por hora
        - Posibilidad de agregar compensaciones o valor agregado
- [ ] Posibilidad de subir Fotografia desde su pc o celular
- [ ] Posibilidad de compartir sus Busquedas
- [ ] Posibilidad de grabar un Video de incentivo a candidatos de 30 segundos
- [ ] Posibilidad de acceder a la Ruta de 'Busca tu Programador'

__Ruta de Programadores Busca tu programador__: debe contener

- [ ] Input de búsqueda de programadores por nombre
- [ ] Área donde se verá el listado de programadores. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta `GET /developers` y deberá mostrar:
  - Imagen del programador
  - Nombre
  - Habilidades 
- [ ] Botones/Opciones para filtrar por tecnologias y por tipo de programador
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los programadores por orden habilidades, tecnologias, idiomas
- [ ] Paginado para ir buscando y mostrando los programadores.
- [ ] Botón/Opción para acceder a programadores postulados en su publicacion.

__Ruta de Detalle del Programador__: debe contener
- [ ] Los campos mostrados en la ruta de perfil de programador (imagen, nombre, usuario
- [ ] Tecnologias
- [ ] Challenges realizados
- [ ] Idiomas
- [ ] Boton/Opcion para coordinar entrevista con el programador





