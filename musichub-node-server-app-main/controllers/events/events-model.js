import mongoose from "mongoose";
import eventsSchema from "./events-schema.js";

const eventsModel = mongoose.model("EventsModel", eventsSchema);

export default eventsModel;
