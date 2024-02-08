import likesModel from "./likes-model.js";

export const createLike = (like) => likesModel.create(like);

export const findLikesByUser = (user) =>
  likesModel.find({ user }).populate("user").exec();

export const deleteLike = (user, songID) =>
  likesModel.deleteOne({ user: user, idSong: songID });
