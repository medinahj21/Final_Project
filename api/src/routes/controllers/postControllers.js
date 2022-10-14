const {
  Player,
  RoleRequest,
  Group,
  Admin,
  Event,
  Order,
  Product,
  ProductRequest,
} = require("../../db");
const { Sequelize, Model } = require("sequelize");
const { validateProduct } = require("../../utils/utils");
const { getProductsFromDB } = require("../controllers/getControllers");

const asyncPostProduct = async (req, res) => {
  try {
    const newProduct = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      modifiers: req.body.modifiers,
      filter_tags: req.body.filter_tags,
      is_order: req.body.is_order,
      stock: req.body.stock,
      state: req.body.state,
      payment_term: req.body.payment_term,
    };

    let error = validateProduct(newProduct);
    if (error) res.status(400).json(error);

    const existingProducts = await getProductsFromDB();
    if (
      existingProducts.find(
        ({ name }) => name.toLowerCase() === newProduct.name.toLowerCase()
      )
    ) {
      return res.status(400).json({ msg: "Product name already exists" });
    }

    const createdProduct = await Product.create(newProduct);
    return res.status(200).json(createdProduct);
  } catch (error) {
    console.log(error);
    console.log({ error: error.message });
  }
};

const postGroups = async (req, res) => {
  const {
    name,
    location,
    schedule,
    description,
    image,
    inscription_cost,
    contact,
    whatsapp,
    accept_newPlayers,
    genre,
    adminId,
  } = req.body;
  try {
    if (
      !name ||
      !schedule ||
      !description ||
      !inscription_cost ||
      !accept_newPlayers ||
      !genre ||
      !adminId
    ) {
      res.status(404).json({ message: "missing information" });
    } else {
      const newGroup = await Group.create({
        name: name.toLowerCase(),
        location,
        schedule,
        description,
        image,
        inscription_cost,
        contact,
        whatsapp,
        accept_newPlayers,
        genre,
      });
      const validateAdmin = await newGroup.addAdmin(adminId);
      validateAdmin && res.status(200).send("group created susscessful");
    }
  } catch (error) {
    console.log(error);
  }
};

const createEvent = async (req, res) => {
  const { name, location, description, date, repetitive, state } = req.body;
  try {
    if(!(name&&date&&repetitive!==undefined&&state)){
      res.status(400).json({error: "missing info"});
    }
    await Event.create({
      name,
      location,
      description,
      date,
      repetitive,
      state,
    });
    res.json({ message: "successful process" });
  } catch (error) {
    res.json({error: error.message});
  }
};

module.exports = {
  asyncPostProduct,
  postGroups,
  createEvent,
};
