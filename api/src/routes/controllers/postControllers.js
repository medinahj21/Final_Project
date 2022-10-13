const { Player, RoleRequest, Group, Admin, Event, Order, Product, ProductRequest } = require("../../db");
const { Sequelize, Model } = require("sequelize");

const postGroups = async (req, res) => {
    const {
        name,
        location,
        schedule,
        description,
        image,
        inscription_cost,
        contact,
        whatsapp,
        accept_newPlayers,
        genre,
        adminId
    } = req.body
    try {
        if (!name || !schedule || !description || !inscription_cost || !accept_newPlayers || !genre || !adminId) {
            res.status(404).json({ message: "missing information" })
        } else {
        
            const newGroup = await Group.create({
                name:name.toLowerCase(),
                location,
                schedule,
                description,
                image,
                inscription_cost,
                contact,
                whatsapp,
                accept_newPlayers,
                genre,
            })
            const validateAdmin = await newGroup.addAdmin(adminId) 
            validateAdmin &&  res.status(200).send("group created susscessful")
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    postGroups
}