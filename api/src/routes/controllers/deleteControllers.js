const { Player, Event, Group, Product } = require("../../db");
const { Sequelize, Model } = require("sequelize");
const {validateProduct} = require('../../utils/utils')

const asyncDeleteProduct = async (req, res) => {
    try {
        await Product.destroy({ where: { id: req.params.id } })
        return res.status(200).send('The product has been successfully removed')

    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    asyncDeleteProduct,
}