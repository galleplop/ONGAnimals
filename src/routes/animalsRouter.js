const { Router } = require('express');
const router = Router();
const animalsRouter = router

animalsRouter.get('/', async (req, res) => {
    try {
        let pets = await getAllAnimals()
        res.status(200).json(pets)
    } catch (error) {
        res.status(404).send(`No se encontraron mascotas.`)
    }
})

module.exports = animalsRouter