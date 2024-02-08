import eventsModel from "./events-model.js";

export const createEvent = (event) => 
    eventsModel.create(event);

export const findEventById = (eid) => 
    eventsModel.findById(eid);

export const findAllEvents = () =>
    eventsModel.find().sort("-date").exec();

export const findEventByUserId = (uid) => {
    eventsModel.find({ "host.hostId": uid });
};

export const deleteEvent = (eid) => 
    eventsModel.deleteOne({ _id: eid });
