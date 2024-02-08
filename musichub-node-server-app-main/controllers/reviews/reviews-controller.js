import * as dao from "./reviews-dao.js";

const ReviewsController = (app) => {
  const createReview = async (req, res) => {
    const songId = req.params.idSong;
    const currentUser = req.session["currentUser"];
    let review = req.body;
    review = {
      ...review,
      host: currentUser._id,
      time: Date.now(),
      idSong: songId,
    };
    console.log(review);
    const actualReview = await dao.createReview(review);
    res.json(actualReview);
  };

  const updateReview = async (req, res) => {
    const newReview = req.body;
    const review = await dao.updateReviewById(newReview._id, newReview);
    console.log(newReview);
    res.json(newReview);
  };

  const deleteReview = async (req, res) => {
    const songId = req.params.idSong;
    const response = await dao.deleteReview(songId);
    res.json(response);
  };

  const findReviewsBySongs = async (req, res) => {
    const songId = req.params.idSong;
    const reviews = await dao.findReviewsBySongs(songId);
    res.send(reviews);
  };

  const findReviewsByHost = async (req, res) => {
    const host = req.params.host;
    const reviews = await dao.findReviewsByHost(host);
    res.json(reviews);
  };

  const findAllReviews = async (req, res) => {
    const reviews = await dao.findAllReviews();
    res.json(reviews);
  };

  app.post("/api/reviews/song/:idSong", createReview);
  app.put("/api/reviews/song/:idSong", updateReview);
  app.delete("/api/reviews/song/:idSong", deleteReview);
  app.get("/api/reviews/song/:idSong", findReviewsBySongs);
  app.get("/api/users/:host/reviews", findReviewsByHost);
  app.get("/api/reviews", findAllReviews);
};

export default ReviewsController;
