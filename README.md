[![Skylab-coders](https://mtzfactory.github.io/logos/png/skylab-coders.png)](http://www.skylabcoders.com/)
![nodejs](https://mtzfactory.github.io/logos/png/nodejs.png)
![express](https://mtzfactory.github.io/logos/png/express.png)
![mongodb](https://mtzfactory.github.io/logos/png/mongodb.png)
![html-5](https://mtzfactory.github.io/logos/png/html-5.png)
![css-3](https://mtzfactory.github.io/logos/png/css-3.png)

### Express & Mongo API demo.

Pequeña API de consultas a una base de datos MongoDB.

### CONFIGURACION PREVIA.
Sigue las [instrucciones][import-data] propias de MongoDB para importar el JSON con los datos de _restaurantes_.

Una vez importados, recuerda que para hacer [consultas geo-referencidas][geospatial-queries] debes indicar el campo que contiene las coordenadas, tan sencillo como ejecutar el siguiente comando en la tabla _restaurants_:

```javascript
    db.restaurants.ensureIndex({ "address.coord": "2dsphere" })
```

### INSTALACION.

Para instalar este proyecto:

```bash
    $ git clone https://github.com/mtzfactory/express-mongo-api.git
    $ cd express-mongo-api
    $ npm install
    $ npm start
```

### POSTMAN

Para comprobar que el servidor funciona correctamente, puedes importar a *Postman* el archivo que se encuentra en la carpeta con el mismo nombre; este archivo tiene configurado las diferentes llamadas a la API.

![imagen-1](img/image-1.png)

Ejemplo de uso:

![imagen-2](img/image-2.png)

[import-data]: https://docs.mongodb.com/getting-started/shell/import-data/
[geospatial-queries]: https://docs.mongodb.com/manual/geospatial-queries/

#### SkylabCoders Academy - Full Stack Web Development Bootcamp