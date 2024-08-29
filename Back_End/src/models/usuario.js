import mongoose, { model } from "mongoose";


const usuarioSchema = mongoose.Schema( 
  {
  nombre: {
    type:String,
    trim: true,
    require:true
  },
    correo: {
      type:String,
      trim: true,
      require:true
    },
    contraseña: {
      type:String,
      trim: true,
      require:true
    }
    
  }, {timestamps:true}    
);
  
const usuarioModel = model('usuario', usuarioSchema)

export default usuarioModel
  
