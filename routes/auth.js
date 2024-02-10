const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const router = express.Router();

router.post('/register', async(req, res) => {
    try {
        const { userName, email, password } = req.body;
        const userNameExists = await User.findOne({userName});
        if (userNameExists) {
            return res.status(400).send({
                message: 'An account with this usename already exists.',
                success: false
            });
        }
        const emailExists = await User.findOne({email});
        if(emailExists) {
            return res.status(400).send({
                message: 'An account with this email already exists.',
                success: false
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({userName, email, password: hashedPassword});
        await user.save();
        res.status(201).send({
            success: true,
            message: 'User registered successfully!'
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
});

router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        const errorObj = {
            success: false,
            error:'Authentication Failed',
            message: "Check email or password entered"
        };
        if (!user){
            return res.status(401). send(errorObj)
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(401).send(errorObj);
        }
        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
            );
        res.status(200).send({
            token,
            success: true
        });
    }catch(error){
        res.status(500).send(error.message);
    }

});

module.exports = router;
