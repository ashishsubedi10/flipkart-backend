const router = require('express').Router()
const { signup, signin } = require('../controller/auth')
const { validateSignupRequest, isRequestvalidated, validateSigninRequest } = require('../validators/auth')



router.post('/signup', validateSignupRequest, isRequestvalidated, signup)
router.post('/signin', validateSigninRequest, isRequestvalidated, signin)


module.exports = router