import mongoose, { model } from "mongoose";
import presalaModel from "./presalaModel";

const salaSchema = mongoose.Schema({
    presala: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Presala',
        required: true
    }
})

const salaModel = model('Sala', salaSchema)

export default salaModel