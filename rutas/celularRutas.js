const express = require('express');
const rutas = express.Router();
const CelularModel = require('../models/Celular');
const UsuarioModel = require('../models/Usuario');
const TabletModel = require('../models/Tablet');

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
        camara_t: req.body.camara_t,
        usuario: req.body.usuario //asignar id del usuario
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

//Reportes 1
rutas.get('/celularPorUsuario/:usuarioId', async(req, res) =>{
    const {usuarioId} = req.params;
    try{
        const usuario = await UsuarioModel.findById(usuarioId);
        if(!usuario)
            return res.status(404).json({mensaje: 'usuario no encontrado'});
        const celular = await CelularModel.find({usuario: usuarioId}).populate('usuario');
        res.json(celular);

    }catch(error){
        res.status(500).json({mensaje: error.message})
    }
})

//Reporte Tablet y celular por usuario
rutas.get('/celularyTabletPorUsuario', async (req, res) => {
    try{
        const celular = await CelularModel.find();
        const reporte = await Promise.all(
            celulares.map( async (celular1) => {
                const tablet = await TabletModel.find({ marca: celular1.marca})
                
                return{
                    celular: {
                        marca: celular1.marca,
                        modelo: celular1.modelo
                    },
                    tablet: tablet.map( r => ({
                        _id: r._id,
                        marca: r.marca,
                        modelo: r.modelo
                    })),
                    tablet: tablet.map( r => ({
                        _id: r._id,
                        marca: r.marca,
                        modelo: r.modelo
                    }))
                }
            })
        )
        res.json(reporte);
        console.log(reporte)
    }catch(error){
        res.status(500).json({mensaje : error.message})
    }

})
module.exports = rutas;


