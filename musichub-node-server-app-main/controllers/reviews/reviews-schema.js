import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema(
  {
    review: String,
    idSong: String,
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    time: Date,
  },
  { collection: "reviews" }
);
export default reviewsSchema;
