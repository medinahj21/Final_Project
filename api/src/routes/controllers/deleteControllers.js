const { Player, Event, Group, Product } = require("../../db");
const { Sequelize, Model } = require("sequelize");
const {validateProduct} = require('../../utils/utils')

const asyncDeleteProduct = async (req, res) => {
    try {
        //ELIMINAR USANDO PROMESAS!!
        // await Product.destroy({where: {id: req.body.id }})
        // .then(() => {
        //     console.log('The product has been successfully removed');
        //     res.status(200).send('The product has been successfully removed')
        // }).catch(err => {
        //     res.status(500).json(err, 'Delete product has been failed')
        // })
        
        await Product.destroy({ where: { id: req.body.id } })
        return res.status(200).send('The product has been successfully removed')

    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    asyncDeleteProduct,
}