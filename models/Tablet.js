const mongoose = require('mongoose');
//definir el esquema
const tabletSchema = new mongoose.Schema({
    //marca: { type: String, require: true}
    marca: String,
    modelo: String,
    bateria: Number,
    camara: Number,
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
});

const TabletModel = mongoose.model('Tablet', tabletSchema, 'tablet');

module.exports = TabletModel;