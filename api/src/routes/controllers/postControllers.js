const {
  Player,
  RoleRequest,
  Group,
  Admin,
  Event,
  Order,
  Product,
  ProductRequest,
  FilterTags,
} = require("../../db");
const { Sequelize, Model } = require("sequelize");
const { getProductsFromDB } = require("../controllers/getControllers");

const asyncPostProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    modifiers,
    isOrder,
    stock,
    state,
    paymentTerm,
    FilterTags,
  } = req.body;

  try {
    const existingProducts = await getProductsFromDB();
    if (
      existingProducts.find((p) => p.name.toLowerCase() === name.toLowerCase())
    ) {
      return res.status(400).json({ msg: "Product name already exists" });
    }
    if (!name || !price || !description) {
      res.status(404).json({ message: "missing required fields" });
    } else {
      const newProduct = await Product.create({
        name: name.toLowerCase(),
        price,
        description,
        image,
        modifiers,
        isOrder,
        stock,
        state,
        paymentTerm,
        FilterTags,
      });

      if (FilterTags) newProduct.addFilterTags(FilterTags);
      return res.status(200).json(newProduct);
    }
  } catch (error) {
    res.status(500).json({ error_DB: error.message });
  }
};

const postGroups = async (req, res) => {
  const {
    name,
    image,
    genre,
    contact,
    adminId,
    category,
    location,
    schedule,
    whatsapp,
    description,
    inscription_cost,
    accept_newPlayers,
  } = req.body;
  try {
    if (
      !name ||
      !genre ||
      !adminId ||
      !schedule ||
      !description ||
      !inscription_cost ||
      !accept_newPlayers
    ) {
      res.status(412).json({ message: "missing information" });
    } else {
      const newGroup = await Group.create({
        name: name.toLowerCase(),
        genre,
        image,
        contact,
        category,
        schedule,
        location,
        whatsapp,
        description,
        inscription_cost,
        accept_newPlayers,
      });
      const validateAdmin = await newGroup.addAdmin(adminId);
      validateAdmin && res.status(200).send("group created susscessful");
    }
  } catch (error) {
    console.log(error);
  }
};

const createEvent = async (req, res) => {
  console.log(req.body);
  const {
    name,
    location,
    start,
    admin,
    end,
    date,
    description,
    repetitive,
    state,
    player
  } = req.body;
  try {                                      //Volver a colocar validación para admin.
    if (!(name && start && end && location && date)) {
      res.status(400).json({ error: "information is missing" });
    } else {
      const newEvent = await Event.create({
        name,
        location,
        description,
        date,
        repetitive,
        state,
        start,
        end,
      });
      console.log('creado con exito');
      const addAdmin = await newEvent.addAdmin(admin);
      const addPlayer = await newEvent.addPlayer(player);
      addAdmin && addPlayer && res.status(200).send("the event has been created");
    }
  } catch (error) {
    res.status(400).json({ error_DB: error.message });
  }
};

const postOrders = async (req, res) => {
  const {
    value,
    concept,
    description,
    order_state, //==> revisar obligatoriedad
    payment_date,
    payment_mode, //==> revisar obligatoriedad
    payment_term,
    product,
    playerId
  } = req.body;

  try {
    if (
      !value ||
      !concept ||
      !description ||
      !payment_date ||
      !payment_term ||
      !product
    ) {
      res.status(412).json({ message: "information is missing" });
    } else {
      const newOrder = await Order.create({
        value,
        concept,
        description,
        order_state,
        payment_date,
        payment_mode,
        payment_term,
        playerId
      });
      const validateOrderProduc = await newOrder.addProduct(product);
      // const validateOrderPlayer = await newOrder.addPlayer(player);
       validateOrderProduc  &&   res.status(200).send("order created successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

const postPlayers = async (req, res) => {
  const { personalInfo, debtValue, paymentDate, shirtNumber, groupId } = req.body;

  try {
    if (!personalInfo) res.status(400).json({ error: "missing info" });
    else {
      const newPlayer = await Player.create({
        id: personalInfo.uid,
        personalInfo,
        debtValue,
        paymentDate,
        shirtNumber,
        groupId
      });

      !newPlayer
        ? res.status(400).json({ message: "newPlayer was  not created" })
        : res.json({ message: "Player was created successfully" });
    }
  } catch (error) {
    res.status(500).json({ error_DB: error.message });
  }
};
const postAdmins = async (req, res) => {
  const { personal_info, permissions} = req.body;

  try {
    if (!(personal_info && permissions) ) res.status(400).json({ error: "missing info" });
    else {
      const newAdmin = await Admin.create({
        personal_info,
        permissions
      });

      !newAdmin
        ? res.status(400).json({ message: "Admin was  not created" })
        : res.json({ message: "Admin was created successfully" });
    }
  } catch (error) {
    res.status(500).json({ error_DB: error.message });
  }
};

const postFilterTag = async (req, res) => {
  const { name } = req.body;
  try {
    const newTag = await FilterTags.create({ name });
    res.json(newTag);
  } catch (error) {
    res.status(500).json({ error_DB: error.message });
  }
};



const postRoleRequest = async (req,res) =>{
  const { new_role, playerId , groupId} = req.body;
  try {
    if(!new_role){
      res.status(500).json({ error_DB: error.message });
    }else{
      const newRoll = await RoleRequest.create({
        new_role,
        playerId,
        groupId
      })
      
      newRoll ? res.json({message:"procces successfully"})
      :res.status(400).json({message:"bad request"})
    }
  } catch (error) {
   console.log(error);
  }
}




module.exports = {
  asyncPostProduct,
  postGroups,
  createEvent,
  postOrders,
  postPlayers,
  postFilterTag,
  postAdmins,
  postRoleRequest
};


