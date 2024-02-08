import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";

import EventsController from "./controllers/events/events-controller.js";
import UsersController from "./controllers/users/users-controller.js";
import AdminController from "./controllers/admin/admin-controller.js";
import LikesController from "./controllers/likes/likes-controller.js";
import FollowsController from "./controllers/follows/follows-controller.js";
import ReviewsController from "./controllers/reviews/reviews-controller.js";

dotenv.config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false,
  maxPoolSize: 10,
  socketTimeoutMS: 45000,
  family: 4,
};

const CONNECTION_STRING = process.env.CONNECTION_STRING_DB;
//const CONNECTION_STRING = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.qf9dktv.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose.connect(CONNECTION_STRING, options)
.then(() => {
  console.log("Connected to MongoDB!");
}).catch(err => {
  console.log(err);
});

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://main--snazzy-conkies-13e790.netlify.app",
  /netlify\.app$/,
];
app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
  })
);

app.use(
  session({
    secret: "any string",
    resave: false,
    proxy: true,
    saveUninitialized: false,
    cookie: {
      sameSite: "none",
      secure: true
    }
  })
);    

app.use(express.json());


EventsController(app);
UsersController(app);
LikesController(app);
FollowsController(app);
ReviewsController(app);
AdminController(app);

app.listen(4000, () => {
  console.log("Server listening on port 4000!");
});
