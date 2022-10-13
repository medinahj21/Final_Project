const { Player, Event, Group } = require("../../db");
const { Sequelize, Model } = require("sequelize");

const createEvent = async (req, res) => {
  const { name, location, description, date, repetitive, state } = req.body;
  try {
    await Event.create({
      name,
      location,
      description,
      date,
      repetitive,
      state
    });
    res.json({ message: "successful process" });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {createEvent}