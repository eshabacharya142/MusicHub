import * as eventsDao from "./events-dao.js";

const EventsController = (app) => {
  const createEvent = async (req, res) => {
    const newEvent = req.body;
    const currentUser = req.session["currentUser"];
    newEvent.host = {
      hostId: currentUser._id,
      hostName: currentUser.username,
    };
    const actualEvent = await eventsDao.createEvent(newEvent);
    res.json(actualEvent);
  };

  const findEventById = async (req, res) => {
    const eventId = req.params.eid;
    try {
      const eventDetails = await eventsDao.findEventById(eventId);
      res.json(eventDetails);
    } catch (e) {
      res.sendStatus(404);
    }
  };

  const findAllEvents = async (req, res) => {
    const allEvents = await eventsDao.findAllEvents();
    res.json(allEvents);
  };

  const findEventByUserId = async (req, res) => {
    const uid = req.params.uid;
    const allEvents = await eventsDao.findEventByUserId(uid);
    res.json(allEvents);
  };

  const deleteEvent = async (req, res) => {
    const eventToDelete = req.params.eid;
    const status = await eventsDao.deleteEvent(eventToDelete);
    res.json(status);
  };

  app.post("/event", createEvent);
  app.get("/event/:eid", findEventById);
  app.get("/event", findAllEvents);
  app.get("/event/user/:uid", findAllEvents);
  app.delete("/event/:eid", deleteEvent);
};

export default EventsController;
