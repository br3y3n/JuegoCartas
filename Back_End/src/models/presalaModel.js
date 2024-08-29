import mongoose, { model } from "mongoose";
import usuarioModel from "./usuario";
import { estadoPresala, tipoPresala } from "../enums/presalaEnums";

const presalaSchema = mongoose.Schema({
    usuario: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'usuario',
        requied: true,
        validate: [maxUsers, 'Excede al cantidad de 7 usuarios']
    },
    codigo: { type: String, requied: true },
    estado: { 
        type: estadoPresala, 
        enum: estadoPresala,
        default: estadoPresala.ENESPERA, 
        requied: true 
    },
    tipo: {
        type: tipoPresala, 
        enum: tipoPresala,
        requied: true
    }
})

const maxUsers = (val) => {
    return val.length <= 7
}

const presalaModel = model('Presala', presalaSchema)

export default presalaModel