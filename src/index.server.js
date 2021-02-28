const express = require('express')
const app = express()
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors');

require('dotenv').config()


//load routes
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const catRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')
const initialDataRoutes = require('./routes/admin/initialData');



mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@ecommerce.kjepx.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("connection successfully")
}).catch(err => {
    console.log(err)
})


app.use(cors())
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, 'uploads')))

//load routing middlewares

app.use('/api', authRoutes)
app.use('/api', adminRoutes)
app.use('/api', catRoutes)
app.use('/api', productRoutes)
app.use('/api', cartRoutes)
app.use('/api', initialDataRoutes)

app.listen(process.env.PORT, () => {

    console.log("server is running")
})