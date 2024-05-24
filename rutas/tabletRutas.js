const express = require('express');
const rutas = express.Router();
const TabletModel = require('../models/Tablet');
const UsuarioModel = require('../models/Usuario');

//ENDPOINT 1 traer todos los celulares
rutas.get('/traerTablet',async(req, res) => {
    try {
        const tablet = await TabletModel.find();
        res.json(tablet);
    }catch (error){
        res.status(500).json({mensaje: error.message});
    }
});
//ENDPOINT 2 crear celular
rutas.post('/crearTablet', async (req, res) => {
    const tablet = new TabletModel({
        marca: req.body.marca,
        modelo: req.body.modelo,
        bateria: req.body.bateria,
        camara: req.body.camara_f,
        usuario: req.body.usuario //asignar id del usuario
    })
    try {
        const nuevaTablet = await tablet.save();
        res.status(201).json(nuevaTablet);
    } catch (error) {
        res.status(400).json({ mensaje :  error.message})
    }
});

//ENDPOINT 3 editar Celular
rutas.put('/editarTablet/:id', async (req, res) => {
    try {
        const tabletEditada = await TabletModel.findByIdAndUpdate(req.params.id, req.body, { new : true });
        if (!tabletEditada)
            return res.status(404).json({ mensaje : 'Tablet no encontrada!!!'});
        else
            return res.status(201).json(tabletEditada);

    } catch (error) {
        res.status(400).json({ mensaje :  error.message})
    }
});

//ENDPOINT 4 eliminar Celular
rutas.delete('/eliminarTablet/:id',async (req, res) => {
    try {
       const tabletEliminada = await TabletModel.findByIdAndDelete(req.params.id);
       if (!tabletEliminada)
            return res.status(404).json({ mensaje : 'Tablet no encontrada!!!'});
       else 
            return res.json({mensaje :  'Tablet eliminada'});    
       } 
    catch (error) {
        res.status(500).json({ mensaje :  error.message})
    }
});

//Reportes 2
rutas.get('/tabletPorUsuario/:usuarioId', async(req, res) =>{
    const {usuarioId} = req.params;
    try{
        const usuario = await UsuarioModel.findById(usuarioId);
        if(!usuario)
            return res.status(404).json({mensaje: 'usuario no encontrado'});
        const tablet = await TabletModel.find({usuario: usuarioId}).populate('usuario');
        res.json(tablet);

    }catch(error){
        res.status(500).json({mensaje: error.message})
    }
})

module.exports = rutas;


