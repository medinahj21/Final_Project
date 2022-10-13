const { Group } = require("../../db");
const { Sequelize, Model } = require("sequelize");

const putGroups = async (req, res) => {
    const { id } = req.params
    try {
        if (!id || id.length < 36) {
            res.json({ message: "id is require or id is to short, please try again" }).status(400)
        } else {
            const group = await Group.findByPk(id)
            if (group !== null) {
                await group.set(req.body).save()
                res.status(200).json({message:"group update"});
            } else {
                res.status(404).json({ message: "group no found, try again" });
            }
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}


module.exports = {
    putGroups
}