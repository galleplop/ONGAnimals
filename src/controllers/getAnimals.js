const { Animal } = require('../db')

const getAllAnimals = async () => {
    let pets = await Animal.findAll()
    return pets
}
module.exports = {
    getAllAnimals
}