import { Router } from "express";
import PeticionAyuda from "../../../../database/mongoose/models/peticion_ayuda.js";
import RespuestaVoluntarios from "../../../../database/mongoose/models/respuesta_voluntarios.js";

const ApiPeticionAyudaRouter = Router()

ApiPeticionAyudaRouter
.post('/', async(req, res) => {
    try{
        await PeticionAyuda.create(req.body)
        res.status(201).json({
            'message': 'created'
        })
    }catch(e)
    {
        console.log(e)
        res.status(401).json({
            message:'error creating peticion de ayuda'
        })
    }
})

  ApiPeticionAyudaRouter.get('/:id/voluntario/:id_voluntario', async (req, res) => {
    try {
        const { id, id_voluntario } = req.params;
        const idVol = req.query.idVol
        // Buscar si existe una respuesta del voluntario a esa petición
        const voluntario = await RespuestaVoluntarios.findOne(
          {
            _id: id_voluntario,
            idPeticion: id
          },
          // campos select
          {
            helpState:1
          }
        );

        if (!voluntario) {
            return res.status(404).json({ message: "Voluntario no encontrado para esta petición" });
        }

        res.json(voluntario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el voluntario" });
    }
  });

  ApiPeticionAyudaRouter.get('/:id', async(req, res) => {
      const id = req.params.id
      const peticionAyuda = await PeticionAyuda.findById(id)
      return res.status(200).json({
          data: peticionAyuda,
          message: 'ok'
      })
  })

  ApiPeticionAyudaRouter.get('/', async (req, res) => {
    try {
      // Obtener todas las peticiones de ayuda
      const peticiones = await PeticionAyuda.find( {isActive:true} );
  
      // Verificar si existe la query param idVol
      const idVol = req.query.idVol;
  
      // Contar los estados de ayuda para cada petición
      const peticionesConContadores = await Promise.all(peticiones.map(async (peticion) => {
        const conteos = await RespuestaVoluntarios.aggregate([
          { $match: { idPeticion: peticion._id } }, // Filtrar respuestas por peticion
          { $group: { _id: "$helpState", count: { $sum: 1 } } } // Contar por helpState
        ]);
  
        // Inicializar los contadores
        const contador = {
          0: 0, // NADA
          1: 0, // YENDO
          2: 0, // TRABAJANDO
          3: 0, // LISTO
        };
  
        // Asignar los valores de los conteos
        conteos.forEach((item) => {
          contador[item._id] = item.count;
        });
  
        // Si idVol está presente, buscar el estado de ayuda del voluntario
        let voluntarioHelpState = null;
        if (idVol) {
          const voluntario = await RespuestaVoluntarios.findOne({
            idVoluntario: idVol,
            idPeticion: peticion._id,
          });
  
          if (voluntario) {
            voluntarioHelpState = voluntario.helpState;
          }
        }
  
        // Devolver la petición con los contadores de cada estado y el helpState del voluntario si idVol está presente
        return {
          ...peticion.toObject(),
          voy: contador[1],  // YENDO
          trab: contador[2], // TRABAJANDO
          listo: contador[3], // LISTO
          voluntarioHelpState // helpState del voluntario si idVol está presente
        };
      }));
  
      // Responder con las peticiones y sus contadores
      res.status(200).json({
        message: 'ok',
        data: peticionesConContadores
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener las peticiones de ayuda' });
    }
  });
  

ApiPeticionAyudaRouter.patch('/')

export default ApiPeticionAyudaRouter
