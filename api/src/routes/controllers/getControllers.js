const { Player, Event, Group } = require("../../db");
const { Sequelize, Model } = require("sequelize");

const getEvent = async (req, res) => {
  try {
    const allEvents = await Event.findAll({
      include: {
      model: Player,  // Como hacer para incluir todos los jugadores convocados??
      attributes: ['id'],
      through: { attributes: [] },
    },
    });
    res.json(allEvents);
  } catch (error) {
    res.json(error);
  }
};


module.exports = {getEvent}