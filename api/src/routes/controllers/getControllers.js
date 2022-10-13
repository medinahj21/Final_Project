const { Group, Admin } = require("../../db");
const { Sequelize, Model } = require("sequelize");


const getGroups = async (req, res) => {
    const { id } = req.params
    const { name } = req.query

    try {
        if (id) {
            const infoGroup = await Group.findByPk(id,{
                include: [{ model: Admin, attributes:["id"], through:{attributes:[]} }]
            })
            
            infoGroup !== null ? res.status(200).send(infoGroup) : res.json({ message: "group no found" }).status(404)
            
        } else if (name) {
      
            const infoGroup = await Group.findOne({
                where: {
                    name: name.toLowerCase()
                },
                include: [{ model: Admin, attributes:["id"], through:{attributes:[]} }]
            })
            
            infoGroup ? res.status(200).send(infoGroup) : res.json({ message: "group no found" }).status(404)
            
        } else {
            
            const infoGroup = await Group.findAll({
                include: [{ model: Admin, attributes:["id"], through:{attributes:[]} }]
            })
            infoGroup.length > 0 ? res.status(200).send(infoGroup) : res.json({ message: "there is not  group now" }).status(404)
            
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getGroups
}