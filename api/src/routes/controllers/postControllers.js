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

const { getProductsFromDB } = require("../controllers/getControllers");


/**======================== asyncPostProduct==========================*/
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
    if (!name || !price || !description || !isOrder || !paymentTerm || !state) {
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
      
      FilterTags && newProduct.addFilterTags(FilterTags);
      
      return res.status(200).json({ msg: "product created" });
    }
  } catch (error) {
    res.status(500).json({ error_DB: error.message });
  }
};

/**======================== postProduct==========================*/
const postGroups = async (req, res) => {
  console.log("backedn", req.body);
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
      // !adminId ||
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
      
      if (adminId?.length) {
        const validateAdmin = await newGroup.addAdmin(adminId);
        validateAdmin && res.status(200).send("group created susscessful");
      } else {
        res.status(200).json({ newGroup });
      }
    }
  } catch (error) {
    res.status(500).json({ error_DB: error.message });
  }
};

/**======================== Event ==========================*/
const createEvent = async (req, res) => {
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
    player,
  } = req.body;
  try {
    if (!((name && start && end && location && date) /*&& admin*/)) {
      res.status(400).json({ error: "information is missing" });
    } else {
      if (repetitive === false) {
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
        /*const addAdmin = await newEvent.addAdmin(admin);
        const addPlayer = await newEvent.addPlayer(player);
        addAdmin && addPlayer && */
        res.status(200).send("the event has been created");
      } else {
        for (let i = 0; i < date.length; i++) {
          const newEvent = await Event.create({
            name,
            location,
            description,
            date: [date[i]],
            repetitive,
            state,
            start,
            end,
          });
          await newEvent.addAdmin(admin);
          await newEvent.addPlayer(player);
        }
        res.status(200).send("the events has been created successfully");
      }
    }
  } catch (error) {
    res.status(400).json({ error_DB: error.message });
  }
};

/**======================== Orders ==========================*/
const postOrders = async (req, res) => {
  const {
    value,
    concept,
    description,
    order_state, 
    payment_date,
    payment_mode, 
    payment_term,
    type_order,
    product,
    playerId,
  } = req.body;
  
  try {
    if (
      !value ||
      !concept ||
      !order_state ||
      !description ||
      !payment_date ||
      !payment_term ||
      !type_order
      ) {
        res.status(412).json({ message: "information is missing" });
      } else {
        if(product){
          const newOrder = await Order.create({
            value,
            concept,
            description,
            order_state,
            payment_date,
            payment_mode,
            payment_term,
            type_order,
            playerId,
          });
          
          const validateOrderProduc = await newOrder.addProduct(product);
          
          validateOrderProduc && res.status(200).send("order created successfully");
        }else{
          const newOrder = await Order.create({
            value,
            concept,
            description,
            order_state,
            payment_date,
            payment_mode,
            payment_term,
            type_order,
            playerId,
          });
          
          newOrder && res.status(200).send("order created successfully");
        }
      }
    } catch (error) {
      res.json({ error_DB: error.message });
    }
  };
  
  /**======================== Players ==========================*/
  const postPlayers = async (req, res) => {
    const { personalInfo, debtValue, paymentDate, shirtNumber, groupId } =
    req.body;
    
    try {
    if (!personalInfo) res.status(400).json({ error: "missing info" });
    else {
      const newPlayer = await Player.create({
        id: personalInfo.uid,
        personalInfo,
        debtValue,
        paymentDate,
        shirtNumber,
        groupId,
      });
      
      !newPlayer
      ? res.status(400).json({ message: "newPlayer was  not created" })
      : res.json({ message: "Player was created successfully" });
    }
  } catch (error) {
    res.status(500).json({ error_DB: error.message });
  }
};

/**======================== Admins ==========================*/
const postAdmins = async (req, res) => {
  const { personal_info, permissions, id } = req.body;
  
  try {
    if (!(personal_info && permissions && id))
    res.status(400).json({ error: "missing info" });
    else {
      const newAdmin = await Admin.create({
        personal_info,
        permissions,
        id,
      });
      
      !newAdmin
      ? res.status(400).json({ message: "Admin was  not created" })
      : res.json({ message: "Admin was created successfully" });
    }
  } catch (error) {
    res.status(500).json({ error_DB: error.message });
  }
};

/**======================== FilterTags ==========================*/
const postFilterTag = async (req, res) => {
  const { name } = req.body;
  try {
    const newTag = await FilterTags.create({ name });
    res.json(newTag);
  } catch (error) {
    res.status(500).json({ error_DB: error.message });
  }
};


/**======================== ProductRequest ==========================*/
const postProductRequest = async (req, res) => {
  const {
    infoProduct,
    productId,
    playerId
  } = req.body;
  try {
    if (!(infoProduct && productId && playerId)) {
      res.status(400).json({ msg: "mising information" })
    } else {
      const newRequest = await ProductRequest.create({
        infoProduct,
        playerId
      })
      await newRequest.addProduct(productId)
      
      newRequest ?
      res.json({ msg: "procces sussessfuly" })
      : res.json({ msg: "something was wrong" })
    }
  } catch (error) {
    res.json({ error_DB: error.message });
  }
}

/**======================== RoleRequest ==========================*/
const postRoleRequest = async (req, res) => {
  const { id, newRole, userInfo, groupId } = req.body;
  try {
    if (!newRole) {
      res.status(400).json({ error: "No role send" });
    } else {
      const newRoll = await RoleRequest.create({
        id,
        newRole,
        userInfo,
        groupId,
      });
      
      newRoll
      ? res.json({ message: "procces successfully" })
      : res.status(400).json({ error: "bad request" });
    }
  } catch (error) {
    res.status(500).json({ error_DB: error.message });
  }
};


module.exports = {
  asyncPostProduct,
  postGroups,
  createEvent,
  postOrders,
  postPlayers,
  postFilterTag,
  postAdmins,
  postRoleRequest,
  postProductRequest
};
