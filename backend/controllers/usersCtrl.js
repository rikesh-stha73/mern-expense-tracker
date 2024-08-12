//!User Registration
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 
const asyncHandler = require("express-async-handler");   

const usersController = {

    //!Registration
    register: asyncHandler(async (req, res) =>{
        const {username, email, password} = req.body;
    //!Validate
        if(!username || !email || !password){
            throw new Error("All fields are mandatory");
        }       
    //!Check iif user already exists
        const userExist = await User.findOne({email});
        if(userExist){
            throw new Error("User already exists");
        }

    //!Hash the user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

    //!Create user and save to db
        const userCreated = await User.create({
            username,
            email,
            password : hashedPassword,
        });

    //!Send response
        res.json({
            username: userCreated.username,
            email: userCreated.email,
            id: userCreated._id,
            
        });
    }),
   
    //!Login 
    login: asyncHandler(async (req, res) =>{
    //! Get The User Data
        const { email, password} = req.body;
        console.log(email, password);
    //! check if email is found or correct
        const user = await User.findOne({ email});
        if(!user){
            throw new Error("Invalid login credentials");
        }       

    //! Compare the user password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error("Invalid login credentials");
        }  
        
    //! Generate a token
        const token = jwt.sign({id: user._id},'rksTokenKey', {expiresIn: "1d"});
        
    //! Send Response
        res.json({
            message: "Login Successful",
            token,
            id: user._id,
            username: user.username,
            email: user.email,
        });
    
    }),


    //! Profile
        profile: asyncHandler(async (req, res) =>{
            const user = await User.findById(req.user);
            if(!user){
                throw new Error("User not found");
            }
    //! Send the response
            res.json({
                username: user.username,
                email: user.email,
                id: user._id,
            });
        }),

    //! Change password
    changeUserPassword: asyncHandler(async (req, res) =>{
        const {newPassword} = req.body;
        const user = await User.findById(req.user);
        if(!user){
            throw new Error("User not found");
        }

        //!Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;

        //!Resave the user
        await user.save({
            validateBeforeSave:false,
        });
//! Send the response
        res.json({
            
            message: "Password changed successfully",
        });
    }),

    //! Update Profile
    updateUserProfile: asyncHandler(async (req, res) =>{
        const {email, username} = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.user,{
            username, 
            email,
        },
        {
            new: true,
        }    
    );
//! Send the response
        res.json({
            
            message: "User Profile Updated successfully",
            updatedUser,
        });
    }),
};

module.exports = usersController;