const express = require('express');
const request = require('supertest');
const celularRutas = require('../../rutas/celularRutas');
const CelularModel = require('../../models/Celular');
const mongoose  = require('mongoose');
//const CelularModel = require('../../models/Celular');
const app = express();
app.use(express.json());
app.use('/celular', celularRutas);

describe('Pruebas Unitarias para Celulares', () => {
    //se ejecuta antes de iniciar las pruebas
    beforeEach(async () => {
        await mongoose.connect('mongodb://localhost:27017/appcelulares',{
            useNewUrlParser : true,            
        });
        await CelularModel.deleteMany({});
    });
    // al finalziar las pruebas
    afterAll(() => {
        return mongoose.connection.close();
      });

    
      //1er test : GET
    test('Deberia traer todos los celulares metodo: GET: getCelulares', async() =>{
        await CelularModel.create({ marca: 'Iphone', modelo: 'iphone 12', bateria: 5000, camara_f: 15, camara_t:15 });
        await CelularModel.create({ marca: 'samsung', modelo: 'a33', bateria: 4300, camara_f: 12, camara_t:12 });
        // solicitud - request
        const res =  await request(app).get('/celular/traerCelulares');
        //verificar la respuesta
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(2);
    }, 10000);
    
    //  2do test : crear
    test('Deberia agregar una nuevo Celular: POST: /crear', async() => {
        const nuevoCelular = {
            marca: 'Xiaomi', 
            modelo: 'X 12', 
            bateria: 4500, 
            camara_f: 10, 
            camara_t:10
        };
        const res =  await request(app)
                            .post('/celular/crearCelular')
                            .send(nuevoCelular);
        expect(res.statusCode).toEqual(201);
        expect(res.body.marca).toEqual(nuevoCelular.marca);
    });
    
    // 3er test : actualizar
    test('Deberia actualizar un celular que ya existe: PUT /editar/:id', async()=>{
        const celularCreado = await CelularModel.create(
                                  { marca: 'Samsung', 
                                  modelo: 'A12', 
                                  bateria: 4000, 
                                  camara_f: 12, 
                                  camara_t: 12 });
        const celularActualizar = {
            marca: 'Samsung2024', 
            modelo: 'A12', 
            bateria: 4000,
            camara_f: 12, 
            camara_t: 12
        };
        const res =  await request(app)
                            .put('/celular/editarCelular/'+celularCreado._id)
                            .send(celularActualizar);
        expect(res.statusCode).toEqual(201);
        expect(res.body.marca).toEqual(celularActualizar.marca);                   

    });
    
    //4to test : eliminar
    test('Deberia eliminar un celular existente : DELETE /eliminar/:id', async() =>{
        const celularCreado = await CelularModel.create(
            { marca: 'Nokia', 
            modelo: 'N12', 
            bateria: 3500,
            camara_f: 20, 
            camara_t: 20 });

        const res =  await request(app)
                                .delete('/celular/eliminarCelular/'+celularCreado._id);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({mensaje :  'Celular eliminado'});
    });
});

//});