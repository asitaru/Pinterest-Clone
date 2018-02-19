const jwt = require('jsonwebtoken');
const User = require('../schemas/User');
const { check, validationResult } = require('express-validator/check');

//TODO sanitize to avoid injections

module.exports.LoginValidation = [
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Passwords must be at least 6 chars long')
        .isLength({ min: 6 })
];

module.exports.Login = (passport) => {
    return (req, res) => {

        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            errors = errors.array().map(error => error.msg);
            return res.status(422).json({errors: errors});
        }

        passport.authenticate('local', (err, user) => {
            if (err) {
                return res.status(422).json({errors: [err]})
            }
            if (!user) {
                return res.status(401).json({errors: ['User not found!']});
            }

            const payload = {user: user};
            let token = jwt.sign(payload, 'Big Secret', {
                expiresIn: '24h'
            });
            const publicUser = {
                email: user.email,
                name: user.name
            };
            return res.status(200).json({token: token, user: publicUser});
        })(req,res);
    };
};


module.exports.RegisterValidation = [
    check('email').isEmail().withMessage('Email is not valid'),
    check('name', 'Field is required').exists(),
    check('password', 'Passwords must be at least 6 chars long')
        .isLength({ min: 6 }),
    check('password2', 'Passwords Confirmation field must have the same value as the password field')
        .isLength({min: 6 }).custom((value, { req }) => value === req.body.password)
];

module.exports.Register = (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors = errors.array().map(error => error.msg);
        return res.status(422).json({errors: errors});
    }

    const email = req.body.email;

    User.getUserByEmail(email, (err, user) => {
        if(err) throw err;
        if(user){
            return res.status(409).json({errors: ['Email is already taken']});
        }

        let newUser = new User({
            name: req.body.name,
            email: email,
            password: req.body.password,
        });

        User.createUser(newUser, (err, user) => {
            if (err) throw err;
            const payload = {user: newUser};
            let token = jwt.sign(payload, 'Big Secret', {
                expiresIn: '24h'
            });
            const publicUser = {
                name: user.name,
                email: user.email
            };
            return res.status(200).json({token: token, user: publicUser});
        });

    });
};