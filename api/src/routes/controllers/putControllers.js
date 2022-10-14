const { Player, Event, Group, Product, Order } = require("../../db");
const { Sequelize, Model } = require("sequelize");

const asyncUpdateProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    modifiers,
    filter_tags,
    is_order,
    stock,
    state,
    payment_term,
  } = req.body;
  const { id } = req.params;

  try {
    const result = await Product.findOne({
      where: { id: id },
    });
    if (result) {
      await Product.update(
        {
          name,
          price,
          description,
          image,
          modifiers,
          filter_tags,
          is_order,
          stock,
          state,
          payment_term,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(200).json({ message: "Updated successfully" });
    } else {
      return res.status(400).json({ error: "Product not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

const putGroups = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id || id.length < 36) {
      res
        .json({ message: "id is require or id is to short, please try again" })
        .status(400);
    } else {
      const group = await Group.findByPk(id);
      if (group !== null) {
        await group.set(req.body).save();
        res.status(200).json({ message: "group update" });
      } else {
        res.status(404).json({ message: "group not found, try again" });
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const editEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findByPk(id);
    if (event !== null) {
      await event.set(req.body).save()
      res.json({ message: "Event updated" })
    } else {
      res.json({ message: "id not found" })
    }
  } catch (error) {
    res.status(400).json({ error_DB: error.message });
  }
};


const putOrders = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id || id.length < 36) {
      res
        .json({ message: "id is require or id is to short, please try again" })
        .status(400);
    } else {
      const order = await Order.findByPk(id);
      if (order !== null) {
        await order.set(req.body).save();
        res.status(200).json({ message: "order update" });
      } else {
        res.status(404).json({ message: "order not found, try again" });
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}
module.exports = {
  asyncUpdateProduct,
  putGroups,
  editEvent,
  putOrders
};
