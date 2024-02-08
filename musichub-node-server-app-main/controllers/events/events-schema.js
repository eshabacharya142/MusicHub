import mongoose from "mongoose";

const eventsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    host: {
      type: Object,
      required: true,
      ref: "UserModel",
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  { collection: "events" }
);

export default eventsSchema;
