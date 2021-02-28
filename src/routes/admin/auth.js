const router = require('express').Router()
const { requireSignin } = require('../../common-middleware')
const { signup, signin, signout } = require('../../controller/admin/auth')
const { validateSignupRequest, isRequestvalidated, validateSigninRequest } = require('../../validators/auth')



router.post('/admin/signup', validateSignupRequest, isRequestvalidated, signup)
router.post('/admin/signin', validateSigninRequest, isRequestvalidated, signin)
router.post('/admin/signout', signout)



module.exports = router