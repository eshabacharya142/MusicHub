import { usersModel, adminModel, creatorModel } from './users-model.js';

export const createUser = async (user) => 
    await usersModel.create(user);

export const findUserByUsername = async (username) =>
    await usersModel.findOne({ username });

export const findUserByCredentials = async (username, password) =>
    await usersModel.findOne({ username, password });

export const findAllUsers = async () => 
    await usersModel.find();

export const deleteUser = async (uid) =>
    await usersModel.deleteOne({ _id: uid });

export const updateUser = async (uid, userUpdates) =>
    await usersModel.updateOne({ _id: uid }, { $set: userUpdates });

export const findUserById = (uid) =>
    usersModel.findById(uid, { password: false });

// Admin DAO
export const createAdminUser = async (user) => 
    await adminModel.create(user);

export const findAdminUserByUsername = async (username) =>
    await adminModel.findOne({ username });

export const findAllAdmins = async () => 
    await adminModel.find();

export const deleteAdmin = async (uid) =>
    await adminModel.deleteOne({ _id: uid });

// Creator DAO
export const createCreatorUser = async (user) =>
    await creatorModel.create(user);

export const findCreatorByUsername = async (username) =>
    await creatorModel.findOne({ username });

export const findAllCreators = async () => 
    await creatorModel.find();

export const updateCreatorUser = async (uid, userUpdates) =>
    await creatorModel.updateOne({ _id: uid }, { $set: userUpdates });

export const deleteCreatorUser = async (uid) =>
    await creatorModel.deleteOne({ _id: uid });
