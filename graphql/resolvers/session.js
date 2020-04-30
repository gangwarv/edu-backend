const Session = require("../../models/shared/session");

const sessions = async ({ top }) => {
  return Session.find().sort({ year: -1 }).limit(top);
};

const session = ({ id }) => {
  return Session.findById(id);
};

const addSession = async ({ id, name, year }) => {
  //only insert
  if (year > new Date().getFullYear())
    throw new Error(`Can not create session for year beyond ${new Date().getFullYear()}.`);
  const count = await Session.countDocuments({ year });
  if (count > 0) throw new Error("Session already exists!");

  return Session.create({ _id: id, name, year });
};

module.exports = {
  sessions,
  addSession,
  session,
};
