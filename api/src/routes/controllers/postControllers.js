const { Player, Event, Group, Product } = require("../../db");
const { Sequelize, Model } = require("sequelize");
const {validateProduct} = require("../../utils/utils");
const { getProductsFromDB }= require("../controllers/getControllers")



const asyncPostProduct = async (req, res)=> {
    try {
      const newProduct ={
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        modifiers: req.body.modifiers,
        filter_tags: req.body.filter_tags,
        is_order: req.body.is_order,
        stock: req.body.stock,
        state: req.body.state,
        payment_term: req.body.payment_term
    }

    validateProduct(newProduct);
  
    const existingProducts = await getProductsFromDB();
    if(
      existingProducts.find(({name})=> name.toLowerCase() === newProduct.name.toLowerCase())  
    ){
      return res.status(400).json({msg: "Product name already exists"})
    }

    const createdProduct= await Product.create(newProduct);
    return res.status(200).json(createdProduct);

    }catch(error){
        console.log(error)
        console.log({error: error.message})


    }

}


module.exports = {
    asyncPostProduct,
}