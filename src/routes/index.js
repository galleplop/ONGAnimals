const { Router } = require('express');
const animalsRouter = require('./animalsRouter')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/animals', animalsRouter)

//router se exporta para que lo requiera app
module.exports = router;
