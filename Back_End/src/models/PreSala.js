import mongoose, { model } from "mongoose";


const PresalaSchema = mongoose.Schema( 
  {
  usuario: {
    type:String,
    trim: true,
    require:true
  },
    codigo: {
      type:String,
      trim: true,
      require:true
    },
    socketId:{
        type:String,
        require:true,
        trim:true
    },
    estado: {
      type:Boolean,
      trim: true,
      default:true
    }
    
  }, {timestamps:true}    
);
  
const PresalaModel = model('presala', PresalaSchema)

export default PresalaModel
  
