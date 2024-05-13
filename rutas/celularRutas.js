const express = require('express');
const rutas = express.Router();
const CelularModel = require('../models/Celular');

//ENDPOINT 1 traer todos los celulares
rutas.get('/traerCelulares',async(req, res) => {
    try {
        const celular = await CelularModel.find();
        res.json(celular);
    }catch (error){
        res.status(500).json({mensaje: error.message});
    }
});
//ENDPOINT 2 crear celular
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

//ENDPOINT 3 editar Celular
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

//ENDPOINT 4 eliminar Celular
rutas.delete('/eliminarCelular/:id',async (req, res) => {
    try {
       const celularEliminado = await CelularModel.findByIdAndDelete(req.params.id);
       if (!celularEliminado)
            return res.status(404).json({ mensaje : 'Celular no encontrado!!!'});
       else 
            return res.json({mensaje :  'Celular eliminado'});    
       } 
    catch (error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

//ENDPOINT 5 buscar por marca
rutas.get('/buscarCelularesporMarca/:marca',async(req, res) => {
    try {
        const celular = await CelularModel.find({ marca: req.params.marca});
        res.json(celular);
    }catch (error){
        res.status(500).json({mensaje: error.message});
    }
});

//ENDPOINT 6 buscar por bateria
rutas.get('/buscarCelularesporBateria/:bateria',async(req, res) => {
    try {
        const celular = await CelularModel.find({ bateria: {$gt:req.params.bateria}});
        res.json(celular);
    }catch (error){
        res.status(500).json({mensaje: error.message});
    }
});

//ENDPOINT 7 ordenar por bateria
rutas.get('/ordenarCelulares', async (req, res) => {
    try {
       const celularesOrdenados = await CelularModel.find().sort({ bateria: -1});
       res.status(200).json(celularesOrdenados);
    } catch(error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

module.exports = rutas;


