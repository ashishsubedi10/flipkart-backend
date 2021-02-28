const express = require('express');
const path = require('path')
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { createProduct, getProductBySlug } = require('../controller/product');
const router = express.Router();
const shortid = require('shortid')
const multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage })




router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), createProduct)
router.get('/products/:slug', getProductBySlug)


module.exports = router;