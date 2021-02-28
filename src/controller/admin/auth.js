const User = require('../../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')



exports.signup = (req, res) => User.findOne({ email: req.body.email })
    .exec(async (err, user) => {
        if (user) {
            return res.status(400).json({
                message: "Admin already registered.."
            })
        }
        const { firstName, lastName, userName, email, password } = req.body;

        const hashed_password = await bcrypt.hash(password, 10)

        const newUser = new User({
            firstName, lastName, userName, email, hashed_password,
            role: 'admin'
        })
        newUser.save((err, data) => {
            if (err) return res.status(400).json({
                error: err
            })
            if (data) {
                return res.status(201).json({
                    message: "Admin account created successfully"
                })
            }
        })
        if (err) return res.status(400).json({
            error: err
        })
    })

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (err) return res.status(400).json({
                message: 'invalid username or password'
            })
            if (user) {
                if (user.authenticate(req.body.password) && user.role === 'admin') {
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
                    const { _id, firstName, lastName, email, userName, role, fullName } = user;
                    res.cookie('token', token, { expiresIn: '1h' })
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

exports.signout = (req, res) => {

    res.clearCookie('token')
    res.status(200).json({
        message: 'Sign Out success.. '
    })
}
