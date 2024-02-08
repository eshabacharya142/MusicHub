import mongoose from 'mongoose';
import { usersSchema, adminSchema, creatorSchema } from './users-schema.js';

export const usersModel = mongoose.model('UserModel', usersSchema);
export const adminModel = usersModel.discriminator('AdminModel', adminSchema);
export const creatorModel = usersModel.discriminator('CreatorModel', creatorSchema);

export default usersModel;
