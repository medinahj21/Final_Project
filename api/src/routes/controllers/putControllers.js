const { Player, Event, Group, Product } = require("../../db");
const { Sequelize, Model } = require("sequelize");

const asyncUpdateProduct = async (req, res) => {

    const { id, name, price, description, image, modifiers, filter_tags, is_order, stock, state, payment_term } = req.body;

    const result = await Product.findOne({
        where: { id: id }
    });
    try {
        if (result) {
            await Product.update({
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
            }, {
                where: {
                    id: id
                }
            })
            res.status(200).json({ message: 'Updated successfully' })
        } else {
            return res.status(400).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    asyncUpdateProduct,
}