const { Player, Event, Group, Product, Order } = require("../../db");
const { Sequelize, Model, Op } = require("sequelize");


const getProductsFromDB = async () => {
  try {
    const allProducts = await Product.findAll({
        include: {
            model: Order,
        }
    });
    console.log(allProducts);
    if (allProducts) return allProducts;
    console.log("No products available");
  } catch (error) {
    console.log(error);
  }
};

const asyncGetProducts = async (req, res) => {
  try {
    let { name } = req.query;
    let products = await getProductsFromDB();
    console.log(products);
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

module.exports = {
    asyncGetProducts,
    getProductsFromDB
};
