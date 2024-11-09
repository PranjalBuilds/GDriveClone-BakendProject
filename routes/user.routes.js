const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user.model')

router.get('/test', (req, res) => {
    res.send('user test route!');
})

router.get('/register', (req,res) => {
    res.render('register');
})

router.post('/register',
    body('email').trim().isEmail().isLength( {min: 10}),
    body('password').trim().isLength({ min: 5 }),
    body('username').trim().isLength({ min: 3 }),
    
    async (req, res) =>  {
    
    const errors = validationResult(req);

    if(!errors.isEmpty(0)) {
       return res.status(400).json({
            errors: errors.array(),
            message: 'Invalid data'
       })
    }

    const { email, username ,password } = req.body;

    //encrypting password for security!
    const hashPassword = await bcrypt.hash(password, 10) // 10 - times that password can be hashed
    
    const newUser = await userModel.create({ 
      email,
      username,
      password: hashPassword //passing hashed password
    })

    res.json(newUser);
})


router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', 
    body('username').trim().isLength({min: 3}),
    body('password').trim().isLength({ min: 5 }),
    async (req, res) => {
        const err = validationResult(req); 

        if(!err.isEmpty()){
           return res.status(400).json({
                errors: err.array(),
                message: 'Invalid data'
            })
        }

        //authentication

        const { username, password } = req.body;

        const user = await userModel.findOne({
            username: username
        })

        if(!user) {
            return res.status(400).json({
                message: 'username or password is incorrect!'
            })
        }

        // comparing the passord entered by user to hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({
                message: 'username or password is incorrect!'
            })
        }

        const token = jwt.sign({
            userId : user._id,
            email: user.email,
            username: user.username
        },
           process.env.JWT_SECRET, 
        )

        res.cookie('token', token)
        res.send('Loggen in!');
    }
)
module.exports = router;