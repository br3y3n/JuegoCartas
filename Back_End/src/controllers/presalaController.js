import presalaModel from "../models/presalaModel"
import { codeGenetator } from "../utils/codeGeneratos"
import { decodeToken } from "../utils/jwt.handle"

export const createPresala = async (req, res) => {
    try {
        const user = req.headers.authorization
        const presala = await presalaModel.create({
            usuario: user,
            codigo: codeGenetator(),
            tipo: req.body.tipo
        })
        await presala.save()
        return res.status(201).json({ message: 'Usuario creado correctamente' });
    } catch (error) {
        res.status(400).json({ message: error })
    }
}
export const getAllPresalas = async (req, res) => {
    try {
        const presalas = await presalaModel.find();
        res.status(200).json(presalas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getPresalaById = async (req, res) => {
    try {
        const presala = await presalaModel.findById(req.params.id);
        if (!presala) {
          return res.status(404).json({ message: 'Presala no encontrada' });
        }
        res.status(200).json(presala);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}
export const joinToPresala = async (code) => {
    try {
        const presala = await presalaModel.findOne({codigo: code})
        if (!presala) {
            res.status(404).json({ message: 'Presala not found' })
        }
        presala.usuario.push()
    } catch (error) {
        res.status(400).json({ messageError: error})
    }
}
export const updatePresala = async (req, res) => {
    try {
        const presala = await presalaModel.findByIdAndDelete(req.params.id);
        const token = req.headers.authorization
        const user = decodeToken(token)

        if (!presala) {
            return res.status(404).json({ message: 'Presala no encontrada' });
        }

        presala.usuario.push(user.sub._id)

            res.status(200).json({ message: 'Presala eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deletePresala = async (req, res) => {
    try {
        const presala = await presalaModel.findByIdAndDelete(req.params.id);
        if (!presala) {
            return res.status(404).json({ message: 'Presala no encontrada' });
        }
        res.status(200).json({ message: 'Presala eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
} 