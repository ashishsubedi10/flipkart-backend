const User = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')



exports.signup = (req, res) => User.findOne({ email: req.body.email })
    .exec(async (err, user) => {
        if (user) {
            return res.status(400).json({
                message: "User already registered.."
            })
        }
        const { firstName, lastName, userName, email, password } = req.body;
        const hashed_password = await bcrypt.hash(password, 10)
        const newUser = new User({
            firstName, lastName, userName, email, hashed_password
        })
        newUser.save((err, data) => {
            if (err) return res.status(400).json({
                error: err
            })
            if (data) {
                return res.status(200).json({
                    user: data
                })
            }
        })
        if (err) return res.status(400).json({
            error: err
        })
    }
    )

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (err) return res.status(400).json({
                message: 'invalid username or password'
            })
            if (user) {
                if (user.authenticate(req.body.password)) {
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
                    const { _id, firstName, lastName, email, userName, role, fullName } = user;
                    res.status(200).json({
                        token,
                        user: {
                            _id, firstName, lastName, email, userName, role, fullName
                        }
                    })

                }
                else {
                    return res.status(400).json({
                        message: 'invalid username or password'
                    })
                }
            }
        })




}
