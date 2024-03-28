"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/pizza:

const pizza = require('../controllers/pizza')
const { isAdmin } = require('../middlewares/permissions')

/* ------------------------------------------------------- */
//! UPLOAD:
//? $ npm i multer
// https://expressjs.com/en/resources/middleware/multer.html
// multer module ile "form-data" verileri kabul edebiliriz. Yani dosya yukleme yapilabilir.

// const multer = require('multer')
// const upload = multer({
//     // dest: './uploads',
//     storage: multer.diskStorage({
//         destination: './uploads',
//         filename: function(req, file, returnCallback) {
//             // returnCallback(error, filename)
//             // returnCallback(null, 'qadir.jpg')
//             // console.log(file)
//             // returnCallback(null, file.originalname)
//             returnCallback(null, Date.now() + '-' + file.originalname)
//         }
//     })
// })

const upload = require('../middlewares/upload')

/* ------------------------------------------------------- */

// URL: /pizzas

router.route('/')
    .get(pizza.list)
    // .post(isAdmin, pizza.create)
    // .post(isAdmin, upload.single('fileInputName'), pizza.create)   //* tek dosya eklememe izin verir.
    .post(isAdmin, upload.array('fileInputName'), pizza.create)   //* birden fazla dosya eklememe izin verir. recommended/tavsiye edilen.
    // .post(isAdmin, upload.array('images'), pizza.create) // recommended.
    // .post(isAdmin, upload.any(), pizza.create)     //* not recommended.

router.route('/:id')
    .get(pizza.read)
    .put(isAdmin, upload.array('fileInputName'), pizza.update)
    .patch(isAdmin, upload.array('fileInputName'), pizza.update)
    .delete(isAdmin, pizza.delete)

/* ------------------------------------------------------- */
module.exports = router