const { login, register } = require('../app/http/controller/authController')()
const cartController = require('../app/http/controller/customers/cartController')
const homeController = require('../app/http/controller/homeController')

const router = require('express').Router()

router.get('/', homeController().index)

router.get('/cart', cartController().index)

router.post('/update-cart', cartController().update)


router.get('/login', login)

router.get('/register', register)


module.exports = router