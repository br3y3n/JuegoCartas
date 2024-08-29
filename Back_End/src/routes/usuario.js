import { Router } from "express";
//import { createUsuario, deleteUsuario, getAllUsuarios, getUsuarioById, updateUsuario } from "../controller/usuario.js";
import { checkJwt } from "../middleware/session.js";
import { createUsuario, deleteUsuario, getAllUsuarios, getUsuarioById, updateUsuario } from "../controllers/usuario.js";
import { loginUsuario } from "../controllers/inicioSession.js";

const routerUsuario = Router()


routerUsuario.post('/', createUsuario)
routerUsuario.post('/login', loginUsuario)
routerUsuario.post('/validacion', getAllUsuarios)
routerUsuario.get('/session', checkJwt,getUsuarioById)
routerUsuario.put('/:id', updateUsuario)
routerUsuario.delete('/:id', deleteUsuario)

export default routerUsuario