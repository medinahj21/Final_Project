const {
    Player,
    Event,
    Group,
    Product,
    Order,
    Admin,
    FilterTags,
    RoleRequest,
    ProductRequest
  } = require("../../db");

  /**=====================Admins=============== */
  const getRestoreAdminds = async (req, res) =>{
      const { id } = req.params;
      try {
          if (!id) {
              res.status(411).json({ error: " missing information" });
            } else {
                if (id) {
          await Admin.restore({ where: { id } });
          res.json({ message: "Admin has been restored successfully" });
        } else {
            res.status(400).json({ error: "Bad request" });
        }
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}


/**=====================Players=============== */
const getRestorePlayer = async (req, res) =>{
    const { id } = req.params;
    try {
        if (!id) {
            res.status(411).json({ error: " missing information" });
        } else {
            if (id) {
                await Player.restore({ where: { id } });
                res.json({ message: "Player has been restored successfully" });
            } else {
                res.status(400).json({ error: "Bad request" });
        }
    }
} catch (error) {
      res.status(400).json({ error: error.message });
    }
}


/**===================== Events =============== */
const getRestoreEvent = async (req, res) =>{
    const { id } = req.params;
    try {
        if (!id) {
            res.status(411).json({ error: " missing information" });
        } else {
            if (id) {
                await Event.restore({ where: { id } });
                res.json({ message: "Event has been restored successfully" });
            } else {
                res.status(400).json({ error: "Bad request" });
        }
    }
} catch (error) {
      res.status(400).json({ error: error.message });
    }
}


/**===================== Groups =============== */
const getRestoreGroup = async (req, res) =>{
    const { id } = req.params;
    try {
        if (!id) {
            res.status(411).json({ error: " missing information" });
        } else {
            if (id) {
                await Group.restore({ where: { id } });
                res.json({ message: "Group has been restored successfully" });
            } else {
                res.status(400).json({ error: "Bad request" });
        }
    }
} catch (error) {
      res.status(400).json({ error: error.message });
    }
}


/**===================== Product =============== */
const getRestoreProduct = async (req, res) =>{
    const { id } = req.params;
    try {
        if (!id) {
            res.status(411).json({ error: " missing information" });
        } else {
            if (id) {
                await Product.restore({ where: { id } });
                res.json({ message: "Product has been restored successfully" });
            } else {
                res.status(400).json({ error: "Bad request" });
        }
    }
} catch (error) {
      res.status(400).json({ error: error.message });
    }
}


/**===================== RoleRequest =============== */
const getRestoreRoleRequest = async (req, res) =>{
    const { id } = req.params;
    try {
        if (!id) {
            res.status(411).json({ error: " missing information" });
        } else {
            if (id) {
                await RoleRequest.restore({ where: { id } });
                res.json({ message: "RoleRequest has been restored successfully" });
            } else {
                res.status(400).json({ error: "Bad request" });
        }
    }
} catch (error) {
      res.status(400).json({ error: error.message });
    }
}


module.exports = {
    getRestoreAdminds,
    getRestorePlayer,
    getRestoreGroup,
    getRestoreEvent,
    getRestoreProduct,
    getRestoreRoleRequest
  };
  