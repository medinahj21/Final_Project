const { Op } = require("sequelize");
const { Player, Event, Group, Product, Order, Admin } = require("../../db");
const rgExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;


const dbProducts = async () => {
  try {
    const allProducts = await Product.findAll({
      include: {
        model: Order,
      },
    });
    if (allProducts) return allProducts;
    else { console.log("No products available") };
  } catch (error) {
    console.log(error);
  }
};

const asyncGetProducts = async (req, res) => {
  let { name } = req.query;
  try {
    const products = await dbProducts();
    if (name) {
      const searchedProduct = await Product.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
      });

      searchedProduct.length !== 0
        ? res.status(200).send(searchedProduct)
        : res.status(404).json({ message: " Product not found " });
    } else res.status(200).send(products);
  } catch (error) {
    console.log(error);
  }
};

const asyncGetProductById = async (req, res) => {
  const { id } = req.params
  try {
    const myProduct = await dbProducts();

    if (rgExp.test(id) && myProduct) {
      const searchProduct = myProduct.filter(
        (product) => product.id.toString() === id.toString()
      );
      searchProduct.length
        ? res.send(searchProduct)
        : res.status(404).json({
          mesagge: "this product was not found",
        });
        
    } else {
      res.status(400).json({ message: "something has gone wrong" })
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
    if (rgExp.test(id)) {
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
        : res.status(404).json({ message: "group not found" });
    } else {
      const infoGroup = await Group.findAll({
        include: [
          { model: Admin, attributes: ["id"], through: { attributes: [] } },
        ],
      });
      infoGroup.length > 0
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
        include: {
          model: Player,
          attributes: ["id"],
          through: { attributes: [] },
        }
      });

      allEvents ?
        res.status(200).send(allEvents)
        : res.json({ mesagge: "there is not event" });

    } else {
      const event = await Event.findByPk(id, {
        include: {
          model: Player,
          attributes: ["id"],
          through: { attributes: [] },
        },
      });

      !event ?
        res.status(404).json({ error: "Event not found" })
        : res.send(event).status(200);
    }
  } catch (error) {
    res.json({ error_DB: error.message });
    console.log(error);
  }
};

const getOrder = async (req, res) => {
  const { id } = req.params
  
  try {
    if (id) {
      if (rgExp.test(id)) {
        const infoOrder = await Order.findByPk(id, {
          include: [{ model: Product, attributes: ["name"], through: { attributes: [] } }]
        })

        infoOrder !== null
          ? res.status(200).send(infoOrder)
          : res.status(404).json({ message: "order not found" })

      } else res.status(406).json({ mesagge: "id no valid" })
    } else {
      const infoOrder = await Order.findAll({
        include: [{ model: Product, attributes: ["name"], through: { attributes: [] } }]
      })
      infoOrder.length ?
        res.status(200).send(infoOrder)
        : res.status(404).json({ message: "there is not  order now" })
    }
  } catch (error) {
    res.json(`new error:${error}`)
    console.log(`new error:${error}`)
  }
}
module.exports = {
  asyncGetProductById,
  asyncGetProducts,
  dbProducts,
  getGroups,
  getEvent,
  getOrder
};
