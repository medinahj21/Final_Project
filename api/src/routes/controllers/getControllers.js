const {
  Player,
  Event,
  Group,
  Product,
  Order,
  Admin,
  FilterTags,
  RoleRequest,
} = require("../../db");
const { Sequelize, Model, Op } = require("sequelize");
const rgExp =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

const getProductsFromDB = async () => {
  try {
    const allProducts = await Product.findAll({
      include: [
        {
          model: FilterTags,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (allProducts) return allProducts;
    else {
      console.log("No products available");
    }
  } catch (error) {
    console.log(error);
  }
};

const asyncGetProducts = async (req, res) => {
  let { name } = req.query;
  try {
    let products = await getProductsFromDB();
    if (name) {
      const searchedProduct = await Product.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
      });

      searchedProduct.length !== 0
        ? res.status(200).send(searchedProduct)
        : res.status(404).json({ message: " Product not found " });
    } else {
      res.status(200).send(products);
    }
  } catch (error) {
    console.log(error);
  }
};

const getFilterTags = async (req, res) => {
  try {
    let filterTags = await FilterTags.findAll();
    filterTags ? res.send(filterTags) : res.json({ mesagge: "is empty" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const asyncGetProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const myProduct = await getProductsFromDB();

    if (rgExp.test(id) && myProduct) {
      const searchProduct = myProduct.filter(
        (product) => product.id.toString() === id.toString()
      );
      searchProduct.length
        ? res.send(searchProduct)
        : res.status(404).json({ mesagge: "this product was not found" });
    } else {
      res.status(400).json({ message: "something has gone wrong" });
    }
  } catch (error) {
    res.json({ error: error.message });
    console.log(error);
  }
};

const getGroups = async (req, res) => {
  const { id } = req.params;
  const { name } = req.query;

  try {
    console.log(id, rgExp.test(id));
    if (rgExp.test(id)) {
      const infoGroup = await Group.findByPk(id, {
        include: [
          { model: Admin, attributes: ["id"], through: { attributes: [] } },
          { model: Player },
        ],
      });

      infoGroup !== null
        ? res.status(200).send(infoGroup)
        : res.json({ message: "group no found" }).status(404);
    } else if (name) {
      const infoGroup = await Group.findOne({
        where: { name: name.toLowerCase() },
        include: [
          { model: Admin, attributes: ["id"], through: { attributes: [] } },
          { model: Player },
        ],
      });

      infoGroup
        ? res.status(200).send(infoGroup)
        : res.status(404).json({ message: "group not found" });
    } else {
      const infoGroup = await Group.findAll({
        include: [
          { model: Admin, attributes: ["id"], through: { attributes: [] } },
          { model: Player },
        ],
      });

      infoGroup
        ? res.status(200).send(infoGroup)
        : res.status(404).json({ message: "there is not  group now" });
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
        include: [
          {
            model: Player,
            attributes: ["id"],
            through: { attributes: [] },
          },
          {
            model: Admin,
            attributes: ["id"],
            through: { attributes: [] },
          },
        ],
      });

      allEvents
        ? res.status(200).send(allEvents)
        : res.json({ mesagge: "there is not event" });
    } else {
      const event = await Event.findByPk(id, {
        include: [
          {
            model: Player,
            attributes: ["id"],
            through: { attributes: [] },
          },
          { model: Admin },
        ],
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
  try {
    if (id) {
      if (rgExp.test(id)) {
        const infoOrder = await Order.findByPk(id, {
          include: [
            {
              model: Product,
              attributes: ["name"],
              through: { attributes: [] },
            },
            { model: Player },
          ],
        });

        infoOrder !== null
          ? res.status(200).send(infoOrder)
          : res.status(404).json({ message: "order not found" });
      } else res.status(406).json({ mesagge: "no valid" });
    } else {
      const infoOrder = await Order.findAll({
        include: [{ model: Player }, { model: Product }],
      });
      infoOrder.length
        ? res.status(200).send(infoOrder)
        : res.status(404).json({ message: "there is not  order now" });
    }
  } catch (error) {
    res.json(`new error:${error}`);
    console.log(`new error:${error}`);
  }
};

const getPlayers = async (req, res) => {
  const { name } = req.query;
  const { id } = req.params;
  try {
    if (id) {
      const player = await Player.findByPk(id, {
        include: [
          { model: Order },
          { model: Group },
          { model: Event },
          { model: RoleRequest },
        ],
      });
      !player
        ? res.status(404).json({ message: "players not found" })
        : res.send(player);
    } else if (name) {
      const player = await Player.findAll({
        where: { "personalInfo.name": name },
        include: [
          { model: Order },
          { model: Group },
          { model: Event },
          { model: RoleRequest },
        ],
      });
      !player
        ? res.status(400).json({ message: "players is empty" })
        : res.send(player);
    } else {
      const allPlayers = await Player.findAll({
        include: [
          { model: Order },
          { model: Group },
          { model: Event },
          { model: RoleRequest },
        ],
      });
      !allPlayers
        ? res.status(400).json({ message: " empty" })
        : res.send(allPlayers);
    }
  } catch (error) {
    console.log(error);
  }
};

const getAdmins = async (req, res) => {
  const { name } = req.query;
  const { id } = req.params;
  try {
    if (rgExp.test(id)) {
      const admin = await Admin.findByPk(id, {
        include: [
          { model: Group, attributes: ["id"], through: { attributes: [] } },
          { model: Event, attributes: ["id"], through: { attributes: [] } },
        ],
      });
      !admin
        ? res.status(400).json({ message: " admin is empty" })
        : res.send(admin);
    } else if (name) {
      const admin = await Admin.findAll({
        where: { personal_info: { "Nombre completo": name } },
        include: [
          { model: Group, attributes: ["id"], through: { attributes: [] } },
          { model: Event, attributes: ["id"], through: { attributes: [] } },
        ],
      });
      !admin
        ? res.status(400).json({ message: "admin is empty" })
        : res.send(admin);
    } else {
      const admins = await Admin.findAll({
        include: [
          { model: Group, attributes: ["id"], through: { attributes: [] } },
          { model: Event, attributes: ["id"], through: { attributes: [] } },
        ],
      });
      !admins ? res.status(400).json({ message: " empty" }) : res.send(admins);
    }
  } catch (error) {
    console.log(error);
  }
};

const getRoleRequest = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const role = await RoleRequest.findByPk(id);
      !role
        ? res.status(404).json({ message: "roleRequestis not found" })
        : res.send(role);
    } else {
      const role = await RoleRequest.findAll();
      !role ? res.status(400).json({ message: "bad request" }) : res.send(role);
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
    console.log(error);
  }
};

module.exports = {
  asyncGetProductById,
  asyncGetProducts,
  getProductsFromDB,
  getGroups,
  getEvent,
  getOrder,
  getFilterTags,
  getPlayers,
  getAdmins,
  getRoleRequest,
};
