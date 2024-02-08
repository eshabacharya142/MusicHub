import reviewsModel from "./reviews-model.js";

export const createReview = (review) => reviewsModel.create(review);

export const updateReviewById = (reviewId, newReview) =>
  reviewsModel.updateOne({ _id: reviewId }, { $set: newReview });

export const findReviewsById = (idReview) =>
  reviewsModel.find({ _id: idReview }).sort("-time").populate("host").exec();

export const findReviewsBySongs = (idSong) =>
  reviewsModel.find({ idSong }).sort("-time").populate("host").exec();

export const findReviewsByHost = (host) =>
  reviewsModel.find({ host }).sort("-time").populate("host").exec();

export const deleteReview = (reviewID) =>
  reviewsModel.deleteOne({ _id: reviewID });

export const findAllReviews = () => reviewsModel.find();
