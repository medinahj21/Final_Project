const { Player, Event, Group } = require("../../db");
const { Sequelize, Model } = require("sequelize");

const editEvent = async (req, res) => {
  const {key, property, value } = req.body;
  try {
    const event = await Event.findByPk(key)
    event[property] = value 
    res.json(event);
  } catch (error) {
    res.json(error);
  }
};

module.exports = {editEvent}