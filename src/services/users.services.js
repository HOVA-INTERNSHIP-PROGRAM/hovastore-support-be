import User from "../models/user.models";
import bcrypt from "bcrypt";
import { uploadToCloud } from "../helper/cloud";
import { sendResetEmail } from "../utils/emailTemplate";
import Token from "../models/resetToken.model";
import crypto from "crypto";
// Service to find all users
export const findAllUsers = async () => {
  return await User.find();
};

// Service to find a single user by id
export const findUserById = async (id) => {
  return await User.findById(id);
};

// Service to create a new user
export const createUser = async (userData, file) => {
  let result;
  if (file) result = await uploadToCloud(file);

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(userData.password, salt);

  return await User.create({
    name: userData.name,
    email: userData.email,
    password: hashedPass,
    img: result?.secure_url,
  });
};

// Service to update an existing user
export const updateUserById = async (id, userData, file) => {
  let result;
  if (file) result = await uploadToCloud(file);

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(userData.password, salt);

  return await User.findByIdAndUpdate(id, {
    name: userData.name,
    email: userData.email,
    password: hashedPass,
    img: result?.secure_url,
  });
};

// Service to delete a user by id
export const deleteUserById = async (id) => {
  return await User.findByIdAndDelete(id);
};


// Service to Login a user

export const loginUser = async (userData) => {
  const user = await User.findOne({ email: userData.email });
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(userData.password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  return user;
};

// service for forgot password
export const forgotPasswordService = async (userEmail) => {
  const user = await User.findOne({email: userEmail});
    if(!user){
      throw new Error("user not found");
    } 
    
    const resetToken = crypto.randomBytes(32).toString("hex");
    await Token.create({
      token: resetToken,
      user: user._id,
    });
    const link = `https://hovastore-support-be.onrender.com/api/v1/users/reset-password/${user._id}/${resetToken}`;
    sendResetEmail(user.email, user.name, link);
    console.log(link);
};

// service to reset password
export const resetPasswordService = async (id, resetToken, password, confirmPassword) => {
  const user = await User.findById(id);
      if(!user){
        throw new Error("user not found");
      }
      const validatedLinkToken = await Token.findOne({token: resetToken});
      if(!validatedLinkToken){
        throw new Error("Password reset link is not valid");
      } 
      if(password != confirmPassword){
        throw new Error("Two passwords does not match");
      }
      
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      await User.findByIdAndUpdate(id, {password: hashedPass});
      await Token.findByIdAndDelete(validatedLinkToken._id);
};




