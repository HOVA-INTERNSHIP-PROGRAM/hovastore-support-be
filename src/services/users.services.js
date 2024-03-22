import User from "../models/user.models";
import bcrypt from "bcrypt";
import { uploadToCloud } from "../helper/cloud";

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