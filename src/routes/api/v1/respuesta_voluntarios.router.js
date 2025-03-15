/**
 * Express router for handling API requests related to "respuesta_voluntarios".
 * @module routes/api/v1/respuesta_voluntarios.router
 */

import { Router } from "express";
import RespuestaVoluntarios from "../../../../database/mongoose/models/respuesta_voluntarios.js";

const ApiRespuestaVoluntariosRouter = Router();

/**
 * GET /api/v1/respuesta_voluntarios
 * Retrieves all "respuesta_voluntarios" records.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response with all "respuesta_voluntarios" records.
 */
ApiRespuestaVoluntariosRouter.get('/', async (req, res) => {
    const voluntarios = await RespuestaVoluntarios.find()
    return res.status(200).json({
         data: voluntarios,
         message: 'ok'
    })
})

/**
 * PUT /api/v1/respuesta_voluntarios
 * Updates a "respuesta_voluntarios" record.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response indicating the update status.
 */
ApiRespuestaVoluntariosRouter.put('/', async(req, res) => {
    const {} = req.body();
    return res.status(200).json({
    })
})

/**
 * POST /api/v1/respuesta_voluntarios
 * Creates or updates a "respuesta_voluntarios" record.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response indicating the creation or update status.
 */
ApiRespuestaVoluntariosRouter.post('/', async(req, res) => {
    try{
        const idVoluntario = req.headers["x-voluntario"]; // En minúsculas
        console.log("ID Voluntario:", idVoluntario);

        if(!idVoluntario) return res.status(401).json({
            message:'usuario no autorizado'
        })
        
        const voluntarioExistente = await RespuestaVoluntarios.findOneAndUpdate(
            { idVoluntario: idVoluntario, idPeticion: req.body.idPeticion }, // Filtro
            { $set: req.body }, // Datos a actualizar
            { new: true, upsert: true } // `upsert: true` lo crea si no existe
        );
        
        if (!voluntarioExistente) {
            return res
            .status(201)
            .json({ message: "Voluntario creado", voluntario: voluntarioExistente });
        } else {
            return res
            .status(200)
            .json({ message: "Voluntario actualizado", voluntario: voluntarioExistente });
        }
    }catch(e){
        console.log(e)
        return res.status(401)
        .json({
            message:'error creating peticion de ayuda'
        })
    }
})

/**
 * GET /api/v1/respuesta_voluntarios/:id
 * Retrieves "respuesta_voluntarios" records by volunteer ID.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
ApiRespuestaVoluntariosRouter.get('/:id', async(req, res) => {
    const peticionId = req.headers["x-peticion"];
    // listado de respuesta_voluntarios con ese id de voluntario
})

export default ApiRespuestaVoluntariosRouter