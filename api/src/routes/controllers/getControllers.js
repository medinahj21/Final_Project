const {
  Player,
  Event,
  Group,
  Product,
  Order,
  Admin,
  FilterTags,
} = require("../../db");
const { Sequelize, Model, Op } = require("sequelize");

const getProductsFromDB = async () => {
  try {
    const allProducts = await Product.findAll({
      include: {
        model: Order,
      },
    });
    
    if (allProducts) return allProducts;
    res.send("No products available");
  } catch (error) {
    console.log(error);
  }
};

const asyncGetProducts = async (req, res) => {
  try {
    let { name } = req.query;
    let products = await getProductsFromDB();
    if (name) {
      const searchedProduct = await Product.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
      });

      searchedProduct.length !== 0
        ? res.status(200).json(searchedProduct)
        : res.status(404).send("Product not found");
    } else return res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
};

const getFilterTags = async (req, res) => {
  try {
    let filterTags = await FilterTags.findAll();
    res.json(filterTags);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const asyncGetProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const myProduct = await getProductsFromDB();
    if (id && myProduct) {
      const wantedProduct = myProduct.filter(
        (p) => p.id.toString() === id.toString()
      );
      wantedProduct.length
        ? res.json(wantedProduct)
        : res.status(404).json({
            error: "Product doesn't exist",
          });
    }
  } catch (error) {
    console.log(error);
    console.log({ error: error.message });
  }
};

const getGroups = async (req, res) => {
  const { id } = req.params;
  const { name } = req.query;

  try {
    if (id) {
      const infoGroup = await Group.findByPk(id, {
        include: [
          { model: Admin, attributes: ["id"], through: { attributes: [] } },
        ],
      });

      infoGroup !== null
        ? res.status(200).send(infoGroup)
        : res.json({ message: "group no found" }).status(404);
    } else if (name) {
      const infoGroup = await Group.findOne({
        where: {
          name: name.toLowerCase(),
        },
        include: [
          { model: Admin, attributes: ["id"], through: { attributes: [] } },
        ],
      });

      infoGroup
        ? res.status(200).send(infoGroup)
        : res.json({ message: "group no found" }).status(404);
    } else {
      const infoGroup = await Group.findAll({
        include: [
          { model: Admin, attributes: ["id"], through: { attributes: [] } },
        ],
      });
      infoGroup.length > 0
        ? res.status(200).send(infoGroup)
        : res.json({ message: "there is not  group now" }).status(404);
    }
  } catch (error) {
    console.log(error);
  }
};

const getEvent = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      const allEvents = await Event.findAll({
        include: {
          model: Player,
          attributes: ["id"],
          through: { attributes: [] },
        },
      });

      allEvents
        ? res.send(allEvents).status(200)
        : res.json({ mesagge: "there is not event" });
    } else {
      const event = await Event.findByPk(id, {
        include: {
          model: Player,
          attributes: ["id"],
          through: { attributes: [] },
        },
      });

      !event
        ? res.status(404).json({ error: "Event not found" })
        : res.send(event).status(200);
    }
  } catch (error) {
    res.json({ error_DB: error.message });
  }
};

const getOrder = async (req, res) => {
  const { id } = req.params;
  const { name } = req.query;

  try {
    if (id) {
      const infoOrder = await Order.findByPk(id, {
        include: [
          { model: Product, attributes: ["name"], through: { attributes: [] } },
        ],
      });

      infoOrder !== null
        ? res.status(200).send(infoOrder)
        : res.json({ message: "order not found" }).status(404);
    } else if (name) {
      const infoOrder = await Order.findOne({
        where: {
          name: name.toLowerCase(),
        },
        include: [
          { model: Product, attributes: ["name"], through: { attributes: [] } },
        ],
      });

      infoOrder
        ? res.status(200).send(infoOrder)
        : res.json({ message: "order not found" }).status(404);
    } else {
      const infoOrder = await Order.findAll({
        include: [
          { model: Product, attributes: ["name"], through: { attributes: [] } },
        ],
      });
      infoOrder.length > 0
        ? res.status(200).send(infoOrder)
        : res.json({ message: "there is not  order now" }).status(404);
    }
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  asyncGetProducts,
  getProductsFromDB,
  asyncGetProductById,
  getGroups,
  getEvent,
  getOrder,
  getFilterTags,
};
