const mongoose = require('mongoose');
//definir el esquema
const celularSchema = new mongoose.Schema({
    //marca: { type: String, require: true}
    marca: String,
    modelo: String,
    bateria: Number,
    camara_f: Number,
    camara_t: Number,
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
});

const CelularModel = mongoose.model('Celular', celularSchema, 'celular');
module.exports = CelularModel;