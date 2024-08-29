
import express from "express";
import cors from 'cors'
import routerUsuario from "./routes/usuario.js";

const app = express();

app.use(cors())
app.use('usuario', routerUsuario)
const PORT = 7777;
app.listen(PORT, () => {
    console.log(`server working properly ${PORT}`)
});

