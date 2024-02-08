import mongoose from 'mongoose';

export const usersSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String },
    role: {
      type: String,
      enum: ['MUSIC-CREATOR', 'CONTENT-VIEWER', 'ADMIN'],
      required: true,
    },
  },
  { collection: 'users', timestamps: true, discriminatorKey: 'userModel' }
);

export const adminSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ['SUPER', 'REGULAR', 'MUSIC-CREATOR', 'CONTENT-VIEWER'],
    required: true,
    default: 'REGULAR',
  },
  adminFromDate: { type: Date, required: true, default: Date.now() },
});

export const creatorSchema = mongoose.Schema({
  bio: { type: String, required: true, default: 'I am an event manager' },
  profilePic: {
    type: String,
    required: true,
    default: function() {
      const randomSeed = Math.random().toString(36).substring(7);
      return `https://robohash.org/${randomSeed}.png`;
    },
  },
  website: {
    type: String,
    required: true,
    default: 'https://user.github.io/',
  },
});
