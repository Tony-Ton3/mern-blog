import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => { 
    const { username, email, password } = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === '') 
        next(errorHandler(400, 'All fields are required'));

    const hashedPassword = bcryptjs.hashSync(password, 10);
    
    const newUser = new User({username, email, password: hashedPassword});

    try {
        await newUser.save(); 
        res.json('Signup successful');
    } catch(error) {
        next(error);
    }
}

export const signin = async (req, res, next) => { 
    const { email, password } = req.body;

    if(!email || !password) 
        next(errorHandler(400, 'All fields are required'));

    try {
        //check for valid email
        const validUser = await User.findOne({email}); 
        if(!validUser) {
            return next(errorHandler(400, 'User not found'));
        }

        //check for valid password associated with email
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) {
            return next(errorHandler(400, 'Invalid password'));
        }

        //create token. ps: _id is generated in mongodb
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);

        const { password: pass, ...rest } = validUser._doc; //destructure encrypted password from user 
        res.status(200).cookie('access_token', token, {
            httpOnly: true,
        }).json(rest) //the responce wont include password because it was destructured

    } catch(error) {
        next(error);
    }
}