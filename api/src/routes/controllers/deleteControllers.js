const { Player, Event, Group } = require("../../db");
const { Sequelize, Model } = require("sequelize");

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await Event.destroy({
      where: {
        id
      }
    });
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.json(error);
  }
};


module.exports = {deleteEvent}