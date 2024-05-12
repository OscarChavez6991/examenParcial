const express = require('express');
const rutas = express.Router();
const CelularModel = require('../models/Celular');

//endpoint traer todos los celulares
rutas.get('/traerCelulares',async(req, res) => {
    try {
        const celular = await CelularModel.find();
        res.json(celular);
    }catch (error){
        res.status(500).json({mensaje: error.message});
    }
});
//endpoint Crear celular
rutas.post('/crearCelular', async (req, res) => {
    const celular = new CelularModel({
        marca: req.body.marca,
        modelo: req.body.modelo,
        bateria: req.body.bateria,
        camara_f: req.body.camara_f,
        camara_t: req.body.camara_t
    })
    try {
        const nuevoCelular = await celular.save();
        res.status(201).json(nuevoCelular);
    } catch (error) {
        res.status(400).json({ mensaje :  error.message})
    }
});

//endpoint 3. Editar Celular
rutas.put('/editarCelular/:id', async (req, res) => {
    try {
        const celularEditado = await CelularModel.findByIdAndUpdate(req.params.id, req.body, { new : true });
        if (!celularEditado)
            return res.status(404).json({ mensaje : 'Celular no encontrado!!!'});
        else
            return res.status(201).json(celularEditado);

    } catch (error) {
        res.status(400).json({ mensaje :  error.message})
    }
});

//ENDPOINT 4. Eliminar Celular
rutas.delete('/eliminarCelular/:id',async (req, res) => {
    try {
       const celularEliminado = await CelularModel.findByIdAndDelete(req.params.id);
       if (!celularEliminado)
            return res.status(404).json({ mensaje : 'Celular no encontrada!!!'});
       else 
            return res.json({mensaje :  'Celular eliminado'});    
       } 
    catch (error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

module.exports = rutas;


